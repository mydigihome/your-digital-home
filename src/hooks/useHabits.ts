import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface HabitLog {
  id: string;
  user_id: string;
  habit_id: string;
  hours: number;
  week_start_date: string;
  created_at: string;
}

export function getCurrentWeekStart() {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day;
  const weekStart = new Date(today);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString().split("T")[0];
}

export function useHabits() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["habits", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("habits")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Habit[];
    },
    enabled: !!user,
  });
}

export function useHabitLogs(weekStart?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["habit_logs", user?.id, weekStart],
    queryFn: async () => {
      let query = (supabase as any)
        .from("habit_logs")
        .select("*")
        .eq("user_id", user!.id);
      if (weekStart) query = query.eq("week_start_date", weekStart);
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data as HabitLog[];
    },
    enabled: !!user,
  });
}

export function useCreateHabit() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const { error } = await (supabase as any)
        .from("habits")
        .insert({ user_id: user!.id, name });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });
}

export function useLogHabitHours() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ habit_id, hours, week_start_date }: { habit_id: string; hours: number; week_start_date: string }) => {
      const { error } = await (supabase as any)
        .from("habit_logs")
        .insert({ user_id: user!.id, habit_id, hours, week_start_date });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habit_logs"] }),
  });
}
