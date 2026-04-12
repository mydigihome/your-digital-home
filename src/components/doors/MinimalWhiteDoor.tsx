export default function MinimalWhiteDoor({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="160" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="20" y="20" width="80" height="140" rx="2" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
        <circle cx="82" cy="90" r="4" fill="#9CA3AF" />
      </svg>
    </div>
  );
}
