import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useAllTasks } from "@/hooks/useTasks";
import { useContacts } from "@/hooks/useContacts";
import { useExpenses } from "@/hooks/useExpenses";
import { useUpsertPreferences } from "@/hooks/useUserPreferences";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

export default function MonthlyReviewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const readMode = searchParams.get("mode") === "read";
  const { user, profile } = useAuth();
  const { data: projects = [] } = useProjects();
  const { data: tasks = [] } = useAllTasks();
  const { data: contacts = [] } = useContacts();
  const { data: expenses = [] } = useExpenses();
  const upsertPrefs = useUpsertPreferences();
  const [saving, setSaving] = useState(false);
  const [approved, setApproved] = useState(false);

  const now = new Date();
  const monthName = format(now, "MMMM");
  const year = format(now, "yyyy");
  const reviewMonth = `${monthName} ${year}`;
  const firstName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  const activeGoals = projects.filter(p => !p.archived && p.type === "goal").map(p => {
    const pt = tasks.filter(t => t.project_id === p.id);
    const done = pt.filter(t => t.status === "done").length;
    const total = pt.length;
    return { ...p, pct: total > 0 ? Math.round((done / total) * 100) : 0, done, total };
  });

  const handleApprove = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await (supabase as any).from("monthly_reviews").upsert({ user_id: user.id, review_month: reviewMonth, month: now.getMonth() + 1, year: now.getFullYear(), completed_at: new Date().toISOString() }, { onConflict: "user_id,month,year" });
      upsertPrefs.mutate({ last_review_month: reviewMonth } as any);
      setApproved(true);
      toast.success("Review saved!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) { toast.error("Failed to save review"); }
    setSaving(false);
  };

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 120px" }}>
        <button onClick={() => navigate("/dashboard")} style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500, background: "none", border: "none", cursor: "pointer", marginBottom: 48 }}>← Back</button>
        <h1 style={{ fontSize: 64, fontWeight: 800, color: "#111827", lineHeight: 1, marginBottom: 8 }}>{monthName}</h1>
        <h2 style={{ fontSize: 64, fontWeight: 800, color: "#6366f1", lineHeight: 1, marginBottom: 32 }}>{year}.</h2>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.8, marginBottom: 48 }}>Hey {firstName}, let’s review your {monthName}.</p>

        <div style={{ height: 1, background: "#e5e7eb", margin: "40px 0" }} />
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 24 }}>01 — GOALS</p>
        {activeGoals.length === 0 ? <p style={{ color: "#9ca3af" }}>No active goals.</p> : activeGoals.map(g => (
          <div key={g.id} style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{g.name}</p>
            <div style={{ height: 6, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${g.pct}%` }} transition={{ duration: 0.8 }} style={{ height: "100%", background: "#6366f1", borderRadius: 99 }} />
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{g.done}/{g.total} tasks · {g.pct}%</p>
          </div>
        ))}

        {!readMode && (
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <button onClick={handleApprove} disabled={saving || approved} style={{ background: approved ? "#16a34a" : "#111827", color: "white", border: "none", borderRadius: 16, padding: "20px 48px", cursor: "pointer", fontSize: 16, fontWeight: 600, width: "100%", maxWidth: 400 }}>
              {saving ? "Saving..." : approved ? `✔ ${monthName} Approved` : `Approve ${monthName} Review`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
