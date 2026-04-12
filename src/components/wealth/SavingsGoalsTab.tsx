import { useWealthGoals, useCreateWealthGoal } from "@/hooks/useWealthGoals";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function SavingsGoalsTab() {
  const { data: goals = [] } = useWealthGoals();
  const createGoal = useCreateWealthGoal();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", target_amount: "", current_amount: "" });

  const handleCreate = async () => {
    if (!form.name || !form.target_amount) return;
    await createGoal.mutateAsync({ name: form.name, target_amount: parseFloat(form.target_amount), current_amount: parseFloat(form.current_amount || "0") });
    setForm({ name: "", target_amount: "", current_amount: "" });
    setShowForm(false);
    toast.success("Savings goal created");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Savings Goals</h3>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium"><Plus className="w-3.5 h-3.5" /> New Goal</button>
      </div>
      {showForm && (
        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Goal name" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <div className="grid grid-cols-2 gap-2">
            <input type="number" value={form.target_amount} onChange={e => setForm(p => ({ ...p, target_amount: e.target.value }))} placeholder="Target amount" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
            <input type="number" value={form.current_amount} onChange={e => setForm(p => ({ ...p, current_amount: e.target.value }))} placeholder="Current amount" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Create</button>
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 border border-border rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {(goals as any[]).map((g: any) => {
          const pct = Math.min(100, Math.round((Number(g.current_amount) / Number(g.target_amount)) * 100));
          return (
            <div key={g.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">{g.name}</p>
                <span className="text-sm font-bold text-primary">{pct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>${Number(g.current_amount).toLocaleString()}</span>
                <span>${Number(g.target_amount).toLocaleString()}</span>
              </div>
            </div>
          );
        })}
        {goals.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No savings goals yet</p>}
      </div>
    </div>
  );
}
