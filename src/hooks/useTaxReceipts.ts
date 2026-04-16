import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface TaxReceipt {
  id: string;
  user_id: string;
  tax_year: number;
  receipt_date: string | null;
  vendor: string | null;
  description: string | null;
  amount: number | null;
  category: string | null;
  subcategory: string | null;
  receipt_image_url: string | null;
  notes: string | null;
  deductible: boolean;
  created_at: string;
}

export function useTaxReceipts(year?: number) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tax_receipts", user?.id, year],
    queryFn: async () => {
      let q = (supabase as any)
        .from("tax_receipts")
        .select("*")
        .eq("user_id", user!.id)
        .order("receipt_date", { ascending: false });
      if (year) q = q.eq("tax_year", year);
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as TaxReceipt[];
    },
    enabled: !!user,
  });
}

export function useCreateTaxReceipt() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (receipt: Omit<TaxReceipt, "id" | "user_id" | "created_at">) => {
      const { error } = await (supabase as any).from("tax_receipts").insert({ ...receipt, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tax_receipts"] }),
  });
}

export function useDeleteTaxReceipt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("tax_receipts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tax_receipts"] }),
  });
}
