import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJournalEntry, useUpsertJournalEntry, useDeleteJournalEntry } from "@/hooks/useJournalEntries";
import AppShell from "@/components/AppShell";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

const moods = ["Happy", "Calm", "Neutral", "Sad", "Stressed"];

export default function JournalEntryPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { data: existing } = useJournalEntry(isNew ? undefined : id);
  const upsert = useUpsertJournalEntry();
  const deleteEntry = useDeleteJournalEntry();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || "");
      setContent(existing.content || "");
      setMood(existing.mood || "");
    }
  }, [existing]);

  const handleSave = async () => {
    try {
      const payload: any = { title, content, mood: mood || null };
      if (!isNew) payload.id = id;
      await upsert.mutateAsync(payload);
      toast.success("Entry saved");
      navigate("/journal");
    } catch { toast.error("Failed to save"); }
  };

  const handleDelete = async () => {
    if (!id || isNew) return;
    if (!confirm("Delete this entry?")) return;
    try {
      await deleteEntry.mutateAsync(id);
      toast.success("Entry deleted");
      navigate("/journal");
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/journal")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex gap-2">
            {!isNew && (
              <button onClick={handleDelete} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button onClick={handleSave} disabled={upsert.isPending} className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
              {upsert.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full text-2xl font-semibold bg-transparent border-none outline-none mb-4 placeholder:text-muted-foreground/50" />

        <div className="flex gap-2 mb-4">
          {moods.map((m) => (
            <button key={m} onClick={() => setMood(mood === m ? "" : m)} className={`px-3 py-1 text-xs rounded-full border transition-colors ${mood === m ? "bg-primary text-primary-foreground border-primary" : "border-zinc-200 dark:border-zinc-700 text-muted-foreground hover:border-primary/40"}`}>
              {m}
            </button>
          ))}
        </div>

        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your thoughts..." className="w-full min-h-[400px] text-sm bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/50" />
      </div>
    </AppShell>
  );
}
