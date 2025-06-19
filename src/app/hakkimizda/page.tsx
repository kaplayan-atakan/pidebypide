import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export default function Hakkimizda() {
  return (
    <div className="layout--hakkimizda bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Hakkımızda</h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-orange-600">Pide By Pide Hikayemiz</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Pide By Pide, Türk mutfağının en sevilen lezzetlerinden biri olan pidenin 
                  geleneksel tadını modern bir yaklaşımla buluşturan bir markadır. 
                  Kaliteli malzemeler ve özgün tariflerle hazırlanan pidelerimiz, 
                  misafirlerimize unutulmaz bir lezzet deneyimi sunmaktadır.
                </p>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">Misyonumuz</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Geleneksel pide lezzetlerini koruyarak, modern gastronomi anlayışıyla 
                  harmanlayıp müşterilerimize en taze ve kaliteli ürünleri sunmak. 
                  Hijyen standartlarından taviz vermeden, her lokmanın mükemmel olmasını sağlamak.
                </p>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">Vizyonumuz</h3>                <p className="text-gray-700 leading-relaxed mb-6">
                  Türkiye&apos;nin en sevilen pide markası olmak ve uluslararası arenada 
                  Türk mutfağını en iyi şekilde temsil etmek. Franchise sistemiyle 
                  büyüyerek daha geniş kitlelere ulaşmak.
                </p>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">Değerlerimiz</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Kalite ve lezzetten taviz vermemek</li>
                  <li>Müşteri memnuniyetini her şeyin üstünde tutmak</li>
                  <li>Hijyen ve temizlik standartlarına uygun hizmet vermek</li>
                  <li>Geleneksel tarifleri koruyarak yenilikçi yaklaşımlar geliştirmek</li>
                  <li>Çalışan mutluluğu ve gelişimi</li>
                  <li>Çevreye duyarlı işletmecilik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
