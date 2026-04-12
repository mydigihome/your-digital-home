import { useTradingPairs } from "@/hooks/useTradingPairs";
import { TrendingUp } from "lucide-react";

export default function WatchlistSection() {
  const { data: pairs = [] } = useTradingPairs();
  const active = pairs.filter(p => p.is_active);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-foreground">Watchlist</h3>
      </div>
      {active.length === 0 ? (
        <p className="text-sm text-muted-foreground">No watchlist items yet</p>
      ) : (
        <div className="space-y-2">
          {active.map(p => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div><p className="text-sm font-medium">{p.symbol}</p><p className="text-xs text-muted-foreground">{p.category}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
