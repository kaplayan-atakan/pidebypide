import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Slider from "@/components/UI/Slider";
import OpinionBar from "@/components/UI/OpinionBar";
import BranchFinder from "@/components/UI/BranchFinder";
import { getAssetPath } from "@/utils/assetPath";

export default function Home() {
  // Slider görselleri
  const sliderImages = [
    getAssetPath("assets/images/pide1.jpg"),
    getAssetPath("assets/images/pide2.jpg"), 
    getAssetPath("assets/images/pide3.jpg"),
    getAssetPath("assets/images/web_pide-05.jpg")
  ];return (
    <div className="layout--home bg-white min-h-screen">
      {/* Görüş ve Öneri Bar */}
      <OpinionBar />

      {/* Header */}
      <Header />      {/* Slider Bölümü */}
      <Slider images={sliderImages} />

      {/* Şube Bulucu */}
      <BranchFinder />

      {/* Footer */}
      <Footer />
    </div>
  );
}
