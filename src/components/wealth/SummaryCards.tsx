import { useExpenses } from "@/hooks/useExpenses";
import { useUserFinances } from "@/hooks/useUserFinances";
import { format, startOfMonth, endOfMonth } from "date-fns";

export default function SummaryCards() {
  const { data: expenses = [] } = useExpenses();
  const { data: finances } = useUserFinances();
  const now = new Date();
  const monthExpenses = expenses.filter(e => {
    const d = new Date((e as any).expense_date || (e as any).date);
    return d >= startOfMonth(now) && d <= endOfMonth(now);
  });
  const spent = monthExpenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const income = Number((finances as any)?.monthly_income || 0);
  const savings = income - spent;

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Income", value: income, color: "text-success" },
        { label: "Spent", value: spent, color: "text-destructive" },
        { label: "Saved", value: savings, color: savings >= 0 ? "text-success" : "text-destructive" },
      ].map(card => (
        <div key={card.label} className="bg-card border border-border rounded-xl p-4 text-center">
          <p className={`text-xl font-bold ${card.color}`}>${card.value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
