import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

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
    if (!adSoyad || !email || !konu || !mesaj || !kvkkOnay) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurun.' },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi girin.' },
        { status: 400 }
      );
    }

    // reCAPTCHA doğrulaması (isteğe bağlı)
    if (recaptchaToken) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      });

      const recaptchaData = await recaptchaResponse.json();
      
      if (!recaptchaData.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA doğrulaması başarısız.' },
          { status: 400 }
        );
      }
    }

    // E-posta gönderme işlemi
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: parseInt(process.env.SMTP_PORT as string),
        secure: false, // TLS için false
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASS as string
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
      
      // E-posta gönder
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'iletisim@pidebypide.com',
        subject: 'Yeni İletişim Formu Mesajı',
        text: `Ad Soyad: ${adSoyad}\nE-posta: ${email}\nTelefon: ${telefon || 'Belirtilmemiş'}\nKonu: ${konu}\nMesaj: ${mesaj}\nGönderilme Tarihi: ${tarih}`,
        html: emailHtml
      });
      
      console.log('İletişim formu e-postası gönderildi:', {
        adSoyad,
        email,
        telefon,
        konu,
        tarih
      });
    } catch (emailError) {
      console.error('E-posta gönderme hatası:', emailError);
      // E-posta gönderilemese bile işlem başarılı sayılsın
    }

    // Başarılı yanıt
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('İletişim formu hatası:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
