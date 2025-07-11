import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // E-posta gönderme işlemi
    console.log('[contact] 7- SMTP ayarları:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_SECURE: process.env.SMTP_SECURE,
      MAIL_TO: process.env.MAIL_TO
    });
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

    // Email içeriğini hazırla
    const emailHtml = `
      <h2>Yeni İletişim Formu Mesajı</h2>
      <p><strong>Ad Soyad:</strong> ${adSoyad}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${telefon || 'Belirtilmemiş'}</p>
      <p><strong>Konu:</strong> ${konu}</p>
      <p><strong>Mesaj:</strong> ${mesaj}</p>
      <p><strong>Gönderilme Tarihi:</strong> ${tarih}</p>
    `;

    const mailToList = [process.env.MAIL_TO, 'atakan.kaplayan@apazgroup.com'].filter((v): v is string => Boolean(v));
    console.log('[contact] 8- Mail gönderilecek adresler:', mailToList);

    // E-posta gönder
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: mailToList,
      subject: 'Yeni İletişim Formu Mesajı',
      text: `Ad Soyad: ${adSoyad}\nE-posta: ${email}\nTelefon: ${telefon || 'Belirtilmemiş'}\nKonu: ${konu}\nMesaj: ${mesaj}\nGönderilme Tarihi: ${tarih}`,
      html: emailHtml
    });
    console.log('[contact] 9- Mail gönderildi');

    // Başarılı yanıt
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.' 
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
