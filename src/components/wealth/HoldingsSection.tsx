// Placeholder - HoldingsSection
import { useInvestments } from "@/hooks/useInvestments";

export default function HoldingsSection() {
  const { data: investments = [] } = useInvestments();
  return (
    <div className="space-y-2">
      {(investments as any[]).map((inv: any) => (
        <div key={inv.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div><p className="font-medium text-sm">{inv.name || inv.symbol}</p><p className="text-xs text-muted-foreground">{inv.category}</p></div>
          <span className="font-semibold">${Number(inv.current_value || inv.amount || 0).toLocaleString()}</span>
        </div>
      ))}
      {investments.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No holdings tracked</p>}
    </div>
  );
}
