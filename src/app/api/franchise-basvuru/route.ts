import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { SentMessageInfo } from 'nodemailer';
import { mailHtmlFrame } from '@/utils/mailTemplates';

// export const dynamic = 'force-dynamic'; // statik dışa aktarım için devre dışı bırakıldı

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Form verilerini al
    const fullname = data.fullname;
    const email = data.email;
    const phone = data.phone;
    const work = data.work;
    const city = data.city;
    const location = data.location;
    const privacyPolicy = data.privacyPolicy;

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

    // Kurumsal kimlik renkleri
    const brandColor = "#14543c";
    const accentColor = "#f29b24";

    let mailKurumsal: SentMessageInfo | undefined = undefined;
    let mailKullanici: SentMessageInfo | undefined = undefined;
    let mailErrorKurumsal = null;
    let mailErrorKullanici = null;
    try {
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
        title: 'Yeni Franchise Başvurusu',
        content: `
          <table style="width:100%;font-size:15px;">
            <tr><td><b>Ad Soyad:</b></td><td>${fullname}</td></tr>
            <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
            <tr><td><b>Telefon:</b></td><td>${phone}</td></tr>
            <tr><td><b>Mevcut İş:</b></td><td>${work}</td></tr>
            <tr><td><b>Şehir:</b></td><td>${city}</td></tr>
            <tr><td><b>Lokasyon:</b></td><td>${location}</td></tr>
            <tr><td><b>Gönderilme Tarihi:</b></td><td>${tarih}</td></tr>
          </table>
          <div style="margin-top:24px;color:${accentColor};font-size:13px;">Bu e-posta otomatik olarak oluşturulmuştur.</div>
        `,
        brandColor,
        accentColor,
        footer: 'Pide By Pide Franchise Ekibi'
      });

      // Kullanıcıya gidecek teşekkür maili (çerçeve ve logo ile)
      const htmlKullanici = mailHtmlFrame({
        title: 'Başvurunuz Alındı',
        content: `
          <p>Sayın <b>${fullname}</b>,</p>
          <p>Franchise başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
        `,
        brandColor,
        accentColor,
        footer: 'Pide By Pide Franchise Ekibi'
      });

      // Önce kurumsal muhataba gönder
      mailKurumsal = await transporter.sendMail({
        from: `"Pide By Pide Web Sitesi" <${process.env.SMTP_USER}>`,
        to: process.env.MAIL_TO_FRANCHISE,
        subject: 'Yeni Franchise Başvurusu',
        text: `Ad Soyad: ${fullname}\nE-posta: ${email}\nTelefon: ${phone}\nMevcut İş: ${work}\nŞehir: ${city}\nLokasyon: ${location}\nGönderilme Tarihi: ${tarih}`,
        html: htmlKurumsal
      });

      // Sonra kullanıcıya teşekkür maili gönder
      mailKullanici = await transporter.sendMail({
        from: `Pide By Pide <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Başvurunuz Alındı - Pide By Pide',
        text: `Sayın ${fullname},\nFranchise başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.\nPide By Pide Franchise Ekibi`,
        html: htmlKullanici
      });

      console.log('Franchise başvurusu e-postaları gönderildi:', { fullname, email, phone, city });
    } catch (emailError) {
      // emailError tipi bilinçli olarak unknown olarak bırakıldı, detay loglanıyor
      // Hangi mailde hata olduğunu ayırt et
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
        message: 'Başvurunuz alınamadı veya kurumsal e-posta gönderilemedi. Lütfen tekrar deneyin.',
        error: mailErrorKurumsal ? String(mailErrorKurumsal) : undefined
      }, { status: 500 });
    }
    if (mailErrorKullanici || !mailKullanici || !mailKullanici.accepted || mailKullanici.accepted.length === 0) {
      // Kurumsal mail başarılıysa, kullanıcıya gönderilemese de başvuru alınmış olur
      return NextResponse.json({
        success: true,
        message: 'Başvurunuz alındı ancak bilgilendirme e-postası gönderilemedi.',
        mailAccepted: mailKurumsal.accepted
      });
    }

    // Başarı cevabı
    return NextResponse.json({
      success: true,
      message: 'Franchise başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
      mailAccepted: mailKurumsal.accepted
    }, { status: 200 });
  } catch (error) {
    console.error('Form gönderimi hatası:', error);
    return NextResponse.json({ success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' }, { status: 500 });
  }
}
