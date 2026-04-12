// AnnouncementBanner - shows system-wide announcements from DB
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    (supabase as any).from("announcements").select("*").eq("active", true).order("created_at", { ascending: false }).limit(1).maybeSingle()
      .then(({ data }: any) => { if (data) setAnnouncement(data); });
  }, []);

  if (!announcement || dismissed) return null;

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium" style={{ background: announcement.bg_color || "#6366f1", color: "white" }}>
      <span>{announcement.message}</span>
      <button onClick={() => setDismissed(true)} className="ml-4 p-0.5 hover:opacity-70"><X className="w-4 h-4" /></button>
    </div>
  );
}
