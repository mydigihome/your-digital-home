import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useCollaborators(projectId?: string) {
  return useQuery({
    queryKey: ["collaborators", projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const { data, error } = await (supabase as any).from("collaborators").select("*").eq("project_id", projectId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!projectId,
  });
}

export function useCreateCollaborator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (collab: any) => {
      const { error } = await (supabase as any).from("collaborators").insert(collab);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["collaborators"] }),
  });
}

export function useDeleteCollaborator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("collaborators").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["collaborators"] }),
  });
}
