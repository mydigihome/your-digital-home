import { useBills } from "@/hooks/useBills";
import { useExpenses } from "@/hooks/useExpenses";

export default function SubscriptionsSection() {
  const { data: bills = [] } = useBills();
  const subscriptions = (bills as any[]).filter((b: any) => b.frequency === "monthly" || b.frequency === "annual");
  const monthlyTotal = subscriptions.reduce((s: number, b: any) => {
    const amount = Number(b.amount);
    return s + (b.frequency === "annual" ? amount / 12 : amount);
  }, 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Subscriptions</h3>
        <span className="text-sm text-muted-foreground">${monthlyTotal.toFixed(0)}/mo</span>
      </div>
      {subscriptions.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No subscriptions tracked</p>
      ) : (
        <div className="space-y-2">
          {subscriptions.map((sub: any) => (
            <div key={sub.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <p className="text-sm font-medium text-foreground">{sub.merchant}</p>
              <span className="text-sm text-muted-foreground">${Number(sub.amount).toFixed(0)}/{sub.frequency === 'annual' ? 'yr' : 'mo'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
