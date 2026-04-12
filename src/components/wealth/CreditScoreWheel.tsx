import { useUserFinances } from "@/hooks/useUserFinances";

interface CreditScoreWheelProps {
  score?: number;
}

export default function CreditScoreWheel({ score: propScore }: CreditScoreWheelProps) {
  const { data: finances } = useUserFinances();
  const score = propScore || Number((finances as any)?.credit_score || 0);
  const max = 850;
  const pct = score / max;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - pct * circumference * 0.75;
  const color = score >= 750 ? "#22c55e" : score >= 670 ? "#3b82f6" : score >= 580 ? "#f59e0b" : "#ef4444";
  const label = score >= 750 ? "Excellent" : score >= 670 ? "Good" : score >= 580 ? "Fair" : score > 0 ? "Poor" : "Unknown";

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-center">
      <h3 className="font-semibold text-foreground mb-4">Credit Score</h3>
      <div className="relative" style={{ width: 140, height: 100 }}>
        <svg width="140" height="140" style={{ position: "absolute", top: -20 }}>
          <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={circumference * 0.25} strokeLinecap="round" transform="rotate(135 70 70)" />
          <circle cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(135 70 70)" style={{ transition: "stroke-dashoffset 0.8s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
          <p className="text-3xl font-bold text-foreground">{score || "—"}</p>
          <p className="text-xs font-medium" style={{ color }}>{label}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Update in Settings → Finance</p>
    </div>
  );
}
