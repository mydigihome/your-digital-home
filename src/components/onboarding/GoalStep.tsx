import { motion } from "framer-motion";
import { useState } from "react";

const goals = ["Build wealth", "Grow my brand", "Get organized", "Track my network", "Plan projects", "Journal daily"];

export default function GoalStep({ onNext }: { onNext: (data: any) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (g: string) => setSelected(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-foreground mb-2">What are your goals?</h2>
      <p className="text-muted-foreground mb-6">Select all that apply</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {goals.map(g => (
          <button key={g} onClick={() => toggle(g)}
            className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${selected.includes(g) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'}`}>
            {g}
          </button>
        ))}
      </div>
      <button onClick={() => onNext({ goals: selected })} disabled={selected.length === 0}
        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50">
        Continue
      </button>
    </motion.div>
  );
}
