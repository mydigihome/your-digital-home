// Full AdminDashboard - synced from digitalhome
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { Shield, Users, Activity, DollarSign, FileText, Target, BookOpen, ShoppingBag, UserCheck, Bell, Download, RefreshCw, Lock, ChevronRight, X, Trash2, CreditCard, MessageSquare, Megaphone, Loader2, TrendingUp, UserMinus, Check, Send } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, newThisWeek: 0, totalRevenue: 0, totalContent: 0, totalJournals: 0, totalContacts: 0, totalProjects: 0 });
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const isAdmin = user?.email === "myslimher@gmail.com";

  const loadData = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
      const [{ count: totalUsers }, { count: newThisWeek }, { data: profilesList }, { count: totalContent }, { count: totalJournals }, { count: totalContacts }, { count: totalProjects }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", weekAgo.toISOString()),
        supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("content_items").select("*", { count: "exact", head: true }),
        supabase.from("journal_entries").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
      ]);
      setStats({ totalUsers: totalUsers || 0, newThisWeek: newThisWeek || 0, totalRevenue: 0, totalContent: totalContent || 0, totalJournals: totalJournals || 0, totalContacts: totalContacts || 0, totalProjects: totalProjects || 0 });
      setUsersList(profilesList || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [isAdmin]);

  if (!isAdmin) return (
    <AppShell><div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Lock className="w-12 h-12 text-muted-foreground" />
      <h2 className="text-2xl font-bold">Admin Access Only</h2>
      <p className="text-muted-foreground">You don't have permission to view this page.</p>
    </div></AppShell>
  );

  const filteredUsers = usersList.filter(u => !userSearch || u.full_name?.toLowerCase().includes(userSearch.toLowerCase()) || u.email?.toLowerCase().includes(userSearch.toLowerCase()));

  const metricCards = [
    { label: "Total Users", value: stats.totalUsers, Icon: Users },
    { label: "New This Week", value: stats.newThisWeek, Icon: Activity },
    { label: "Journal Entries", value: stats.totalJournals, Icon: BookOpen },
    { label: "Contacts Created", value: stats.totalContacts, Icon: UserCheck },
  ];

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 py-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage users, content, and platform activity</p>
          </div>
          <button onClick={loadData} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-accent">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metricCards.map(m => (
            <div key={m.label} className="bg-card border border-border rounded-xl p-4">
              <m.Icon className="w-5 h-5 text-muted-foreground mb-2" />
              <p className="text-2xl font-bold">{loading ? '—' : m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">All Users ({stats.totalUsers})</h2>
            <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search users..." className="px-3 py-1.5 border border-border rounded-lg text-sm outline-none w-48" />
          </div>
          <div className="space-y-1">
            {filteredUsers.slice(0, 50).map(u => (
              <div key={u.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{(u.full_name || '?').charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.full_name || 'No name'}</p>
                  <p className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</p>
                </div>
                <button onClick={async () => { const msg = prompt('Notification message:'); if (!msg) return; await (supabase as any).from('notifications').insert({ user_id: u.id, type: 'system', title: 'Message from Admin', message: msg, read: false }); toast.success('Sent!'); }} className="px-3 py-1 text-xs border border-border rounded-lg hover:bg-accent">Notify</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
