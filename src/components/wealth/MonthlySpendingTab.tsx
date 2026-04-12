import { useExpenses } from "@/hooks/useExpenses";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, startOfMonth, eachMonthOfInterval, subMonths } from "date-fns";

export default function MonthlySpendingTab() {
  const { data: expenses = [] } = useExpenses();
  const months = eachMonthOfInterval({ start: subMonths(new Date(), 5), end: new Date() });
  const data = months.map(month => {
    const monthStr = format(month, "MMM");
    const total = expenses.filter((e: any) => {
      const d = new Date(e.expense_date || e.date);
      return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();
    }).reduce((s: number, e: any) => s + Number(e.amount), 0);
    return { month: monthStr, amount: total };
  });

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${v}`} />
          <Tooltip formatter={(v: number) => [`$${v.toFixed(0)}`, "Spent"]} />
          <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
