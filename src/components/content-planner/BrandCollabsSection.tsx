// BrandCollabsSection
import { useBrandCollaborations } from "@/hooks/useBrandCollaborations";
import { Plus } from "lucide-react";

export default function BrandCollabsSection() {
  const { data: collabs = [] } = useBrandCollaborations();
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Brand Collabs</h3>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium"><Plus className="w-3.5 h-3.5" /> Add</button>
      </div>
      {(collabs as any[]).length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No brand collaborations yet</p> : (
        <div className="space-y-2">
          {(collabs as any[]).map((c: any) => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <p className="text-sm font-medium">{c.brand_name}</p>
              <span className="text-xs text-muted-foreground">{c.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
