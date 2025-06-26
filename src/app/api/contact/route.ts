import { NextRequest, NextResponse } from 'next/server';

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

    // Burada gerçek email gönderme servisi entegre edilebilir
    // Örneğin: SendGrid, AWS SES, Nodemailer, vs.
    
    console.log('İletişim formu gönderildi:', {
      adSoyad,
      email,
      telefon,
      konu,
      mesaj,
      tarih: new Date().toISOString()
    });

    // Email içeriğini hazırla
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const emailContent = `
      Yeni İletişim Formu Mesajı
      
      Ad Soyad: ${adSoyad}
      Email: ${email}
      Telefon: ${telefon || 'Belirtilmemiş'}
      Konu: ${konu}
      
      Mesaj:
      ${mesaj}
      
      Gönderilme Tarihi: ${new Date().toLocaleString('tr-TR')}
    `;

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
