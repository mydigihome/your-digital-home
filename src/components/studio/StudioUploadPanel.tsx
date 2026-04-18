import { useState, useRef } from "react";
import { Upload, X, FileText, Image, File, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ASSET_TYPES = [
  { value: "logo", label: "Logo / Brand Mark", fields: ["studio_logo"], hint: "Auto-fills your studio logo" },
  { value: "cover", label: "Cover / Banner Photo", fields: ["studio_cover"], hint: "Auto-fills your studio banner" },
  { value: "pitch_deck", label: "Pitch Deck", fields: ["pitch_deck_url"], hint: "Auto-adds to HQ documents" },
  { value: "media_kit", label: "Media Kit", fields: ["media_kit_url"], hint: "Auto-adds to brand assets" },
  { value: "llc_doc", label: "LLC Document", fields: ["llc_doc_url"], hint: "Auto-fills LLC document field" },
  { value: "ein", label: "EIN Document", fields: ["ein_url"], hint: "Auto-fills EIN field" },
  { value: "business_license", label: "Business License", fields: ["license_url"], hint: "Auto-fills license field" },
  { value: "headshot", label: "Headshot / Profile Photo", fields: ["studio_photo"], hint: "Sets your studio profile photo" },
  { value: "portfolio", label: "Portfolio / Past Work", fields: ["portfolio"], hint: "Adds to portfolio gallery" },
  { value: "general", label: "Other Document", fields: [], hint: "Stored in your Studio assets" },
];

interface UploadedAsset {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  asset_type: string;
}

export default function StudioUploadPanel({ accentColor }: { accentColor?: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("general");
  const [uploading, setUploading] = useState(false);
  const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const accent = accentColor || "#10B981";

  const handleFile = async (file: File) => {
    if (!user) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `studio/${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: upErr } = await (supabase as any).storage.from("studio-assets").upload(path, file, { upsert: true });
      if (upErr) throw upErr;

      const { data: urlData } = (supabase as any).storage.from("studio-assets").getPublicUrl(path);
      const publicUrl = urlData.publicUrl;

      const assetTypeDef = ASSET_TYPES.find(t => t.value === selectedType)!;

      // Save to studio_assets table
      const { data: asset, error: dbErr } = await (supabase as any)
        .from("studio_assets")
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type || ext || "unknown",
          asset_type: selectedType,
          applied_fields: assetTypeDef.fields,
        })
        .select()
        .single();
      if (dbErr) throw dbErr;

      // Auto-populate studio_profile fields if applicable
      if (assetTypeDef.fields.length > 0) {
        const updates: Record<string, string> = {};
        assetTypeDef.fields.forEach(f => { updates[f] = publicUrl; });
        const { data: existing } = await (supabase as any).from("studio_profile").select("id").eq("user_id", user.id).maybeSingle();
        if (existing) {
          await (supabase as any).from("studio_profile").update({ ...updates, updated_at: new Date().toISOString() }).eq("user_id", user.id);
        } else {
          await (supabase as any).from("studio_profile").insert({ user_id: user.id, ...updates });
        }
        qc.invalidateQueries({ queryKey: ["studio_profile_overview"] });
        qc.invalidateQueries({ queryKey: ["studio_hq_profile"] });
        toast.success(`${file.name} uploaded and applied to your Studio!`);
      } else {
        toast.success(`${file.name} uploaded to Studio assets.`);
      }

      setUploadedAssets(prev => [...prev, asset]);
    } catch (err: any) {
      toast.error("Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const fileIcon = (type: string) => {
    if (type.startsWith("image")) return <Image className="w-4 h-4" />;
    if (type.includes("pdf") || type.includes("doc")) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <div className="mb-4">
      {/* Trigger button — theme-colored */}
      <div className="flex gap-2">
        <button
          onClick={() => setOpen(!open)}
          style={{ background: accent }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all"
        >
          <Upload className="w-4 h-4" />
          Upload to Studio
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="mt-3 bg-card border border-border rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">Upload a file to your Studio</p>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
          </div>

          {/* Asset type selector */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">What type of file is this?</label>
            <div className="grid grid-cols-2 gap-1.5">
              {ASSET_TYPES.map(t => (
                <button
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                    selectedType === t.value
                      ? "border-[2px] text-foreground font-semibold"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                  style={selectedType === t.value ? { borderColor: accent } : {}}
                >
                  <span className="block font-medium">{t.label}</span>
                  <span className="block text-[10px] mt-0.5 opacity-70">{t.hint}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drop zone */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            <input ref={fileRef} type="file" className="hidden" onChange={onFileInput}
              accept="image/*,.pdf,.doc,.docx,.pptx,.ppt,.xls,.xlsx,.csv,.txt,.zip" />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: accent }} />
                <p className="text-sm text-muted-foreground">Uploading and applying...</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Drop your file here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Images, PDFs, Word docs, presentations, spreadsheets</p>
              </>
            )}
          </div>

          {/* Recently uploaded */}
          {uploadedAssets.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Uploaded this session</p>
              <div className="space-y-1.5">
                {uploadedAssets.map(a => (
                  <div key={a.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
                    {fileIcon(a.file_type)}
                    <span className="text-xs text-foreground flex-1 truncate">{a.file_name}</span>
                    <span className="text-[10px] text-muted-foreground">{ASSET_TYPES.find(t => t.value === a.asset_type)?.label}</span>
                    <a href={a.file_url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium hover:underline" style={{ color: accent }}>View</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
