import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  color: string;
  tasks: Array<{ title: string; priority?: string; status?: string }>;
}

export function useTemplates() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["templates", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("shop_templates")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return (data || []) as ProjectTemplate[];
    },
    enabled: !!user,
  });
}
