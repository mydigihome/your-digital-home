import { useWealthGoals } from "@/hooks/useWealthGoals";

export default function SavingsProgress() {
  const { data: goals = [] } = useWealthGoals();
  const totalTarget = (goals as any[]).reduce((s: number, g: any) => s + Number(g.target_amount || 0), 0);
  const totalSaved = (goals as any[]).reduce((s: number, g: any) => s + Number(g.current_amount || 0), 0);
  const pct = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-3">Savings Progress</h3>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-bold text-foreground">${totalSaved.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground mb-0.5">of ${totalTarget.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{pct}% of savings goals reached</p>
    </div>
  );
}
