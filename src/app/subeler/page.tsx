import { Metadata } from 'next';
import { subeler } from '@/data/subeler';
import BranchFinder from '@/components/UI/BranchFinder';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export const metadata: Metadata = {
  title: 'Şubeler - Pide By Pide',
  description: 'Pide By Pide şubelerimiz Türkiye\'nin birçok ilinde hizmet vermektedir. En yakın şubemizi bulun.',
  keywords: 'Şubeler, Pide By Pide şubeler, lokasyon, adres, telefon',
};

function SubeCard({ id, title, address, phone, mapUrl }: {
  id: string;
  title: string;
  address: string;
  phone: string;
  mapUrl: string;
}) {
  return (
    <div id={id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 h-full">
      <h3 className="text-xl font-bold text-[#14543c] mb-3">{title}</h3>
      <div className="space-y-3 text-gray-700">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#f29b24] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{address}</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#f29b24] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[#14543c] hover:text-[#0f3d2a]">{phone}</a>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#f29b24] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-[#14543c] hover:text-[#0f3d2a]">
            Harita için tıklayınız
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SubelerPage() {
  // Şehir gruplarına göre şubeleri düzenle
  const cityGroups: { [key: string]: { name: string, subeList: typeof subeler } } = {};
  
  subeler.forEach(sube => {
    const cityValue = sube.cityValue || 'diger';
    const cityName = cityValue.charAt(0).toUpperCase() + cityValue.slice(1);
    
    if (!cityGroups[cityValue]) {
      cityGroups[cityValue] = {
        name: cityName,
        subeList: []
      };
    }
    
    cityGroups[cityValue].subeList.push(sube);
  });

  return (
    <div className="layout--subeler bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      {/* İnteraktif Harita Bölümü */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#14543c] mb-4">Türkiye Genelindeki Lokasyonlarımız</h2>
            <p className="text-lg text-[#7b7934]">
              Haritada şehirlere tıklayarak veya aşağıdan şehir seçerek şubelerimize ulaşabilirsiniz.
            </p>
          </div>
          
          {/* BranchFinder bileşenini dahil et */}
          <BranchFinder />
        </div>
      </section>
      
      {/* Şubeler Listesi */}
      <section className="py-8 md:py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#14543c] mb-8 text-center">Tüm Şubelerimiz</h2>
          
          {/* Şehir Başlıklarına Göre Gruplandırılmış Şubeler */}
          <div className="space-y-10">
            {Object.entries(cityGroups).map(([cityValue, { name, subeList }]) => (
              <div key={cityValue} id={cityValue} className="scroll-mt-24">
                <h3 className="text-xl md:text-2xl font-bold text-[#f29b24] mb-4 border-b border-[#f29b24] pb-2">
                  {name} <span className="text-[#7b7934] text-lg">({subeList.length} şube)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {subeList.map(sube => (
                    <SubeCard
                      key={sube.id}
                      id={sube.id}
                      title={sube.title}
                      address={sube.address}
                      phone={sube.phone}
                      mapUrl={sube.mapUrl}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 border-l-4 border-[#14543c] p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[#14543c]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm md:text-base text-[#14543c]">
                  <strong>Not:</strong> Daha fazla şube bilgisi için lütfen bizimle iletişime geçin. Sürekli büyüyen şube ağımızla size en yakın noktada hizmet vermeye devam ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
