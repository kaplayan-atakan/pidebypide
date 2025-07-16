import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { SentMessageInfo } from 'nodemailer';
import { mailHtmlFrame } from '@/utils/mailTemplates';

// export const dynamic = 'force-dynamic'; // statik dışa aktarım için devre dışı bırakıldı

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Gerekli alanların kontrolü
    const ad_soyad = formData.get('ad_soyad') as string;
    const email = formData.get('email') as string;
    const telefon = formData.get('telefon') as string;
    const pozisyon = formData.get('pozisyon') as string;
    const sube = formData.get('sube') as string;
    const deneyim = formData.get('deneyim') as string;
    const mesaj = formData.get('mesaj') as string;
    const kvkk = formData.get('kvkk') as string;
    
    const cv = formData.get('cv') as File | null;
    
    // Zorunlu alanların kontrolü
    if (!ad_soyad || !email || !telefon || !pozisyon || !kvkk) {
      return NextResponse.json({ 
        success: false, 
        message: 'Lütfen zorunlu alanları doldurunuz.' 
      }, { status: 400 });
    }
    
    // E-posta formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Geçerli bir e-posta adresi giriniz.' 
      }, { status: 400 });
    }
    
    // Telefon formatı kontrolü
    const telefonRegex = /^[0-9]{10,11}$/;
    if (!telefonRegex.test(telefon.replace(/\s+/g, ''))) {
      return NextResponse.json({ 
        success: false, 
        message: 'Geçerli bir telefon numarası giriniz.' 
      }, { status: 400 });
    }
    
    // CV dosyası kontrolü (varsa)
    if (cv && cv instanceof File) {
      // Dosya boyutu kontrolü (maksimum 5MB)
      if (cv.size > 5 * 1024 * 1024) {
        return NextResponse.json({ 
          success: false, 
          message: 'CV dosyası 5MB\'dan büyük olamaz.' 
        }, { status: 400 });
      }
      
      // Dosya formatı kontrolü
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(cv.type)) {
        return NextResponse.json({ 
          success: false, 
          message: 'CV dosyası yalnızca PDF, DOC veya DOCX formatında olabilir.' 
        }, { status: 400 });
      }
    }
    
    /*
    // reCAPTCHA doğrulaması
    const recaptchaToken = formData.get('g-recaptcha-response') as string;
    if (!recaptchaToken) {
      return NextResponse.json({ 
        success: false, 
        message: 'Lütfen robot olmadığınızı doğrulayın.' 
      }, { status: 400 });
    }
    
    // Normalde burada reCAPTCHA doğrulaması yapılır:
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });
    
    const recaptchaData = await recaptchaResponse.json();
    
    if (!recaptchaData.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'reCAPTCHA doğrulaması başarısız oldu. Lütfen tekrar deneyin.' 
      }, { status: 400 });
    }
    */
    
    // Kurumsal kimlik renkleri
    const brandColor = "#14543c";
    const accentColor = "#f29b24";

    const tarih = new Date().toLocaleString('tr-TR');
    const basvuruVerileri = {
      ad_soyad,
      email,
      telefon,
      pozisyon,
      sube: sube || 'Belirtilmedi',
      deneyim: deneyim || 'Belirtilmedi',
      mesaj: mesaj || 'Belirtilmedi',
      cv: cv ? `${cv.name} (${Math.round(cv.size / 1024)} KB)` : 'Yüklenmedi',
      tarih
    };

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

      // Kurumsal muhatap için detaylı HTML içerik (çerçeve ve logo ile)
      const htmlKurumsal = mailHtmlFrame({
        title: `Yeni Kariyer Başvurusu`,
        content: `
          <table style="width:100%;font-size:15px;">
            <tr><td><b>Ad Soyad:</b></td><td>${ad_soyad}</td></tr>
            <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
            <tr><td><b>Telefon:</b></td><td>${telefon}</td></tr>
            <tr><td><b>Pozisyon:</b></td><td>${pozisyon}</td></tr>
            <tr><td><b>Şube:</b></td><td>${sube || 'Belirtilmedi'}</td></tr>
            <tr><td><b>Deneyim:</b></td><td>${deneyim || 'Belirtilmedi'}</td></tr>
            <tr><td><b>Mesaj:</b></td><td>${mesaj || 'Belirtilmedi'}</td></tr>
            <tr><td><b>CV:</b></td><td>${cv ? `${cv.name} (${Math.round(cv.size / 1024)} KB)` : 'Yüklenmedi'}</td></tr>
            <tr><td><b>Gönderilme Tarihi:</b></td><td>${tarih}</td></tr>
          </table>
          <div style="margin-top:24px;color:${accentColor};font-size:13px;">Bu e-posta otomatik olarak oluşturulmuştur.</div>
        `,
        brandColor,
        accentColor,
        footer: 'Pide By Pide İnsan Kaynakları'
      });
      // Kullanıcıya gidecek teşekkür maili (çerçeve ve logo ile)
      const htmlKullanici = mailHtmlFrame({
        title: 'Başvurunuz Alındı',
        content: `
          <p>Sayın <b>${ad_soyad}</b>,</p>
          <p>Kariyer başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
        `,
        brandColor,
        accentColor,
        footer: 'Pide By Pide İnsan Kaynakları'
      });

      // Önce kurumsal muhataba gönder
      const attachments = [];
      if (cv && cv instanceof File) {
        const arrayBuffer = await cv.arrayBuffer();
        attachments.push({
          filename: cv.name,
          content: Buffer.from(arrayBuffer),
          contentType: cv.type
        });
      }
      mailKurumsal = await transporter.sendMail({
        from: `"Pide By Pide Web Sitesi" <${process.env.SMTP_USER}>`,
        to: process.env.MAIL_TO_KARIYER,
        subject: `Yeni Kariyer Başvurusu - ${pozisyon}`,
        text: `Ad Soyad: ${ad_soyad}\nE-posta: ${email}\nTelefon: ${telefon}\nPozisyon: ${pozisyon}\nŞube: ${sube || 'Belirtilmedi'}\nDeneyim: ${deneyim || 'Belirtilmedi'}\nMesaj: ${mesaj || 'Belirtilmedi'}\nCV: ${cv ? `${cv.name} (${Math.round(cv.size / 1024)} KB)` : 'Yüklenmedi'}\nGönderilme Tarihi: ${tarih}`,
        html: htmlKurumsal,
        attachments
      });

      // Sonra kullanıcıya teşekkür maili gönder
      mailKullanici = await transporter.sendMail({
        from: `Pide By Pide <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Başvurunuz Alındı - Pide By Pide',
        text: `Sayın ${ad_soyad},\nKariyer başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.\nPide By Pide İnsan Kaynakları`,
        html: htmlKullanici
      });

      console.log('Kariyer başvurusu e-postaları gönderildi:', basvuruVerileri);
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
        message: 'Başvurunuz alınamadı veya kurumsal e-posta gönderilemedi. Lütfen tekrar deneyin.',
        error: mailErrorKurumsal ? String(mailErrorKurumsal) : undefined
      }, { status: 500 });
    }
    if (mailErrorKullanici || !mailKullanici || !mailKullanici.accepted || mailKullanici.accepted.length === 0) {
      // Kurumsal mail başarılıysa, kullanıcıya gönderilemese de başvuru alınmış olur
      return NextResponse.json({
        success: true,
        message: 'Başvurunuz alındı ancak bilgilendirme e-postası gönderilemedi.',
        mailAccepted: mailKurumsal.accepted
      });
    }

    // Başvuru verilerini loglayalım
    console.log('Yeni iş başvurusu alındı:', basvuruVerileri);

    // Başarılı yanıt
    return NextResponse.json({
      success: true,
      message: 'Başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.',
      mailAccepted: mailKurumsal.accepted
    });
    
  } catch (error) {
    console.error('Başvuru gönderimi hatası:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'İşleminiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' 
    }, { status: 500 });
  }
}
