import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/AppShell";

export default function AdminTemplates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    (supabase as any).from("shop_templates").select("*").order("created_at", { ascending: false }).then(({ data }: any) => setTemplates(data || []));
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}><ArrowLeft className="h-4 w-4" /></Button>
          <h1 className="text-2xl font-bold">Template Library Admin</h1>
        </div>
        <div className="space-y-2">
          {templates.map(t => (
            <div key={t.id} className="p-4 bg-card border border-border rounded-xl flex items-center justify-between">
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-sm text-muted-foreground">{t.template_type} · {t.is_active ? "Live" : "Draft"}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={async () => { if (!confirm("Delete?")) return; await (supabase as any).from("shop_templates").delete().eq("id", t.id); setTemplates(p => p.filter(x => x.id !== t.id)); toast.success("Deleted"); }}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          {templates.length === 0 && <p className="text-muted-foreground text-center py-8">No templates yet. Add from the Admin Dashboard.</p>}
        </div>
      </div>
    </div>
  );
}
