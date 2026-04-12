import { motion } from "framer-motion";
import { useState } from "react";

const focuses = ["Finance", "Productivity", "Relationships", "Content Creation", "Career", "Health"];

export default function FocusStep({ onNext }: { onNext: (data: any) => void }) {
  const [focus, setFocus] = useState("");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-foreground mb-2">Primary focus?</h2>
      <p className="text-muted-foreground mb-6">We'll personalize your dashboard</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {focuses.map(f => (
          <button key={f} onClick={() => setFocus(f)}
            className={`p-3 rounded-xl border text-sm font-medium transition-all ${focus === f ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'}`}>
            {f}
          </button>
        ))}
      </div>
      <button onClick={() => onNext({ focus })} disabled={!focus}
        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50">
        Continue
      </button>
    </motion.div>
  );
}
