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
  return (    <a 
      href={href} 
      className={`fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#f29b24] text-white p-2 rounded-l-lg z-50 hover:bg-[#d4821a] transition-colors ${className}`}
    >
      <span className="block text-sm font-bold">{text}</span>
    </a>
  );
}
