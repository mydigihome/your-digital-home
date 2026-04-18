import { useUserFinances } from "@/hooks/useUserFinances";
import { TrendingUp } from "lucide-react";

export default function TotalEarningsCard() {
  const { data: finances } = useUserFinances();
  const income = Number((finances as any)?.monthly_income || 0);
  const savings = Number((finances as any)?.current_savings || 0);
  const totalDebt = Number((finances as any)?.total_debt || 0);
  const savingsGoal = Number((finances as any)?.savings_goal || 0);
  const savingsRate = income > 0 ? Math.round(((income - totalDebt * 0.1) / income) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-success" />
        <h3 className="text-sm font-semibold text-foreground">Income & Savings</h3>
      </div>

      {income > 0 ? (
        <>
          <p className="text-3xl font-bold text-foreground mb-1">${income.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
          <p className="text-xs text-muted-foreground mb-4">Monthly take-home income</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Current Savings</span>
              <span className="text-sm font-semibold text-foreground">${savings.toLocaleString()}</span>
            </div>
            {savingsGoal > 0 && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Savings Goal</span>
                  <span className="text-xs font-semibold text-success">${savingsGoal.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-success transition-all" style={{ width: `${Math.min(100, savingsGoal > 0 ? Math.round((savings / savingsGoal) * 100) : 0)}%` }} />
                </div>
              </div>
            )}
            {totalDebt > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Total Debt</span>
                <span className="text-sm font-semibold text-destructive">-${totalDebt.toLocaleString()}</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-3xl font-bold text-muted-foreground mb-1">—</p>
          <p className="text-sm text-muted-foreground">No income data yet</p>
          <p className="text-xs text-muted-foreground mt-1">Complete the financial setup wizard</p>
        </div>
      )}
    </div>
  );
}
