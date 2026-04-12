import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Home className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-3">Welcome to Digital Home</h1>
      <p className="text-muted-foreground mb-8 max-w-md">Your personal OS for organizing your money, goals, relationships, and creative work.</p>
      <button onClick={onNext} className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition">
        Get Started
      </button>
    </motion.div>
  );
}
