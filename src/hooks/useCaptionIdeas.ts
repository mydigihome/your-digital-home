import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useCaptionIdeas() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["caption_ideas", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("caption_ideas").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
