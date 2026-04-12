import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useGoogleCalendar() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["google_calendar", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("calendar_events").select("*").eq("user_id", user!.id).eq("source", "google").order("start_time");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useGoogleCalendarConnection() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["google_calendar_connection", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("google_calendar_connections").select("*").eq("user_id", user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
    retry: false,
  });
}

export function useConnectGoogleCalendar() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("google-calendar-auth", {});
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      return data;
    },
  });
}
