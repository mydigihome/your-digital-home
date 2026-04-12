import { motion } from "framer-motion";
import { useState } from "react";

export default function HomeNameStep({ onNext }: { onNext: (data: any) => void }) {
  const [name, setName] = useState("");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-foreground mb-2">Name your Digital Home</h2>
      <p className="text-muted-foreground mb-6">Give your space a personal name</p>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. My Life OS, The Hub..." className="w-full px-4 py-3 border border-border rounded-xl text-foreground bg-background outline-none focus:ring-2 focus:ring-primary mb-6" />
      <button onClick={() => onNext({ homeName: name })} disabled={!name.trim()}
        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50">
        Continue
      </button>
    </motion.div>
  );
}
