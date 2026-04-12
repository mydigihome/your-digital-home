import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects, useCreateProject, useDeleteProject } from "@/hooks/useProjects";
import AppShell from "@/components/AppShell";
import { Plus, FolderOpen } from "lucide-react";
import { toast } from "sonner";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"goal" | "event">("goal");
  const [name, setName] = useState("");

  const goals = (projects || []).filter((p) => p.type === "goal");
  const events = (projects || []).filter((p) => p.type === "event");

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createProject.mutateAsync({ title: name.trim(), type: formType, view_preference: "kanban" });
      toast.success("Project created");
      setName("");
      setShowForm(false);
    } catch { toast.error("Failed to create project"); }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <div className="flex gap-2">
            <button onClick={() => { setFormType("goal"); setShowForm(true); }} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              <Plus className="h-4 w-4" /> New Goal
            </button>
            <button onClick={() => { setFormType("event"); setShowForm(true); }} className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-accent">
              <Plus className="h-4 w-4" /> New Event
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium mb-2 capitalize">New {formType}</p>
            <div className="flex gap-2">
              <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCreate()} placeholder="Project name..." className="flex-1 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
              <button onClick={handleCreate} disabled={createProject.isPending} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">Create</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent">Cancel</button>
            </div>
          </div>
        )}

        {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}

        {!isLoading && (projects || []).length === 0 && (
          <div className="text-center py-16">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No projects yet. Create your first goal or event.</p>
          </div>
        )}

        {goals.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Goals</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {goals.map((p) => (
                <div key={p.id} onClick={() => navigate(`/projects/${p.id}`)} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-primary/40 transition-colors">
                  <p className="font-medium text-sm">{p.title || p.name}</p>
                  {p.goal && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{p.goal}</p>}
                  {p.end_date && <p className="text-xs text-muted-foreground mt-2">Due {p.end_date}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {events.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Events</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {events.map((p) => (
                <div key={p.id} onClick={() => navigate(`/projects/${p.id}`)} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-primary/40 transition-colors">
                  <p className="font-medium text-sm">{p.title || p.name}</p>
                  {p.start_date && <p className="text-xs text-muted-foreground mt-1">Starts {p.start_date}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
