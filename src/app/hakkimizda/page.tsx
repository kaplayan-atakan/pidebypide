import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";
import { getAssetPath } from '@/utils/assetHelpers';

export const metadata: Metadata = {
  title: 'Hakkımızda - Pide By Pide',
  description: 'PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzetle sunuyoruz.',
  keywords: 'Hakkımızda, Pide By Pide, vizyon, misyon, Türk mutfağı, pide restoran',
  openGraph: {
    title: 'Hakkımızda - Pide By Pide',
    description: 'PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzetle sunuyoruz.',
    type: 'website',
  },
  alternates: {
    canonical: '/hakkimizda'
  }
};

export default function HakkimizdaPage() {
  return (
    <div className="layout--about bg-white min-h-screen">
      {/* Görüş ve Öneri Bar */}
      <OpinionBar />
      {/* Header */}
      <Header />
      <main className="min-h-screen">
        {/* Ana İçerik Bölümü */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto container-responsive">
            {/* Hero Görsel */}
            {/* <div className="mb-8 sm:mb-12 lg:mb-16">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={getAssetPath('/assets/images/web_pide-05.jpg')}
                  alt="Pide By Pide Hakkımızda"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </div> */}

            {/* İçerik Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Sol Taraf - Ana İçerik */}
              <div className="space-y-6 lg:space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-header text-[#14543c] mb-4 sm:mb-6">
                    Bizim Hikayemiz
                  </h2>
                  <p className="text-responsive-md text-[#7b7934] leading-relaxed mb-6">
                    PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzetle sunuyoruz. 
                    Deneyimli ustalarımız tarafından hazırlanan günlük taze hamurdan özel olarak üretilen bol malzemeli ürünlerimizi, çıtır çıtır, 
                    lezzetine lezzet katarak servis ediyor, kalitemizden ödün vermeden çalışmalarımıza devam ediyoruz.
                  </p>                  <p className="text-responsive-md text-[#7b7934] leading-relaxed">
                    29 restoranımız ile devam ettiğimiz lezzet yolculuğumuza, önümüzdeki dönemde Türkiye&apos;deki diğer illeri de kapsayarak hızla büyümeyi hedefliyoruz.
                  </p>
                </div>
              </div>

              {/* Sağ Taraf - Görsel ve İstatistikler */}              <div className="space-y-6 lg:space-y-8">
                <div className="relative">
                  <Image
                    src={getAssetPath('/assets/images/hakkimizda.png')}
                    alt="Pide By Pide Hakkımızda"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>

                {/* İstatistik Kartları */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#14543c] rounded-lg p-4 sm:p-6 text-center text-white">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-header text-[#f29b24] mb-2">
                      29+
                    </div>
                    <div className="text-sm sm:text-base">Restoran</div>
                  </div>
                  <div className="bg-[#f29b24] rounded-lg p-4 sm:p-6 text-center text-white">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-header mb-2">
                      20+
                    </div>
                    <div className="text-sm sm:text-base">Şehir</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vizyon ve Misyon Bölümü */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto container-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Vizyon */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#14543c] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#f29b24]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-header text-[#14543c] mb-4">
                    Vizyonumuz
                  </h3>
                </div>
                <p className="text-responsive-md text-[#7b7934] leading-relaxed text-center">
                  Geniş kitlelerin tercih ettiği pide restoran zinciri olmak
                </p>
              </div>

              {/* Misyon */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f29b24] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-header text-[#14543c] mb-4">
                    Misyonumuz
                  </h3>
                </div>
                <p className="text-responsive-md text-[#7b7934] leading-relaxed text-center">
                  Lezzetli, doyurucu ve uygun fiyatlı pideyi en kolay ve hızlı şekilde herkese, her yerde ulaştırmak.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kalite Standartları Bölümü */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto container-responsive">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-header text-[#14543c] margin-responsive">
                Kalite Standartlarımız
              </h2>
              <p className="text-responsive-md text-[#7b7934] mt-4 max-w-2xl mx-auto">
                Her bir pide için en yüksek kalite standartlarını uyguluyoruz
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Taze Hamur */}
              <div className="text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#14543c] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#f29b24] transition-colors duration-300">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-header text-[#14543c] mb-2">
                  Günlük Taze Hamur
                </h4>
                <p className="text-responsive-sm text-[#7b7934]">
                  Her gün taze hazırlanan hamurlarımız
                </p>
              </div>

              {/* Deneyimli Ustalar */}
              <div className="text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#14543c] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#f29b24] transition-colors duration-300">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-header text-[#14543c] mb-2">
                  Deneyimli Ustalar
                </h4>
                <p className="text-responsive-sm text-[#7b7934]">
                  Alanında uzman usta ekibimiz
                </p>
              </div>

              {/* Bol Malzeme */}
              <div className="text-center group sm:col-span-2 lg:col-span-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#14543c] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#f29b24] transition-colors duration-300">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-header text-[#14543c] mb-2">
                  Bol Malzemeli
                </h4>
                <p className="text-responsive-sm text-[#7b7934]">
                  Kaliteli ve bol malzemeli ürünler
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bölümü */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-[#14543c] to-[#f29b24]">
          <div className="container mx-auto container-responsive text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-header text-white margin-responsive">
              Lezzet Yolculuğuna Katılın
            </h2>
            <p className="text-responsive-md text-white opacity-90 mt-4 mb-8 max-w-2xl mx-auto">
              En yakın şubemizi keşfedin ve Pide By Pide deneyimini yaşayın
            </p>            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subeler"
                className="inline-block bg-white text-[#14543c] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors btn-touch text-responsive-md"
              >
                Şubelerimizi Keşfedin
              </Link>
              <Link
                href="/urunler"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#14543c] transition-colors btn-touch text-responsive-md"
              >
                Ürünlerimizi İnceleyin
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
