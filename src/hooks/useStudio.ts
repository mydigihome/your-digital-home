import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useStudioProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["studio_profile", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("studio_profile")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useUpsertStudioProfile() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const { error } = await (supabase as any)
        .from("studio_profile")
        .upsert({ ...data, user_id: user!.id }, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["studio_profile"] }),
  });
}

export function useStudioGoals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["studio_goals", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("studio_goals")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });
}

export function useCreateStudioGoal() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (goal: { title: string; category?: string; deadline?: string; progress?: number }) => {
      const { error } = await (supabase as any)
        .from("studio_goals")
        .insert({ ...goal, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["studio_goals"] }),
  });
}
