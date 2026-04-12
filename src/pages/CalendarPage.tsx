import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { supabase } from "@/integrations/supabase/client";
import AppShell from "@/components/AppShell";
import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isSameMonth, startOfWeek, endOfWeek } from "date-fns";
import { toast } from "sonner";

export default function CalendarPage() {
  const { user } = useAuth();
  const { data: events, refetch } = useCalendarEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", start_time: "", end_time: "", location: "", description: "" });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const getEventsForDay = (date: Date) =>
    (events || []).filter((e: any) => e.start_time && isSameDay(new Date(e.start_time), date));

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  const addEvent = async () => {
    if (!form.title || !form.start_time) return;
    const { error } = await (supabase as any).from("calendar_events").insert({
      ...form,
      user_id: user!.id,
    });
    if (error) { toast.error("Failed to add event"); return; }
    toast.success("Event added");
    setForm({ title: "", start_time: "", end_time: "", location: "", description: "" });
    setShowForm(false);
    refetch();
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
            <Plus className="h-4 w-4" /> Add Event
          </button>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6 grid gap-3 sm:grid-cols-2">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} type="datetime-local" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} type="datetime-local" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={2} className="sm:col-span-2 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            <div className="sm:col-span-2 flex gap-2">
              <button onClick={addEvent} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">Save</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-accent rounded-lg"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="text-sm font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-accent rounded-lg"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-px text-center text-xs text-muted-foreground mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-px">
            {days.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 text-xs rounded-lg relative ${
                    isSelected ? "bg-primary text-primary-foreground" :
                    isToday ? "bg-primary/10 font-semibold" :
                    isCurrentMonth ? "hover:bg-accent" : "text-muted-foreground/40"
                  }`}
                >
                  {format(day, "d")}
                  {dayEvents.length > 0 && (
                    <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full ${isSelected ? "bg-primary-foreground" : "bg-primary"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">{format(selectedDate, "EEEE, MMMM d")}</h3>
              <button onClick={() => setSelectedDate(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events</p>
            ) : (
              <div className="space-y-2">
                {selectedEvents.map((e: any) => (
                  <div key={e.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
                    <p className="text-sm font-medium">{e.title}</p>
                    {e.start_time && <p className="text-xs text-muted-foreground">{format(new Date(e.start_time), "h:mm a")}</p>}
                    {e.location && <p className="text-xs text-muted-foreground">{e.location}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
