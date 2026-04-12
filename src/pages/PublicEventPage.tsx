import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PublicEventPage() {
  const { token } = useParams<{ token: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showRsvp, setShowRsvp] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", status: "" as "" | "accepted" | "declined" | "maybe" });

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;

  useEffect(() => {
    if (!token) return;
    fetch(`https://${projectId}.supabase.co/functions/v1/event-rsvp?token=${token}`)
      .then(r => r.json()).then(data => { if (data.error) setError(data.error); else setEvent(data.event); })
      .catch(() => setError("Failed to load event")).finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async () => {
    if (!form.email || !form.status) { toast.error("Please enter your email and select your response"); return; }
    try {
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/event-rsvp?token=${token}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ guest_email: form.email, status: form.status, name: form.name }) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      setSubmitted(true); toast.success("RSVP submitted!");
    } catch { toast.error("Failed to submit RSVP"); }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (error || !event) return <div className="min-h-screen bg-background flex items-center justify-center p-4"><div className="text-center"><h1 className="text-2xl font-bold mb-2">Event Not Found</h1><p className="text-muted-foreground">This event link is invalid or has been removed.</p></div></div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative w-full h-[220px]" style={{ background: event.projects?.cover_image ? `url(${event.projects.cover_image}) center/cover` : "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.6) 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="max-w-xl mx-auto px-4 -mt-20 relative z-10 pb-12">
        <div className="rounded-2xl border border-border bg-card shadow-lg p-6 space-y-5">
          <h1 className="text-3xl font-bold text-foreground">{event.projects?.name}</h1>
          <div className="space-y-2 text-sm text-muted-foreground">
            {event.event_date && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /><span>{format(new Date(event.event_date), "EEEE, MMMM d, yyyy · h:mm a")}</span></div>}
            {event.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><span>{event.location}</span></div>}
          </div>
          {event.description && <p className="text-sm text-foreground whitespace-pre-wrap">{event.description}</p>}
          {!submitted ? (
            <Button onClick={() => setShowRsvp(!showRsvp)} className="w-full" size="lg">RSVP Now</Button>
          ) : (
            <div className="text-center py-4"><CheckCircle className="mx-auto h-10 w-10 text-green-500 mb-2" /><p className="text-lg font-semibold">You're In!</p></div>
          )}
          {showRsvp && !submitted && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div><Label>Your Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" /></div>
              <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" /></div>
              <div className="grid grid-cols-3 gap-2">
                {(["accepted", "declined", "maybe"] as const).map(s => (
                  <button key={s} onClick={() => setForm(p => ({ ...p, status: s }))} className={cn("flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all", form.status === s ? "border-primary bg-primary/5" : "border-border")}>
                    {s === "accepted" ? <CheckCircle className="h-6 w-6 text-green-500" /> : s === "declined" ? <XCircle className="h-6 w-6 text-red-500" /> : <HelpCircle className="h-6 w-6 text-yellow-500" />}
                    <span className="text-sm font-medium capitalize">{s === "accepted" ? "Yes" : s === "declined" ? "No" : "Maybe"}</span>
                  </button>
                ))}
              </div>
              <Button onClick={handleSubmit} className="w-full" size="lg">Submit RSVP</Button>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">Powered by Digital Home</p>
      </div>
    </div>
  );
}
