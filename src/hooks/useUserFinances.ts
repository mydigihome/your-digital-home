import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useUserFinances() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_finances", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("user_finances")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useUpsertFinances() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data: any) => {
      // Map field aliases to actual DB column names
      const mapped: any = { ...data, user_id: user!.id };
      // savings_goal -> savings_goal (column now exists after migration)
      // onboarding_completed -> onboarding_completed (column now exists)
      const { error } = await (supabase as any)
        .from("user_finances")
        .upsert(mapped, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user_finances"] }),
  });
}

export const useUpsertUserFinances = useUpsertFinances;
