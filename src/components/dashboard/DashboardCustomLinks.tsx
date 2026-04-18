import { useState, useEffect, useRef } from "react";
import { Plus, X, ExternalLink, GripVertical, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useUserPreferences } from "@/hooks/useUserPreferences";

interface CustomLink {
  id: string;
  name: string;
  url: string;
  favicon_url: string | null;
  sort_order: number;
}

// Resolve a URL's favicon via Google's favicon service + Clearbit fallback
function getFavicon(url: string): string {
  try {
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '';
  }
}

// Default links shown to every new user
const DEFAULT_LINKS: Omit<CustomLink, 'id'>[] = [
  { name: 'Shopify', url: 'https://shopify.com', favicon_url: 'https://www.google.com/s2/favicons?domain=shopify.com&sz=64', sort_order: 0 },
  { name: 'YouTube', url: 'https://youtube.com', favicon_url: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64', sort_order: 1 },
  { name: 'Notion', url: 'https://notion.so', favicon_url: 'https://www.google.com/s2/favicons?domain=notion.so&sz=64', sort_order: 2 },
];

export default function DashboardCustomLinks() {
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [fetchingFavicon, setFetchingFavicon] = useState(false);
  const [previewFavicon, setPreviewFavicon] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Get theme color
  const accentColor = (prefs as any)?.theme_color ||
    typeof window !== 'undefined' ? localStorage.getItem('dh_accent_color') || '#10B981' : '#10B981';

  useEffect(() => {
    if (!user) return;
    loadLinks();
  }, [user]);

  const loadLinks = async () => {
    const { data } = await (supabase as any)
      .from('dashboard_custom_links')
      .select('*')
      .eq('user_id', user!.id)
      .order('sort_order', { ascending: true });

    if (data && data.length > 0) {
      setLinks(data);
    } else {
      // First time — seed with defaults
      const toInsert = DEFAULT_LINKS.map(l => ({ ...l, user_id: user!.id }));
      const { data: inserted } = await (supabase as any)
        .from('dashboard_custom_links')
        .insert(toInsert)
        .select();
      setLinks(inserted || []);
    }
    setLoading(false);
  };

  const handleUrlBlur = async () => {
    if (!newUrl) return;
    const favicon = getFavicon(newUrl);
    setPreviewFavicon(favicon);
    // Auto-fill name from domain if empty
    if (!newName) {
      try {
        const url = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
        const domain = new URL(url).hostname.replace('www.', '');
        const name = domain.split('.')[0];
        setNewName(name.charAt(0).toUpperCase() + name.slice(1));
      } catch {}
    }
  };

  const handleAdd = async () => {
    if (!newUrl.trim() || !user) return;
    const url = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
    const favicon = getFavicon(url);
    const name = newName.trim() || (() => {
      try { const d = new URL(url).hostname.replace('www.', ''); return d.split('.')[0].charAt(0).toUpperCase() + d.split('.')[0].slice(1); } catch { return url; }
    })();

    const { data } = await (supabase as any)
      .from('dashboard_custom_links')
      .insert({ user_id: user.id, name, url, favicon_url: favicon, sort_order: links.length })
      .select()
      .single();

    if (data) {
      setLinks(prev => [...prev, data]);
      setNewName('');
      setNewUrl('');
      setPreviewFavicon('');
      setShowAdd(false);
      toast.success(`${name} added to your links`);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await (supabase as any).from('dashboard_custom_links').delete().eq('id', id);
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) return (
    <div className="flex items-center gap-3 py-1">
      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      <span className="text-xs text-muted-foreground">Loading links...</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Links */}
      {links.map((link) => (
        <div
          key={link.id}
          className="group/link relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer"
          onClick={() => handleClick(link.url)}
        >
          {/* Favicon */}
          <div className="w-5 h-5 rounded-sm overflow-hidden flex items-center justify-center flex-shrink-0">
            {link.favicon_url ? (
              <img
                src={link.favicon_url}
                alt=""
                className="w-full h-full object-contain"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
          <span className="text-xs font-semibold text-foreground whitespace-nowrap">{link.name}</span>
          {/* Delete X on hover */}
          <button
            onClick={(e) => handleDelete(link.id, e)}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover/link:opacity-100 transition-opacity z-10"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      ))}

      {/* Add new button */}
      {!showAdd ? (
        <button
          onClick={() => { setShowAdd(true); setTimeout(() => inputRef.current?.focus(), 50); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-dashed border-border hover:border-primary transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground">Add link</span>
        </button>
      ) : (
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-primary/50 shadow-sm"
          onClick={e => e.stopPropagation()}
        >
          {previewFavicon && (
            <img src={previewFavicon} alt="" className="w-4 h-4 rounded-sm object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
          <input
            ref={inputRef}
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            onBlur={handleUrlBlur}
            onKeyDown={e => { if (e.key === 'Enter') { handleUrlBlur(); setTimeout(() => nameInputRef?.focus(), 100); } if (e.key === 'Escape') { setShowAdd(false); setNewName(''); setNewUrl(''); } }}
            placeholder="URL (e.g. shopify.com)"
            className="text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-36"
          />
          <input
            ref={el => { (window as any).__nameInput = el; }}
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') { setShowAdd(false); setNewName(''); setNewUrl(''); } }}
            placeholder="Label"
            className="text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-20"
          />
          <button onClick={handleAdd} className="text-primary font-bold text-xs hover:opacity-70 transition-opacity">+</button>
          <button onClick={() => { setShowAdd(false); setNewName(''); setNewUrl(''); setPreviewFavicon(''); }} className="text-muted-foreground hover:text-foreground">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );

  var nameInputRef = (window as any).__nameInput;
}
