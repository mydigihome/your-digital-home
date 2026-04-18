import { useState, useRef } from "react";
import { BarChart2, X, Download, Mail, ChevronDown, Loader2, Plus, Trash2, Edit3, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useUserFinances } from "@/hooks/useUserFinances";
import { useProjects } from "@/hooks/useProjects";
import { useAllTasks } from "@/hooks/useTasks";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from "date-fns";
import { toast } from "sonner";

interface ReportSection {
  id: string;
  title: string;
  content: string;
  editable: boolean;
}

interface Props {
  onClose?: () => void;
}

export default function StudioReportGenerator({ onClose }: Props) {
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();
  const { data: finances } = useUserFinances();
  const { data: projects = [] } = useProjects();
  const { data: tasks = [] } = useAllTasks();
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [sections, setSections] = useState<ReportSection[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [emailTo, setEmailTo] = useState(user?.email || '');
  const [sendingEmail, setSendingEmail] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const accentColor = (prefs as any)?.theme_color ||
    (typeof window !== 'undefined' ? localStorage.getItem('dh_accent_color') : null) || '#10B981';

  // Load studio profile for stats
  const { data: studioProfile } = useQuery({
    queryKey: ['studio_profile_report', user?.id],
    queryFn: async () => {
      const { data } = await (supabase as any).from('studio_profile').select('*').eq('user_id', user!.id).maybeSingle();
      return data || {};
    },
    enabled: !!user,
  });

  // Load content items
  const { data: contentItems = [] } = useQuery({
    queryKey: ['content_items_report', user?.id],
    queryFn: async () => {
      const { data } = await (supabase as any).from('content_items').select('*').eq('user_id', user!.id).order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  // Load brand deals
  const { data: deals = [] } = useQuery({
    queryKey: ['deals_report', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('brand_deals').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  // Load journal entries for the period
  const { data: journalEntries = [] } = useQuery({
    queryKey: ['journal_report', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('journal_entries').select('*').order('created_at', { ascending: false }).limit(50);
      return data || [];
    },
    enabled: !!user,
  });

  const getPeriodLabel = () => {
    const now = new Date();
    if (period === 'weekly') {
      const start = startOfWeek(now);
      const end = endOfWeek(now);
      return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`;
    }
    return format(now, 'MMMM yyyy');
  };

  const generateReport = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate generation

    const now = new Date();
    const periodStart = period === 'weekly' ? startOfWeek(now) : startOfMonth(now);
    const periodEnd = period === 'weekly' ? endOfWeek(now) : endOfMonth(now);

    // Filter data for period
    const periodContent = contentItems.filter((c: any) => {
      const d = new Date(c.created_at);
      return d >= periodStart && d <= periodEnd;
    });
    const periodJournal = journalEntries.filter((j: any) => {
      const d = new Date(j.created_at);
      return d >= periodStart && d <= periodEnd;
    });
    const periodTasks = tasks.filter((t: any) => {
      const d = new Date(t.created_at || t.updated_at || now);
      return d >= periodStart && d <= periodEnd;
    });
    const completedTasks = periodTasks.filter((t: any) => t.status === 'done').length;
    const totalDeals = (deals as any[]).reduce((sum, d) => sum + Number(d.deal_value || 0), 0);
    const income = Number((finances as any)?.monthly_income || 0);
    const savings = Number((finances as any)?.current_savings || 0);
    const sp = studioProfile as any;

    const builtSections: ReportSection[] = [
      {
        id: 'overview',
        title: '📊 Period Overview',
        editable: true,
        content: `${period === 'weekly' ? 'This week' : 'This month'} at a glance:\n\n• Content created: ${periodContent.length} piece${periodContent.length !== 1 ? 's' : ''}\n• Tasks completed: ${completedTasks} of ${periodTasks.length}\n• Journal entries: ${periodJournal.length}\n• Active platforms: ${[sp?.instagram_handle, sp?.youtube_handle, sp?.tiktok_handle].filter(Boolean).length || 0}\n\nAdd your own highlights and reflections here.`,
      },
      {
        id: 'content',
        title: '🎬 Content Performance',
        editable: true,
        content: [
          `Pieces created this ${period === 'weekly' ? 'week' : 'month'}: ${periodContent.length}`,
          periodContent.filter((c: any) => c.stage === 'posted').length > 0 ? `Published: ${periodContent.filter((c: any) => c.stage === 'posted').length}` : null,
          periodContent.filter((c: any) => c.stage === 'in_progress').length > 0 ? `In Progress: ${periodContent.filter((c: any) => c.stage === 'in_progress').length}` : null,
          sp?.combined_followers ? `Total followers: ${Number(sp.combined_followers).toLocaleString()}` : null,
          sp?.reach_30d ? `30D Reach: ${Number(sp.reach_30d).toLocaleString()}` : null,
          sp?.avg_engagement ? `Avg Engagement: ${sp.avg_engagement}%` : null,
          '\nTop platform this period: add manually',
          'Best performing post: add manually',
        ].filter(Boolean).join('\n'),
      },
      {
        id: 'finance',
        title: '💰 Financial Snapshot',
        editable: true,
        content: [
          income > 0 ? `Monthly income: $${income.toLocaleString()}` : null,
          savings > 0 ? `Current savings: $${savings.toLocaleString()}` : null,
          totalDeals > 0 ? `Brand deal value (all-time): $${totalDeals.toLocaleString()}` : null,
          (deals as any[]).filter((d: any) => d.status === 'active').length > 0 ? `Active deals: ${(deals as any[]).filter((d: any) => d.status === 'active').length}` : null,
          '\nFinancial notes: add manually',
        ].filter(Boolean).join('\n'),
      },
      {
        id: 'goals',
        title: '🎯 Goals & Projects',
        editable: true,
        content: [
          `Active projects: ${projects.filter(p => !p.archived).length}`,
          `Tasks completed: ${completedTasks} of ${periodTasks.length}`,
          `Overall momentum: ${tasks.length > 0 ? Math.round((tasks.filter((t: any) => t.status === 'done').length / tasks.length) * 100) : 0}%`,
          '\nWhat I achieved: add manually',
          'What I\'m carrying forward: add manually',
        ].filter(Boolean).join('\n'),
      },
      {
        id: 'reflection',
        title: '🌱 Reflection & Wins',
        editable: true,
        content: [
          periodJournal.length > 0 ? `Journal entries this ${period}: ${periodJournal.length}` : null,
          '\nBiggest win: add your win here',
          'What went well: write it out',
          'What I\'d do differently: be honest',
          'Intention for next period: set your intention',
        ].filter(Boolean).join('\n'),
      },
      {
        id: 'next',
        title: `📅 ${period === 'weekly' ? 'Next Week' : 'Next Month'} Plan`,
        editable: true,
        content: `Top 3 priorities:\n1. Add priority\n2. Add priority\n3. Add priority\n\nContent to publish:\n• Add piece\n• Add piece\n\nBrand goals:\n• Add goal`,
      },
    ];

    setSections(builtSections);
    setGenerating(false);
    setReportReady(true);
  };

  const updateSection = (id: string, content: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, content } : s));
  };

  const addSection = () => {
    setSections(prev => [...prev, {
      id: `custom_${Date.now()}`,
      title: '📝 Custom Section',
      content: 'Add your notes here...',
      editable: true,
    }]);
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const handleDownload = async () => {
    if (!reportRef.current) return;
    // Build a clean HTML string and trigger download
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${getPeriodLabel()} Report</title><style>body{font-family:Inter,sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#111827}h1{font-size:28px;font-weight:800;margin-bottom:4px}h2{font-size:18px;font-weight:700;margin-top:32px;margin-bottom:12px;border-bottom:2px solid ${accentColor};padding-bottom:6px;color:${accentColor}}p{line-height:1.7;white-space:pre-wrap}.meta{color:#6B7280;font-size:14px;margin-bottom:32px}.section{margin-bottom:28px;padding:20px;border:1px solid #F3F4F6;border-radius:12px;background:#FAFAFA}</style></head><body><h1>Digital Home Report</h1><p class="meta">${getPeriodLabel()} · Generated ${format(new Date(), 'MMM d, yyyy')}</p>${sections.map(s => `<div class="section"><h2>${s.title}</h2><p>${s.content}</p></div>`).join('')}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-home-report-${period}-${format(new Date(), 'yyyy-MM-dd')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded!');
  };

  const handleEmail = async () => {
    if (!emailTo.trim()) { toast.error('Enter an email address'); return; }
    setSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke('send-report-email', {
        body: {
          to: emailTo,
          subject: `Your ${period === 'weekly' ? 'Weekly' : 'Monthly'} Digital Home Report — ${getPeriodLabel()}`,
          period: getPeriodLabel(),
          sections: sections.map(s => ({ title: s.title, content: s.content })),
        },
      });
      if (error) throw error;
      toast.success(`Report sent to ${emailTo}`);
    } catch {
      // Fallback: open mail client
      const subject = encodeURIComponent(`Digital Home Report — ${getPeriodLabel()}`);
      const body = encodeURIComponent(sections.map(s => `${s.title}\n${s.content}`).join('\n\n---\n\n'));
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
      toast.success('Opening email client...');
    }
    setSendingEmail(false);
  };

  // Charts data
  const stageData = [
    { name: 'Ideas', value: contentItems.filter((c: any) => c.stage === 'idea').length },
    { name: 'In Progress', value: contentItems.filter((c: any) => c.stage === 'in_progress').length },
    { name: 'Scheduled', value: contentItems.filter((c: any) => c.stage === 'scheduled').length },
    { name: 'Published', value: contentItems.filter((c: any) => c.stage === 'posted').length },
  ].filter(d => d.value > 0);

  const CHART_COLORS = [accentColor, '#7B5EA7', '#3B82F6', '#F59E0B'];

  const taskData = [
    { name: 'Done', value: tasks.filter((t: any) => t.status === 'done').length },
    { name: 'In Progress', value: tasks.filter((t: any) => t.status === 'in_progress').length },
    { name: 'To Do', value: tasks.filter((t: any) => t.status === 'todo' || t.status === 'backlog').length },
  ].filter(d => d.value > 0);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">Generate Report</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Pull everything together into a downloadable summary</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-full transition">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {!reportReady ? (
            <>
              {/* Period selector */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Report Period</p>
                <div className="flex gap-3">
                  {(['weekly', 'monthly'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className="flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all"
                      style={{
                        borderColor: period === p ? accentColor : 'hsl(var(--border))',
                        background: period === p ? `${accentColor}15` : 'transparent',
                        color: period === p ? accentColor : 'hsl(var(--muted-foreground))',
                      }}
                    >
                      {p === 'weekly' ? '📅 Weekly' : '📆 Monthly'}
                      <span className="block text-[11px] font-normal mt-0.5 opacity-70">
                        {p === 'weekly' ? startOfWeek(new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' – ' + endOfWeek(new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : format(new Date(), 'MMMM yyyy')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* What's included */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="text-xs font-semibold text-foreground mb-2">What's included in your report</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                  {['Period overview & highlights', 'Content pipeline stats', 'Financial snapshot', 'Goals & project progress', 'Journal reflections', 'Platform analytics', 'Next period planning', 'Editable sections'].map(item => (
                    <div key={item} className="flex items-center gap-1.5">
                      <span style={{ color: accentColor }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={generateReport}
                disabled={generating}
                style={{ background: accentColor }}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {generating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating your report...</>
                ) : (
                  <><BarChart2 className="w-4 h-4" /> Generate {period === 'weekly' ? 'Weekly' : 'Monthly'} Report</>
                )}
              </button>
            </>
          ) : (
            <div ref={reportRef}>
              {/* Report title */}
              <div className="text-center mb-6 pb-6 border-b border-border">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Digital Home Report</p>
                <h3 className="text-2xl font-bold text-foreground">{getPeriodLabel()}</h3>
                <p className="text-xs text-muted-foreground mt-1">Generated {format(new Date(), 'MMM d, yyyy')}</p>
              </div>

              {/* Charts */}
              {stageData.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-muted/20 border border-border">
                  <p className="text-xs font-semibold text-foreground mb-3">Content Pipeline</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={stageData} barSize={28}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill={accentColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {taskData.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-muted/20 border border-border">
                  <p className="text-xs font-semibold text-foreground mb-3">Task Breakdown</p>
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie data={taskData} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                          {taskData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {taskData.map((d, i) => (
                        <div key={d.name} className="flex items-center gap-2 text-xs">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                          <span className="text-muted-foreground">{d.name}:</span>
                          <span className="font-semibold text-foreground">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sections */}
              <div className="space-y-3">
                {sections.map(section => (
                  <div key={section.id} className="p-4 rounded-xl border border-border bg-card group/section">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">{section.title}</p>
                      <div className="flex items-center gap-1 opacity-0 group-hover/section:opacity-100 transition-opacity">
                        <button onClick={() => setEditingSection(editingSection === section.id ? null : section.id)} className="p-1 hover:bg-muted rounded">
                          {editingSection === section.id ? <Check className="w-3.5 h-3.5 text-success" /> : <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />}
                        </button>
                        <button onClick={() => deleteSection(section.id)} className="p-1 hover:bg-muted rounded">
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </div>
                    </div>
                    {editingSection === section.id ? (
                      <textarea
                        value={section.content}
                        onChange={e => updateSection(section.id, e.target.value)}
                        autoFocus
                        rows={5}
                        className="w-full text-sm text-foreground bg-muted/30 border border-border rounded-lg p-2 outline-none resize-y leading-relaxed"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{section.content}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Add section */}
              <button onClick={addSection} className="w-full mt-3 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-xs font-semibold text-muted-foreground flex items-center justify-center gap-1.5 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>

              {/* Actions */}
              <div className="mt-6 pt-5 border-t border-border space-y-3">
                <p className="text-xs font-semibold text-foreground">Export Report</p>
                <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-semibold text-foreground transition">
                  <Download className="w-4 h-4" /> Download HTML Report
                </button>
                <div className="flex gap-2">
                  <input
                    value={emailTo}
                    onChange={e => setEmailTo(e.target.value)}
                    placeholder="email@example.com"
                    className="flex-1 text-sm px-3 py-2 border border-border rounded-xl bg-background text-foreground outline-none focus:border-primary/50"
                  />
                  <button
                    onClick={handleEmail}
                    disabled={sendingEmail}
                    style={{ background: accentColor }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {sendingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    Email
                  </button>
                </div>
              </div>

              {/* Start over */}
              <button onClick={() => { setReportReady(false); setSections([]); }} className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center">
                ← Generate a different report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
