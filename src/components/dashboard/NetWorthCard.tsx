import { TrendingUp, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserFinances } from "@/hooks/useUserFinances";

export default function NetWorthCard() {
  const navigate = useNavigate();
  const { data: finances } = useUserFinances();
  const nw = Number((finances as any)?.net_worth || 0);
  const inc = Number((finances as any)?.monthly_income || 0);
  const fmt = (n: number) => { const abs = Math.abs(n); const p = n < 0 ? "-" : ""; return abs >= 1000 ? `${p}$${(abs / 1000).toFixed(1)}K` : `${p}$${abs.toLocaleString()}`; };

  return (
    <button onClick={() => navigate("/finance/wealth")}
      className="h-full p-4 bg-card border border-border rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-primary/30 hover:shadow-md transition-all text-left group flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-success" /><span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">Net Worth</span></div>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className={`text-[28px] font-bold tracking-tight ${nw >= 0 ? "text-success" : "text-destructive"}`}>{fmt(nw)}</p>
      <div className="flex items-center gap-3 mt-1 text-[12px] text-muted-foreground">
        <span>Income: <span className="font-semibold text-success">${inc.toLocaleString()}/mo</span></span>
      </div>
    </button>
  );
}
