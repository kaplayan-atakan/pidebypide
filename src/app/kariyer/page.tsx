import { Metadata } from 'next';
import { openPositions } from '@/data/positions';
import JobApplicationForm from '@/components/JobApplicationForm';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export const metadata: Metadata = {
  title: 'Kariyer - Pide By Pide',
  description: 'Pide By Pide ile kariyer yapmak için başvuru formu.',
  keywords: 'Kariyer, iş başvurusu, Pide By Pide kariyer, iş imkanları',
  openGraph: {
    title: 'Kariyer - Pide By Pide',
    description: 'Pide By Pide ile kariyer yapmak için başvuru formu.',
    type: 'website',
  },
  alternates: {
    canonical: '/kariyer'
  }
};

// Pozisyon Kartı Bileşeni
function PositionCard({ title, description, requirements }: {
  title: string;
  description: string;
  requirements: string[];
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 mb-4">
      <h3 className="text-lg md:text-xl font-bold font-header text-[#14543c] mb-2">{title}</h3>
      <p className="text-responsive-sm text-[#7b7934] leading-relaxed mb-3">{description}</p>
      <ul className="list-disc list-inside space-y-1 text-gray-600">
        {requirements.map((requirement, index) => (
          <li key={index} className="text-responsive-sm">{requirement}</li>
        ))}
      </ul>
    </div>
  );
}

export default function KariyerPage() {
  return (
    <div className="layout--career bg-white min-h-screen">
      {/* Görüş ve Öneri Bar */}
      <OpinionBar />

      {/* Header */}
      <Header />

      <main className="min-h-screen">
        {/* Ana İçerik */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto container-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Kariyer Bilgileri ve Açık Pozisyonlar */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold font-header text-[#14543c] mb-4">
                    Pide By Pide Ailesi
                  </h2>
                  
                  <p className="text-responsive-md text-[#7b7934] leading-relaxed mb-6">
                    Pide By Pide ailesi olarak, dinamik ve gelişime açık ekip arkadaşları arıyoruz. 
                    Misafirlerimize en kaliteli hizmeti sunmak için tutkulu ve deneyimli profesyonelleri 
                    takımımıza katmaktan mutluluk duyarız.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl md:text-2xl font-bold font-header text-[#14543c] mb-3">
                      Neden Pide By Pide?
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-responsive-sm text-[#7b7934]">
                      <li>Gelişen ve büyüyen bir marka</li>
                      <li>Profesyonel çalışma ortamı</li>
                      <li>Kariyer gelişim fırsatları</li>
                      <li>Eğitim ve gelişim programları</li>
                      <li>Rekabetçi maaş ve yan haklar</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold font-header text-[#14543c] mb-4">
                    Açık Pozisyonlar
                  </h3>
                  
                  <div className="space-y-4">
                    {openPositions.map((position, index) => (
                      <PositionCard
                        key={index}
                        title={position.title}
                        description={position.description}
                        requirements={position.requirements}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Başvuru Formu */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <JobApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
