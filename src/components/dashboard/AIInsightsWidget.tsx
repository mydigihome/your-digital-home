import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function AIInsightsWidget() {
  const { user } = useAuth();
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke("generate-insights", { body: { user_id: user.id } });
      if (data?.insight) setInsight(data.insight);
      else setInsight("Keep up the great work! Your consistency is building lasting habits.");
    } catch {
      setInsight("Stay focused on your goals. Every small step counts.");
    }
    setLoading(false);
  };

  return (
    <div className="p-5 bg-card border border-border rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /><h3 className="text-sm font-semibold text-foreground">AI Insight</h3></div>
        <button onClick={generateInsight} disabled={loading} className="p-1 hover:bg-muted rounded-lg transition">
          <RefreshCw className={`w-3.5 h-3.5 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {insight ? (
        <p className="text-sm text-foreground/80 leading-relaxed italic">"{insight}"</p>
      ) : (
        <button onClick={generateInsight} className="text-sm text-primary hover:underline">Generate insight →</button>
      )}
    </div>
  );
}
