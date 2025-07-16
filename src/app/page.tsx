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
      srcSet: {
        650: getAssetPath("assets/images/sliderPhotos/webp/1-slider-650.webp"),
        1300: getAssetPath("assets/images/sliderPhotos/webp/1-slider-1300.webp"),
        1920: getAssetPath("assets/images/sliderPhotos/webp/1-slider-1920.webp"),
      },
      fallback: getAssetPath("assets/images/sliderPhotos/1-slider.jpg"),
      url: "/subeler"
    },
    {
      srcSet: {
        650: getAssetPath("assets/images/sliderPhotos/webp/2-TATLILAR_PBP-650.webp"),
        1300: getAssetPath("assets/images/sliderPhotos/webp/2-TATLILAR_PBP-1300.webp"),
        1920: getAssetPath("assets/images/sliderPhotos/webp/2-TATLILAR_PBP-1920.webp"),
      },
      fallback: getAssetPath("assets/images/sliderPhotos/2-TATLILAR_PBP.jpg"),
      url: "/urunler"
    },
    {
      srcSet: {
        650: getAssetPath("assets/images/sliderPhotos/webp/3-ÜRÜNLER_PBP-650.webp"),
        1300: getAssetPath("assets/images/sliderPhotos/webp/3-ÜRÜNLER_PBP-1300.webp"),
        1920: getAssetPath("assets/images/sliderPhotos/webp/3-ÜRÜNLER_PBP-1920.webp"),
      },
      fallback: getAssetPath("assets/images/sliderPhotos/3-ÜRÜNLER_PBP.jpg"),
      url: "/urunler"
    },
    {
      srcSet: {
        650: getAssetPath("assets/images/sliderPhotos/webp/4-ÜRÜNLER_PBP2-650.webp"),
        1300: getAssetPath("assets/images/sliderPhotos/webp/4-ÜRÜNLER_PBP2-1300.webp"),
        1920: getAssetPath("assets/images/sliderPhotos/webp/4-ÜRÜNLER_PBP2-1920.webp"),
      },
      fallback: getAssetPath("assets/images/sliderPhotos/4-ÜRÜNLER_PBP2.jpg"),
      url: "/urunler"
    },
    {
      srcSet: {
        650: getAssetPath("assets/images/sliderPhotos/webp/5-pbp_ürünler-650.webp"),
        1300: getAssetPath("assets/images/sliderPhotos/webp/5-pbp_ürünler-1300.webp"),
        1920: getAssetPath("assets/images/sliderPhotos/webp/5-pbp_ürünler-1920.webp"),
      },
      fallback: getAssetPath("assets/images/sliderPhotos/5-pbp_ürünler.jpg"),
      url: "/urunler"
    }
  ]; 
  return (
    <div className="layout--home bg-white">
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
