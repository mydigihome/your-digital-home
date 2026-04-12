// InvestmentScheduleCard
import { useInvestments } from "@/hooks/useInvestments";
import { Calendar } from "lucide-react";

export default function InvestmentScheduleCard() {
  const { data: investments = [] } = useInvestments();
  const scheduled = (investments as any[]).filter((i: any) => i.auto_invest || i.schedule);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4"><Calendar className="w-4 h-4 text-primary" /><h3 className="font-semibold">Investment Schedule</h3></div>
      {scheduled.length === 0 ? <p className="text-sm text-muted-foreground">No scheduled investments</p> : (
        <div className="space-y-2">
          {scheduled.map((inv: any) => (
            <div key={inv.id} className="flex justify-between text-sm"><span>{inv.name}</span><span className="text-muted-foreground">{inv.schedule}</span></div>
          ))}
        </div>
      )}
    </div>
  );
}
