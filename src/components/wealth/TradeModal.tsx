import { useState } from "react";
import { X } from "lucide-react";

export default function TradeModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ symbol: "", type: "buy", shares: "", price: "" });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Trade</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <input value={form.symbol} onChange={e => setForm(p => ({ ...p, symbol: e.target.value }))} placeholder="Symbol" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background">
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input value={form.shares} onChange={e => setForm(p => ({ ...p, shares: e.target.value }))} placeholder="Shares" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
            <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="Price $" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          </div>
          <p className="text-xs text-muted-foreground">This will redirect you to your broker to execute.</p>
          <button onClick={onClose} className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Open Broker</button>
        </div>
      </div>
    </div>
  );
}
