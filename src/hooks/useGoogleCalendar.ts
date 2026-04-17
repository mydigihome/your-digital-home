import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useGoogleCalendarConnection() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["gcal_connection", user?.id],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("user_preferences")
        .select("google_calendar_connected, google_calendar_email")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (data?.google_calendar_connected) {
        return { connected: true, calendar_email: data.google_calendar_email };
      }
      return null;
    },
    enabled: !!user,
  });
}

export function useConnectGoogleCalendar() {
  const [connecting, setConnecting] = useState(false);

  const startConnect = async () => {
    setConnecting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar.readonly",
        redirectTo: `${window.location.origin}/settings?tab=connections&gcal=connected`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) setConnecting(false);
  };

  return { startConnect, connecting };
}

export function useDisconnectGoogleCalendar() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async () => {
      await (supabase as any)
        .from("user_preferences")
        .update({ google_calendar_connected: false, google_calendar_email: null })
        .eq("user_id", user!.id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gcal_connection"] }),
  });
}
