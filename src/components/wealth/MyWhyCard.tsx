import { useUserFinances, useUpsertFinances } from "@/hooks/useUserFinances";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MyWhyCard() {
  const { data: finances } = useUserFinances();
  const upsert = useUpsertFinances();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState((finances as any)?.my_why || "");

  const save = async () => {
    await upsert.mutateAsync({ my_why: text });
    setEditing(false);
    toast.success("Saved");
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-rose-500" /><h3 className="font-semibold text-foreground">My Why</h3></div>
      {editing ? (
        <>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="Why are you building wealth? What does financial freedom mean to you?" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background resize-none outline-none" />
          <div className="flex gap-2 mt-2">
            <button onClick={save} className="flex-1 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Save</button>
            <button onClick={() => setEditing(false)} className="flex-1 py-1.5 border border-border rounded-lg text-sm">Cancel</button>
          </div>
        </>
      ) : (
        <div onClick={() => setEditing(true)} className="cursor-pointer">
          {text ? <p className="text-sm text-foreground italic">"{text}"</p> : <p className="text-sm text-muted-foreground">Click to add your financial why...</p>}
        </div>
      )}
    </div>
  );
}
