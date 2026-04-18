import { useExpenses } from "@/hooks/useExpenses";
import { useUserFinances } from "@/hooks/useUserFinances";
import { TrendingDown } from "lucide-react";

export default function TotalSpendingsCard() {
  const { data: expenses = [] } = useExpenses();
  const { data: finances } = useUserFinances();

  const now = new Date();
  const thisMonth = expenses.filter(e => {
    const d = new Date(e.expense_date || e.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const total = thisMonth.reduce((s, e) => s + Number(e.amount || 0), 0);
  const monthly_income = Number((finances as any)?.monthly_income || 0);
  const pct = monthly_income > 0 ? Math.min(100, Math.round((total / monthly_income) * 100)) : 0;

  const byCategory: Record<string, number> = {};
  thisMonth.forEach(e => {
    const cat = e.category || "Other";
    byCategory[cat] = (byCategory[cat] || 0) + Number(e.amount || 0);
  });
  const topCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const COLORS = ["#6366f1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-destructive" />
          <h3 className="text-sm font-semibold text-foreground">Monthly Spending</h3>
        </div>
        <span className="text-xs text-muted-foreground">{now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
      </div>

      {total > 0 ? (
        <>
          <p className="text-3xl font-bold text-foreground mb-1">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          {monthly_income > 0 && (
            <>
              <p className="text-xs text-muted-foreground mb-3">{pct}% of monthly income</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                <div className="h-full rounded-full bg-destructive transition-all" style={{ width: `${pct}%` }} />
              </div>
            </>
          )}
          {topCategories.length > 0 && (
            <div className="space-y-2">
              {topCategories.map(([cat, amt], i) => (
                <div key={cat} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-xs text-foreground">{cat}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">${Number(amt).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-3xl font-bold text-muted-foreground mb-1">$0</p>
          <p className="text-sm text-muted-foreground">No expenses tracked this month</p>
          <p className="text-xs text-muted-foreground mt-1">Add expenses to see your spending breakdown</p>
        </div>
      )}
    </div>
  );
}
