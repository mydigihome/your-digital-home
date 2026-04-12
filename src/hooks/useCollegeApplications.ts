import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type CollegeApplication = any;

export function useCollegeApplications() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["college_applications", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("college_applications").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateCollegeApp() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (app: any) => {
      const { error } = await (supabase as any).from("college_applications").insert({ ...app, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["college_applications"] }),
  });
}

export function useUpdateCollegeApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await (supabase as any).from("college_applications").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["college_applications"] }),
  });
}

export function useDeleteCollegeApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("college_applications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["college_applications"] }),
  });
}
