import { Target, CheckCircle, BookOpen, UserPlus, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionsRowProps {
  onNewGoal?: () => void;
  onNewTodo?: () => void;
}

export default function QuickActionsRow({ onNewGoal, onNewTodo }: QuickActionsRowProps) {
  const navigate = useNavigate();
  const actions = [
    { key: "goal", label: "Goal", icon: Target, onClick: onNewGoal || (() => {}) },
    { key: "todo", label: "Todo", icon: CheckCircle, onClick: onNewTodo || (() => {}) },
    { key: "journal", label: "Journal", icon: BookOpen, onClick: () => navigate("/journal/new") },
    { key: "contact", label: "Contact", icon: UserPlus, onClick: () => navigate("/relationships") },
    { key: "bill", label: "Bill", icon: Receipt, onClick: () => navigate("/finance/wealth") },
  ];

  return (
    <div className="flex items-center gap-3">
      {actions.map(a => {
        const Icon = a.icon;
        return (
          <button key={a.key} onClick={a.onClick} className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
              <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
            </div>
            <span className="text-[11px] font-medium text-white">{a.label}</span>
          </button>
        );
      })}
    </div>
  );
}
