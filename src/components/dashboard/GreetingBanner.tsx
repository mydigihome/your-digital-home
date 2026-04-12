import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function GreetingBanner() {
  const { profile, user } = useAuth();
  const name = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there";
  return (
    <div className="px-6 py-4">
      <p className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM d")}</p>
      <h1 className="text-2xl font-semibold text-foreground mt-0.5">{getGreeting()}, {name}</h1>
    </div>
  );
}
