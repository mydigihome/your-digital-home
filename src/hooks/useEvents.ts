import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type EventGuest = any;

export function useEvents() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["events", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("events")
        .select("*")
        .eq("user_id", user!.id)
        .order("date", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useEventDetails(eventId?: string) {
  return useQuery({
    queryKey: ["event_details", eventId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("event_details")
        .select("*")
        .eq("project_id", eventId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!eventId,
  });
}

export function useEventGuests(eventId?: string) {
  return useQuery({
    queryKey: ["event_guests", eventId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("event_guests")
        .select("*")
        .eq("event_id", eventId!)
        .order("created_at");
      if (error) throw error;
      return data || [];
    },
    enabled: !!eventId,
  });
}

export function useRsvpQuestions(eventId?: string) {
  return useQuery({
    queryKey: ["rsvp_questions", eventId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("rsvp_questions")
        .select("*")
        .eq("event_id", eventId!)
        .order("created_at");
      if (error) throw error;
      return data || [];
    },
    enabled: !!eventId,
  });
}

export function useUpsertEventDetails() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (details: any) => {
      const { error } = await (supabase as any)
        .from("event_details")
        .upsert(details, { onConflict: "project_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["event_details"] }),
  });
}

export function useAddEventGuests() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (guests: any[]) => {
      const { error } = await (supabase as any).from("event_guests").insert(guests);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["event_guests"] }),
  });
}

export function useDeleteEventGuest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("event_guests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["event_guests"] }),
  });
}

export function useCreateRsvpQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (q: any) => {
      const { error } = await (supabase as any).from("rsvp_questions").insert(q);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rsvp_questions"] }),
  });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (event: any) => {
      const { data, error } = await (supabase as any)
        .from("events")
        .insert({ ...event, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await (supabase as any).from("events").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}
