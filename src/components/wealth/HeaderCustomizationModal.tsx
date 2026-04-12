// HeaderCustomizationModal
import { X } from "lucide-react";

export default function HeaderCustomizationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Customize View</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <p className="text-sm text-muted-foreground">Drag and drop sections to customize your wealth dashboard layout.</p>
        <button onClick={onClose} className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Done</button>
      </div>
    </div>
  );
}
