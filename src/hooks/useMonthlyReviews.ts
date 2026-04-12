import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useMonthlyReviews() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["monthly_reviews", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("monthly_reviews").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
