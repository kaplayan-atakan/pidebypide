import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { mailHtmlFrame } from '@/utils/mailTemplates';

// export const dynamic = 'force-dynamic'; // statik dışa aktarım için devre dışı bırakıldı

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Form verilerini doğrula
    const { 
      adSoyad, 
      email, 
      telefon, 
      konu, 
      mesaj, 
      kvkkOnay,
      recaptchaToken 
    } = body;

    // Gerekli alanları kontrol et
    console.log('[contact] 1- Form verileri alındı:', { adSoyad, email, telefon, konu, mesaj, kvkkOnay });
    if (!adSoyad || !email || !konu || !mesaj || !kvkkOnay) {
      console.error('[contact] 2- Eksik alan hatası');
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurun.' },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('[contact] 3- Email format hatası:', email);
      return NextResponse.json(
        { error: 'Geçerli bir email adresi girin.' },
        { status: 400 }
      );
    }

    // reCAPTCHA doğrulaması (isteğe bağlı)
    if (recaptchaToken) {
      console.log('[contact] 4- reCAPTCHA doğrulama başlatılıyor');
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      });

      const recaptchaData = await recaptchaResponse.json();
      console.log('[contact] 5- reCAPTCHA sonucu:', recaptchaData);
      if (!recaptchaData.success) {
        console.error('[contact] 6- reCAPTCHA başarısız');
        return NextResponse.json(
          { error: 'reCAPTCHA doğrulaması başarısız.' },
          { status: 400 }
        );
      }
    }

    // Kurumsal kimlik renkleri
    const brandColor = "#14543c";
    const accentColor = "#f29b24";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: parseInt(process.env.SMTP_PORT as string),
      secure: false, // TLS için false
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string
      }
    });

    const tarih = new Date().toLocaleString('tr-TR');

    // Kurumsal muhatap için detaylı HTML içerik (çerçeve ve logo ile)
    const htmlKurumsal = mailHtmlFrame({
      title: 'Yeni İletişim Formu Mesajı',
      content: `
        <table style="width:100%;font-size:15px;">
          <tr><td><b>Ad Soyad:</b></td><td>${adSoyad}</td></tr>
          <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
          <tr><td><b>Telefon:</b></td><td>${telefon || 'Belirtilmemiş'}</td></tr>
          <tr><td><b>Konu:</b></td><td>${konu}</td></tr>
          <tr><td><b>Mesaj:</b></td><td>${mesaj}</td></tr>
          <tr><td><b>Gönderilme Tarihi:</b></td><td>${tarih}</td></tr>
        </table>
        <div style="margin-top:24px;color:${accentColor};font-size:13px;">Bu e-posta otomatik olarak oluşturulmuştur.</div>
      `,
      brandColor,
      accentColor,
      footer: 'Pide By Pide İletişim Ekibi'
    });

    // Kullanıcıya gidecek teşekkür maili (çerçeve ve logo ile)
    const htmlKullanici = mailHtmlFrame({
      title: 'Mesajınız Alındı',
      content: `
        <p>Sayın <b>${adSoyad}</b>,</p>
        <p>İletişim formunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
      `,
      brandColor,
      accentColor,
      footer: 'Pide By Pide İletişim Ekibi'
    });

    const mailToList = [process.env.MAIL_TO, 'atakan.kaplayan@apazgroup.com'].filter((v): v is string => Boolean(v));
    console.log('[contact] 8- Mail gönderilecek adresler:', mailToList);

    let mailKurumsal, mailKullanici;
    let mailErrorKurumsal = null, mailErrorKullanici = null;
    try {
      // Önce kurumsal muhataba gönder
      mailKurumsal = await transporter.sendMail({
        from: `"Pide By Pide Web Sitesi" <${process.env.SMTP_USER}>`,
        to: mailToList,
        subject: 'Yeni İletişim Formu Mesajı',
        text: `Ad Soyad: ${adSoyad}\nE-posta: ${email}\nTelefon: ${telefon || 'Belirtilmemiş'}\nKonu: ${konu}\nMesaj: ${mesaj}\nGönderilme Tarihi: ${tarih}`,
        html: htmlKurumsal
      });

      // Sonra kullanıcıya teşekkür maili gönder
      mailKullanici = await transporter.sendMail({
        from: `Pide By Pide <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Mesajınız Alındı - Pide By Pide',
        text: `Sayın ${adSoyad},\nİletişim formunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.\nPide By Pide İletişim Ekibi`,
        html: htmlKullanici
      });

      console.log('[contact] 9- Mail gönderildi');
    } catch (emailError) {
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
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
        mailAccepted: mailKurumsal.accepted
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[contact] 10- Hata:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', detail: String(error) },
      { status: 500 }
    );
  }
}
