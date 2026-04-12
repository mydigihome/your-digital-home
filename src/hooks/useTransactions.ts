import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useTransactions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("expenses").select("*").eq("user_id", user!.id).order("expense_date", { ascending: false }).limit(100);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}
