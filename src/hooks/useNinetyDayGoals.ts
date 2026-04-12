import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useNinetyDayGoals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["ninety_day_goals", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("ninety_day_goals").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateNinetyDayGoal() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (goal: any) => {
      const { error } = await (supabase as any).from("ninety_day_goals").insert({ ...goal, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ninety_day_goals"] }),
  });
}
