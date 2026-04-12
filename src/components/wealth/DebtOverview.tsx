import { useUserFinances } from "@/hooks/useUserFinances";
import { AlertCircle } from "lucide-react";

export default function DebtOverview() {
  const { data: finances } = useUserFinances();
  const totalDebt = Number((finances as any)?.total_debt || 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-4 h-4 text-destructive" />
        <h3 className="font-semibold text-foreground">Debt Overview</h3>
      </div>
      <p className="text-3xl font-bold text-destructive mb-1">${totalDebt.toLocaleString()}</p>
      <p className="text-sm text-muted-foreground">Total debt tracked</p>
      <p className="text-xs text-muted-foreground mt-4">Update your debt in Settings → Finance to track payoff progress.</p>
    </div>
  );
}
