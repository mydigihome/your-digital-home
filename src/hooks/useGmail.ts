import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type GmailEmail = any;

export function useGmailConnection() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["gmail_connection", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("gmail_connections")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
    retry: false,
  });
}

export function useConnectGmail() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("gmail-auth", {});
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      return data;
    },
  });
}

export function useHandleGmailCallback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      const { data, error } = await supabase.functions.invoke("gmail-callback", { body: { code } });
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gmail_connection"] }),
  });
}

export function useGmailEmails() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["gmail_emails", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("gmail-fetch", { body: { user_id: user!.id } });
      if (error) throw error;
      return data?.emails || [];
    },
    enabled: !!user,
    retry: false,
  });
}

export function useTrackedThreads() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tracked_threads", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("tracked_threads")
        .select("*")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useTrackThread() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (thread: any) => {
      const { error } = await (supabase as any)
        .from("tracked_threads")
        .insert({ ...thread, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tracked_threads"] }),
  });
}

export function useUntrackThread() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("tracked_threads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tracked_threads"] }),
  });
}

export function useUpdateThreadCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, category }: { id: string; category: string }) => {
      const { error } = await (supabase as any).from("tracked_threads").update({ category }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tracked_threads"] }),
  });
}

export function useDisconnectGmail() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async () => {
      const { error } = await (supabase as any).from("gmail_connections").delete().eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gmail_connection"] }),
  });
}

export function useGmail() {
  return useGmailEmails();
}
