import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/AppShell";
import { toast } from "sonner";

const sections = ["Profile", "Appearance", "Subscription", "Account"] as const;

export default function SettingsPage() {
  const { user, profile, updateProfile, signOut } = useAuth();
  const { data: prefs } = useUserPreferences();
  const navigate = useNavigate();
  const [section, setSection] = useState<typeof sections[number]>("Profile");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  }, [profile]);

  useEffect(() => {
    if (prefs) {
      setDarkMode((prefs as any).dark_mode || false);
      setAvatarUrl((prefs as any).avatar_url || "");
    }
  }, [prefs]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await updateProfile({ full_name: fullName });
    if (error) toast.error("Failed to save");
    else toast.success("Profile saved");
    setSaving(false);
  };

  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await (supabase as any).from("user_preferences").update({ dark_mode: newValue }).eq("user_id", user!.id);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    toast.error("Account deletion requires admin support. Please contact us.");
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          {sections.map((s) => (
            <button key={s} onClick={() => setSection(s)} className={`px-4 py-2 text-sm border-b-2 -mb-px whitespace-nowrap transition-colors ${section === s ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>

        {section === "Profile" && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">Display Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary mt-1" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <p className="text-sm mt-1 text-muted-foreground">{user?.email}</p>
            </div>
            <button onClick={saveProfile} disabled={saving} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        )}

        {section === "Appearance" && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle dark theme</p>
              </div>
              <button onClick={toggleDarkMode} className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-700"}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        )}

        {section === "Subscription" && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <p className="text-sm font-medium mb-1">Current Plan</p>
            <p className="text-sm text-muted-foreground capitalize mb-3">{(prefs as any)?.plan_tier || "Free"}</p>
            {((prefs as any)?.plan_tier || "free") === "free" ? (
              <a href="https://buy.stripe.com/aFa3cvf0eagu0CM55Eak001" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
                Upgrade to Pro
              </a>
            ) : (
              <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">Active</span>
            )}
          </div>
        )}

        {section === "Account" && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <button onClick={handleSignOut} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent">
                Sign Out
              </button>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900 rounded-xl p-5">
              <p className="text-sm font-medium text-destructive mb-2">Danger Zone</p>
              <button onClick={handleDeleteAccount} className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:opacity-90">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
