import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pide By Pide",
  description: "Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide'de. 365 gün, 1 pide alana 1 pide bedava.",
  keywords: "Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide",
  robots: "index, follow",
  openGraph: {
    title: "Ana Sayfa - Pide By Pide",
    description: "Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide'de. 365 gün, 1 pide alana 1 pide bedava.",
    url: "http://www.pidebypide.com/",
    siteName: "Pide By Pide",
    images: [
      {
        url: "/upload/files/files_2019-05-15_13-09-07.png",
      },
    ],
    locale: "tr",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ana Sayfa - Pide By Pide",
    description: "Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide'de. 365 gün, 1 pide alana 1 pide bedava.",
    images: ["/upload/files/files_2019-05-15_13-09-07.png"],
    creator: "@ajansup",
    site: "@ajansup",
  },
  other: {
    "google-site-verification": "CfrSFORuLxishdrr71MGa43cSpux9_zN8d8yDmtnwK8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/assets/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
