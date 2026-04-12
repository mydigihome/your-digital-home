import { useState } from "react";
import { X } from "lucide-react";

export default function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Join the Waitlist</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background mb-3" />
        <button onClick={onClose} className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Join Waitlist</button>
      </div>
    </div>
  );
}
