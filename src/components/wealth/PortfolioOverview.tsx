import { useInvestments } from "@/hooks/useInvestments";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#3b82f6", "#8b5cf6"];

export default function PortfolioOverview() {
  const { data: investments = [] } = useInvestments();
  const data = (investments as any[]).map((i: any) => ({ name: i.name || i.symbol, value: Number(i.current_value || i.amount || 0) }));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Portfolio</h3>
        <span className="font-bold text-foreground">${total.toLocaleString()}</span>
      </div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={160}>
          <PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie><Tooltip formatter={(v: number) => `$${v.toFixed(0)}`} /></PieChart>
        </ResponsiveContainer>
      ) : <p className="text-sm text-muted-foreground text-center py-4">No investments tracked</p>}
    </div>
  );
}
