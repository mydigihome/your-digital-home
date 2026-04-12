import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useBrandCollaborations() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["brand_collaborations", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("brand_collaborations").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
