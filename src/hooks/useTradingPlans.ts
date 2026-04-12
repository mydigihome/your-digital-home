import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useTradingPlans() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["trading_plans", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("trading_plans").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateTradingPlan() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (plan: any) => {
      const { error } = await (supabase as any).from("trading_plans").insert({ ...plan, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trading_plans"] }),
  });
}
