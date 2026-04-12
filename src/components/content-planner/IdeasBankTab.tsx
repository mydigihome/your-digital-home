import { useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const PLATFORMS = ["instagram", "youtube", "tiktok", "twitter", "linkedin", "substack"];
const STATUSES = ["idea", "in_progress", "ready", "scheduled", "published"];

export default function IdeasBankTab() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", platform: "instagram", category: "", status: "idea" });

  const handleCreate = async () => {
    if (!form.title || !user) return;
    const { error } = await (supabase as any).from("content_ideas").insert({ ...form, user_id: user.id });
    if (error) { toast.error("Failed to create idea"); return; }
    toast.success("Idea saved!");
    setForm({ title: "", platform: "instagram", category: "", status: "idea" });
    setShowForm(false);
    qc.invalidateQueries({ queryKey: ["content_ideas"] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Ideas Bank</h3>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium"><Plus className="w-3.5 h-3.5" /> Add Idea</button>
      </div>
      {showForm && (
        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Content idea title" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <div className="grid grid-cols-2 gap-2">
            <select value={form.platform} onChange={e => setForm(p => ({ ...p, platform: e.target.value }))} className="px-3 py-2 text-sm border border-border rounded-lg bg-background">
              {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="px-3 py-2 text-sm border border-border rounded-lg bg-background">
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="Category" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <div className="flex gap-2">
            <button onClick={handleCreate} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Save Idea</button>
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 border border-border rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}
      <p className="text-sm text-muted-foreground text-center py-4">Connect your studio profile to see content ideas here.</p>
    </div>
  );
}
