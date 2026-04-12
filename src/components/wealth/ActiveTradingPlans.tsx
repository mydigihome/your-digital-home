import { useTradingPlans } from "@/hooks/useTradingPlans";

export default function ActiveTradingPlans() {
  const { data: plans = [] } = useTradingPlans();
  const active = (plans as any[]).filter((p: any) => p.status !== "closed");

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">Active Trading Plans</h3>
      {active.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No active plans</p>
      ) : (
        <div className="space-y-2">
          {active.map((plan: any) => (
            <div key={plan.id} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{plan.symbol}</span>
                <span className="text-xs text-muted-foreground">{plan.title}</span>
              </div>
              {plan.entry && <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                <span>Entry: ${plan.entry}</span>
                {plan.target && <span>Target: ${plan.target}</span>}
                {plan.stop_loss && <span>Stop: ${plan.stop_loss}</span>}
              </div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
