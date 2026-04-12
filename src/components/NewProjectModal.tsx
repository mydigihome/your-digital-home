import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProject } from "@/hooks/useProjects";
import { toast } from "sonner";

interface Props { open: boolean; onOpenChange: (open: boolean) => void; defaultType?: string; }

export default function NewProjectModal({ open, onOpenChange, defaultType }: Props) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [type, setType] = useState(defaultType || "personal");
  const createProject = useCreateProject();

  const handleCreate = async () => {
    if (!name.trim()) { toast.error("Project name is required"); return; }
    try {
      await createProject.mutateAsync({ name: name.trim(), title: name.trim(), goal: goal.trim() || undefined, type, view_preference: "kanban" });
      toast.success("Project created!");
      setName(""); setGoal("");
      onOpenChange(false);
    } catch { toast.error("Failed to create project"); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <h2 className="text-xl font-semibold text-foreground mb-4">New Project</h2>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Project name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter project name..." autoFocus /></div>
          <div className="space-y-2"><Label>Goal (optional)</Label><Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="What's the end goal?" /></div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleCreate} disabled={createProject.isPending} className="flex-1">Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
