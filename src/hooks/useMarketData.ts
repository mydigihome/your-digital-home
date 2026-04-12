import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useMarketData(symbol = "AAPL") {
  return useQuery({
    queryKey: ["market_data", symbol],
    queryFn: async () => {
      // Placeholder - real data comes from TradingView widget
      return { symbol, price: 0, change: 0, changePercent: 0 };
    },
    staleTime: 60000,
  });
}
