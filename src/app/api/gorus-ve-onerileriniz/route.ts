import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Google reCAPTCHA doğrulama fonksiyonu
async function verifyRecaptcha(token: string) {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("reCAPTCHA doğrulama hatası:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Gerekli alanları kontrol et
    if (!data.ad_soyad || !data.konu || !data.mesaj) {
      return NextResponse.json(
        { message: "Lütfen tüm zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    // reCAPTCHA doğrulama
    if (!data.recaptcha) {
      return NextResponse.json(
        { message: "Lütfen robot olmadığınızı doğrulayın." },
        { status: 400 }
      );
    }

    // reCAPTCHA'yı doğrula
    const isRecaptchaValid = await verifyRecaptcha(data.recaptcha);
    if (!isRecaptchaValid && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { message: "reCAPTCHA doğrulaması başarısız oldu." },
        { status: 400 }
      );
    }

    // Email içeriği oluştur
    const htmlContent = `
      <h2>Yeni Görüş/Öneri Formu</h2>
      <p><strong>Ad Soyad:</strong> ${data.ad_soyad}</p>
      <p><strong>E-posta:</strong> ${data.email || '-'}</p>
      <p><strong>Telefon:</strong> ${data.telefon || '-'}</p>
      <p><strong>Şube:</strong> ${data.sube || 'Belirtilmemiş'}</p>
      <p><strong>Konu:</strong> ${data.konu}</p>
      <p><strong>Mesaj:</strong> ${data.mesaj}</p>
      <p><strong>Genel Memnuniyet Puanı:</strong> ${data.puan || 'Belirtilmemiş'}</p>
      <p><strong>KVKK Onayı:</strong> Evet</p>
    `;

    // Nodemailer transporter oluştur
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Boolean(process.env.SMTP_SECURE) || false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // E-posta gönder
    await transporter.sendMail({
      from: `"Pide By Pide Web Sitesi" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || "info@pidebypide.com",
      cc: data.email ? data.email : undefined, // Kullanıcıya da bir kopya gönder (varsa)
      subject: `Yeni Görüş/Öneri: ${data.ad_soyad} - ${data.konu}`,
      html: htmlContent,
      replyTo: data.email || undefined,
    });

    return NextResponse.json({ message: "Mesajınız başarıyla gönderildi." });
  } catch (error) {
    console.error("Form gönderim hatası:", error);
    return NextResponse.json(
      { message: "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
