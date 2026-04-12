import { useInvestments } from "@/hooks/useInvestments";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function InvestmentsSection() {
  const { data: investments = [] } = useInvestments();
  const total = (investments as any[]).reduce((s: number, i: any) => s + Number(i.current_value || i.amount || 0), 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Investments</h3>
        <span className="text-lg font-bold text-foreground">${total.toLocaleString()}</span>
      </div>
      {(investments as any[]).length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No investments tracked yet</p>
      ) : (
        <div className="space-y-2">
          {(investments as any[]).map((inv: any) => (
            <div key={inv.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{inv.name || inv.symbol}</p>
                <p className="text-xs text-muted-foreground">{inv.category || inv.type}</p>
              </div>
              <span className="text-sm font-semibold">${Number(inv.current_value || inv.amount || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
