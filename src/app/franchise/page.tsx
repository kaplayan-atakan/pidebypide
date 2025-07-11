

import { Metadata } from 'next';
import Image from 'next/image';
import FranchiseForm from '@/components/FranchiseForm';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getAssetPath } from '@/utils/assetPath';
import OpinionBar from '@/components/UI/OpinionBar';

export const metadata: Metadata = {
  title: 'Franchise - Pide By Pide',
  description: 'PidebyPide franchise modeli ile kendi işinizi kurun. Apaz Holding güvencesiyle karlı yatırım fırsatları.',
  keywords: 'Franchise, PidebyPide franchise, iş fırsatı, yatırım, Apaz Holding, kendi işini kurma',
};

export default function FranchisePage() {
  return (
    <div className="layout--franchise bg-white min-h-screen">
      {/* Görüş ve Öneri Bar */}
      <OpinionBar />
      {/* Header */}
      <Header />
      <main className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
          {/* İki Bölümlü İçerik: Üstte Görsel ve Metin, Altta Form */}
          <div className="bg-white rounded-lg shadow-lg mb-16">
            <div className="flex flex-col md:flex-row md:items-start">
              {/* Sol Sütun: Ana Görsel - Başlıkla Aynı Hizada */}
              <div className="md:w-1/2 flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 bg-white">
                <div className="w-full md:pt-5">
                  <Image 
                    src={getAssetPath("assets/images/PİDEBYPİDE_WEBSİTE_FR.jpg")} 
                    alt="PidebyPide Franchise"
                    width={1000}
                    height={750}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "block"
                    }}
                    className="rounded-lg shadow-sm"
                    priority={true}
                    quality={100}
                    unoptimized={false}
                  />
                  
                  {/* Franchise İçerik Kutuları - Mobil dışında sol sütunda görünecek */}
                  <div className="hidden md:grid grid-cols-1 gap-6 mt-8">
                    <div className="bg-[#f8f9fa] p-5 rounded-lg border-l-4 border-[#14543c] shadow-sm hover:shadow-md transition-all duration-300">
                      <h3 className="font-bold text-[#14543c] text-lg mb-2">Neden PidebyPide?</h3>
                      <p className="text-gray-700">Güçlü marka değeri, özgün ürün çeşitliliği ve karlı yatırım fırsatı</p>
                    </div>
                    
                    <div className="bg-[#f8f9fa] p-5 rounded-lg border-l-4 border-[#14543c] shadow-sm hover:shadow-md transition-all duration-300">
                      <h3 className="font-bold text-[#14543c] text-lg mb-2">Holding Güvencesi</h3>
                      <p className="text-gray-700">Apaz Holding güvencesiyle profesyonel destek ve yönetim</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sağ Sütun: Franchise İçeriği */}
              <div className="md:w-1/2 p-5 sm:p-6 md:p-8 lg:p-10 bg-white rounded-b-lg md:rounded-b-none md:rounded-r-lg md:pt-10">
                <div className="prose prose-lg max-w-none">
                  {/* İçerik Başlığı */}
                  <div className="border-l-4 border-[#14543c] pl-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#14543c] mb-0">
                      PidebyPide Franchise Fırsatı
                    </h2>
                    <p className="text-[#f29b24] font-semibold mt-1">İşin hamurunda kazanç var</p>
                  </div>
                
                  <p className="text-base md:text-lg text-gray-700 mb-6">
                    PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzet ve uygun fiyatlarla sunuyoruz. Her öğün, herkes tarafından tercih edilebilecek bir alternatif olabilmek için çalışıyoruz.
                  </p>
                  
                  <p className="text-base md:text-lg text-gray-700 mb-6">
                    Kendi işini kurmak isteyen, kısa sürede karlı bir yatırım fırsatı arayan, gelişimin bir parçası olmak isteyen girişimciler için PidebyPide Franchise Modeli&apos;ni oluşturduk.
                  </p>
                  
                  <p className="text-base md:text-lg text-gray-700 mb-6">
                    PidebyPide Franchise Modeli, Baydöner ve Bursa İshakbey markalarının da sahibi olan Apaz Holding güvencesiyle girişimcilere karlı bir yatırım ve kazanç imkanı sunuyor.
                  </p>
                  
                  <p className="text-base md:text-lg text-gray-700 mb-6">
                    Kiralama, inşaat (dekorasyon), lojistik, tedarik, insan kaynakları, bilgi-işlem ve diğer operasyonel konularda tecrübeli ve bilgili profesyonel bir kadronun tam desteğini kapsayan bir franchise modeli sunuyoruz.
                  </p>
                  
                  <p className="text-base md:text-lg text-gray-700 mb-8">
                    Eğer sizde PidebyPide ailesine franchise alarak katılmak istiyorsanız
                    <a href="mailto:franchise@pidebypide.com" className="text-[#14543c] hover:text-[#f29b24] mx-1 font-semibold">
                      franchise@pidebypide.com
                    </a>
                    adresinden bizimle iletişime geçebilirsiniz.
                  </p>
                  
                  {/* Franchise İçerik Kutuları - Sadece Mobil Ekranda Görünecek */}
                  <div className="md:hidden grid grid-cols-1 gap-6 mt-10">
                    <div className="bg-[#f8f9fa] p-5 rounded-lg border-l-4 border-[#14543c] shadow-sm hover:shadow-md transition-all duration-300">
                      <h3 className="font-bold text-[#14543c] text-lg mb-2">Neden PidebyPide?</h3>
                      <p className="text-gray-700">Güçlü marka değeri, özgün ürün çeşitliliği ve karlı yatırım fırsatı</p>
                    </div>
                    
                    <div className="bg-[#f8f9fa] p-5 rounded-lg border-l-4 border-[#14543c] shadow-sm hover:shadow-md transition-all duration-300">
                      <h3 className="font-bold text-[#14543c] text-lg mb-2">Holding Güvencesi</h3>
                      <p className="text-gray-700">Apaz Holding güvencesiyle profesyonel destek ve yönetim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Alt Bölüm: Franchise Başvuru Formu (Ortada) */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#14543c] mb-2">Franchise Başvuru Formu</h3>
                <p className="text-gray-600">PidebyPide ailesine katılmak için aşağıdaki formu doldurun</p>
                <div className="w-20 h-1 bg-[#14543c] mx-auto mt-4"></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <FranchiseForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
