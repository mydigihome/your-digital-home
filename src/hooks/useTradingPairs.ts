import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useTradingPairs() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["trading_pairs", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("trading_pairs").select("*").eq("user_id", user!.id).order("sort_order");
      if (error) throw error;
      return (data || []) as TradingPair[];
    },
    enabled: !!user,
  });
}

export interface TradingPair {
  id: string;
  user_id: string;
  symbol: string;
  display_name: string;
  category: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}
