export default function ModernDoor({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="160" rx="2" fill="#1F2937" />
        <rect x="20" y="20" width="35" height="60" rx="1" fill="#374151" />
        <rect x="65" y="20" width="35" height="60" rx="1" fill="#374151" />
        <rect x="20" y="90" width="80" height="70" rx="1" fill="#374151" />
        <circle cx="82" cy="92" r="4" fill="#6366F1" />
      </svg>
    </div>
  );
}
