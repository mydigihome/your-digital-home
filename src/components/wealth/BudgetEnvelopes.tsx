// BudgetEnvelopes component
import { useExpenses } from "@/hooks/useExpenses";
import { useUserFinances } from "@/hooks/useUserFinances";

const CATEGORIES = ["Housing", "Food", "Transport", "Entertainment", "Health", "Savings"];
const BUDGET_PCT: Record<string, number> = { Housing: 30, Food: 15, Transport: 10, Entertainment: 5, Health: 10, Savings: 20 };

export default function BudgetEnvelopes() {
  const { data: expenses = [] } = useExpenses();
  const { data: finances } = useUserFinances();
  const income = Number((finances as any)?.monthly_income || 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">Budget Envelopes</h3>
      <div className="space-y-3">
        {CATEGORIES.map(cat => {
          const budget = income * (BUDGET_PCT[cat] / 100);
          const spent = expenses.filter((e: any) => (e.category || "").toLowerCase().includes(cat.toLowerCase())).reduce((s: number, e: any) => s + Number(e.amount), 0);
          const pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
          const over = spent > budget;
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{cat}</span>
                <span className={over ? "text-destructive" : "text-muted-foreground"}>${spent.toFixed(0)} / ${budget.toFixed(0)}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${over ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
