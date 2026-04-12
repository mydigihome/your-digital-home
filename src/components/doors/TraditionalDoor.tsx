export default function TraditionalDoor({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="160" rx="0" fill="#7C3C1E" />
        <rect x="10" y="10" width="100" height="50" rx="50" fill="#8B4513" />
        <rect x="20" y="70" width="35" height="45" rx="1" fill="#6B2D0E" />
        <rect x="65" y="70" width="35" height="45" rx="1" fill="#6B2D0E" />
        <rect x="20" y="125" width="80" height="35" rx="1" fill="#6B2D0E" />
        <circle cx="80" cy="100" r="5" fill="#D4AF37" />
      </svg>
    </div>
  );
}
