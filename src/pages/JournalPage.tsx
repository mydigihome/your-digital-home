import { useNavigate } from "react-router-dom";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import AppShell from "@/components/AppShell";
import { Plus, BookOpen } from "lucide-react";
import { format } from "date-fns";

export default function JournalPage() {
  const navigate = useNavigate();
  const { data: entries, isLoading } = useJournalEntries();

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Journal</h1>
          <button onClick={() => navigate("/journal/new")} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
            <Plus className="h-4 w-4" /> New Entry
          </button>
        </div>

        {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}

        {!isLoading && (entries || []).length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No journal entries yet</p>
          </div>
        )}

        <div className="space-y-2">
          {(entries || []).map((entry) => (
            <div key={entry.id} onClick={() => navigate(`/journal/${entry.id}`)} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{entry.title || (entry.content?.slice(0, 60) + "...") || "Untitled"}</p>
                {entry.mood && <span className="text-sm">{entry.mood}</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{format(new Date(entry.created_at), "MMM d, yyyy")}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
