import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  role: string | null;
  status: string | null;
  notes: string | null;
  last_contacted_date: string | null;
  priority: number | null;
  created_at: string;
  updated_at: string;
}

export function useContacts(filter?: { search?: string }) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["contacts", user?.id, filter],
    queryFn: async () => {
      let query = supabase.from("contacts").select("*").order("name");
      if (filter?.search) {
        query = query.or(`name.ilike.%${filter.search}%,company.ilike.%${filter.search}%,email.ilike.%${filter.search}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Contact[];
    },
    enabled: !!user,
  });
}

export function useCreateContact() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (contact: Partial<Contact>) => {
      const { data, error } = await supabase
        .from("contacts")
        .insert({ ...contact, user_id: user!.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data as Contact;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useUpdateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<Contact>) => {
      const { error } = await supabase.from("contacts").update(data as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}
