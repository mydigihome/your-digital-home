import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useTemplates() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["templates", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("shop_templates").select("*").eq("is_active", true);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
