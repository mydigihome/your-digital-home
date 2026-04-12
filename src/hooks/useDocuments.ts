import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useDocuments() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["documents", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("documents").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
