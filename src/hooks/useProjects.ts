import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Project {
  id: string;
  user_id: string;
  name: string;
  title: string;
  goal: string | null;
  type: string;
  view_preference: string;
  color: string | null;
  start_date: string | null;
  end_date: string | null;
  icon: string | null;
  icon_type: string | null;
  cover_image: string | null;
  cover_type: string | null;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

const deletedProjectIds = new Set<string>();

export function useProjects() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("archived", false)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data as Project[]).filter(p => !deletedProjectIds.has(p.id));
    },
    enabled: !!user,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (project: { name?: string; title?: string; goal?: string; type: string; view_preference: string; start_date?: string; end_date?: string }) => {
      const { data, error } = await supabase
        .from("projects")
        .insert({ ...project, title: project.title || project.name || "Untitled", user_id: user!.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from("projects").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      deletedProjectIds.add(id);
      qc.setQueryData<Project[]>(["projects", user?.id], (old) =>
        old ? old.filter((p) => p.id !== id) : []
      );
      await supabase.from("tasks").delete().eq("project_id", id);
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onError: (_err, id) => {
      deletedProjectIds.delete(id);
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useArchivedProjects() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["archived_projects", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("archived", true)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
    enabled: !!user,
  });
}

export function useRestoreProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").update({ archived: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["archived_projects"] });
    },
  });
}

export { deletedProjectIds };
