import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type GoalStage = any;
export type GoalTask = any;

export function useGoals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("goals").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useCreateGoal() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (goal: any) => {
      const { error } = await (supabase as any).from("goals").insert({ ...goal, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useUpdateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await (supabase as any).from("goals").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useGoalStages(projectId?: string) {
  return useQuery({
    queryKey: ["goal_stages", projectId],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("goal_stages").select("*").eq("project_id", projectId!).order("position");
      if (error) throw error;
      return data || [];
    },
    enabled: !!projectId,
  });
}

export function useGoalTasks(projectId?: string) {
  return useQuery({
    queryKey: ["goal_tasks", projectId],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("goal_tasks").select("*").eq("project_id", projectId!).order("position");
      if (error) throw error;
      return data || [];
    },
    enabled: !!projectId,
  });
}

export function useCreateGoalStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (stage: any) => {
      const { data, error } = await (supabase as any).from("goal_stages").insert(stage).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goal_stages"] }),
  });
}

export function useCreateGoalTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (task: any) => {
      const { data, error } = await (supabase as any).from("goal_tasks").insert(task).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goal_tasks"] }),
  });
}

export function useUpdateGoalTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await (supabase as any).from("goal_tasks").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goal_tasks"] }),
  });
}

export function useDeleteGoalStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("goal_stages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goal_stages"] }),
  });
}

export function useDeleteGoalTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("goal_tasks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goal_tasks"] }),
  });
}
