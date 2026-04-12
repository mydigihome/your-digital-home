import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useHabits() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["habits", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("habits").select("*").eq("user_id", user!.id).order("created_at");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useHabitLogs() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["habit_logs", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("habit_logs").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateHabit() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (name: string) => {
      const { error } = await (supabase as any).from("habits").insert({ name, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });
}

export function useLogHabitHours() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ habit_id, hours, week_start_date }: { habit_id: string; hours: number; week_start_date: string }) => {
      const { error } = await (supabase as any).from("habit_logs").upsert({ habit_id, user_id: user!.id, hours, week_start_date }, { onConflict: "habit_id,week_start_date" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habit_logs"] }),
  });
}

export function getCurrentWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}
