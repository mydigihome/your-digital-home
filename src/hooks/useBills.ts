import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Bill {
  id: string;
  user_id: string;
  name: string;
  merchant: string | null;
  amount: number | null;
  due_date: number | null;
  due_date_proper: string | null;
  category: string | null;
  status: string | null;
  created_at: string;
}

export function useBills() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["bills", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("bills")
        .select("*")
        .eq("user_id", user!.id)
        .order("due_date_proper", { ascending: true });
      if (error) throw error;
      return data as Bill[];
    },
    enabled: !!user,
  });
}

export function useAddBill() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (b: Partial<Bill>) => {
      const { data, error } = await (supabase as any)
        .from("bills")
        .insert({ ...b, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}

export function useUpdateBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Bill> & { id: string }) => {
      const { error } = await (supabase as any).from("bills").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}

export function useDeleteBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("bills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}
