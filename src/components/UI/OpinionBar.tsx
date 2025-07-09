import { getAssetPath } from '@/utils/assetHelpers';

interface OpinionBarProps {
  text?: string;
  href?: string;
  className?: string;
}

export default function OpinionBar({ 
  text = "Görüş ve Öneri", 
  href = getAssetPath('/gorus-ve-onerileriniz'),
  className = ""
}: OpinionBarProps) {
  return (
    <a 
      href={href} 
      className={`fixed right-0 top-3/4 transform -translate-y-3/4 bg-[#f29b24] text-white p-2 sm:p-3 rounded-l-lg z-50 hover:bg-[#d4821a] transition-colors btn-touch ${className}`}
    >
      <span className="block text-xs sm:text-sm font-bold">{text}</span>
    </a>
  );
}
