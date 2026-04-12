import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useQuickTodos() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["quick_todos", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("quick_todos").select("*").eq("user_id", user!.id).order("order");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useAddQuickTodo() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ text, order }: { text: string; order: number }) => {
      const { error } = await (supabase as any).from("quick_todos").insert({ text, order, user_id: user!.id, completed: false });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quick_todos"] }),
  });
}

export function useUpdateQuickTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await (supabase as any).from("quick_todos").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quick_todos"] }),
  });
}

export function useDeleteQuickTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("quick_todos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quick_todos"] }),
  });
}
