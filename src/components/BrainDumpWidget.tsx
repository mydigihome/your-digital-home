// BrainDumpWidget - simple wrapper
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

export default function BrainDumpWidget() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/journal/new")}
      className="w-full p-4 bg-card border border-border rounded-xl text-left hover:border-primary/30 transition">
      <div className="flex items-center gap-2 mb-1"><Brain className="w-4 h-4 text-primary" /><span className="text-sm font-semibold">Brain Dump</span></div>
      <p className="text-xs text-muted-foreground">Clear your mind, write freely</p>
    </button>
  );
}
