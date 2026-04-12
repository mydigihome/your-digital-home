import { useStudioProfile } from "@/hooks/useStudio";
import { ExternalLink } from "lucide-react";

const SOCIAL_LINKS = [
  { key: "instagram_url", label: "Instagram", color: "#E1306C" },
  { key: "youtube_url", label: "YouTube", color: "#FF0000" },
  { key: "tiktok_url", label: "TikTok", color: "#000000" },
  { key: "twitter_url", label: "Twitter", color: "#1DA1F2" },
  { key: "linkedin_url", label: "LinkedIn", color: "#0A66C2" },
  { key: "substack_url", label: "Substack", color: "#FF6719" },
];

export default function SocialQuickLinks() {
  const { data: profile } = useStudioProfile();
  const links = SOCIAL_LINKS.filter(l => (profile as any)?.[l.key]);

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {links.map(l => (
        <a key={l.key} href={(profile as any)[l.key]} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium hover:bg-muted transition">
          <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
          {l.label}
          <ExternalLink className="w-3 h-3" />
        </a>
      ))}
    </div>
  );
}
