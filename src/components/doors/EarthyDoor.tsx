export default function EarthyDoor({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="100" height="150" rx="50" fill="#8B6914" />
        <rect x="20" y="30" width="80" height="130" rx="40" fill="#A07820" />
        <circle cx="80" cy="95" r="5" fill="#5C3D0E" />
      </svg>
    </div>
  );
}
