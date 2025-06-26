import { NextRequest, NextResponse } from 'next/server';

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
    
    // reCAPTCHA doğrulaması
    const recaptchaToken = formData.get('g-recaptcha-response') as string;
    if (!recaptchaToken) {
      return NextResponse.json({ 
        success: false, 
        message: 'Lütfen robot olmadığınızı doğrulayın.' 
      }, { status: 400 });
    }
    
    // Normalde burada reCAPTCHA doğrulaması yapılır:
    /*
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
    
    // E-posta veya veritabanı işlemleri burada yapılacak
    // ----
    
    // Başvuru verilerini loglayalım
    console.log('Yeni iş başvurusu alındı:', {
      ad_soyad,
      email,
      telefon,
      pozisyon,
      sube: sube || 'Belirtilmedi',
      deneyim: deneyim || 'Belirtilmedi',
      mesaj: mesaj || 'Belirtilmedi',
      cv: cv ? `${cv.name} (${Math.round(cv.size / 1024)} KB)` : 'Yüklenmedi',
      tarih: new Date().toLocaleString('tr-TR')
    });
    
    // Başarılı yanıt
    return NextResponse.json({ 
      success: true, 
      message: 'Başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.' 
    });
    
  } catch (error) {
    console.error('Başvuru gönderimi hatası:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'İşleminiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' 
    }, { status: 500 });
  }
}
