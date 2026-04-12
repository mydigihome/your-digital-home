import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useWealthGoals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["wealth_goals", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("wealth_goals").select("*").eq("user_id", user!.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateWealthGoal() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (goal: any) => {
      const { error } = await (supabase as any).from("wealth_goals").insert({ ...goal, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wealth_goals"] }),
  });
}
