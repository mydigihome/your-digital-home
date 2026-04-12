import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import AppShell from "@/components/AppShell";
import { format } from "date-fns";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { profile, user } = useAuth();
  const { data: prefs } = useUserPreferences();
  const userName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "User";
  const greeting = `${getGreeting()}, ${userName}`;
  const currentDate = format(new Date(), "EEEE, MMMM d");

  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
          <p className="text-sm text-muted-foreground mt-1">{currentDate}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Welcome to Digital Home</h2>
            <p className="text-sm text-muted-foreground">Your dashboard is being rebuilt. More widgets coming soon.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}