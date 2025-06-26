import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// export const dynamic = 'force-dynamic'; // statik dışa aktarım için devre dışı bırakıldı

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Form verilerini al
    const { fullname, email, phone, work, city, location, privacyPolicy } = data;
    
    // Zorunlu alanları kontrol et
    if (!fullname || !email || !phone || !work || !city || !location || !privacyPolicy) {
      return NextResponse.json({ success: false, message: 'Tüm zorunlu alanları doldurunuz.' }, { status: 400 });
    }
    
    // E-posta formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Geçerli bir e-posta adresi giriniz.' }, { status: 400 });
    }
    
    // Telefon formatını kontrol et - Başında 5 olan 10 karakter
    const phoneRegex = /^5\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, message: 'Geçerli bir telefon numarası giriniz (5XXXXXXXXX formatında).' }, { status: 400 });
    }
    
    // reCAPTCHA doğrulaması (gerçek uygulamada Google reCAPTCHA API'si kullanılmalı)
    
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
        <h2>Yeni Franchise Başvurusu</h2>
        <p><strong>Ad Soyad:</strong> ${fullname}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Mevcut İş:</strong> ${work}</p>
        <p><strong>Şehir:</strong> ${city}</p>
        <p><strong>Lokasyon:</strong> ${location}</p>
        <p><strong>Gönderilme Tarihi:</strong> ${tarih}</p>
      `;
      
      // E-posta gönder
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'franchise@pidebypide.com',
        subject: 'Yeni Franchise Başvurusu',
        text: `Ad Soyad: ${fullname}\nE-posta: ${email}\nTelefon: ${phone}\nMevcut İş: ${work}\nŞehir: ${city}\nLokasyon: ${location}\nGönderilme Tarihi: ${tarih}`,
        html: emailHtml
      });
      
      console.log('Franchise başvurusu e-postası gönderildi:', { fullname, email, phone, city });
    } catch (emailError) {
      console.error('E-posta gönderme hatası:', emailError);
      // E-posta gönderilemese bile işlem başarılı sayılsın
    }
    
    // Başarı cevabı
    return NextResponse.json({ success: true, message: 'Franchise başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.' }, { status: 200 });
  } catch (error) {
    console.error('Form gönderimi hatası:', error);
    return NextResponse.json({ success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' }, { status: 500 });
  }
}
