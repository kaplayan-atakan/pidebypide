import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";
import { getAssetPath } from "@/utils/assetHelpers";

// SEO Metadata
export const metadata: Metadata = {
  title: "Ürünler - Pide By Pide",
  description: "Patatesli pide, ıspanaklı pide, peynirli pide, tavuklu pide, kıymalı pide, kuşbaşılı pide, 3'lü karışık, sucuklu, kaşarlı, lahmacun ve daha birçok lezzet Pide By Pide'de.",
  keywords: "Lezzetler, ürünler, patatesli pide, ispanaklı pide, peynirli pide, tavuklu pide, kıymalı pide, kuşbaşılı pide, 3'lü karışık, sucuklu pide, kaşarlı pide, kıymalı patatesli, tavuk patatesli, lahmacun, künefe, by bomba, sufle, turşu, salata",
};

// Ürün Kartı Bileşeni
interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  imageAlt?: string;
}

function ProductCard({ title, image, description, imageAlt = title }: ProductCardProps) {
  // Resim yolunu getAssetPath ile düzelt
  const imageSrc = getAssetPath(image) || "https://via.placeholder.com/360x280?text=Pide+By+Pide";
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={`${imageAlt} - Pide By Pide`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold font-['NEXA_BOLD'] text-[#14543c] mb-3">{title}</h3>
        <p className="text-responsive-sm text-[#7b7934] leading-relaxed font-['Red_Hat_Display']">{description}</p>
      </div>
    </div>
  );
}

// Kategori Başlık Bileşeni
function CategoryTitle({ title }: { title: string }) {
  return (
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['NEXA_BOLD'] text-[#14543c] mb-8 pb-2 relative">
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
    title: "PATATESLİ",
    image: "/assets/images/pidePhotos/patatesli_pide.jpg",
    description: "İştah kabartan patatesli pidemiz damaklarda iz bırakıyor. Doyurucu menüsüyle öne çıkan patatesli pideyi tatmanın tam zamanı!"
  },
  {
    title: "ISPANAKLI",
    image: "/assets/images/pidePhotos/ispanakli_pide.png",
    description: "Hafızalara kazınacak tadı ve doyurucu menüsüyle Ispanaklı pide keyfini tam anlamıyla yaşatıyor."
  },
  {
    title: "PEYNİRLİ",
    image: "/assets/images/pidePhotos/kasarli_pide.png",
    description: "Fırından yeni çıkmış, altın sarısı renginde, yumuşacık ve çıtır çıtır hamuru ile peynirli pide, her lokmada sıcak ve erimiş peynirin enfes lezzetini sunuyor."
  },
  {
    title: "TAVUKLU",
    image: "/assets/images/pidePhotos/tavuklu_pide.jpg",
    description: "Tavuktan vazgeçemeyenlerin tercihi tavuklu pide, benzersiz tadıyla rakip tanımıyor. Özel baharatlarla hazırlanıyor, lezzet keyfi doruğa çıkıyor."
  },
  {
    title: "KIYMALI",
    image: "/assets/images/pidePhotos/kiymali_pide.jpg",
    description: "Türk mutfağının klasiği kıymalı pide, PidebyPide'nin maharetli ustalarının ellerinde benzersiz bir lezzete dönüşüyor. PidebyPide, doyurucu kıymalı pidesiyle misafirlerini lezzet dolu bir deneyime davet ediyor!"
  },
  {
    title: "KUŞBAŞILI",
    image: "/assets/images/pidePhotos/kusbasili_pide.jpg",
    description: "Tadına doyum olmayan kuşbaşılı pide, kendine has tadıyla rakip tanımıyor. Kuşbaşılı pide lezzeti akıllardan silinmiyor!"
  },
  {
    title: "3'LÜ KARIŞIK",
    image: "/assets/images/pidePhotos/3lu_karisik_pide.jpg",
    description: "Birden fazla lezzeti aynı anda tatmak isteyenlere nefis bir alternatif! Pide müdavimleri, 3'lü karışık ile lezzet keyfini doya doya yaşıyor!"
  },
  {
    title: "SUCUKLU",
    image: "/assets/images/pidePhotos/sucuklu_pide.jpg",
    description: "Yumuşacık hamuru, bolca erimiş peynir ve nefis küp sucuklarla harmanlanan pide, her lokmada damakları şenlendiriyor. Sıcacık fırından çıkmış, dışı hafifçe çıtır, içi ise yumuşacık olan bu pide, sucuğun baharatlı ve leziz tadı ile peynirin mükemmel uyumunu sunuyor."
  },
  {
    title: "SUCUKLU KARIŞIK",
    image: "/assets/images/pidePhotos/sucuklu_karisik.jpg",
    description: "Fırından yeni çıkmış, dışı çıtır çıtır, içi yumuşacık hamuru üzerine özenle yerleştirilen küp sucuklar, rengarenk karışık biberlerle buluşuyor. Sucukların baharatlı lezzeti, biberler ve peynir ile mükemmel bir uyum içinde, her ısırıkta damağınızda bir şölen yaratıyor."
  },
  {
    title: "KAŞARLI",
    image: "/assets/images/pidePhotos/kasarli_pide.png",
    description: "Fırından yeni çıkmış, altın sarısı renginde, yumuşacık ve çıtır çıtır hamuru ile peynirli pide, her lokmada sıcak ve erimiş peynirin enfes lezzetini sunuyor."
  },
  {
    title: "KIYMALI PATATESLİ",
    image: "/assets/images/pidePhotos/kiymali_patatesli_pide.jpg",
    description: "Sıcacık çıtır hamurun üzerinde, baharatlarla harmanlanmış nefis kıyma veya yumuşacık patates harcı… Her lokmada damakları şenlendiren bu pide, 2'li lezzeti ile bambaşka bir deneyime davet ediyor!"
  },
  {
    title: "TAVUK PATATESLİ",
    image: "/assets/images/pidePhotos/tavuklu_patatesli_pide.jpg",
    description: "Sıcacık çıtır hamurun üzerinde, baharatlarla harmanlanmış nefis tavuk parçaları ve yumuşacık patates harcı… Her lokmada damakları şenlendiren bu pide, 2'li lezzeti ile bambaşka bir deneyime davet ediyor!"
  },
  {
    title: "LAHMACUN",
    image: "/assets/images/pidePhotos/lahmacun.jpg",
    description: "Türk mutfağının vazgeçilmez klasiği lahmacun! İncecik çıtır hamuru, bol malzemeli ve baharatlı harcıyla fırından çıkar çıkmaz lezzet şöleni başlıyor. Geleneksel tat, değişmeyen lezzet!"
  }
];

const dessertProducts = [
  {
    title: "BY BOMBA",
    image: "/assets/images/pidePhotos/bomba_kurabiye.jpg",
    description: "By Bomba, eşsiz tadıyla benzersiz bir tatlı olarak damaklarda iz bırakıyor. Üzerinde pudra şekeri ile süslenmiş çikolatalı lezzet bombası."
  },
  {
    title: "KÜNEFE",
    image: "/assets/images/newImages/kunefeYeniGörsel.png", // Yeni künefe görseli
    description: "Özel peyniri ile yemek sonrası vazgeçilmeyecek ayrı bir keyif! Yiyen bir daha yemek istiyor, eşsiz künefe lezzetine doyum olmuyor."
  },
  {
    title: "SUFLE",
    image: "/assets/images/pidePhotos/sufle.jpg",
    description: "Dışı hafif kıtır, içi akışkan çikolata şöleni… Her kaşıkta yoğun kakao aromasıyla tatlı krizlerinize en lezzetli çözüm! Yanında dondurma ile servis edilebilir."
  }
];

const otherProducts = [
  {
    title: "MERCİMEK ÇORBASI",
    image: "/assets/images/newImages/corbaYeniGörsel.png", // Yeni çorba görseli
    description: "Çorba içmek isteyenler için akla gelen ilk lezzet mercimek çorbasının yapımında tereyağı kullanıyor, mercimeği kaynatıp çırparak tamamen katkısız bir şekilde hazırlıyoruz."
  },
  {
    title: "TURŞU",
    image: "/assets/images/pidePhotos/tursu.jpg",
    description: "Lezzetiyle parmak ısırtan PidebyPide turşuları, pide lezzetini ikiye katlıyor. Özel salamurada bekletilen taze ve çıtır biber ve salatalıklar sunumlarımızı tamamlıyor."
  }
];

const salatalarProducts = [
  {
    title: "ROKA SALATASI",
    image: "/assets/images/pidePhotos/salata.jpg",
    description: "Roka salatası, taze ve canlı roka yapraklarının kendine has hafif acılığı ile ferah bir lezzet sunar. Yanında domates ve limon dilimiyle sunulur."
  },
  {
    title: "MAYDANOZ SALATASI",
    image: "/assets/images/newImages/maydanozSalatasıYeniGörsel.png", // Yeni maydanoz salatası görseli
    description: "Taze maydanoz, domates, salatalık ve özel sosumuzla hazırlanmış enfes bir salata."
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
              <CategoryTitle title="DIŞI ÇITIR İÇİ BOL MALZEMELİ PİDELER" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {pideProducts.map((product) => (
                  <ProductCard 
                    key={product.title}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    imageAlt={`${product.title} Pide`}
                  />
                ))}
              </div>
            </section>

            {/* Salatalar Bölümü */}
            <section className="mb-16">
              <CategoryTitle title="SALATALAR" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {salatalarProducts.map((product) => (
                  <ProductCard 
                    key={product.title}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    imageAlt={`${product.title}`}
                  />
                ))}
              </div>
            </section>

            {/* Yancı Lezzetler Bölümü */}
            <section className="mb-16">
              <CategoryTitle title="YANCI LEZZETLER" />
              <div className="mb-8">
                <h3 className="text-xl font-bold font-['NEXA_BOLD'] text-[#7b7934] mb-4 pl-4 border-l-4 border-[#f29b24]">Tatlılar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
                  {dessertProducts.map((product) => (
                    <ProductCard 
                      key={product.title}
                      title={product.title}
                      image={product.image}
                      description={product.description}
                      imageAlt={`${product.title} Tatlı`}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold font-['NEXA_BOLD'] text-[#7b7934] mb-4 pl-4 border-l-4 border-[#f29b24]">Diğer Ürünler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {otherProducts.map((product) => (
                    <ProductCard 
                      key={product.title}
                      title={product.title}
                      image={product.image}
                      description={product.description}
                      imageAlt={`${product.title}`}
                    />
                  ))}
                </div>
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
