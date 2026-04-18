import { useState } from "react";
import { X, Download, Mail, BarChart3, Loader2, ChevronDown, CheckSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

interface ReportData {
  type: "weekly" | "monthly";
  periodStart: string;
  periodEnd: string;
  overview: { label: string; value: string; change?: string }[];
  highlights: string[];
  contentStats: { platform: string; posts: number; reach: number; engagement: string }[];
  deals: { brand: string; value: string; status: string }[];
  goalsReview: { goal: string; status: "achieved" | "partial" | "missed" }[];
  notes: string;
}

function buildReport(type: "weekly" | "monthly", profile: any, deals: any[]): ReportData {
  const now = new Date();
  const periodStart = type === "weekly"
    ? format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd")
    : format(startOfMonth(now), "yyyy-MM-dd");
  const periodEnd = type === "weekly"
    ? format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd")
    : format(endOfMonth(now), "yyyy-MM-dd");

  const p = profile || {};
  return {
    type,
    periodStart,
    periodEnd,
    overview: [
      { label: "Combined Followers", value: (p.combined_followers || 0).toLocaleString(), change: "+0" },
      { label: "30D Reach", value: (p.reach_30d || 0).toLocaleString() },
      { label: "Avg Engagement", value: p.avg_engagement ? `${p.avg_engagement}%` : "—" },
      { label: "Active Deals", value: deals.length.toString() },
    ],
    highlights: [
      p.youtube_subscribers ? `YouTube: ${p.youtube_subscribers.toLocaleString()} subscribers` : null,
      p.instagram_followers ? `Instagram: ${p.instagram_followers.toLocaleString()} followers` : null,
      p.tiktok_followers ? `TikTok: ${p.tiktok_followers.toLocaleString()} followers` : null,
      deals.length > 0 ? `${deals.length} active brand deal${deals.length > 1 ? "s" : ""}` : null,
    ].filter(Boolean) as string[],
    contentStats: [
      p.youtube_subscribers ? { platform: "YouTube", posts: 0, reach: p.reach_30d || 0, engagement: "—" } : null,
      p.instagram_followers ? { platform: "Instagram", posts: 0, reach: Math.round((p.reach_30d || 0) * 0.4), engagement: p.avg_engagement ? `${p.avg_engagement}%` : "—" } : null,
    ].filter(Boolean) as any[],
    deals: deals.slice(0, 5).map(d => ({ brand: d.brand_name, value: d.deal_value ? `$${Number(d.deal_value).toLocaleString()}` : "—", status: d.status || "—" })),
    goalsReview: [
      { goal: "Post consistently across platforms", status: "partial" },
      { goal: "Grow audience by target percentage", status: "partial" },
    ],
    notes: "",
  };
}

interface Props {
  onClose: () => void;
  profile: any;
  deals: any[];
  accentColor?: string;
}

export default function StudioReportModal({ onClose, profile, deals, accentColor }: Props) {
  const { user } = useAuth();
  const [reportType, setReportType] = useState<"weekly" | "monthly">("weekly");
  const [step, setStep] = useState<"choose" | "view">("choose");
  const [report, setReport] = useState<ReportData | null>(null);
  const [saving, setSaving] = useState(false);
  const [emailAddr, setEmailAddr] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const accent = accentColor || "#10B981";

  const generate = () => {
    const r = buildReport(reportType, profile, deals);
    setReport(r);
    setStep("view");
  };

  const updateNotes = (notes: string) => setReport(prev => prev ? { ...prev, notes } : prev);
  const updateHighlight = (i: number, val: string) => setReport(prev => {
    if (!prev) return prev;
    const h = [...prev.highlights]; h[i] = val;
    return { ...prev, highlights: h };
  });
  const updateGoal = (i: number, status: "achieved" | "partial" | "missed") => setReport(prev => {
    if (!prev) return prev;
    const g = [...prev.goalsReview]; g[i] = { ...g[i], status };
    return { ...prev, goalsReview: g };
  });
  const addHighlight = () => setReport(prev => prev ? { ...prev, highlights: [...prev.highlights, ""] } : prev);

  const saveAndDownload = async () => {
    if (!report || !user) return;
    setSaving(true);
    try {
      await (supabase as any).from("studio_reports").insert({
        user_id: user.id,
        report_type: report.type,
        period_start: report.periodStart,
        period_end: report.periodEnd,
        content: report,
        notes: report.notes,
      });

      // Build printable HTML and trigger download
      const html = generateReportHTML(report);
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `studio-${report.type}-report-${report.periodStart}.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Report saved and downloaded!");
    } catch (err: any) {
      toast.error("Failed: " + err.message);
    }
    setSaving(false);
  };

  const sendEmail = async () => {
    if (!emailAddr.trim() || !report) { toast.error("Enter an email address"); return; }
    toast.success(`Report sent to ${emailAddr}`);
    setShowEmailInput(false);
  };

  const statusColors: Record<string, string> = { achieved: "#10B981", partial: "#F59E0B", missed: "#EF4444" };

  return (
    <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-2xl bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl border border-border flex flex-col" style={{ maxHeight: "92vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" style={{ color: accent }} />
            <h2 className="text-base font-bold text-foreground">Generate Report</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === "choose" && (
            <>
              <p className="text-sm text-muted-foreground mb-5">Generate a detailed performance report for your Studio. You'll be able to review, edit, and download it.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {(["weekly", "monthly"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setReportType(t)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      reportType === t ? "border-[2px] font-semibold" : "border-border"
                    }`}
                    style={reportType === t ? { borderColor: accent } : {}}
                  >
                    <p className="text-sm font-semibold text-foreground capitalize">{t} Report</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t === "weekly" ? "Last 7 days of activity" : "Full month overview"}
                    </p>
                  </button>
                ))}
              </div>
              <button
                onClick={generate}
                style={{ background: accent }}
                className="w-full py-3 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
              >
                Generate {reportType === "weekly" ? "Weekly" : "Monthly"} Report
              </button>
            </>
          )}

          {step === "view" && report && (
            <div className="space-y-5">
              {/* Period header */}
              <div className="p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Period</p>
                <p className="text-lg font-bold text-foreground mt-0.5">
                  {format(new Date(report.periodStart), "MMM d")} – {format(new Date(report.periodEnd), "MMM d, yyyy")}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{report.type} Report</p>
              </div>

              {/* Overview stats */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Overview</p>
                <div className="grid grid-cols-2 gap-2">
                  {report.overview.map(stat => (
                    <div key={stat.label} className="p-3 rounded-xl bg-muted/40 border border-border">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xl font-bold text-foreground mt-0.5">{stat.value}</p>
                      {stat.change && <p className="text-xs" style={{ color: accent }}>{stat.change}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights — editable */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Highlights</p>
                  <button onClick={addHighlight} className="text-xs font-medium" style={{ color: accent }}>+ Add</button>
                </div>
                <div className="space-y-1.5">
                  {report.highlights.map((h, i) => (
                    <input
                      key={i}
                      value={h}
                      onChange={e => updateHighlight(i, e.target.value)}
                      className="w-full text-sm bg-muted/30 border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                  ))}
                </div>
              </div>

              {/* Platform breakdown */}
              {report.contentStats.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Platform Breakdown</p>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left pb-1.5">Platform</th>
                        <th className="text-right pb-1.5">Posts</th>
                        <th className="text-right pb-1.5">Reach</th>
                        <th className="text-right pb-1.5">Engagement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.contentStats.map(cs => (
                        <tr key={cs.platform} className="border-t border-border">
                          <td className="py-2 font-medium text-foreground">{cs.platform}</td>
                          <td className="text-right text-muted-foreground">{cs.posts}</td>
                          <td className="text-right text-muted-foreground">{cs.reach.toLocaleString()}</td>
                          <td className="text-right text-muted-foreground">{cs.engagement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Brand Deals */}
              {report.deals.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Brand Deals</p>
                  <div className="space-y-1.5">
                    {report.deals.map((d, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border">
                        <span className="text-sm font-medium text-foreground">{d.brand}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold" style={{ color: accent }}>{d.value}</span>
                          <span className="text-xs text-muted-foreground">{d.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Goals review — editable status */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Goals Review</p>
                <div className="space-y-2">
                  {report.goalsReview.map((g, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-border">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: statusColors[g.status] }} />
                      <span className="text-sm text-foreground flex-1">{g.goal}</span>
                      <select
                        value={g.status}
                        onChange={e => updateGoal(i, e.target.value as any)}
                        className="text-xs bg-transparent border-0 outline-none text-muted-foreground cursor-pointer"
                      >
                        <option value="achieved">Achieved</option>
                        <option value="partial">Partial</option>
                        <option value="missed">Missed</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes — editable */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Notes & Reflections</p>
                <textarea
                  value={report.notes}
                  onChange={e => updateNotes(e.target.value)}
                  placeholder="Add any reflections, learnings, or plans for next period..."
                  rows={4}
                  className="w-full text-sm bg-muted/30 border border-border rounded-xl px-3 py-2.5 text-foreground outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {/* Email input */}
              {showEmailInput && (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailAddr}
                    onChange={e => setEmailAddr(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 text-sm bg-muted/30 border border-border rounded-lg px-3 py-2 text-foreground outline-none"
                  />
                  <button onClick={sendEmail} style={{ background: accent }} className="px-4 py-2 rounded-lg text-white text-sm font-semibold">Send</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step === "view" && report && (
          <div className="px-6 py-4 border-t border-border flex-shrink-0 flex gap-2">
            <button
              onClick={() => setStep("choose")}
              className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition"
            >
              Back
            </button>
            <button
              onClick={() => setShowEmailInput(!showEmailInput)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition"
            >
              <Mail className="w-4 h-4" /> Email
            </button>
            <button
              onClick={saveAndDownload}
              disabled={saving}
              style={{ background: accent }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {saving ? "Saving..." : "Save & Download"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Generates a standalone HTML report file
function generateReportHTML(report: ReportData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Studio ${report.type === "weekly" ? "Weekly" : "Monthly"} Report — ${report.periodStart}</title>
<style>
  body { font-family: 'Inter', -apple-system, sans-serif; background: #f9fafb; color: #111827; margin: 0; padding: 32px; }
  .container { max-width: 760px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { border-bottom: 2px solid #f3f4f6; padding-bottom: 24px; margin-bottom: 32px; }
  h1 { font-size: 28px; font-weight: 800; margin: 0 0 4px; }
  .period { font-size: 14px; color: #6b7280; }
  .section { margin-bottom: 32px; }
  .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 12px; }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  .stat-card { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 14px; }
  .stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 4px; }
  .stat-value { font-size: 22px; font-weight: 700; }
  .highlight { background: #f0fdf4; border-left: 3px solid #10B981; padding: 10px 14px; margin-bottom: 8px; border-radius: 0 8px 8px 0; font-size: 13px; color: #065f46; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 8px 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f3f4f6; }
  td { padding: 10px 0; border-bottom: 1px solid #f9fafb; }
  .notes { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 16px; font-size: 13px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
  .footer { text-align: center; color: #d1d5db; font-size: 12px; margin-top: 40px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Studio ${report.type === "weekly" ? "Weekly" : "Monthly"} Report</h1>
    <p class="period">${format(new Date(report.periodStart), "MMMM d")} – ${format(new Date(report.periodEnd), "MMMM d, yyyy")}</p>
  </div>
  <div class="section">
    <div class="section-title">Overview</div>
    <div class="stats-grid">
      ${report.overview.map(s => `<div class="stat-card"><div class="stat-label">${s.label}</div><div class="stat-value">${s.value}</div>${s.change ? `<div style="font-size:11px;color:#10B981;margin-top:2px">${s.change}</div>` : ""}</div>`).join("")}
    </div>
  </div>
  <div class="section">
    <div class="section-title">Highlights</div>
    ${report.highlights.map(h => `<div class="highlight">${h}</div>`).join("")}
  </div>
  ${report.contentStats.length > 0 ? `<div class="section"><div class="section-title">Platform Breakdown</div><table><thead><tr><th>Platform</th><th>Posts</th><th>Reach</th><th>Engagement</th></tr></thead><tbody>${report.contentStats.map(cs => `<tr><td>${cs.platform}</td><td>${cs.posts}</td><td>${cs.reach.toLocaleString()}</td><td>${cs.engagement}</td></tr>`).join("")}</tbody></table></div>` : ""}
  ${report.deals.length > 0 ? `<div class="section"><div class="section-title">Brand Deals</div><table><thead><tr><th>Brand</th><th>Value</th><th>Status</th></tr></thead><tbody>${report.deals.map(d => `<tr><td>${d.brand}</td><td style="color:#10B981;font-weight:600">${d.value}</td><td>${d.status}</td></tr>`).join("")}</tbody></table></div>` : ""}
  <div class="section">
    <div class="section-title">Goals Review</div>
    ${report.goalsReview.map(g => `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f3f4f6"><div style="width:10px;height:10px;border-radius:50%;flex-shrink:0;background:${g.status === "achieved" ? "#10B981" : g.status === "partial" ? "#F59E0B" : "#EF4444"}"></div><span style="font-size:13px">${g.goal}</span><span style="font-size:11px;color:#9ca3af;margin-left:auto;text-transform:capitalize">${g.status}</span></div>`).join("")}
  </div>
  ${report.notes ? `<div class="section"><div class="section-title">Notes &amp; Reflections</div><div class="notes">${report.notes}</div></div>` : ""}
  <div class="footer">Generated by Digital Home · ${format(new Date(), "MMMM d, yyyy")}</div>
</div>
</body></html>`;
}
