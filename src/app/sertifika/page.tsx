import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";
import { getAssetPath } from '@/utils/assetHelpers';

export const metadata: Metadata = {
  title: 'Sertifikalarımız - Pide By Pide',
  description: 'Pide By Pide sertifikaları ve kalite belgelerimiz.',
  keywords: 'Sertifika, kalite belgesi, Pide By Pide sertifikaları',
};

const sertifikaImg = getAssetPath('/assets/images/sertifika.jpg');
const sertifikaPdf = getAssetPath('/assets/documents/sertifika.pdf');

export default function SertifikaPage() {
  return (
    <div className="min-h-screen bg-white">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Bölümü */}
        <section className="bg-gradient-to-br from-[#14543c] to-[#0f3d2a] py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto container-responsive">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-header text-white margin-responsive">
                SERTİFİKALARIMIZ
              </h1>
              <nav className="mt-4 sm:mt-6">
                <ol className="flex justify-center items-center space-x-2 text-sm sm:text-base text-[#f29b24]">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Anasayfa
                    </Link>
                  </li>
                  <li className="text-white">/</li>
                  <li className="text-white">Sertifikalarımız</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        {/* Sertifika Görsel Bölümü */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto container-responsive">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex justify-center">
                <a 
                  href={sertifikaPdf}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity max-w-3xl"
                >
                  <Image
                    src={sertifikaImg}
                    alt="Pide By Pide Sertifikası"
                    width={800}
                    height={1000}
                    className="max-w-full h-auto rounded-md shadow-md"
                    priority
                  />
                  <p className="text-center mt-4 text-sm text-gray-600">
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#f29b24]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                      </svg>
                      PDF&apos;i görüntülemek için tıklayın
                    </span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
