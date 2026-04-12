// CreatePlanModal - for creating investment plans
import { useState } from "react";
import { X } from "lucide-react";
import { useCreateTradingPlan } from "@/hooks/useTradingPlans";
import { toast } from "sonner";

export default function CreatePlanModal({ onClose }: { onClose: () => void }) {
  const createPlan = useCreateTradingPlan();
  const [form, setForm] = useState({ title: "", symbol: "", notes: "" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Create Plan</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Plan title" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <input value={form.symbol} onChange={e => setForm(p => ({ ...p, symbol: e.target.value }))} placeholder="Symbol" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Strategy notes..." rows={3} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background resize-none" />
          <button onClick={async () => { await createPlan.mutateAsync(form); toast.success("Plan created"); onClose(); }} className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Create</button>
        </div>
      </div>
    </div>
  );
}
