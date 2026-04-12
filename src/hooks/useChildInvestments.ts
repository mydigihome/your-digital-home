import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useChildInvestments() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["child_investments", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("child_investments").select("*").eq("user_id", user!.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
