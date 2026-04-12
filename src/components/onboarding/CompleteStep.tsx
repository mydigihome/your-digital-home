import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompleteStep() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">You're all set!</h2>
      <p className="text-muted-foreground mb-8">Your Digital Home is ready. Let's go.</p>
      <button onClick={() => navigate("/dashboard")} className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition">
        Enter My Home
      </button>
    </motion.div>
  );
}
