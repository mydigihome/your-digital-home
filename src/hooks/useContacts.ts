import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type Contact = any;

export function useContacts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["contacts", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("contacts")
        .select("*")
        .eq("user_id", user!.id)
        .order("name");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateContact() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (contact: any) => {
      const { error } = await (supabase as any)
        .from("contacts")
        .insert({ ...contact, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useUpdateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await (supabase as any).from("contacts").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("contacts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useContactInteractions(contactId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["contact_interactions", contactId, user?.id],
    queryFn: async () => {
      let q = (supabase as any).from("contact_interactions").select("*").eq("user_id", user!.id);
      if (contactId) q = q.eq("contact_id", contactId);
      const { data, error } = await q.order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateInteraction() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (interaction: any) => {
      const { error } = await (supabase as any)
        .from("contact_interactions")
        .insert({ ...interaction, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact_interactions"] }),
  });
}
