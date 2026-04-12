import { motion } from "framer-motion";
import { useState } from "react";

export default function CreditStep({ onNext }: { onNext: (data: any) => void }) {
  const [score, setScore] = useState("");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-foreground mb-2">Credit score range?</h2>
      <p className="text-muted-foreground mb-6">Optional — helps personalize financial insights</p>
      <div className="space-y-2 mb-8">
        {["Below 580", "580–669", "670–739", "740–799", "800+", "Don't know"].map(r => (
          <button key={r} onClick={() => setScore(r)}
            className={`w-full p-3 rounded-xl border text-sm font-medium text-left transition-all ${score === r ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'}`}>
            {r}
          </button>
        ))}
      </div>
      <button onClick={() => onNext({ creditRange: score })}
        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition">
        {score ? "Continue" : "Skip"}
      </button>
    </motion.div>
  );
}
