import Image from '@/components/Image';

export default function AssetTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Varlık Yolu Test Sayfası</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Görsel Testi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Pide Görseli 1</h3>
              <Image 
                src="/assets/images/pide1.jpg" 
                alt="Pide 1" 
                width={300} 
                height={200} 
                className="rounded"
              />
              <p className="mt-2 text-sm text-gray-500">Kaynak: /assets/images/pide1.jpg</p>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Pide Görseli 2</h3>
              <Image 
                src="/assets/images/pide2.jpg" 
                alt="Pide 2" 
                width={300} 
                height={200} 
                className="rounded"
              />
              <p className="mt-2 text-sm text-gray-500">Kaynak: /assets/images/pide2.jpg</p>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Pide Görseli 3</h3>
              <Image 
                src="/assets/images/pide3.jpg" 
                alt="Pide 3" 
                width={300} 
                height={200} 
                className="rounded"
              />
              <p className="mt-2 text-sm text-gray-500">Kaynak: /assets/images/pide3.jpg</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dinamik Görüntü Yolları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Görecel Yol</h3>
              <Image 
                src="/assets/images/web_pide-05.jpg" 
                alt="Web Pide" 
                width={300} 
                height={200} 
                className="rounded"
              />
              <p className="mt-2 text-sm text-gray-500">Kaynak: /assets/images/web_pide-05.jpg</p>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Mutlak Yol</h3>
              <Image 
                src="/pidebypide/assets/images/web_pide-05.jpg" 
                alt="Web Pide (mutlak yol)" 
                width={300} 
                height={200} 
                className="rounded"
              />
              <p className="mt-2 text-sm text-gray-500">Kaynak: /pidebypide/assets/images/web_pide-05.jpg</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Font Testi</h2>
          <div className="space-y-4">
            <div className="border p-4 rounded">
              <p className="text-lg" style={{fontFamily: 'NEXA HEAVY'}}>
                Bu yazı NEXA HEAVY fontu ile görüntülenmeli.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
