import { useState, useRef } from "react";
import { Upload, X, FileText, Sparkles, CheckCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const FIELD_LABELS: Record<string, string> = {
  monthly_income: "Monthly Income",
  total_debt: "Total Debt",
  current_savings: "Current Savings",
  credit_score: "Credit Score",
  net_worth: "Net Worth",
  monthly_expenses: "Monthly Expenses",
  savings_goal: "Savings Goal",
  emergency_fund: "Emergency Fund",
  investments: "Investments",
  total_savings: "Total Savings",
};

interface ExtractedField {
  key: string;
  label: string;
  value: string;
  confidence: "high" | "medium" | "low";
}

export default function FinancialDocUpload() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [applying, setApplying] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedField[]>([]);
  const [applied, setApplied] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleFile = (f: File) => {
    setFile(f);
    setExtracted([]);
    setApplied(false);
    setSelected(new Set());
  };

  const extractWithAI = async () => {
    if (!file || !user) return;
    setExtracting(true);
    try {
      const base64 = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res((r.result as string).split(",")[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: [
              {
                type: file.type.startsWith("image/") ? "image" : "document",
                source: { type: "base64", media_type: file.type as any, data: base64 },
              },
              {
                type: "text",
                text: `You are a financial document parser. Extract financial data from this document and return ONLY a JSON object (no markdown) with these exact keys where found:\n{\n  "monthly_income": number or null,\n  "total_debt": number or null,\n  "current_savings": number or null,\n  "credit_score": integer or null,\n  "net_worth": number or null,\n  "monthly_expenses": number or null,\n  "emergency_fund": number or null,\n  "investments": number or null,\n  "total_savings": number or null\n}\nOnly include fields with clear evidence. Return null for fields not found.`,
              },
            ],
          }],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      const fields: ExtractedField[] = Object.entries(parsed)
        .filter(([_, v]) => v !== null && v !== undefined)
        .map(([key, value]) => ({ key, label: FIELD_LABELS[key] || key, value: String(value), confidence: "high" as const }));

      if (fields.length === 0) {
        toast.error("No financial data found. Try a bank statement, pay stub, or financial summary.");
        setExtracting(false);
        return;
      }

      setExtracted(fields);
      setSelected(new Set(fields.map(f => f.key)));
    } catch (err) {
      toast.error("Extraction failed. Ensure the document is readable.");
    } finally {
      setExtracting(false);
    }
  };

  const applyToFields = async () => {
    if (!user || extracted.length === 0) return;
    setApplying(true);
    try {
      const updates: Record<string, number> = {};
      extracted.filter(f => selected.has(f.key)).forEach(f => {
        const num = parseFloat(f.value);
        if (!isNaN(num)) updates[f.key] = num;
      });
      if (Object.keys(updates).length === 0) { setApplying(false); return; }

      const { data: existing } = await (supabase as any).from("user_finances").select("id").eq("user_id", user.id).maybeSingle();
      if (existing) {
        await (supabase as any).from("user_finances").update({ ...updates, updated_at: new Date().toISOString() }).eq("user_id", user.id);
      } else {
        await (supabase as any).from("user_finances").insert({ user_id: user.id, ...updates });
      }

      queryClient.invalidateQueries({ queryKey: ["user_finances"] });
      setApplied(true);
      toast.success(`${Object.keys(updates).length} fields updated from your document!`);
    } catch {
      toast.error("Failed to apply fields.");
    } finally {
      setApplying(false);
    }
  };

  const reset = () => {
    setFile(null); setExtracted([]); setApplied(false); setSelected(new Set());
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div id="money-doc-upload" className="bg-card border border-border rounded-xl p-5 mt-4 scroll-mt-4">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-violet-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">AI Document Import</p>
            <p className="text-xs text-muted-foreground">Upload a bank statement, pay stub, or tax doc to auto-fill your fields</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {!file ? (
            <button onClick={() => fileRef.current?.click()} className="w-full flex flex-col items-center justify-center gap-3 py-8 rounded-xl border-2 border-dashed border-border hover:border-violet-400 hover:bg-violet-50/30 dark:hover:bg-violet-900/10 transition-all cursor-pointer">
              <Upload className="w-7 h-7 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Drop a financial document</p>
                <p className="text-xs text-muted-foreground mt-1">Bank statement \u00b7 Pay stub \u00b7 Tax summary \u00b7 PDF or image</p>
              </div>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button onClick={reset} className="p-1 hover:bg-muted rounded"><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

          {file && extracted.length === 0 && !applied && (
            <button onClick={extractWithAI} disabled={extracting}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition disabled:opacity-60">
              {extracting ? <><Loader2 className="w-4 h-4 animate-spin" /> Reading document...</> : <><Sparkles className="w-4 h-4" /> Extract with AI</>}
            </button>
          )}

          {extracted.length > 0 && !applied && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground mb-2">Found {extracted.length} field{extracted.length !== 1 ? "s" : ""}. Select which to apply:</p>
              {extracted.map(f => (
                <label key={f.key} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer">
                  <input type="checkbox" checked={selected.has(f.key)} onChange={e => { const next = new Set(selected); if (e.target.checked) next.add(f.key); else next.delete(f.key); setSelected(next); }} className="w-4 h-4 accent-violet-600" />
                  <div className="flex-1"><p className="text-sm font-medium text-foreground">{f.label}</p></div>
                  <span className="text-sm font-bold text-foreground">{f.key === "credit_score" ? f.value : `$${parseFloat(f.value).toLocaleString()}`}</span>
                </label>
              ))}
              <button onClick={applyToFields} disabled={applying || selected.size === 0}
                className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition disabled:opacity-60 mt-2">
                {applying ? "Applying..." : `Apply ${selected.size} field${selected.size !== 1 ? "s" : ""} to Money`}
              </button>
            </div>
          )}

          {applied && (
            <div className="flex flex-col items-center gap-2 py-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
              <p className="text-sm font-semibold text-foreground">Applied to your Money tab!</p>
              <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground">Upload another document</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
