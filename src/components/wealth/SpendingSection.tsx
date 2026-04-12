import { useExpenses } from "@/hooks/useExpenses";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#f43f5e", "#3b82f6", "#8b5cf6", "#ec4899"];

export default function SpendingSection() {
  const { data: expenses = [] } = useExpenses();
  const now = new Date();
  const monthExpenses = expenses.filter(e => {
    const d = new Date((e as any).expense_date || (e as any).date);
    return d >= startOfMonth(now) && d <= endOfMonth(now);
  });
  const byCategory: Record<string, number> = {};
  monthExpenses.forEach((e: any) => { byCategory[e.category || 'Other'] = (byCategory[e.category || 'Other'] || 0) + Number(e.amount); });
  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">This Month</h3>
        <span className="text-2xl font-bold text-foreground">${total.toLocaleString()}</span>
      </div>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie><Tooltip formatter={(v: number) => `$${v.toFixed(0)}`} /></PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {data.slice(0, 5).map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-sm text-foreground flex-1">{d.name}</span>
                <span className="text-sm font-medium">${d.value.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </>
      ) : <p className="text-center text-muted-foreground py-8">No expenses this month</p>}
    </div>
  );
}
