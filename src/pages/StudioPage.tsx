import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useStudioProfile, useUpsertStudioProfile, useStudioGoals, useCreateStudioGoal } from "@/hooks/useStudio";
import AppShell from "@/components/AppShell";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";

const studioTabs = ["Overview", "Platforms", "Goals", "Docs"] as const;

export default function StudioPage() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useStudioProfile();
  const upsert = useUpsertStudioProfile();
  const { data: goals } = useStudioGoals();
  const createGoal = useCreateStudioGoal();
  const [tab, setTab] = useState<typeof studioTabs[number]>("Overview");
  const [form, setForm] = useState<Record<string, any>>({});
  const [goalForm, setGoalForm] = useState({ title: "", category: "", deadline: "", progress: 0 });
  const [showGoalForm, setShowGoalForm] = useState(false);

  const val = (key: string) => form[key] ?? profile?.[key] ?? "";
  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const saveProfile = async () => {
    try {
      await upsert.mutateAsync(form);
      toast.success("Profile saved");
      setForm({});
    } catch { toast.error("Failed to save"); }
  };

  const addGoal = async () => {
    if (!goalForm.title) return;
    try {
      await createGoal.mutateAsync(goalForm);
      toast.success("Goal created");
      setGoalForm({ title: "", category: "", deadline: "", progress: 0 });
      setShowGoalForm(false);
    } catch { toast.error("Failed to create goal"); }
  };

  const fieldInput = (label: string, key: string, type = "text") => (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input value={val(key)} onChange={(e) => set(key, e.target.value)} type={type} className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary mt-1" />
    </div>
  );

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Studio</h1>
          {(tab === "Overview" || tab === "Platforms" || tab === "Docs") && Object.keys(form).length > 0 && (
            <button onClick={saveProfile} disabled={upsert.isPending} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4" /> Save
            </button>
          )}
        </div>

        <div className="flex gap-1 mb-6 border-b border-border">
          {studioTabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${tab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}

        {tab === "Overview" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldInput("Studio Name", "studio_name")}
            {fieldInput("Brand Name", "brand_name")}
            {fieldInput("Handle", "handle")}
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground">Bio</label>
              <textarea value={val("bio")} onChange={(e) => set("bio", e.target.value)} rows={4} className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary mt-1 resize-none" />
            </div>
          </div>
        )}

        {tab === "Platforms" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldInput("Instagram URL", "instagram_url")}
            {fieldInput("YouTube URL", "youtube_url")}
            {fieldInput("TikTok URL", "tiktok_url")}
            {fieldInput("Twitter URL", "twitter_url")}
            {fieldInput("LinkedIn URL", "linkedin_url")}
            {fieldInput("Substack URL", "substack_url")}
            {fieldInput("Podcast URL", "podcast_url")}
          </div>
        )}

        {tab === "Goals" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{(goals || []).length} goals</p>
              <button onClick={() => setShowGoalForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
                <Plus className="h-4 w-4" /> Add Goal
              </button>
            </div>
            {showGoalForm && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-4 grid gap-3 sm:grid-cols-2">
                <input value={goalForm.title} onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })} placeholder="Goal title" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={goalForm.category} onChange={(e) => setGoalForm({ ...goalForm, category: e.target.value })} placeholder="Category" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={goalForm.deadline} onChange={(e) => setGoalForm({ ...goalForm, deadline: e.target.value })} type="date" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <div className="sm:col-span-2 flex gap-2">
                  <button onClick={addGoal} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">Create</button>
                  <button onClick={() => setShowGoalForm(false)} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {(goals || []).map((g: any) => (
                <div key={g.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">{g.title}</p>
                    <span className="text-xs text-muted-foreground">{g.progress || 0}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${g.progress || 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Docs" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldInput("EIN Number", "ein_number")}
            {fieldInput("LLC Document URL", "llc_document")}
            {fieldInput("Pitch Deck URL", "pitch_deck")}
            {fieldInput("Business License URL", "business_license")}
          </div>
        )}
      </div>
    </AppShell>
  );
}
