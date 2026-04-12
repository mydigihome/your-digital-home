import { useState, useRef } from "react";
import { ImagePlus, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface PageHeaderProps {
  title: string; onTitleChange?: (title: string) => void;
  icon?: string | null; iconType?: string | null; onIconChange?: (icon: string, type: string) => void;
  coverImage?: string | null; coverType?: string | null; onCoverChange?: (cover: string, type: string) => void;
  editable?: boolean; subtitle?: string; actions?: React.ReactNode;
}

export default function PageHeader({ title, onTitleChange, icon, coverImage, coverType, onCoverChange, editable = true, subtitle, actions }: PageHeaderProps) {
  const { user } = useAuth();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const hasCover = coverType && coverType !== "none" && coverImage;
  const coverStyle = hasCover ? (coverType === "gradient" ? { background: coverImage! } : { backgroundImage: `url(${coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }) : { background: "linear-gradient(135deg, hsl(var(--primary)/0.08) 0%, hsl(var(--primary)/0.02) 100%)" };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file || !user) return;
    const path = `${user.id}/covers/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("user-assets").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data: { publicUrl } } = supabase.storage.from("user-assets").getPublicUrl(path);
    onCoverChange?.(publicUrl, "image"); toast.success("Cover updated");
  };

  const handleTitleBlur = () => { setIsEditingTitle(false); if (titleValue.trim() && titleValue !== title) onTitleChange?.(titleValue.trim()); };

  return (
    <div className="mb-8 relative">
      <div className="group relative h-[200px] rounded-t-xl overflow-hidden" style={coverStyle}>
        {editable && !hasCover && <button onClick={() => coverInputRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/50 transition-colors hover:text-muted-foreground/80"><Upload className="h-8 w-8" /><span className="text-xs font-medium">Click to add a cover image</span></button>}
        {editable && <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"><button onClick={() => coverInputRef.current?.click()} className="flex items-center gap-1.5 rounded-md bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm"><ImagePlus className="h-3.5 w-3.5" /> {hasCover ? "Change" : "Add cover"}</button>{hasCover && <button onClick={() => onCoverChange?.("", "none")} className="flex items-center gap-1 rounded-md bg-card/90 px-2 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm"><X className="h-3.5 w-3.5" /></button>}</div>}
        <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
      </div>
      <div className="relative px-8 -mt-10">
        <div className="flex items-end gap-4">
          <div className="flex h-[78px] w-[78px] items-center justify-center rounded-xl bg-card text-4xl shadow-md border border-border">{icon || ""}</div>
          <div className="flex-1 pb-1">
            {isEditingTitle && editable ? (
              <input value={titleValue} onChange={(e) => setTitleValue(e.target.value)} onBlur={handleTitleBlur} onKeyDown={(e) => e.key === "Enter" && handleTitleBlur()} autoFocus className="w-full bg-transparent text-3xl font-semibold text-foreground outline-none" placeholder="Untitled" />
            ) : (
              <h1 onClick={() => editable && onTitleChange && setIsEditingTitle(true)} className={cn("text-3xl font-semibold text-foreground", editable && onTitleChange && "cursor-text hover:bg-secondary/50 rounded-md px-1 -mx-1 transition-colors")}>{title}</h1>
            )}
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 pb-1">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
