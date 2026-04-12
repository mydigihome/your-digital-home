import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useEvents() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["events", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("event_details").select("*, projects(name, cover_image)").order("event_date");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
