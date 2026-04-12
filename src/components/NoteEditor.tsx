import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCreateNote, useUpdateNote, type Note } from "@/hooks/useNotes";
import { toast } from "sonner";

interface NoteEditorProps { open: boolean; onClose: () => void; note?: Note | null; }

export default function NoteEditor({ open, onClose, note }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  const handleSave = async () => {
    setSaving(true);
    try {
      if (note?.id) { await updateNote.mutateAsync({ id: note.id, title: title.trim() || "Untitled", content: content }); }
      else { await createNote.mutateAsync({ title: title.trim() || "Untitled", content: content }); }
      toast.success("Note saved!"); onClose();
    } catch { toast.error("Failed to save note"); }
    setSaving(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9998] bg-foreground/20 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-x-4 bottom-4 z-[10000] max-w-md mx-auto rounded-2xl bg-[#C4B5FD] shadow-2xl overflow-hidden" style={{ maxHeight: "80vh" }}>
            <div className="flex items-center justify-between px-4 py-3"><span className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>Quick Note</span><button onClick={onClose}><X className="h-4 w-4" style={{ color: "rgba(0,0,0,0.4)" }} /></button></div>
            <div className="px-4 pb-2"><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." className="w-full bg-transparent text-lg font-semibold outline-none" style={{ color: "rgba(0,0,0,0.9)" }} autoFocus /></div>
            <div className="px-4 pb-4"><textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Start typing..." className="w-full bg-transparent outline-none min-h-[150px] text-sm resize-none" style={{ color: "rgba(0,0,0,0.75)" }} /></div>
            <div className="px-4 pb-4"><button onClick={handleSave} disabled={saving} className="w-full rounded-xl py-3 text-sm font-medium" style={{ background: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.7)" }}>{saving ? "Saving..." : "Save Note"}</button></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
