import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useGmail() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["gmail", user?.id],
    queryFn: async () => {
      // Gmail integration via edge function
      const { data, error } = await supabase.functions.invoke("gmail-fetch", { body: { user_id: user!.id } });
      if (error) throw error;
      return data?.emails || [];
    },
    enabled: !!user,
    retry: false,
  });
}
