import { useState } from "react";
import { useContacts } from "@/hooks/useContacts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AppShell from "@/components/AppShell";
import { Plus, Search, Users, X } from "lucide-react";
import { toast } from "sonner";

export default function RelationshipsPage() {
  const { user } = useAuth();
  const { data: contacts, refetch } = useContacts();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", role: "", status: "cold" });

  const filtered = (contacts || []).filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.company || "").toLowerCase().includes(search.toLowerCase())
  );

  const addContact = async () => {
    if (!form.name.trim()) return;
    const { error } = await (supabase as any).from("contacts").insert({ ...form, user_id: user!.id });
    if (error) { toast.error("Failed to add contact"); return; }
    toast.success("Contact added");
    setForm({ name: "", email: "", phone: "", company: "", role: "", status: "cold" });
    setShowForm(false);
    refetch();
  };

  const statusColor = (s: string) => {
    if (s === "hot") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (s === "warm") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Relationships</h1>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
            <Plus className="h-4 w-4" /> Add Contact
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." className="w-full text-sm pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        {showForm && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-4 grid gap-3 sm:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
            </select>
            <div className="sm:col-span-2 flex gap-2">
              <button onClick={addContact} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">Save</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No contacts found</p>
          </div>
        )}

        <div className="space-y-2">
          {filtered.map((c: any) => (
            <div key={c.id} onClick={() => setSelected(c)} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{[c.role, c.company].filter(Boolean).join(" at ")}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColor(c.status)}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
            <div className="relative w-full max-w-md bg-card border-l border-border p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{selected.name}</h2>
                <button onClick={() => setSelected(null)}><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3 text-sm">
                {selected.email && <div><p className="text-xs text-muted-foreground">Email</p><p>{selected.email}</p></div>}
                {selected.phone && <div><p className="text-xs text-muted-foreground">Phone</p><p>{selected.phone}</p></div>}
                {selected.company && <div><p className="text-xs text-muted-foreground">Company</p><p>{selected.company}</p></div>}
                {selected.role && <div><p className="text-xs text-muted-foreground">Role</p><p>{selected.role}</p></div>}
                {selected.notes && <div><p className="text-xs text-muted-foreground">Notes</p><p>{selected.notes}</p></div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
