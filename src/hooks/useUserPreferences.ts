import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface UserPreferences {
  id?: string;
  user_id: string;
  dark_mode?: boolean;
  plan_tier?: string;
  is_subscribed?: boolean;
  studio_unlocked?: boolean;
  templates_unlocked?: boolean;
  onboarding_completed?: boolean;
  show_daily_scripture?: boolean;
  religion?: string | null;
  profile_photo?: string | null;
  founding_member_since?: string | null;
  widget_order_left?: string[] | null;
  widget_order_right?: string[] | null;
  dashboard_cover?: string | null;
  dashboard_cover_type?: string | null;
  last_review_month?: string | null;
  theme_color?: string | null;
  secondary_color?: string | null;
  font_size?: string | null;
  density?: string | null;
  accent_colors?: Record<string, string> | null;
  sidebar_theme?: string | null;
  [key: string]: any;
}

export function useUserPreferences() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_preferences", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("user_preferences").select("*").eq("user_id", user!.id).maybeSingle();
      if (error) throw error;
      return data as UserPreferences | null;
    },
    enabled: !!user,
  });
}

export function useUpsertPreferences() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data: Partial<UserPreferences>) => {
      const { error } = await (supabase as any).from("user_preferences").upsert({ ...data, user_id: user!.id }, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user_preferences"] }),
  });
}
