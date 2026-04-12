import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useBrainDumps() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["brain_dumps", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("brain_dumps").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateBrainDump() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (content: string) => {
      const { error } = await (supabase as any).from("brain_dumps").insert({ content, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["brain_dumps"] }),
  });
}
