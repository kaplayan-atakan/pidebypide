import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import FaviconProvider from "@/components/FaviconProvider";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pide By Pide",
  description: "Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide'de. 365 gün, 1 pide alana 1 pide bedava.",
  keywords: "Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    // Dinamik favicon kullanacağımız için metadata favicon'ları devre dışı bırakıyoruz
    icon: [], 
    shortcut: [],
    apple: [
      {
        url: "/assets/images/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/assets/images/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/assets/images/favicon/site.webmanifest",
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
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${redHatDisplay.variable} antialiased`}
      >
        <FaviconProvider />
        {children}
      </body>
    </html>
  );
}
