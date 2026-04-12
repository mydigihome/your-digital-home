import { useState } from "react";
import { Plus, Search } from "lucide-react";

const POPULAR = ["AAPL","TSLA","NVDA","SPY","BTC","ETH","MSFT","AMZN","GOOGL","META"];

export default function AddPairModal({ onClose, onAdd }: { onClose: () => void; onAdd: (symbol: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = POPULAR.filter(s => s.includes(search.toUpperCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="font-semibold mb-4">Add Watchlist Item</h3>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol..." className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background" />
        </div>
        <div className="space-y-1">
          {filtered.map(s => (
            <button key={s} onClick={() => { onAdd(s); onClose(); }} className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-lg">{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
