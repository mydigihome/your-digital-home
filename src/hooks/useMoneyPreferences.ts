import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useMoneyPreferences() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["money_preferences", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("money_preferences").select("*").eq("user_id", user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useUpsertMoneyPreferences() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data: any) => {
      const { error } = await (supabase as any).from("money_preferences").upsert({ ...data, user_id: user!.id }, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["money_preferences"] }),
  });
}
