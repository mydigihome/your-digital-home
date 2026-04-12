import { useState } from "react";
import { useCreateTradingPlan } from "@/hooks/useTradingPlans";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function TradingPlanModal({ onClose }: { onClose: () => void }) {
  const createPlan = useCreateTradingPlan();
  const [form, setForm] = useState({ title: "", symbol: "", entry: "", target: "", stop_loss: "", notes: "" });

  const handleCreate = async () => {
    if (!form.title || !form.symbol) return;
    await createPlan.mutateAsync(form);
    toast.success("Trading plan created");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">New Trading Plan</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Plan title" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <input value={form.symbol} onChange={e => setForm(p => ({ ...p, symbol: e.target.value }))} placeholder="Symbol (e.g. AAPL)" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <div className="grid grid-cols-3 gap-2">
            <input value={form.entry} onChange={e => setForm(p => ({ ...p, entry: e.target.value }))} placeholder="Entry $" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
            <input value={form.target} onChange={e => setForm(p => ({ ...p, target: e.target.value }))} placeholder="Target $" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
            <input value={form.stop_loss} onChange={e => setForm(p => ({ ...p, stop_loss: e.target.value }))} placeholder="Stop $" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          </div>
          <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Notes..." rows={3} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background resize-none" />
          <div className="flex gap-2">
            <button onClick={handleCreate} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Create Plan</button>
            <button onClick={onClose} className="flex-1 py-2 border border-border rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
