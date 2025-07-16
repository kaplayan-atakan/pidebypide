// Türkçe açıklama: Tüm formlarda kullanılacak ortak HTML e-posta şablon fonksiyonları
// getAssetPath ile logo yolu dinamik alınır, çerçeve ve kurumsal renkler uygulanır
// import { getAssetPath } from './assetPath';

interface MailTemplateOptions {
  title: string;
  content: string;
  brandColor?: string;
  accentColor?: string;
  logoPath?: string;
  footer?: string;
}

export function mailHtmlFrame({
  title,
  content,
  brandColor = '#14543c',
  accentColor = '#f29b24',
  logoPath,
  footer = 'Pide By Pide',
}: MailTemplateOptions): string {
  // Logo yolu: .env'den tam URL alınır
  const baseUrl = process.env.NEXTAUTH_URL || '';
  const logo = logoPath || `${baseUrl.replace(/\/$/, '')}/upload/files/logo.png`;
  return `
    <div style="max-width:520px;margin:0 auto;background:#fff;border:2px solid ${brandColor};border-radius:12px;padding:32px 24px 24px 24px;box-shadow:0 2px 12px #0001;font-family:Arial,sans-serif;">
      <div style="text-align:center;margin-bottom:24px;">
        <img src="${logo}" alt="Pide By Pide" style="height:56px;max-width:180px;object-fit:contain;" loading="lazy" />
      </div>
      <h2 style="color:${brandColor};margin-bottom:18px;font-size:22px;">${title}</h2>
      <div style="font-size:15px;color:#222;line-height:1.7;margin-bottom:24px;">${content}</div>
      <div style="margin-top:24px;color:${accentColor};font-size:13px;text-align:right;">${footer}</div>
    </div>
  `;
}
