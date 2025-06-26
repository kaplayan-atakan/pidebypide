import { NextRequest, NextResponse } from 'next/server';

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
    
    // Burada form verisini e-posta gönderme veya veritabanına kaydetme işlemleri yapılacak
    // NOT: Gerçek uygulamada bu veriyi işlemek için gereken kodları ekleyin
    
    // Başarı cevabı
    return NextResponse.json({ success: true, message: 'Franchise başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.' }, { status: 200 });
  } catch (error) {
    console.error('Form gönderimi hatası:', error);
    return NextResponse.json({ success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' }, { status: 500 });
  }
}
