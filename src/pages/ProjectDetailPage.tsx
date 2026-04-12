import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AppShell from "@/components/AppShell";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [stages, setStages] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState<{ stageId: string; text: string } | null>(null);

  useEffect(() => {
    if (!user || !id) return;
    loadData();
  }, [user, id]);

  const loadData = async () => {
    setLoading(true);
    const [pRes, sRes, tRes] = await Promise.all([
      (supabase as any).from("projects").select("*").eq("id", id).eq("user_id", user!.id).single(),
      (supabase as any).from("project_stages").select("*").eq("project_id", id).order("order_index"),
      (supabase as any).from("tasks").select("*").eq("project_id", id).order("position"),
    ]);
    setProject(pRes.data);
    const stageData = sRes.data || [];
    if (stageData.length === 0) {
      // Create default stages
      const defaults = ["To Do", "In Progress", "Done"];
      const created: any[] = [];
      for (let i = 0; i < defaults.length; i++) {
        const { data } = await (supabase as any).from("project_stages").insert({ project_id: id, title: defaults[i], order_index: i, user_id: user!.id }).select().single();
        if (data) created.push(data);
      }
      setStages(created);
    } else {
      setStages(stageData);
    }
    setTasks(tRes.data || []);
    setLoading(false);
  };

  const addTask = async (stageId: string, title: string) => {
    if (!title.trim()) return;
    const { error } = await (supabase as any).from("tasks").insert({
      project_id: id, title: title.trim(), status: stageId, user_id: user!.id, position: tasks.length,
    });
    if (error) { toast.error("Failed to add task"); return; }
    setNewTask(null);
    loadData();
  };

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const doneStage = stages.find(s => s.title.toLowerCase() === "done");
    const todoStage = stages.find(s => s.title.toLowerCase().includes("to do") || s.title.toLowerCase().includes("todo"));
    const newStatus = currentStatus === doneStage?.id ? (todoStage?.id || stages[0]?.id) : (doneStage?.id || stages[stages.length - 1]?.id);
    await (supabase as any).from("tasks").update({ status: newStatus }).eq("id", taskId);
    loadData();
  };

  if (loading) return <AppShell><div className="flex items-center justify-center h-64"><p className="text-muted-foreground">Loading...</p></div></AppShell>;
  if (!project) return <AppShell><div className="flex items-center justify-center h-64"><p className="text-muted-foreground">Project not found</p></div></AppShell>;

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-8">
        <button onClick={() => navigate("/projects")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </button>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">{project.title || project.name || "Untitled"}</h1>
          {project.goal && <p className="text-sm text-muted-foreground mt-1">{project.goal}</p>}
          {project.description && <p className="text-sm text-muted-foreground mt-1">{project.description}</p>}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageTasks = tasks.filter((t) => t.status === stage.id);
            return (
              <div key={stage.id} className="min-w-[280px] flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">{stage.title}</h3>
                  <span className="text-xs text-muted-foreground">{stageTasks.length}</span>
                </div>
                <div className="space-y-2">
                  {stageTasks.map((task) => (
                    <div key={task.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm">
                      {task.title}
                    </div>
                  ))}
                  {newTask?.stageId === stage.id ? (
                    <div className="flex gap-2">
                      <input autoFocus value={newTask.text} onChange={(e) => setNewTask({ ...newTask, text: e.target.value })} onKeyDown={(e) => e.key === "Enter" && addTask(stage.id, newTask.text)} placeholder="Task name..." className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                      <button onClick={() => addTask(stage.id, newTask.text)} className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-lg">Add</button>
                    </div>
                  ) : (
                    <button onClick={() => setNewTask({ stageId: stage.id, text: "" })} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground w-full py-1.5">
                      <Plus className="h-3 w-3" /> Add task
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
