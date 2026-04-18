import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/AppShell";

export default function AdminTemplates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ title: "", description: "", template_type: "career", price: "", file_url: "", preview_url: "", tags: "" });
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.email === "myslimher@gmail.com";

  useEffect(() => {
    if (!isAdmin) return;
    (supabase as any).from("shop_templates").select("*").order("created_at", { ascending: false }).then(({ data }: any) => setTemplates(data || []));
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <AppShell>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16, fontFamily: "Inter, sans-serif" }}>
          <Lock size={48} color="#9CA3AF" />
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>Admin Access Only</h2>
          <p style={{ fontSize: 14, color: "#6B7280" }}>You don't have permission to view this page.</p>
          <button onClick={() => navigate("/")} style={{ padding: "10px 24px", background: "#6366f1", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Go Home</button>
        </div>
      </AppShell>
    );
  }

  const handleAdd = async () => {
    if (!newTemplate.title.trim()) { toast.error("Title required"); return; }
    setSaving(true);
    try {
      const { error } = await (supabase as any).from("shop_templates").insert({
        title: newTemplate.title.trim(),
        description: newTemplate.description.trim(),
        template_type: newTemplate.template_type,
        price: parseFloat(newTemplate.price) || 0,
        file_url: newTemplate.file_url.trim() || null,
        preview_url: newTemplate.preview_url.trim() || null,
        tags: newTemplate.tags ? newTemplate.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        is_active: true,
        created_by: user!.id,
      });
      if (error) throw error;
      toast.success("Template added!");
      setShowAdd(false);
      setNewTemplate({ title: "", description: "", template_type: "career", price: "", file_url: "", preview_url: "", tags: "" });
      const { data } = await (supabase as any).from("shop_templates").select("*").order("created_at", { ascending: false });
      setTemplates(data || []);
    } catch (err: any) { toast.error("Failed: " + err.message); }
    setSaving(false);
  };

  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" as const, fontFamily: "Inter, sans-serif" };

  return (
    <AppShell>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 16px 100px", fontFamily: "Inter, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button onClick={() => navigate("/admin")} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}><ArrowLeft size={18} color="#374151" /></button>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: 0 }}>Template Library</h1>
          <button onClick={() => setShowAdd(!showAdd)} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#6366f1", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <Plus size={14} /> Add Template
          </button>
        </div>

        {showAdd && (
          <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>New Template</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>Title *</label>
                <input value={newTemplate.title} onChange={e => setNewTemplate(p => ({ ...p, title: e.target.value }))} placeholder="Resume Template" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>Type</label>
                <select value={newTemplate.template_type} onChange={e => setNewTemplate(p => ({ ...p, template_type: e.target.value }))} style={inputStyle}>
                  <option value="career">Career</option>
                  <option value="finance">Finance</option>
                  <option value="productivity">Productivity</option>
                  <option value="journal">Journal</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>Price ($)</label>
                <input type="number" value={newTemplate.price} onChange={e => setNewTemplate(p => ({ ...p, price: e.target.value }))} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>Tags (comma-separated)</label>
                <input value={newTemplate.tags} onChange={e => setNewTemplate(p => ({ ...p, tags: e.target.value }))} placeholder="resume, career, tech" style={inputStyle} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>Description</label>
                <textarea value={newTemplate.description} onChange={e => setNewTemplate(p => ({ ...p, description: e.target.value }))} placeholder="What's included..." rows={2} style={{ ...inputStyle, resize: "none" as const }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>File URL</label>
                <input value={newTemplate.file_url} onChange={e => setNewTemplate(p => ({ ...p, file_url: e.target.value }))} placeholder="https://..." style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>Preview URL</label>
                <input value={newTemplate.preview_url} onChange={e => setNewTemplate(p => ({ ...p, preview_url: e.target.value }))} placeholder="https://..." style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowAdd(false)} style={{ padding: "9px 20px", border: "1px solid #E5E7EB", borderRadius: 8, background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleAdd} disabled={saving} style={{ padding: "9px 20px", background: "#6366f1", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{saving ? "Saving..." : "Save Template"}</button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {templates.length === 0 && <p style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", padding: "60px 0" }}>No templates yet. Add your first one above.</p>}
          {templates.map(t => (
            <div key={t.id} style={{ padding: "14px 18px", background: "white", border: "1px solid #F3F4F6", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>{t.title}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: t.is_active ? "#F0FDF4" : "#F3F4F6", color: t.is_active ? "#065F46" : "#6B7280" }}>{t.is_active ? "Live" : "Draft"}</span>
                  {t.price > 0 && <span style={{ fontSize: 11, fontWeight: 600, color: "#6366f1" }}>${t.price}</span>}
                </div>
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>
                  {t.template_type}{t.description ? ` \u00b7 ${t.description.substring(0, 60)}` : ""}
                </p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={async () => { await (supabase as any).from("shop_templates").update({ is_active: !t.is_active }).eq("id", t.id); setTemplates(p => p.map(x => x.id === t.id ? { ...x, is_active: !x.is_active } : x)); toast.success(t.is_active ? "Set to Draft" : "Published"); }} style={{ padding: "5px 10px", border: "1px solid #E5E7EB", borderRadius: 6, background: "white", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "#374151" }}>{t.is_active ? "Unpublish" : "Publish"}</button>
                <button onClick={async () => { if (!confirm("Delete this template?")) return; await (supabase as any).from("shop_templates").delete().eq("id", t.id); setTemplates(p => p.filter(x => x.id !== t.id)); toast.success("Deleted"); }} style={{ padding: "5px 10px", border: "1px solid #FECACA", borderRadius: 6, background: "white", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "#DC2626" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
