// InvestmentHero - shows portfolio summary
import { useInvestments } from "@/hooks/useInvestments";
import { TrendingUp } from "lucide-react";

export default function InvestmentHero() {
  const { data: investments = [] } = useInvestments();
  const total = (investments as any[]).reduce((s: number, i: any) => s + Number(i.current_value || i.amount || 0), 0);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-800 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-indigo-400" /><span className="text-sm text-white/60">Portfolio Value</span></div>
      <p className="text-4xl font-bold">${total.toLocaleString()}</p>
      <p className="text-sm text-white/50 mt-1">{(investments as any[]).length} positions</p>
    </div>
  );
}
