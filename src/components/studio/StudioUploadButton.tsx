import { useState, useRef } from "react";
import { Upload, X, FileText, Image, Film, Music, Archive, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { toast } from "sonner";

const ASSET_TYPES = [
  { key: 'logo', label: 'Logo / Brand Mark', icon: Image, hint: 'PNG, SVG, WEBP' },
  { key: 'photo', label: 'Photo / Headshot', icon: Image, hint: 'JPG, PNG, WEBP' },
  { key: 'media_kit', label: 'Media Kit', icon: FileText, hint: 'PDF' },
  { key: 'pitch_deck', label: 'Pitch Deck', icon: FileText, hint: 'PDF, PPTX' },
  { key: 'reel', label: 'Intro Reel / Demo', icon: Film, hint: 'MP4, MOV' },
  { key: 'brand_guidelines', label: 'Brand Guidelines', icon: FileText, hint: 'PDF, DOC' },
  { key: 'contract_template', label: 'Contract Template', icon: FileText, hint: 'PDF, DOCX' },
  { key: 'other', label: 'Other Document', icon: Archive, hint: 'Any file' },
];

interface Props {
  onUploaded?: () => void;
}

export default function StudioUploadButton({ onUploaded }: Props) {
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'type' | 'upload' | 'done'>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const accentColor = (prefs as any)?.theme_color ||
    (typeof window !== 'undefined' ? localStorage.getItem('dh_accent_color') : null) || '#10B981';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !user || !selectedType) return;
    setUploading(true);
    const results: string[] = [];

    for (const file of files) {
      const ext = file.name.split('.').pop();
      const path = `studio/${user.id}/${selectedType}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const { error: uploadError } = await supabase.storage.from('studio-assets').upload(path, file, { upsert: true });
      if (uploadError) { toast.error(`Failed to upload ${file.name}`); continue; }

      const { data: { publicUrl } } = supabase.storage.from('studio-assets').getPublicUrl(path);

      // Save to studio_assets table
      const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : file.type.includes('pdf') ? 'pdf' : 'document';
      await (supabase as any).from('studio_assets').insert({
        user_id: user.id,
        file_name: file.name,
        file_url: publicUrl,
        file_type: fileType,
        asset_type: selectedType,
        applied_fields: getAppliedFields(selectedType, fileType, publicUrl),
      });

      // Auto-populate studio_profile fields
      await autoPopulateProfile(user.id, selectedType, fileType, publicUrl, file.name);

      results.push(file.name);
    }

    setUploadedFiles(results);
    setUploading(false);
    setStep('done');
    toast.success(`${results.length} file${results.length > 1 ? 's' : ''} uploaded to your Studio`);
    onUploaded?.();
    // Reset input
    if (fileRef.current) fileRef.current.value = '';
  };

  function getAppliedFields(assetType: string, fileType: string, url: string): Record<string, string> {
    const mapping: Record<string, string[]> = {
      logo: ['logo_url', 'studio_photo'],
      photo: ['studio_photo', 'cover_photo'],
      media_kit: ['media_kit_url'],
      pitch_deck: ['pitch_deck_url'],
      reel: ['reel_url', 'intro_video_url'],
      brand_guidelines: ['brand_guidelines_url'],
      contract_template: ['contract_template_url'],
    };
    const fields = mapping[assetType] || ['document_url'];
    return Object.fromEntries(fields.map(f => [f, url]));
  }

  async function autoPopulateProfile(userId: string, assetType: string, fileType: string, url: string, fileName: string) {
    const fieldMapping: Record<string, Record<string, string>> = {
      logo: { logo_url: url, studio_photo: url },
      photo: { studio_photo: url },
      media_kit: { media_kit_url: url },
      pitch_deck: { pitch_deck_url: url },
      reel: { reel_url: url },
      brand_guidelines: { brand_guidelines_url: url },
      contract_template: { contract_template_url: url },
    };
    const updates = fieldMapping[assetType];
    if (!updates) return;
    // Check if profile exists
    const { data: existing } = await (supabase as any).from('studio_profile').select('id').eq('user_id', userId).maybeSingle();
    if (existing) {
      await (supabase as any).from('studio_profile').update({ ...updates, updated_at: new Date().toISOString() }).eq('user_id', userId);
    } else {
      await (supabase as any).from('studio_profile').insert({ user_id: userId, ...updates });
    }
  }

  const reset = () => { setStep('type'); setSelectedType(null); setUploadedFiles([]); setOpen(false); };

  return (
    <>
      {/* Upload button — uses user's accent/theme color */}
      <button
        onClick={() => setOpen(true)}
        style={{ background: accentColor }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
      >
        <Upload className="w-4 h-4" />
        Upload to Studio
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => reset()}
        >
          <div
            className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-base font-semibold text-foreground">Upload to Studio</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step === 'type' && 'Choose what you\'re uploading'}
                  {step === 'upload' && 'Select your file(s)'}
                  {step === 'done' && 'Uploaded & applied to your Studio'}
                </p>
              </div>
              <button onClick={reset} className="p-1 hover:bg-muted rounded-full transition">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-5">
              {step === 'type' && (
                <div className="grid grid-cols-2 gap-2">
                  {ASSET_TYPES.map(type => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.key}
                        onClick={() => { setSelectedType(type.key); setStep('upload'); }}
                        className="flex items-start gap-3 p-3 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-muted/30 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground leading-tight">{type.label}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{type.hint}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 'upload' && (
                <div>
                  <div className="mb-4 p-3 rounded-xl bg-muted/30 border border-border">
                    <p className="text-xs font-semibold text-foreground">{ASSET_TYPES.find(t => t.key === selectedType)?.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Accepted: {ASSET_TYPES.find(t => t.key === selectedType)?.hint}</p>
                  </div>

                  {uploading ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-3">
                      <Loader2 className="w-8 h-8 animate-spin" style={{ color: accentColor }} />
                      <p className="text-sm text-muted-foreground">Uploading & applying to Studio...</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">Click to select file(s)</p>
                        <p className="text-xs text-muted-foreground mt-1">Or drag and drop</p>
                      </div>
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button onClick={() => setStep('type')} className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← Back
                  </button>
                </div>
              )}

              {step === 'done' && (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${accentColor}20` }}>
                    <Check className="w-7 h-7" style={{ color: accentColor }} />
                  </div>
                  <p className="text-base font-semibold text-foreground mb-1">Uploaded successfully!</p>
                  <p className="text-sm text-muted-foreground mb-1">{uploadedFiles.join(', ')}</p>
                  <p className="text-xs text-muted-foreground mb-6">Auto-applied to your Studio profile fields</p>
                  <div className="flex gap-3">
                    <button onClick={() => { setStep('type'); setSelectedType(null); setUploadedFiles([]); }} className="flex-1 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition">
                      Upload More
                    </button>
                    <button
                      onClick={reset}
                      style={{ background: accentColor }}
                      className="flex-1 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
