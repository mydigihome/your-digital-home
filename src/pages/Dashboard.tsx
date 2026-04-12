import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useQuickTodos, useAddQuickTodo, useUpdateQuickTodo } from "@/hooks/useQuickTodos";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useUserFinances } from "@/hooks/useUserFinances";
import AppShell from "@/components/AppShell";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Check, ChevronRight } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userName = user?.email?.split("@")[0] || "User";
  const greeting = `${getGreeting()}, ${userName}`;
  const today = format(new Date(), "EEEE, MMMM d");

  const { data: projects } = useProjects();
  const { data: todos } = useQuickTodos();
  const addTodoMutation = useAddQuickTodo();
  const toggleTodoMutation = useUpdateQuickTodo();
  const { data: events } = useCalendarEvents();
  const { data: finances } = useUserFinances();

  const [newTodo, setNewTodo] = useState("");

  const todayEvents = (events || []).filter((e: any) =>
    e.start_time && format(new Date(e.start_time), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  const recentProjects = (projects || []).slice(0, 3);
  const incompleteTodos = (todos || []).filter((t: any) => !t.completed).slice(0, 5);
  const financeData = Array.isArray(finances) ? finances[0] : finances;

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    addTodoMutation.mutate({ text: newTodo.trim() });
    setNewTodo("");
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
          <p className="text-sm text-muted-foreground mt-1">{today}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-3">Today's Agenda</h2>
            {todayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events today</p>
            ) : (
              <ul className="space-y-2">
                {todayEvents.map((e: any) => (
                  <li key={e.id} className="text-sm flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>{e.title}</span>
                    {e.start_time && (
                      <span className="text-muted-foreground ml-auto text-xs">
                        {format(new Date(e.start_time), "h:mm a")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-3">Quick Todos</h2>
            <ul className="space-y-1.5 mb-3">
              {incompleteTodos.map((t: any) => (
                <li key={t.id} className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => toggleTodoMutation.mutate({ id: t.id, completed: true })}
                    className="h-4 w-4 rounded border border-zinc-300 dark:border-zinc-600 flex items-center justify-center hover:border-primary"
                  />
                  <span>{t.task}</span>
                </li>
              ))}
              {incompleteTodos.length === 0 && (
                <p className="text-sm text-muted-foreground">All caught up</p>
              )}
            </ul>
            <div className="flex gap-2">
              <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                placeholder="Add a todo..."
                className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button onClick={handleAddTodo} className="p-1.5 text-primary hover:bg-primary/10 rounded-lg">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Recent Projects</h2>
              <button onClick={() => navigate("/projects")} className="text-xs text-primary hover:underline">View all</button>
            </div>
            {recentProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects yet</p>
            ) : (
              <ul className="space-y-2">
                {recentProjects.map((p: any) => (
                  <li key={p.id} onClick={() => navigate(`/projects/${p.id}`)} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                    <div>
                      <p className="text-sm font-medium">{p.title || p.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{p.type}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Money Snapshot</h2>
              <button onClick={() => navigate("/money")} className="text-xs text-primary hover:underline">Details</button>
            </div>
            {financeData ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Net Worth</span>
                  <span className="font-medium">${Number(financeData.net_worth || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Income</span>
                  <span className="font-medium">${Number(financeData.monthly_income || 0).toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Set up your finances in Money tab</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
