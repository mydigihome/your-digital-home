import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useCallback } from "react";

export function useMoneyPreferences() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: prefs } = useQuery({
    queryKey: ["money_preferences", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("money_preferences").select("*").eq("user_id", user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const cardOrder = prefs?.card_order || [];
  const hiddenCards = prefs?.hidden_cards || [];

  const save = async (updates: any) => {
    await (supabase as any).from("money_preferences").upsert({ ...prefs, ...updates, user_id: user!.id }, { onConflict: "user_id" });
    qc.invalidateQueries({ queryKey: ["money_preferences"] });
  };

  const updateCardOrder = useCallback((order: string[]) => save({ card_order: order }), [prefs, user]);
  const hideCard = useCallback((card: string) => save({ hidden_cards: [...hiddenCards, card] }), [prefs, user, hiddenCards]);
  const restoreCard = useCallback((card: string) => save({ hidden_cards: hiddenCards.filter((c: string) => c !== card) }), [prefs, user, hiddenCards]);
  const restoreAll = useCallback(() => save({ hidden_cards: [] }), [prefs, user]);

  return { cardOrder, hiddenCards, updateCardOrder, hideCard, restoreCard, restoreAll, prefs };
}

export function useUpsertMoneyPreferences() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data: any) => {
      const { error } = await (supabase as any).from("money_preferences").upsert({ ...data, user_id: user!.id }, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["money_preferences"] }),
  });
}
