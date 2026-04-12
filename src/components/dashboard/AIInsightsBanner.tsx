import { useMemo } from "react";
import { motion } from "framer-motion";
import { Lightbulb, TrendingDown, Calendar, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AIInsightsBannerProps {
  goals: Array<{ id: string; name: string; done: number; total: number }>;
  expenses: Array<{ description: string; amount: number; frequency: string }>;
  contacts: Array<{ name: string; last_contacted_date: string | null; contact_frequency_days: number }>;
}

export default function AIInsightsBanner({ goals, expenses, contacts }: AIInsightsBannerProps) {
  const navigate = useNavigate();

  const insights = useMemo(() => {
    const result: any[] = [];
    for (const goal of goals.slice(0, 3)) {
      if (goal.total > 0) {
        const progress = Math.round((goal.done / goal.total) * 100);
        if (progress < 50) result.push({ message: `You're ${100 - progress}% away from completing "${goal.name}"`, route: `/project/${goal.id}` });
      }
    }
    const recurring = expenses.filter(e => e.frequency === "monthly");
    if (recurring.length > 0) {
      const top = recurring.sort((a, b) => b.amount - a.amount)[0];
      result.push({ message: `${top.description} ($${top.amount.toFixed(0)}) is due this month`, route: "/finance/wealth" });
    }
    for (const c of contacts.slice(0, 5)) {
      if (c.last_contacted_date) {
        const days = Math.floor((Date.now() - new Date(c.last_contacted_date).getTime()) / 86400000);
        if (days > c.contact_frequency_days) { result.push({ message: `Reach out to ${c.name} — no contact in ${days} days`, route: "/relationships" }); break; }
      }
    }
    return result.slice(0, 3);
  }, [goals, expenses, contacts]);

  if (insights.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-warning/30 bg-warning/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-warning/15 flex items-center justify-center"><Lightbulb className="w-3.5 h-3.5 text-warning" /></div>
        <h3 className="text-sm font-bold text-foreground">AI Insights</h3>
      </div>
      <div className="space-y-2">
        {insights.map((ins, i) => (
          <button key={i} onClick={() => ins.route && navigate(ins.route)} className="w-full flex items-center gap-3 text-left group py-1.5">
            <span className="text-sm text-foreground/80 flex-1">{ins.message}</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
