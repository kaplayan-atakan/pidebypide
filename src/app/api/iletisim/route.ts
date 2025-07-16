import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import type { SentMessageInfo } from 'nodemailer';

// export const dynamic = 'force-dynamic'; // statik dışa aktarım için devre dışı bırakıldı

export async function POST(request: NextRequest) {
  try {
    /*
    // CSRF ve reCaptcha doğrulaması burada yapılmalı (üretim ortamında)
    // const recaptchaToken = formData.get('g-recaptcha-response');
    // Recaptcha doğrulamasını burada yapın
    */
    
    const formData = await request.formData();
    
    // Form alanlarını kontrol et
    const il = formData.get('il') as string;
    const sube = formData.get('sube') as string;
    const adiSoyadi = formData.get('adi_soyadi') as string;
    const email = formData.get('email') as string;
    const telefon = formData.get('telefon') as string;
    
    // Zorunlu alanları doğrulama
    if (!il || !sube || !adiSoyadi || !email || !telefon) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Lütfen tüm zorunlu alanları doldurunuz.' 
        },
        { status: 400 }
      );
    }
    
    // E-posta doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Geçerli bir e-posta adresi giriniz.' 
        },
        { status: 400 }
      );
    }
    
    // Telefon numarası doğrulama
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(telefon)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Geçerli bir telefon numarası giriniz.' 
        },
        { status: 400 }
      );
    }

    // Dosya yükleme işlemi
    const file = formData.get('userfile') as File;
    let fileUrl = '';
    
    if (file && file.size > 0) {
      // Dosya boyutu kontrolü (3MB)
      if (file.size > 3 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: 'Dosya boyutu 3MB\'dan büyük olamaz.'
          },
          { status: 400 }
        );
      }
      
      // Sadece izin verilen dosya türleri
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: 'Sadece JPG, PNG ve GIF dosyaları yükleyebilirsiniz.'
          },
          { status: 400 }
        );
      }

      try {
        // Dosyayı public/upload/contact klasörüne kaydet
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Dosya adını güvenli hale getir
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'upload', 'contact');
        const filePath = path.join(uploadDir, fileName);
        
        await writeFile(filePath, buffer);
        fileUrl = `/upload/contact/${fileName}`;
      } catch (error) {
        console.error('Dosya yükleme hatası:', error);
        return NextResponse.json(
          {
            success: false,
            message: 'Dosya yüklenirken bir hata oluştu.'
          },
          { status: 500 }
        );
      }
    }

    // Form verilerini hazırla (gerçek uygulamada e-posta gönderimi veya veritabanına kayıt yapılacak)
    const formSubmissionData = {
      il,
      sube,
      adiSoyadi,
      email,
      telefon,
      mesaj: formData.get('mesaj') as string,
      fileUrl,
      kvkk: formData.get('kvkk') === 'true',
      tarih: new Date().toISOString(),
    };
    
    // Kurumsal kimlik renkleri
    const brandColor = "#14543c";
    const accentColor = "#f29b24";

    let mailKurumsal: SentMessageInfo | undefined = undefined;
    let mailKullanici: SentMessageInfo | undefined = undefined;
    let mailErrorKurumsal = null;
    let mailErrorKullanici = null;
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: parseInt(process.env.SMTP_PORT as string),
        secure: false, // TLS için false
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASSWORD as string
        }
      });

      // Kurumsal muhatap için detaylı HTML içerik
      const htmlKurumsal = `
        <div style="font-family: Arial, sans-serif; background: #fff; border:1px solid #eee; border-radius:8px; padding:24px;">
          <h2 style="color:${brandColor};margin-bottom:16px;">Yeni İletişim Formu Mesajı</h2>
          <table style="width:100%;font-size:15px;">
            <tr><td><b>İl:</b></td><td>${il}</td></tr>
            <tr><td><b>Şube:</b></td><td>${sube}</td></tr>
            <tr><td><b>Ad Soyad:</b></td><td>${adiSoyadi}</td></tr>
            <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
            <tr><td><b>Telefon:</b></td><td>${telefon}</td></tr>
            <tr><td><b>Mesaj:</b></td><td>${formSubmissionData.mesaj || 'Belirtilmedi'}</td></tr>
            ${fileUrl ? `<tr><td><b>Dosya:</b></td><td><a href="${fileUrl}">Gönderilen Dosya</a></td></tr>` : ''}
            <tr><td><b>Tarih:</b></td><td>${formSubmissionData.tarih}</td></tr>
          </table>
          <div style="margin-top:24px;color:${accentColor};font-size:13px;">Bu e-posta otomatik olarak oluşturulmuştur.</div>
        </div>
      `;

      // Kullanıcıya gidecek sade teşekkür maili
      const htmlKullanici = `
        <div style="font-family: Arial, sans-serif; background: #fff; border:1px solid #eee; border-radius:8px; padding:24px;">
          <h2 style="color:${brandColor};margin-bottom:16px;">Mesajınız Alındı</h2>
          <p>Sayın <b>${adiSoyadi}</b>,</p>
          <p>İletişim formunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
          <div style="margin-top:24px;color:${accentColor};font-size:13px;">Pide By Pide İletişim Ekibi</div>
        </div>
      `;

      // Önce kurumsal muhataba gönder
      mailKurumsal = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.MAIL_TO_ILETISIM,
        subject: 'Yeni İletişim Formu Mesajı',
        text: `İl: ${il}\nŞube: ${sube}\nAd Soyad: ${adiSoyadi}\nE-posta: ${email}\nTelefon: ${telefon}\nMesaj: ${formSubmissionData.mesaj || 'Belirtilmedi'}\nTarih: ${formSubmissionData.tarih}`,
        html: htmlKurumsal
      });

      // Sonra kullanıcıya teşekkür maili gönder
      mailKullanici = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Mesajınız Alındı - Pide By Pide',
        text: `Sayın ${adiSoyadi},\nİletişim formunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.\nPide By Pide İletişim Ekibi`,
        html: htmlKullanici
      });

      console.log('İletişim formu e-postaları gönderildi:', formSubmissionData);
    } catch (emailError) {
      // emailError tipi bilinçli olarak unknown olarak bırakıldı, detay loglanıyor
      // Hangi mailde hata olduğunu ayırt et
      if (!mailKurumsal) {
        mailErrorKurumsal = emailError;
        console.error('Kurumsal e-posta gönderme hatası:', emailError);
      } else {
        mailErrorKullanici = emailError;
        console.error('Kullanıcı e-posta gönderme hatası:', emailError);
      }
    }

    if (mailErrorKurumsal || !mailKurumsal || !mailKurumsal.accepted || mailKurumsal.accepted.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Mesajınız alınamadı veya kurumsal e-posta gönderilemedi. Lütfen tekrar deneyin.',
        error: mailErrorKurumsal ? String(mailErrorKurumsal) : undefined
      }, { status: 500 });
    }
    if (mailErrorKullanici || !mailKullanici || !mailKullanici.accepted || mailKullanici.accepted.length === 0) {
      // Kurumsal mail başarılıysa, kullanıcıya gönderilemese de mesaj alınmış olur
      return NextResponse.json({
        success: true,
        message: 'Mesajınız alındı ancak bilgilendirme e-postası gönderilemedi.',
        mailAccepted: mailKurumsal.accepted
      });
    }

    // Başarılı yanıt
    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.',
      mailAccepted: mailKurumsal.accepted
    }, { status: 200 });
    
  } catch (error) {
    console.error('İletişim formu hatası:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
      },
      { status: 500 }
    );
  }
}
