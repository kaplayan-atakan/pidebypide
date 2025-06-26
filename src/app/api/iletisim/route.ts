import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // CSRF ve reCaptcha doğrulaması burada yapılmalı (üretim ortamında)
    // const recaptchaToken = formData.get('g-recaptcha-response');
    // Recaptcha doğrulamasını burada yapın
    
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
    
    // Burada form verilerini e-posta olarak gönderme veya veritabanına kaydetme işlemi yapılabilir
    console.log('Form verileri:', formSubmissionData);
    
    // Başarılı yanıt
    return NextResponse.json(
      {
        success: true,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.'
      },
      { status: 200 }
    );
    
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
