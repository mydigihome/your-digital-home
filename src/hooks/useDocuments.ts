import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useDocuments(projectId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["documents", projectId, user?.id],
    queryFn: async () => {
      let q = (supabase as any).from("documents").select("*");
      if (projectId) q = q.eq("project_id", projectId);
      else q = q.eq("user_id", user!.id);
      const { data, error } = await q.order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, file }: { projectId: string; file: File }) => {
      const path = `${user!.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("documents").upload(path, file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path);
      const { error } = await (supabase as any).from("documents").insert({
        user_id: user!.id,
        project_id: projectId,
        name: file.name,
        title: file.name,
        file_url: urlData.publicUrl,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["documents"] }),
  });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["documents"] }),
  });
}
