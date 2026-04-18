import { useState, useEffect } from "react";
import { ExternalLink, Search, Sparkles, Plus, X, Loader2, Edit2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const SINGLE_STRIPE_URL = "https://buy.stripe.com/6oUfZhdWa88m71a1Tsak005";
const BUNDLE_STRIPE_URL = "https://buy.stripe.com/cNiaEXcS6dsG5X6bu2ak006";
const STATIC_CATEGORIES = [
  "All", "Finance", "Events", "College", "AI", "Productivity",
  "Automation", "Development", "Design", "Communication",
  "Presentations", "Image Generation", "Video",
  "Career", "Wellness", "Creativity", "Legal", "Other",
];

const STATIC_RESOURCES = [
  { name: "Robinhood", url: "https://robinhood.com", category: "Finance", desc: "Commission-free stock trading" },
  { name: "Fidelity", url: "https://fidelity.com", category: "Finance", desc: "Investment management & retirement" },
  { name: "Webull", url: "https://webull.com", category: "Finance", desc: "Advanced trading platform" },
  { name: "Schwab", url: "https://schwab.com", category: "Finance", desc: "Full-service brokerage" },
  { name: "Vanguard", url: "https://vanguard.com", category: "Finance", desc: "Index funds & ETFs" },
  { name: "Mint", url: "https://mint.intuit.com", category: "Finance", desc: "Budgeting & expense tracking" },
  { name: "YNAB", url: "https://ynab.com", category: "Finance", desc: "You Need A Budget" },
  { name: "Plaid", url: "https://plaid.com", category: "Finance", desc: "Bank account connectivity" },
  { name: "Eventbrite", url: "https://eventbrite.com", category: "Events", desc: "Event discovery & ticketing" },
  { name: "Luma", url: "https://lu.ma", category: "Events", desc: "Beautiful event pages" },
  { name: "Partiful", url: "https://partiful.com", category: "Events", desc: "Social event invitations" },
  { name: "Common App", url: "https://commonapp.org", category: "College", desc: "College application portal" },
  { name: "Khan Academy", url: "https://khanacademy.org", category: "College", desc: "Free courses & SAT prep" },
  { name: "College Board", url: "https://collegeboard.org", category: "College", desc: "SAT, AP & college planning" },
  { name: "ChatGPT", url: "https://chat.openai.com", category: "AI", desc: "AI assistant by OpenAI" },
  { name: "Claude", url: "https://claude.ai", category: "AI", desc: "AI assistant by Anthropic" },
  { name: "Gemini", url: "https://gemini.google.com", category: "AI", desc: "Google's AI model" },
  { name: "Perplexity", url: "https://perplexity.ai", category: "AI", desc: "AI-powered research" },
  { name: "Notion", url: "https://notion.so", category: "Productivity", desc: "All-in-one workspace" },
  { name: "Todoist", url: "https://todoist.com", category: "Productivity", desc: "Task management" },
  { name: "Linear", url: "https://linear.app", category: "Productivity", desc: "Project management for teams" },
  { name: "Cron", url: "https://cron.com", category: "Productivity", desc: "Next-gen calendar" },
  { name: "Zapier", url: "https://zapier.com", category: "Automation", desc: "Connect apps & automate workflows" },
  { name: "Make", url: "https://make.com", category: "Automation", desc: "Visual automation platform" },
  { name: "n8n", url: "https://n8n.io", category: "Automation", desc: "Open-source workflow automation" },
  { name: "GitHub", url: "https://github.com", category: "Development", desc: "Code hosting & collaboration" },
  { name: "Vercel", url: "https://vercel.com", category: "Development", desc: "Frontend deployment platform" },
  { name: "Supabase", url: "https://supabase.com", category: "Development", desc: "Open-source Firebase alternative" },
  { name: "Figma", url: "https://figma.com", category: "Design", desc: "Collaborative design tool" },
  { name: "Canva", url: "https://canva.com", category: "Design", desc: "Easy graphic design" },
  { name: "Dribbble", url: "https://dribbble.com", category: "Design", desc: "Design inspiration & portfolio" },
  { name: "Slack", url: "https://slack.com", category: "Communication", desc: "Team messaging" },
  { name: "Discord", url: "https://discord.com", category: "Communication", desc: "Community communication" },
  { name: "Loom", url: "https://loom.com", category: "Communication", desc: "Async video messaging" },
  { name: "Pitch", url: "https://pitch.com", category: "Presentations", desc: "Collaborative presentations" },
  { name: "Beautiful.ai", url: "https://beautiful.ai", category: "Presentations", desc: "AI-powered slide design" },
  { name: "Gamma", url: "https://gamma.app", category: "Presentations", desc: "AI presentations & docs" },
  { name: "Midjourney", url: "https://midjourney.com", category: "Image Generation", desc: "AI image generation" },
  { name: "DALL-E", url: "https://openai.com/dall-e-3", category: "Image Generation", desc: "OpenAI image generation" },
  { name: "Leonardo.ai", url: "https://leonardo.ai", category: "Image Generation", desc: "AI creative suite" },
  { name: "CapCut", url: "https://capcut.com", category: "Video", desc: "Free video editing" },
  { name: "Descript", url: "https://descript.com", category: "Video", desc: "AI-powered video editing" },
  { name: "Runway", url: "https://runwayml.com", category: "Video", desc: "AI video generation" },
];

function getFaviconUrl(url: string) {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`; } catch { return null; }
}

const DEFAULT_BANNER_COLORS = [
  "#10B981", "#6366F1", "#F59E0B", "#EF4444", "#3B82F6",
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#111827",
];

interface DynamicResource {
  id: string; title: string; description: string; category: string;
  resource_type: string; url: string | null; file_url: string | null;
  thumbnail_url: string | null; published: boolean; user_id: string;
}

interface CombinedTool {
  name: string; url: string; category: string; desc: string;
  isDynamic?: boolean; dynamicId?: string; thumbnail_url?: string | null; published?: boolean;
}

export default function ResourcesPage() {
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();
  const isAdmin = user?.email === "myslimher@gmail.com";
  const isMobile = useIsMobile();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const isDark = document.documentElement.classList.contains("dark");
  const text1 = isDark ? "#F2F2F2" : "#111827";
  const text2 = isDark ? "rgba(255,255,255,0.5)" : "#6B7280";
  const cardBg = isDark ? "#1C1C1E" : "white";
  const border = isDark ? "rgba(255,255,255,0.06)" : "#F3F4F6";
  const inputBg = isDark ? "#252528" : "white";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)" : "#E5E7EB";
  const [urlFetching, setUrlFetching] = useState(false);

  // Banner state — editable, default from user settings
  const settingsAccent = (prefs as any)?.theme_color ||
    (typeof window !== "undefined" ? localStorage.getItem("dh_accent_color") : null) || "#10B981";
  const [bannerColor, setBannerColor] = useState(settingsAccent);
  const [bannerText, setBannerText] = useState("Tools and resources to level up your workflow");
  const [editingBanner, setEditingBanner] = useState(false);
  const [bannerTextDraft, setBannerTextDraft] = useState(bannerText);
  const [bannerColorDraft, setBannerColorDraft] = useState(bannerColor);

  const [dynamicResources, setDynamicResources] = useState<DynamicResource[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingResource, setEditingResource] = useState<DynamicResource | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<DynamicResource | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", category: "Career",
    resource_type: "link", url: "", published: true,
    thumbnail_url: "" as string,
  });
  const [urlPreviewLogo, setUrlPreviewLogo] = useState("");
  const [urlPreviewDomain, setUrlPreviewDomain] = useState("");

  useEffect(() => { fetchResources(); }, [user]);

  const fetchResources = async () => {
    const { data } = await (supabase as any).from("resources").select("*").order("created_at", { ascending: false });
    if (data) setDynamicResources(data);
  };

  const resetForm = () => {
    setForm({ title: "", description: "", category: "Career", resource_type: "link", url: "", published: true, thumbnail_url: "" });
    setEditingResource(null);
    setUrlPreviewLogo("");
    setUrlPreviewDomain("");
  };

  const isDuplicateUrl = (url: string, excludeId?: string): string | null => {
    if (!url) return null;
    try {
      const norm = new URL(url).hostname.replace("www.", "");
      const st = STATIC_RESOURCES.find(r => { try { return new URL(r.url).hostname.replace("www.", "") === norm; } catch { return false; } });
      if (st) return st.name;
      const dy = dynamicResources.find(r => { if (excludeId && r.id === excludeId) return false; if (!r.url) return false; try { return new URL(r.url).hostname.replace("www.", "") === norm; } catch { return false; } });
      if (dy) return dy.title;
    } catch {}
    return null;
  };

  const guessCategory = (title: string, description: string): string => {
    const text = (title + " " + description).toLowerCase();
    const map: [string, string[]][] = [
      ["Finance", ["finance", "banking", "invest", "budget", "money", "stock", "trading"]],
      ["AI", ["ai", "gpt", "llm", "chatbot", "artificial intelligence"]],
      ["Design", ["design", "ui", "ux", "graphic", "figma"]],
      ["Development", ["developer", "code", "programming", "github", "deploy", "api"]],
      ["Productivity", ["productivity", "task", "project", "notes", "calendar"]],
      ["Communication", ["messaging", "chat", "email", "slack"]],
      ["Video", ["video", "editing", "streaming", "youtube"]],
      ["Automation", ["automat", "workflow", "zapier"]],
      ["Events", ["event", "ticket", "rsvp"]],
      ["Career", ["career", "job", "resume", "hiring"]],
    ];
    for (const [cat, keywords] of map) {
      if (keywords.some(kw => text.includes(kw))) return cat;
    }
    return "Productivity";
  };

  const autoPopulateFromUrl = async (url: string) => {
    if (!url) return;
    try { new URL(url); } catch { return; }
    const domain = new URL(url).hostname.replace("www.", "");
    setUrlPreviewDomain(domain);
    const logo = "https://logo.clearbit.com/" + domain;
    setUrlPreviewLogo(logo);
    setForm(p => ({ ...p, thumbnail_url: logo }));
    const dup = isDuplicateUrl(url, editingResource?.id);
    if (dup) { toast.error(`"${dup}" already exists`); return; }
    setUrlFetching(true);
    try {
      const { data, error } = await supabase.functions.invoke("fetch-og-tags", { body: { url } });
      if (!error && data?.success && data.data) {
        const og = data.data;
        setForm(p => ({
          ...p,
          title: p.title || og.siteName || og.title?.split(/[|\-–—]/)[0]?.trim() || domain.split(".")[0],
          description: p.description || og.description?.substring(0, 120) || "",
          category: p.category === "Career" && !editingResource ? guessCategory(og.title || "", og.description || "") : p.category,
        }));
      } else if (!form.title) {
        setForm(p => ({ ...p, title: domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1) }));
      }
    } catch {
      if (!form.title) setForm(p => ({ ...p, title: domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1) }));
    } finally { setUrlFetching(false); }
  };

  const handleSaveResource = async () => {
    if (!form.title || !form.description) { toast.error("Title and description required"); return; }
    if (!user) return;
    const dup = isDuplicateUrl(form.url, editingResource?.id);
    if (dup) { toast.error(`"${dup}" already exists`); return; }
    setUploading(true);
    let thumbnail_url = editingResource?.thumbnail_url || null;
    if (form.url) { try { thumbnail_url = "https://logo.clearbit.com/" + new URL(form.url).hostname.replace("www.", ""); } catch {} }
    if (form.thumbnail_url) thumbnail_url = form.thumbnail_url;
    const payload = { title: form.title, description: form.description, category: form.category, resource_type: "link", url: form.url || null, file_url: editingResource?.file_url || null, thumbnail_url, published: form.published, user_id: user.id, updated_at: new Date().toISOString() };
    if (editingResource) {
      const { data: updateData, error } = await (supabase as any).from("resources").update(payload).eq("id", editingResource.id).select();
      if (error) { toast.error("Update failed: " + error.message); setUploading(false); return; }
      setDynamicResources(prev => prev.map(r => r.id === editingResource.id ? { ...r, ...updateData[0] } : r));
      toast.success("Resource updated");
    } else {
      const { data: insertData, error } = await (supabase as any).from("resources").insert({ ...payload, user_id: user.id }).select();
      if (error) { toast.error("Failed: " + error.message); setUploading(false); return; }
      setDynamicResources(prev => [insertData[0], ...prev]);
      toast.success("Resource added");
    }
    setUploading(false);
    setShowAddForm(false);
    resetForm();
  };

  const handleDeleteResource = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id;
    setDynamicResources(prev => prev.filter(r => r.id !== id));
    setDeleteConfirm(null);
    await (supabase as any).from("resources").delete().eq("id", id);
  };

  const handleEditResource = (r: DynamicResource) => {
    setForm({ title: r.title, description: r.description, category: r.category, resource_type: r.resource_type, url: r.url || "", published: r.published, thumbnail_url: r.thumbnail_url || "" });
    if (r.url) { try { const d = new URL(r.url).hostname.replace("www.", ""); setUrlPreviewDomain(d); setUrlPreviewLogo("https://logo.clearbit.com/" + d); } catch {} }
    setEditingResource(r);
    setShowAddForm(true);
  };

  const combinedTools: CombinedTool[] = [
    ...STATIC_RESOURCES.filter(r => {
      const matchCat = activeCategory === "All" || r.category === activeCategory;
      const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    }),
    ...dynamicResources
      .filter(r => {
        if (!isAdmin && !r.published) return false;
        const matchCat = activeCategory === "All" || r.category === activeCategory;
        const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
      })
      .map(r => ({ name: r.title, url: r.url || "", category: r.category, desc: r.description, isDynamic: true, dynamicId: r.id, thumbnail_url: r.thumbnail_url, published: r.published })),
  ];

  const getDynamicResource = (id: string) => dynamicResources.find(r => r.id === id);

  const getIconForTool = (tool: CombinedTool) => {
    const src = tool.isDynamic
      ? (tool.thumbnail_url || (tool.url ? getFaviconUrl(tool.url) : null))
      : getFaviconUrl(tool.url);
    if (src) return <img src={src} alt={tool.name} style={{ width: 24, height: 24, borderRadius: 4, objectFit: "contain" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />;
    return <span style={{ fontSize: 16, fontWeight: 700, color: "#6B7280" }}>{tool.name.charAt(0).toUpperCase()}</span>;
  };

  // Derived banner color from user accent if not overridden
  const effectiveBannerColor = bannerColor || settingsAccent;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 80px" }}>

      {/* ── EDITABLE BANNER ─────────────────────────── */}
      <div
        style={{
          margin: "0 -16px 24px",
          padding: isMobile ? "32px 20px 28px" : "36px 40px 32px",
          background: `linear-gradient(135deg, ${effectiveBannerColor}ee 0%, ${effectiveBannerColor}99 100%)`,
          position: "relative" as const,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "white", margin: "0 0 6px", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>Resource Center</h1>
            {editingBanner ? (
              <input
                autoFocus
                value={bannerTextDraft}
                onChange={e => setBannerTextDraft(e.target.value)}
                onBlur={() => {}}
                style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 8, padding: "4px 10px", color: "white", fontSize: 14, width: "100%", maxWidth: 500, outline: "none", fontFamily: "Inter, sans-serif" }}
              />
            ) : (
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: 0 }}>{bannerText}</p>
            )}
          </div>

          {/* Edit banner button */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {editingBanner ? (
              <>
                {/* Color swatches */}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", maxWidth: 180 }}>
                  {DEFAULT_BANNER_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setBannerColorDraft(c)}
                      style={{
                        width: 22, height: 22, borderRadius: "50%", background: c, border: bannerColorDraft === c ? "2px solid white" : "2px solid transparent",
                        cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      }}
                    />
                  ))}
                  {/* Custom color picker */}
                  <input
                    type="color"
                    value={bannerColorDraft}
                    onChange={e => setBannerColorDraft(e.target.value)}
                    style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid white", cursor: "pointer", padding: 0, overflow: "hidden" }}
                    title="Custom color"
                  />
                </div>
                <button
                  onClick={() => { setBannerColor(bannerColorDraft); setBannerText(bannerTextDraft); setEditingBanner(false); }}
                  style={{ padding: "6px 14px", background: "white", color: effectiveBannerColor, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >Save</button>
                <button
                  onClick={() => { setBannerTextDraft(bannerText); setBannerColorDraft(bannerColor); setEditingBanner(false); }}
                  style={{ padding: "6px 10px", background: "rgba(0,0,0,0.2)", color: "white", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
                >Cancel</button>
              </>
            ) : (
              <button
                onClick={() => { setBannerTextDraft(bannerText); setBannerColorDraft(bannerColor); setEditingBanner(true); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                <Edit2 size={13} /> Edit Banner
              </button>
            )}
            {isAdmin && !editingBanner && (
              <button
                onClick={() => { resetForm(); setShowAddForm(true); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "white", color: effectiveBannerColor, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                <Plus size={14} /> Add Resource
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── SEARCH ──────────────────────────────────── */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <Search size={16} color={text2} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tools..."
          style={{ width: "100%", padding: "10px 14px 10px 40px", border: `1.5px solid ${inputBorder}`, borderRadius: 10, fontSize: 14, color: text1, outline: "none", background: inputBg, boxSizing: "border-box" as const }}
        />
      </div>

      {/* ── CATEGORY PILLS ──────────────────────────── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: isMobile ? "auto" : undefined, flexWrap: isMobile ? "nowrap" : "wrap", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" as const }}>
        {STATIC_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "6px 14px", borderRadius: 999, border: "1.5px solid",
              borderColor: activeCategory === cat ? effectiveBannerColor : inputBorder,
              background: activeCategory === cat ? (isDark ? `${effectiveBannerColor}25` : `${effectiveBannerColor}15`) : inputBg,
              color: activeCategory === cat ? effectiveBannerColor : text2,
              fontSize: 12, fontWeight: activeCategory === cat ? 600 : 400,
              cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", transition: "all 150ms",
            }}
          >{cat}</button>
        ))}
      </div>

      {/* ── TOOLS GRID ──────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {combinedTools.map(tool => (
          <div
            key={tool.isDynamic ? tool.dynamicId : tool.name}
            onClick={() => { if (tool.url) { const a = document.createElement("a"); a.href = tool.url; a.target = "_blank"; a.rel = "noopener noreferrer"; document.body.appendChild(a); a.click(); document.body.removeChild(a); } }}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, background: cardBg, border: `1px solid ${border}`, borderRadius: 14, cursor: "pointer", transition: "all 150ms", position: "relative" as const }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = effectiveBannerColor; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = border; }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: isDark ? "#252528" : "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
              {getIconForTool(tool)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: text1, margin: "0 0 2px" }}>{tool.name}</p>
              <p style={{ fontSize: 12, color: text2, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{tool.desc}</p>
            </div>
            <ExternalLink size={14} color={text2} style={{ flexShrink: 0 }} />
            {tool.isDynamic && isAdmin && tool.dynamicId && (
              <div style={{ display: "flex", gap: 4, position: "absolute" as const, top: 8, right: 8 }}>
                <button onClick={e => { e.stopPropagation(); const dr = getDynamicResource(tool.dynamicId!); if (dr) handleEditResource(dr); }} style={{ width: 24, height: 24, background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✎</button>
                <button onClick={e => { e.stopPropagation(); const dr = getDynamicResource(tool.dynamicId!); if (dr) setDeleteConfirm(dr); }} style={{ width: 24, height: 24, background: "rgba(220,38,38,0.7)", border: "none", borderRadius: "50%", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>×</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {combinedTools.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <p style={{ fontSize: 14, color: text2 }}>No tools found matching your search.</p>
        </div>
      )}

      {/* ── ADD/EDIT MODAL ───────────────────────────── */}
      {showAddForm && isAdmin && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : 16 }} onClick={() => { setShowAddForm(false); resetForm(); }}>
          <div style={{ width: "100%", maxWidth: isMobile ? "100%" : 520, background: isDark ? "#1C1C1E" : "white", borderRadius: isMobile ? "16px 16px 0 0" : 16, padding: isMobile ? "20px 16px" : 28, maxHeight: "90vh", overflowY: "auto", paddingBottom: isMobile ? "calc(20px + env(safe-area-inset-bottom,0px))" : 28 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: text1, margin: 0 }}>{editingResource ? "Edit Resource" : "Add Resource"}</h3>
              <button onClick={() => { setShowAddForm(false); resetForm(); }} style={{ padding: 6, border: "none", background: "transparent", cursor: "pointer" }}><X size={18} color={text2} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: text2, display: "block", marginBottom: 4 }}>Resource URL</label>
                <div style={{ position: "relative" }}>
                  <input value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} onBlur={() => autoPopulateFromUrl(form.url)} type="url" placeholder="https://..." style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${inputBorder}`, borderRadius: 10, fontSize: 16, color: text1, background: inputBg, outline: "none", boxSizing: "border-box" as const, minHeight: 48 }} />
                  {urlFetching && <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}><Loader2 size={16} color="#10B981" className="animate-spin" /></div>}
                </div>
                {urlPreviewLogo && <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, padding: "6px 10px", background: isDark ? "#252528" : "#F9FAFB", borderRadius: 8, width: "fit-content" }}><img src={urlPreviewLogo} alt="" style={{ width: 20, height: 20, borderRadius: 4 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} /><span style={{ fontSize: 12, color: text2 }}>{urlPreviewDomain}</span></div>}
              </div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: text2, display: "block", marginBottom: 4 }}>Name *</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Notion, Shopify..." style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${inputBorder}`, borderRadius: 10, fontSize: 16, color: text1, background: inputBg, outline: "none", boxSizing: "border-box" as const, minHeight: 48 }} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: text2, display: "block", marginBottom: 4 }}>Short description *</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What does this tool do?" rows={2} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${inputBorder}`, borderRadius: 10, fontSize: 16, color: text1, background: inputBg, outline: "none", resize: "vertical", boxSizing: "border-box" as const, fontFamily: "Inter, sans-serif", minHeight: 48 }} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: text2, display: "block", marginBottom: 4 }}>Category</label><select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${inputBorder}`, borderRadius: 10, fontSize: 16, color: text1, background: inputBg, cursor: "pointer", minHeight: 48 }}>{STATIC_CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setForm(p => ({ ...p, published: !p.published }))} style={{ width: 44, height: 24, borderRadius: 12, border: "none", background: form.published ? "#10B981" : (isDark ? "#333" : "#D1D5DB"), cursor: "pointer", position: "relative", transition: "background 150ms" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: form.published ? 23 : 3, transition: "left 150ms" }} />
                </button>
                <span style={{ fontSize: 13, color: text1, fontWeight: 500 }}>{form.published ? "Published" : "Draft"}</span>
              </div>
            </div>
            <button onClick={handleSaveResource} disabled={uploading} style={{ width: "100%", marginTop: 20, padding: "12px 24px", background: "#10B981", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", minHeight: 44, opacity: uploading ? 0.6 : 1 }}>
              {uploading ? "Saving..." : editingResource ? "Save Changes" : "Add Resource"}
            </button>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ───────────────────────────── */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setDeleteConfirm(null)}>
          <div style={{ width: "100%", maxWidth: 360, background: isDark ? "#1C1C1E" : "white", borderRadius: 16, padding: 24, textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <p style={{ fontSize: 18, fontWeight: 700, color: text1, marginBottom: 8 }}>Delete this resource?</p>
            <p style={{ fontSize: 14, color: text2, marginBottom: 20 }}>{deleteConfirm.title}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: "10px 16px", border: `1.5px solid ${inputBorder}`, borderRadius: 10, background: "transparent", color: text1, fontSize: 14, fontWeight: 500, cursor: "pointer", minHeight: 44 }}>Cancel</button>
              <button onClick={handleDeleteResource} style={{ flex: 1, padding: "10px 16px", background: "#DC2626", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
