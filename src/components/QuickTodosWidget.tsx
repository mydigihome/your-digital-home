// Re-export QuickTodosWidget from its own file
import { useQuickTodos, useAddQuickTodo, useUpdateQuickTodo, useDeleteQuickTodo } from "@/hooks/useQuickTodos";
import { useState } from "react";

export default function QuickTodosWidget() {
  const { data: todos = [] } = useQuickTodos();
  const addTodo = useAddQuickTodo();
  const updateTodo = useUpdateQuickTodo();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo.mutate({ text: text.trim(), order: todos.length });
    setText("");
  };

  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <h3 className="text-base font-semibold text-foreground mb-3">Quick To-Dos</h3>
      <div className="space-y-2">
        {(todos as any[]).filter((t: any) => !t.completed).slice(0, 5).map((todo: any) => (
          <div key={todo.id} className="flex items-center gap-2">
            <button onClick={() => updateTodo.mutate({ id: todo.id, completed: true })}
              className="w-4 h-4 rounded-full border-2 border-border flex-shrink-0" />
            <span className="text-sm">{todo.text}</span>
          </div>
        ))}
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()}
          placeholder="Add todo..." className="w-full text-sm px-2 py-1 border border-dashed border-border rounded bg-transparent outline-none" />
      </div>
    </div>
  );
}
