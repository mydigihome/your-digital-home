import { useUserFinances } from "@/hooks/useUserFinances";
import { TrendingUp } from "lucide-react";

export default function CreditScoreGaugeCard() {
  const { data: finances } = useUserFinances();
  const score = (finances as any)?.credit_score || 0;

  const getLabel = (s: number) => {
    if (s >= 800) return { label: "Exceptional", color: "#10B981" };
    if (s >= 740) return { label: "Very Good", color: "#34D399" };
    if (s >= 670) return { label: "Good", color: "#6366F1" };
    if (s >= 580) return { label: "Fair", color: "#F59E0B" };
    if (s >= 300) return { label: "Poor", color: "#EF4444" };
    return { label: "Not set", color: "#9CA3AF" };
  };

  const { label, color } = getLabel(score);
  const pct = score >= 300 ? Math.min(100, ((score - 300) / 550) * 100) : 0;
  const angle = (pct / 100) * 180;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Credit Score</h3>
      </div>

      {score > 0 ? (
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 200 120" className="w-48">
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(var(--muted))" strokeWidth="14" strokeLinecap="round" />
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${(angle / 180) * 251.3} 251.3`}
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            />
            <text x="100" y="85" textAnchor="middle" fontSize="32" fontWeight="800" fill="hsl(var(--foreground))">{score}</text>
            <text x="100" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill={color}>{label}</text>
          </svg>
          <div className="flex justify-between w-full mt-1 px-4">
            <span className="text-xs text-muted-foreground">300</span>
            <span className="text-xs text-muted-foreground">850</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-3xl font-bold text-muted-foreground mb-1">—</p>
          <p className="text-sm text-muted-foreground">No credit score recorded</p>
          <p className="text-xs text-muted-foreground mt-1">Add it in the Money setup wizard</p>
        </div>
      )}
    </div>
  );
}
