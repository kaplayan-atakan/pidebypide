import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { SentMessageInfo } from 'nodemailer';
import { mailHtmlFrame } from '@/utils/mailTemplates';

// Google reCAPTCHA doğrulama fonksiyonu
// async function verifyRecaptcha(token: string) {
//   try {
//     const response = await fetch(
//       `https://www.google.com/recaptcha/api/siteverify`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
//       }
//     );

//     const data = await response.json();
//     return data.success;
//   } catch (error) {
//     console.error("reCAPTCHA doğrulama hatası:", error);
//     return false;
//   }
// }

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

    /*
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
    */

    // Kurumsal kimlik renkleri
    const brandColor = "#14543c";
    const accentColor = "#f29b24";

    // Kurumsal muhatap için detaylı içerik (çerçeve ve logo ile)
    const htmlKurumsal = mailHtmlFrame({
      title: 'Yeni Görüş/Öneri Formu',
      content: `
        <table style="width:100%;font-size:15px;">
          <tr><td><b>Ad Soyad:</b></td><td>${data.ad_soyad}</td></tr>
          <tr><td><b>E-posta:</b></td><td>${data.email || '-'}</td></tr>
          <tr><td><b>Telefon:</b></td><td>${data.telefon || '-'}</td></tr>
          <tr><td><b>Şube:</b></td><td>${data.sube || 'Belirtilmemiş'}</td></tr>
          <tr><td><b>Konu:</b></td><td>${data.konu}</td></tr>
          <tr><td><b>Mesaj:</b></td><td>${data.mesaj}</td></tr>
          <tr><td><b>Genel Memnuniyet Puanı:</b></td><td>${data.puan || 'Belirtilmemiş'}</td></tr>
          <tr><td><b>KVKK Onayı:</b></td><td>Evet</td></tr>
        </table>
        <div style="margin-top:24px;color:${accentColor};font-size:13px;">Bu e-posta otomatik olarak oluşturulmuştur.</div>
      `,
      brandColor,
      accentColor,
      footer: 'Pide By Pide'
    });

    // Kullanıcıya gidecek teşekkür maili (çerçeve ve logo ile)
    const htmlKullanici = mailHtmlFrame({
      title: 'Görüş ve Öneriniz Alındı',
      content: `
        <p style="font-size:16px;color:${brandColor};margin-bottom:12px;">Sayın ${data.ad_soyad},</p>
        <p style="font-size:15px;color:#333;">Görüş ve öneriniz başarıyla alınmıştır. Katkınız için teşekkür ederiz.<br/>En kısa sürede ekibimiz tarafından değerlendirilecektir.</p>
      `,
      brandColor,
      accentColor,
      footer: 'Pide By Pide'
    });

    // Nodemailer transporter oluştur (franchise ile aynı yapı)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: parseInt(process.env.SMTP_PORT as string),
      secure: false, // TLS için false (SSL hatası almamak için franchise ile aynı)
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });

    let mailKurumsal: SentMessageInfo | undefined = undefined;
    let mailKullanici: SentMessageInfo | undefined = undefined;
    let mailErrorKurumsal = null;
    let mailErrorKullanici = null;
    try {
      // Kurumsal muhataba mail
      mailKurumsal = await transporter.sendMail({
        from: `"Pide By Pide Web Sitesi" <${process.env.SMTP_USER}>`,
        to: process.env.MAIL_TO_GORUS_ONERI,
        subject: `Yeni Görüş/Öneri: ${data.ad_soyad} - ${data.konu}`,
        html: htmlKurumsal,
        replyTo: data.email || undefined,
      });
      // Kullanıcıya mail
      if (data.email) {
        mailKullanici = await transporter.sendMail({
          from: `Pide By Pide <${process.env.SMTP_USER}>`,
          to: data.email,
          subject: `Görüş ve Öneriniz Alındı - Pide By Pide`,
          html: htmlKullanici,
        });
      }
      console.log('Görüş/Öneri e-postaları gönderildi:', { ad_soyad: data.ad_soyad, email: data.email, konu: data.konu });
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
        message: 'Mesajınız alınamadı veya e-posta gönderilemedi. Lütfen tekrar deneyin.',
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

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi.',
      mailAccepted: mailKurumsal.accepted
    });
  } catch (error) {
    console.error("Form gönderim hatası:", error);
    return NextResponse.json(
      { message: "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
