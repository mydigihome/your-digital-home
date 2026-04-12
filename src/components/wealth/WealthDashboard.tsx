import { useNavigate } from "react-router-dom";
import { TrendingUp, Wallet, CreditCard, PiggyBank } from "lucide-react";
import { useUserFinances } from "@/hooks/useUserFinances";
import { useExpenses } from "@/hooks/useExpenses";

export default function WealthDashboard() {
  const navigate = useNavigate();
  const { data: finances } = useUserFinances();
  const { data: expenses = [] } = useExpenses();
  const nw = Number((finances as any)?.net_worth || 0);
  const savings = Number((finances as any)?.current_savings || 0);
  const income = Number((finances as any)?.monthly_income || 0);
  const fmt = (n: number) => n >= 1000 ? `$${(n/1000).toFixed(1)}K` : `$${n.toLocaleString()}`;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Net Worth", value: fmt(nw), icon: TrendingUp, color: "text-success" },
          { label: "Savings", value: fmt(savings), icon: PiggyBank, color: "text-primary" },
          { label: "Monthly Income", value: fmt(income), icon: Wallet, color: "text-blue-500" },
          { label: "Expenses", value: expenses.length.toString(), icon: CreditCard, color: "text-destructive" },
        ].map(card => (
          <div key={card.label} className="bg-card border border-border rounded-xl p-4">
            <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
