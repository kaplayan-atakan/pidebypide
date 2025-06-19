interface OpinionBarProps {
  text?: string;
  href?: string;
  className?: string;
}

export default function OpinionBar({ 
  text = "Görüş ve Öneri", 
  href = "/gorus-ve-onerileriniz",
  className = ""
}: OpinionBarProps) {
  return (
    <a 
      href={href} 
      className={`fixed right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-l-lg z-50 hover:bg-orange-600 transition-colors ${className}`}
    >
      <span className="block text-sm font-bold">{text}</span>
    </a>
  );
}
