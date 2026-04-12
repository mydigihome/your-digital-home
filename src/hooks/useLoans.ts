import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Loan {
  id: string;
  user_id: string;
  name: string;
  amount: number | null;
  interest_rate: number | null;
  monthly_payment: number | null;
  created_at: string;
}

export function useLoans() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("loans")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Loan[];
    },
    enabled: !!user,
  });
}

export function useCreateLoan() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (loan: Partial<Loan>) => {
      const { error } = await (supabase as any)
        .from("loans")
        .insert({ ...loan, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["loans"] }),
  });
}

export function useDeleteLoan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("loans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["loans"] }),
  });
}
