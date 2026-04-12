import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useCalendarEvents() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["calendar_events", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("calendar_events").select("*").eq("user_id", user!.id).order("start_time");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useTodayEvents() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["today_events", user?.id],
    queryFn: async () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
      const { data, error } = await (supabase as any).from("calendar_events").select("*").eq("user_id", user!.id).gte("start_time", start).lt("start_time", end).order("start_time");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
