import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

// SEO Metadata
export const metadata: Metadata = {
  title: "Ürünler - Pide By Pide",
  description: "Patatesli pide, ispanaklı pide, peynirli pide, tavuklu pide, kıymalı pide, kuşbaşılı pide ve daha birçok lezzet Pide By Pide'de.",
  keywords: "Lezzetler, ürünler, patatesli pide, ispanaklı pide, peynirli pide, tavuklu pide, kıymalı pide, kuşbaşılı pide, künefe, by bomba",
};

// Ürün Kartı Bileşeni
interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  imageAlt?: string;
}

function ProductCard({ title, image, description, imageAlt = title }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image || "https://via.placeholder.com/360x280?text=Pide+By+Pide"}
          alt={`${imageAlt} - Pide By Pide`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold font-header text-[#14543c] mb-3">{title}</h3>
        <p className="text-responsive-sm text-[#7b7934] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Kategori Başlık Bileşeni
function CategoryTitle({ title }: { title: string }) {
  return (
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-header text-[#14543c] mb-8 pb-2 relative">
      <span className="relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#f29b24]"></span>
      </span>
    </h2>
  );
}

// Ürün Verileri
const pideProducts = [
  {
    title: "Patatesli",
    image: "/assets/images/pide1.jpg",
    description: "İştah kabartan patatesli pidemiz damaklarda iz bırakıyor. Doyurucu menüsüyle öne çıkan patatesli pideyi tatmanın tam zamanı!"
  },
  {
    title: "Ispanaklı",
    image: "/assets/images/pide2.jpg",
    description: "Hafızalara kazınacak tadı ve doyurucu menüsüyle Ispanaklı pide keyfini tam anlamıyla yaşatıyor."
  },
  {
    title: "Peynirli",
    image: "/assets/images/pide3.jpg",
    description: "Pide lezzeti peynirle birleşiyor. Deneyimli ustaların hazırladığı peynirli pideler, tadıyla akıllarda yer ediyor."
  },
  {
    title: "Tavuklu",
    image: "/assets/images/web_pide-05.jpg",
    description: "Tavuktan vazgeçemeyenlerin tercihi tavuklu pide, benzersiz tadıyla rakip tanımıyor. Özel baharatlarla hazırlanıyor, lezzet keyfi doruğa çıkıyor."
  },
  {
    title: "Kıymalı",
    image: "/assets/images/pide1.jpg",
    description: "Türk mutfağının klasiği kıymalı pide, PidebyPide'nin maharetli ustalarının ellerinde benzersiz bir lezzete dönüşüyor. PidebyPide, doyurucu kıymalı pidesiyle misafirlerini lezzet dolu bir deneyime davet ediyor!"
  },
  {
    title: "Kuşbaşılı",
    image: "/assets/images/pide2.jpg",
    description: "Tadına doyum olmayan kuşbaşılı pide, kendine has tadıyla rakip tanımıyor. Kuşbaşılı pide lezzeti akıllardan silinmiyor!"
  }
];

const dessertProducts = [
  {
    title: "By Bomba",
    image: "/assets/images/pide1.jpg",
    description: "By Bomba, eşsiz tadıyla benzersiz bir tatlı olarak damaklarda iz bırakıyor."
  },
  {
    title: "Künefe",
    image: "/assets/images/pide3.jpg",
    description: "Geleneksel lezzet künefe, özel sunumuyla Pide By Pide'de sizi bekliyor."
  }
];

const otherProducts = [
  {
    title: "Mercimek Çorba",
    image: "/assets/images/web_pide-05.jpg",
    description: "Çorba içmek isteyenler için akla gelen ilk lezzet mercimek çorbasının yapımında tereyağı kullanıyor, mercimeği kaynatıp çırparak tamamen katkısız bir şekilde sunuyoruz."
  },
  {
    title: "Ayran",
    image: "/assets/images/pide2.jpg",
    description: "Yoğunluğu ayarlı, ferahlatıcı Pide By Pide özel ayranı."
  }
];

export default function UrunlerPage() {
  return (
    <div className="layout--urunler bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Bölümü */}
        <section className="bg-gradient-to-br from-[#14543c] to-[#0f3d2a] py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto container-responsive">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-header text-white margin-responsive">
                ÜRÜNLER
              </h1>
              <nav className="mt-4 sm:mt-6">
                <ol className="flex justify-center items-center space-x-2 text-sm sm:text-base text-[#f29b24]">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Anasayfa
                    </Link>
                  </li>
                  <li className="text-white">/</li>
                  <li className="text-white">Ürünler</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        {/* Ana İçerik */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto container-responsive">
            {/* Giriş Metni */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-responsive-md text-[#7b7934] leading-relaxed">
                PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzetle sunuyoruz. 
                Deneyimli ustalarımız tarafından hazırlanan günlük taze hamurdan özel olarak üretilen bol malzemeli ürünlerimizi keşfedin.
              </p>
            </div>

            {/* Pideler Bölümü */}
            <section className="mb-16">
              <CategoryTitle title="Pideler" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {pideProducts.map((product, index) => (
                  <ProductCard 
                    key={index}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    imageAlt={`${product.title} Pide`}
                  />
                ))}
              </div>
            </section>

            {/* Tatlılar Bölümü */}
            <section className="mb-16">
              <CategoryTitle title="Tatlılar" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {dessertProducts.map((product, index) => (
                  <ProductCard 
                    key={index}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    imageAlt={`${product.title} Tatlı`}
                  />
                ))}
              </div>
            </section>

            {/* Diğer Ürünler Bölümü */}
            <section className="mb-16">
              <CategoryTitle title="Diğer Ürünler" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {otherProducts.map((product, index) => (
                  <ProductCard 
                    key={index}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    imageAlt={product.title}
                  />
                ))}
              </div>
            </section>

            {/* Kalite Bilgilendirme Bölümü */}
            <section className="bg-gradient-to-r from-[#14543c]/10 to-[#f29b24]/10 rounded-lg p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-header text-[#14543c] mb-4">Kalite Taahhüdümüz</h2>
                <p className="text-responsive-md text-[#7b7934] max-w-2xl mx-auto">
                  Pide By Pide olarak, her ürünümüzde en taze malzemeleri kullanıyoruz ve geleneksel tariflerimize sadık kalıyoruz.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-5 text-center shadow-md">
                  <div className="w-16 h-16 bg-[#14543c] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-header text-[#14543c] mb-2">Taze Malzemeler</h3>
                  <p className="text-sm text-[#7b7934]">Her gün taze malzemelerle hazırlanan lezzetler</p>
                </div>
                
                <div className="bg-white rounded-lg p-5 text-center shadow-md">
                  <div className="w-16 h-16 bg-[#f29b24] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-header text-[#14543c] mb-2">Özel Tarifler</h3>
                  <p className="text-sm text-[#7b7934]">Geleneksel tariflerimizle eşsiz lezzetler</p>
                </div>
                
                <div className="bg-white rounded-lg p-5 text-center shadow-md">
                  <div className="w-16 h-16 bg-[#14543c] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 11h8m-4-5v10"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-header text-[#14543c] mb-2">Hijyenik Ortam</h3>
                  <p className="text-sm text-[#7b7934]">Sağlık ve hijyen standartlarına tam uyum</p>
                </div>
              </div>
            </section>

            {/* CTA Bölümü */}
            <section className="text-center mt-12 mb-8">
              <Link 
                href="/subeler" 
                className="inline-block bg-[#14543c] hover:bg-[#0f3d2a] text-white py-3 px-8 rounded-lg font-bold transition-colors btn-touch text-responsive-md"
              >
                En Yakın Şubeyi Bul
              </Link>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>  );
}
