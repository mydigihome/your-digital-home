import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useWealthLayout() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["wealth_layout", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("user_preferences").select("wealth_layout").eq("user_id", user!.id).maybeSingle();
      if (error) throw error;
      return (data as any)?.wealth_layout || {};
    },
    enabled: !!user,
  });
}
