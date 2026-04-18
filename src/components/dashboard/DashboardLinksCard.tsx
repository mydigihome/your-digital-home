import { useState, useEffect } from "react";
import { Plus, X, ExternalLink, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface CustomLink {
  id: string;
  name: string;
  url: string;
  favicon_url?: string | null;
  sort_order: number;
}

// Pre-seeded defaults for new users
const DEFAULT_LINKS: Omit<CustomLink, "id" | "sort_order">[] = [
  { name: "Shopify", url: "https://shopify.com", favicon_url: "https://www.google.com/s2/favicons?domain=shopify.com&sz=64" },
  { name: "YouTube", url: "https://youtube.com", favicon_url: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64" },
  { name: "Notion", url: "https://notion.so", favicon_url: "https://www.google.com/s2/favicons?domain=notion.so&sz=64" },
];

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

function getDisplayUrl(url: string): string {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function DashboardLinksCard() {
  const { user } = useAuth();
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [fetchingMeta, setFetchingMeta] = useState(false);
  const [previewFavicon, setPreviewFavicon] = useState("");

  useEffect(() => {
    if (!user) return;
    loadLinks();
  }, [user]);

  const loadLinks = async () => {
    setLoading(true);
    const { data } = await (supabase as any)
      .from("dashboard_custom_links")
      .select("*")
      .eq("user_id", user!.id)
      .order("sort_order", { ascending: true });

    if (!data || data.length === 0) {
      // Seed defaults for new user
      const seedLinks = DEFAULT_LINKS.map((l, i) => ({ ...l, user_id: user!.id, sort_order: i }));
      const { data: seeded } = await (supabase as any)
        .from("dashboard_custom_links")
        .insert(seedLinks)
        .select();
      setLinks(seeded || []);
    } else {
      setLinks(data);
    }
    setLoading(false);
  };

  const handleUrlBlur = async () => {
    if (!newUrl.trim()) return;
    setFetchingMeta(true);
    const favicon = getFaviconUrl(newUrl);
    setPreviewFavicon(favicon);
    if (!newName) {
      try {
        const domain = new URL(newUrl.startsWith("http") ? newUrl : `https://${newUrl}`).hostname.replace("www.", "").split(".")[0];
        setNewName(domain.charAt(0).toUpperCase() + domain.slice(1));
      } catch {}
    }
    setFetchingMeta(false);
  };

  const addLink = async () => {
    if (!newUrl.trim() || !newName.trim()) { toast.error("Name and URL required"); return; }
    const fullUrl = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
    const favicon = getFaviconUrl(fullUrl);
    const { data, error } = await (supabase as any)
      .from("dashboard_custom_links")
      .insert({ user_id: user!.id, name: newName.trim(), url: fullUrl, favicon_url: favicon, sort_order: links.length })
      .select()
      .single();
    if (error) { toast.error("Failed to add link"); return; }
    setLinks(prev => [...prev, data]);
    setNewUrl(""); setNewName(""); setPreviewFavicon(""); setShowAdd(false);
    toast.success(`${newName} added to your links!`);
  };

  const removeLink = async (id: string) => {
    await (supabase as any).from("dashboard_custom_links").delete().eq("id", id);
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 py-3">
      <div className="flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <span className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0 text-primary">Links</span>

        {loading ? (
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-24 h-9 rounded-full bg-muted animate-pulse" />)}
          </div>
        ) : (
          links.map(link => (
            <div key={link.id} className="group/link flex-shrink-0 relative">
              <button
                onClick={() => openLink(link.url)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
              >
                {link.favicon_url ? (
                  <img
                    src={link.favicon_url}
                    alt={link.name}
                    className="w-4 h-4 rounded-sm object-contain flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-4 h-4 rounded-sm bg-muted flex items-center justify-center">
                    <ExternalLink className="w-2.5 h-2.5 text-muted-foreground" />
                  </div>
                )}
                <span className="text-xs font-semibold text-foreground">{link.name}</span>
              </button>
              {/* Remove button on hover */}
              <button
                onClick={(e) => { e.stopPropagation(); removeLink(link.id); }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-destructive text-white opacity-0 group-hover/link:opacity-100 transition-opacity flex items-center justify-center"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))
        )}

        {/* Add new link */}
        {showAdd ? (
          <div className="flex items-center gap-2 flex-shrink-0 bg-card border border-primary/40 rounded-full px-3 py-1.5" style={{ minWidth: 280 }}>
            {previewFavicon && (
              <img src={previewFavicon} alt="" className="w-4 h-4 rounded-sm object-contain" onError={e => (e.target as HTMLImageElement).style.display = "none"} />
            )}
            <input
              autoFocus
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              onBlur={handleUrlBlur}
              placeholder="Paste URL..."
              className="text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-28"
              onKeyDown={e => e.key === "Enter" && document.getElementById("link-name-input")?.focus()}
            />
            <span className="text-muted-foreground text-xs">·</span>
            <input
              id="link-name-input"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Name it"
              className="text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-20"
              onKeyDown={e => e.key === "Enter" && addLink()}
            />
            <button onClick={addLink} className="text-xs font-semibold text-primary hover:opacity-80">Add</button>
            <button onClick={() => { setShowAdd(false); setNewUrl(""); setNewName(""); setPreviewFavicon(""); }} className="text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-border hover:border-primary transition flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">New</span>
          </button>
        )}
      </div>
    </div>
  );
}
