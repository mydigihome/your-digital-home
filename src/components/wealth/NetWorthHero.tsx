import { useUserFinances } from "@/hooks/useUserFinances";
import { useLoans } from "@/hooks/useLoans";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";

export default function NetWorthHero() {
  const navigate = useNavigate();
  const { data: finances } = useUserFinances();
  const { data: loans = [] } = useLoans();
  const savings = Number((finances as any)?.current_savings || 0);
  const debt = Number((finances as any)?.total_debt || 0) + (loans || []).reduce((s: number, l: any) => s + Number(l.amount || 0), 0);
  const nw = savings - debt;
  const fmt = (n: number) => { const abs = Math.abs(n); return `${n < 0 ? '-' : ''}$${abs >= 1000 ? (abs/1000).toFixed(1) + 'K' : abs.toLocaleString()}`; };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
      <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-green-400" /><span className="text-sm font-medium text-white/60">Net Worth</span></div>
      <p className={`text-5xl font-bold mb-1 ${nw >= 0 ? 'text-green-400' : 'text-red-400'}`}>{fmt(nw)}</p>
      <div className="flex gap-6 mt-4 text-sm">
        <div><p className="text-white/50">Assets</p><p className="font-semibold text-green-400">{fmt(savings)}</p></div>
        <div><p className="text-white/50">Debt</p><p className="font-semibold text-red-400">{fmt(debt)}</p></div>
      </div>
    </div>
  );
}
