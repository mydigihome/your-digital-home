import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string | null;
  content: string | null;
  mood: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export function useJournalEntries() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["journal_entries", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("journal_entries")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as JournalEntry[];
    },
    enabled: !!user,
  });
}

export function useJournalEntry(id: string | undefined) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["journal_entry", id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("journal_entries")
        .select("*")
        .eq("id", id!)
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data as JournalEntry;
    },
    enabled: !!user && !!id,
  });
}

export function useUpsertJournalEntry() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (entry: { id?: string; title?: string; content?: string; mood?: string }) => {
      const payload = { ...entry, user_id: user!.id };
      const { data, error } = await (supabase as any)
        .from("journal_entries")
        .upsert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["journal_entries"] });
      qc.invalidateQueries({ queryKey: ["journal_entry"] });
    },
  });
}

export function useDeleteJournalEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("journal_entries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journal_entries"] }),
  });
}
