import { Metadata } from 'next';
import Link from 'next/link';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export const metadata: Metadata = {
  title: 'Kişisel Verilerin Korunması Kanunu Aydınlatma Metni - Pide By Pide',
  description: 'Pide By Pide KVKK aydınlatma metni ve kişisel verilerin korunması hakkında bilgiler.',
  keywords: 'KVKK, kişisel veriler, gizlilik, aydınlatma metni'
};

// PDF Belge Linki Bileşeni
function DocumentLink({ href, title }: { href: string; title: string }) {
  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-[#14543c] hover:text-[#f29b24] transition-colors text-center block mb-4 font-bold underline"
    >
      {title}
    </a>
  );
}

// Bölüm Başlığı Bileşeni
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold font-['NEXA_BOLD'] text-[#14543c] mt-8 mb-4">
      {children}
    </h3>
  );
}

export default function KVKKPage() {
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
                KİŞİSEL VERİLERİN KORUNMASI
              </h1>
              <nav className="mt-4 sm:mt-6">
                <ol className="flex justify-center items-center space-x-2 text-sm sm:text-base text-[#f29b24]">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Anasayfa
                    </Link>
                  </li>
                  <li className="text-white">/</li>
                  <li className="text-white">Kişisel Verilerin Korunması</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        {/* İçerik Bölümü */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto container-responsive">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              
              {/* Belge Linkleri */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold font-['NEXA_BOLD'] text-center text-[#14543c] mb-6">
                  KİŞİSEL VERİLERİN KORUNMASI KANUNU
                </h2>
                
                <div className="max-w-xl mx-auto">
                  <DocumentLink 
                    href="/documents/pide-by-pide_kisisel_verilerin_korunmasi_gizlilik-politikasi.pdf" 
                    title="KİŞİSEL VERİLERİN KORUNMASI VE GİZLİLİK POLİTİKASI" 
                  />
                  
                  <DocumentLink 
                    href="/documents/pide-by-pide_aday-muvafakatnamesi.pdf" 
                    title="KİŞİSEL VERİLERİN KORUNMASI - ADAY MUVAFAKATNAMESİ" 
                  />
                  
                  <DocumentLink 
                    href="/documents/pide-by-pide_basvuru-formu.pdf" 
                    title="KVKK UYARICA İLGİLİ KİŞİ BAŞVURU FORMU" 
                  />
                </div>
              </div>
              
              {/* Aydınlatma Metni */}
              <div className="prose max-w-none text-[#4a4a4a]">
                <p className="mb-4">
                  PİDE BY PİDE olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, Şirket olarak, Şirkete ilişkin tüm şahıslara ait her türlü kişisel verinin 6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;)&apos;na uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz. Bu sorumluluğumuzun tam idraki ile KVKK kapsamında tanımlı &ldquo;Veri Sorumlusu&rdquo; sıfatıyla, kişisel verilerinizi aşağıda izah edildiği surette ve mevzuat tarafından emredilen sınırlar çerçevesinde işlemekteyiz.
                </p>
                
                <p className="mb-6">İşbu aydınlatma metninde geçen;</p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                    <strong>Kişisel Veri:</strong> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgiyi,
                  </li>
                  <li>
                    <strong>Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;):</strong> 7.4.2016 tarihinde Resmî Gazete&apos;de yayımlanan ve yürürlüğe giren 6698 Sayılı Kişisel Verilerin Korunması Kanunu&apos;nu,
                  </li>
                  <li>
                    <strong>Veri Sorumlusu:</strong> Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorunlu olan tüzel kişiyi,
                  </li>
                  <li>
                    <strong>Veri İşleyen:</strong> Veri Sorumlusunun verdiği yetkiye dayanarak onun adına Kişisel verileri işleyen gerçek veya tüzel kişiyi ifade eder.
                  </li>
                </ul>
                
                <div className="mt-8 mb-6">
                  <p className="font-bold mb-2">Veri Sorumlusu:</p>
                  <p>
                    KVKK uyarınca muhatap, tedarikçi, müşteri, çalışan, stajyer, ziyaretçi vb. sıfatları ile paylaştığınız kişisel verileriniz, veri sorumlusu olarak belirlenen PİDE BY PİDE tarafından aşağıda belirtilen kapsamda değerlendirilecektir.
                  </p>
                </div>
                
                <SectionTitle>
                  1. Kişisel Verilerin Toplanması, İşlenmesi ve İşletme Amaçları
                </SectionTitle>
                
                <p className="mb-4">
                  Kişisel verileriniz, Şirketimiz ile aranızdaki ilişkiye bağlı olarak değişkenlik gösterebilmekle birlikte; otomatik ya da otomatik olmayan yöntemlerle, Şirketimiz birimleri, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilecektir.
                </p>
                
                <p className="mb-6">
                  Toplanan kişisel verileriniz, Şirketimiz hizmetlerinden faydalanmanız için gerekli çalışmaların ilgili iş birimleri tarafından yapılması, Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini, Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması ile Şirketimizin insan kaynakları politikalarının yürütülmesinin temini amaçlarıyla KVKK&apos;nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.
                </p>
                
                <p className="mb-4">Kişisel verileriniz;</p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Hukuka ve dürüstlük kurallarına uygun,</li>
                  <li>Doğru ve gerektiğinde güncel,</li>
                  <li>Belirli, açık ve meşru amaçlar için,</li>
                  <li>İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü,</li>
                  <li>İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilme,</li>
                </ul>
                
                <p className="mb-8">kurallarına uygun bir şekilde işlenecektir.</p>
                
                <SectionTitle>
                  2. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği
                </SectionTitle>
                
                <p className="mb-6">
                  Toplanan kişisel verileriniz; Şirketimiz hizmetlerinden faydalanmanız için gerekli çalışmaların ilgili iş birimleri tarafından yapılması, Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini, Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması ile Şirketimizin insan kaynakları politikalarının yürütülmesinin temini amaçlarıyla iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumları ve özel kişilere, KVKK&apos;nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
                </p>
                
                <SectionTitle>
                  3. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
                </SectionTitle>
                
                <p className="mb-6">
                  Kişisel verileriniz, her türlü sözlü, yazılı ya da elektronik ortamda, yukarıda yer verilen amaçlar doğrultusunda hizmetlerimizin sunulabilmesi ve bu kapsamda Şirketimizin sözleşme ve yasadan doğan mesuliyetlerini eksiksiz ve doğru bir şekilde yerine getirebilmesi gayesi ile edinilir. Bu hukuki sebeple toplanan kişisel verileriniz KVKK&apos;nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında bu metnin (1) ve (2) numaralı maddelerinde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.
                </p>
                
                <SectionTitle>
                  4. Kişisel Veri Sahibinin KVKK&apos;nın 11. Maddesinde Sayılan Hakları
                </SectionTitle>
                
                <p className="mb-4">
                  Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi, aşağıda düzenlenen yöntemlerle Şirketimize iletmeniz durumunda Şirketimiz talebin niteliğine göre en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır. Ancak, Kişisel Verileri Koruma Kurulunca bir ücret öngörülmesi halinde, Şirketimiz tarafından belirlenen tarifedeki ücret alınacaktır. Bu kapsamda kişisel veri sahipleri;
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                  <li>Kişisel veri işlenmişse buna ilişkin bilgi talep etme,</li>
                  <li>Kişisel verilerin işlenme amacı ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                  <li>Yurt içinde ve yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                  <li>Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme,</li>
                  <li>KVKK 7. Maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesi veya yok edilmesini isteme,</li>
                  <li>(e) ve (f) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                  <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                  <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın giderilmesini talep etme haklarına sahiptir.</li>
                </ul>
                
                <p className="mb-4">
                  KVKK&apos;nın 13. Maddesinin 1. Fıkrası gereğince, yukarıda belirtilen haklarınızı kullanmak ile ilgili talebinizi, yazılı veya kişisel verileri Koruma Kurulu&apos;nun belirlediği diğer yöntemlerle Şirketimize iletebilirsiniz.
                </p>
                
                <p className="mb-6">
                  Yukarıda belirtilen haklarınızı kullanmak ve kimliğinizi tespit edici gerekli bilgiler ile KVKK&apos;nın 11. Maddesinde belirtilen haklardan kullanmayı talep ettiğiniz hakkınıza yönelik açıklamalarınızı içeren talebinizi;
                  <a href="mailto:kvk@pidebypide.com" className="text-[#14543c] hover:text-[#f29b24] transition-colors mx-1">kvk@pidebypide.com</a>
                  adresine elektronik posta göndererek veya
                  <span className="font-semibold ml-1">PideByPide Merkez Ofis Adresi</span>
                  adresine ulaştırmanız gerekmektedir.
                </p>
                
                <p className="text-right italic font-bold mt-10">
                  Saygılarımızla <br/>
                  PİDE BY PİDE
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
