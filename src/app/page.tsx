import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Slider from "@/components/UI/Slider";
import OpinionBar from "@/components/UI/OpinionBar";
import BranchFinder from "@/components/UI/BranchFinder";
import { getAssetPath } from "@/utils/assetHelpers";

export default function Home() {
  // Slider görselleri ve bağlantıları - 1. sıradaki şubeler sayfasına, diğerleri ürünler sayfasına
  const sliderItems = [
    {
      image: getAssetPath("assets/images/sliderPhotos/1-slider.jpg"),
      url: "/subeler" // 1. sıradaki şubelere yönlendirecek
    },
    {
      image: getAssetPath("assets/images/sliderPhotos/2-TATLILAR_PBP.jpg"),
      url: "/urunler" // Diğerleri ürünler sayfasına
    },
    {
      image: getAssetPath("assets/images/sliderPhotos/3-ÜRÜNLER_PBP.jpg"),
      url: "/urunler"
    },
    {
      image: getAssetPath("assets/images/sliderPhotos/4-ÜRÜNLER_PBP2.jpg"),
      url: "/urunler"
    },
    {
      image: getAssetPath("assets/images/sliderPhotos/5-pbp_ürünler.jpg"),
      url: "/urunler"
    }
  ];return (
    <div className="layout--home bg-white min-h-screen">
      {/* Görüş ve Öneri Bar */}
      <OpinionBar />

      {/* Header */}
      <Header />      
      {/* Slider Bölümü */}
      <Slider images={sliderItems} />

      {/* Şube Bulucu */}
      <BranchFinder />

      {/* Footer */}
      <Footer />
    </div>
  );
}
