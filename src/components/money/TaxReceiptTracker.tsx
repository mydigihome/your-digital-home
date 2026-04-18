import { useState, useRef, useCallback } from "react";
import { Plus, Upload, Trash2, Download, ChevronDown, ChevronUp, Sparkles, FileSpreadsheet, Loader2, CheckSquare, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

const TAX_CATEGORIES = [
  { id: "Business", color: "#6366F1", sub: ["Software", "Equipment", "Office Supplies", "Marketing", "Travel", "Meals", "Phone/Internet", "Other"] },
  { id: "Medical", color: "#EF4444", sub: ["Doctor", "Prescriptions", "Insurance", "Dental", "Vision", "Other"] },
  { id: "Home", color: "#F59E0B", sub: ["Mortgage Interest", "Property Tax", "Utilities", "Repairs", "HOA", "Other"] },
  { id: "Charitable", color: "#10B981", sub: ["Cash Donation", "In-Kind", "Church/Religious", "Other"] },
  { id: "Education", color: "#3B82F6", sub: ["Tuition", "Books", "Student Loan Interest", "Other"] },
  { id: "Other", color: "#9CA3AF", sub: ["Investment", "State Tax", "Miscellaneous"] },
];

interface Receipt {
  id: string;
  tax_year: number;
  receipt_date: string | null;
  vendor: string | null;
  description: string | null;
  amount: number | null;
  category: string | null;
  subcategory: string | null;
  deductible: boolean;
  notes: string | null;
  receipt_image_url: string | null;
  ai_extracted: boolean;
  source: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export default function TaxReceiptTracker() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [filterCat, setFilterCat] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStage, setScanStage] = useState<"idle" | "capturing" | "analyzing" | "done">("idle");
  const [scanPreview, setScanPreview] = useState<Partial<Receipt> | null>(null);
  const [scanImagePreview, setScanImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Receipt>>({
    tax_year: CURRENT_YEAR,
    receipt_date: format(new Date(), "yyyy-MM-dd"),
    deductible: true,
    category: "Business",
    subcategory: "",
  });

  const { data: receipts = [], isLoading } = useQuery({
    queryKey: ["tax_receipts", user?.id, selectedYear],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("tax_receipts")
        .select("*")
        .eq("user_id", user!.id)
        .eq("tax_year", selectedYear)
        .order("receipt_date", { ascending: false });
      return (data || []) as Receipt[];
    },
    enabled: !!user,
  });

  const addReceipt = useMutation({
    mutationFn: async (r: Partial<Receipt>) => {
      const { data, error } = await (supabase as any)
        .from("tax_receipts")
        .insert({ ...r, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tax_receipts"] });
      setShowAdd(false);
      setScanPreview(null);
      setScanImagePreview(null);
      setScanStage("idle");
      setForm({ tax_year: selectedYear, receipt_date: format(new Date(), "yyyy-MM-dd"), deductible: true, category: "Business", subcategory: "" });
      toast.success("Receipt saved!");
    },
    onError: () => toast.error("Failed to save receipt"),
  });

  const deleteReceipt = useMutation({
    mutationFn: async (id: string) => {
      await (supabase as any).from("tax_receipts").delete().eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tax_receipts"] }),
  });

  const scanWithAI = async (file: File) => {
    setScanning(true);
    setScanStage("capturing");

    // Show image preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setScanImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const base64 = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res((r.result as string).split(",")[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });

      setScanStage("analyzing");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: file.type as any, data: base64 } },
              {
                type: "text",
                text: `Extract receipt/expense data and return ONLY JSON (no markdown):\n{\n  "vendor": string,\n  "amount": number,\n  "receipt_date": "YYYY-MM-DD",\n  "description": string,\n  "category": one of ["Business","Medical","Home","Charitable","Education","Other"],\n  "subcategory": string,\n  "deductible": boolean,\n  "notes": string or null\n}\nFor deductible: true if business/tax-deductible. Estimate today's date if no date visible.`,
              },
            ],
          }],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      // Upload image to storage
      let imageUrl: string | null = null;
      try {
        const path = `${user!.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        await supabase.storage.from("receipts").upload(path, file);
        const { data: { publicUrl } } = supabase.storage.from("receipts").getPublicUrl(path);
        imageUrl = publicUrl;
      } catch { /* non-critical */ }

      const preview: Partial<Receipt> = {
        ...parsed,
        tax_year: selectedYear,
        receipt_image_url: imageUrl,
        ai_extracted: true,
        source: "scan",
      };

      setScanStage("done");
      setScanPreview(preview);
      setForm(preview);

      // Small delay to show the "confirmed" state before opening form
      setTimeout(() => {
        setShowAdd(true);
        setScanning(false);
      }, 800);

      toast.success("Receipt scanned! Review and save.");
    } catch {
      toast.error("Scan failed. Add manually.");
      setShowAdd(true);
      setScanning(false);
      setScanStage("idle");
    }
    if (fileRef.current) fileRef.current.value = "";
    if (cameraRef.current) cameraRef.current.value = "";
  };

  const exportCSV = () => {
    const filtered = filterCat === "all" ? receipts : receipts.filter(r => r.category === filterCat);
    const headers = ["Date", "Vendor", "Description", "Category", "Subcategory", "Amount", "Deductible", "Notes"];
    const rows = filtered.map(r => [
      r.receipt_date || "", r.vendor || "", r.description || "",
      r.category || "", r.subcategory || "",
      r.amount !== null ? r.amount.toFixed(2) : "",
      r.deductible ? "Yes" : "No", r.notes || "",
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `tax-receipts-${selectedYear}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} receipts to CSV`);
  };

  const filtered = filterCat === "all" ? receipts : receipts.filter(r => r.category === filterCat);
  const totalAmount = filtered.reduce((s, r) => s + (r.amount || 0), 0);
  const deductibleTotal = filtered.filter(r => r.deductible).reduce((s, r) => s + (r.amount || 0), 0);
  const years = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2, CURRENT_YEAR - 3];

  const catBreakdown = TAX_CATEGORIES.map(c => ({
    ...c,
    total: receipts.filter(r => r.category === c.id).reduce((s, r) => s + (r.amount || 0), 0),
    count: receipts.filter(r => r.category === c.id).length,
  })).filter(c => c.count > 0);

  return (
    <div className="bg-card border border-border rounded-xl mt-4">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">Tax Receipt Tracker</p>
            <p className="text-xs text-muted-foreground">
              {receipts.length > 0
                ? `${receipts.length} receipts \u00b7 $${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} tracked for ${selectedYear}`
                : `Scan, categorize & export receipts by year`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {receipts.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              ${deductibleTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} deductible
            </span>
          )}
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1">
              {years.map(y => (
                <button key={y} onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedYear === y ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}>{y}</button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg border border-border bg-background text-foreground">
                <option value="all">All Categories</option>
                {TAX_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
              </select>
              {/* Camera scan button — primary action */}
              <button onClick={() => cameraRef.current?.click()} disabled={scanning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 transition disabled:opacity-60">
                {scanning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {scanning ? "Scanning..." : "Scan Receipt"}
              </button>
              {/* Upload from file */}
              <button onClick={() => fileRef.current?.click()} disabled={scanning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border text-foreground hover:bg-muted transition disabled:opacity-50">
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <button onClick={() => { setForm({ tax_year: selectedYear, receipt_date: format(new Date(), "yyyy-MM-dd"), deductible: true, category: "Business" }); setScanPreview(null); setScanImagePreview(null); setShowAdd(true); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border text-foreground hover:bg-muted transition">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
              {receipts.length > 0 && (
                <button onClick={exportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border text-foreground hover:bg-muted transition">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              )}
            </div>
          </div>

          {/* Camera input — opens camera on mobile */}
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) scanWithAI(f); }} />
          {/* File input — gallery picker */}
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) scanWithAI(f); }} />

          {/* Scan animation overlay */}
          {scanning && scanImagePreview && (
            <div className="relative rounded-xl overflow-hidden border border-border">
              <img src={scanImagePreview} alt="Receipt" className="w-full max-h-64 object-contain bg-black" />
              {/* Green scan line animation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                {scanStage === "capturing" && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border-4 border-green-400 border-t-transparent animate-spin" />
                    <p className="text-white text-sm font-semibold">Capturing receipt...</p>
                  </div>
                )}
                {scanStage === "analyzing" && (
                  <>
                    {/* Animated green scan line sweeping down */}
                    <div className="absolute inset-x-0 h-1 bg-green-400 opacity-80 shadow-[0_0_12px_4px_rgba(74,222,128,0.6)]"
                      style={{ animation: "scanLine 1.2s ease-in-out infinite", top: "0%" }} />
                    <style>{`
                      @keyframes scanLine {
                        0% { top: 0%; }
                        100% { top: 100%; }
                      }
                    `}</style>
                    <div className="bg-black/70 px-4 py-2 rounded-full flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-400" />
                      <p className="text-white text-sm font-semibold">AI reading receipt...</p>
                    </div>
                  </>
                )}
                {scanStage === "done" && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M6 16L13 23L26 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-semibold">Confirmed!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Category chips */}
          {catBreakdown.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {catBreakdown.map(c => (
                <button key={c.id} onClick={() => setFilterCat(filterCat === c.id ? "all" : c.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                    filterCat === c.id ? "text-white border-transparent" : "border-border text-muted-foreground hover:text-foreground"
                  }`} style={{ background: filterCat === c.id ? c.color : undefined }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  {c.id} \u00b7 ${c.total.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({c.count})
                </button>
              ))}
            </div>
          )}

          {/* Stats */}
          {receipts.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Tracked", value: `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, color: "text-foreground" },
                { label: "Deductible", value: `$${deductibleTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, color: "text-emerald-600" },
                { label: "Receipts", value: String(filtered.length), color: "text-foreground" },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-xl bg-muted/30 border border-border text-center">
                  <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Receipt list */}
          {isLoading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8">
              <FileSpreadsheet className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">No receipts for {selectedYear}</p>
              <p className="text-xs text-muted-foreground mt-1">Tap \u201cScan Receipt\u201d to use your camera, or add manually.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map(r => {
                const cat = TAX_CATEGORIES.find(c => c.id === r.category);
                return (
                  <div key={r.id} className="group flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/20 transition">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat?.color || "#9CA3AF" }} />
                    {r.receipt_image_url && (
                      <img src={r.receipt_image_url} alt="" className="w-8 h-8 rounded-md object-cover border border-border flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-medium text-foreground truncate">{r.vendor || "Unknown Vendor"}</p>
                        {r.ai_extracted && <Sparkles className="w-3 h-3 text-violet-500 flex-shrink-0" title="AI extracted" />}
                        {r.deductible && <CheckSquare className="w-3 h-3 text-emerald-500 flex-shrink-0" title="Tax deductible" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-muted-foreground">{r.receipt_date ? format(new Date(r.receipt_date), "MMM d") : ""}</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded" style={{ background: `${cat?.color}20`, color: cat?.color }}>{r.category}{r.subcategory ? ` \u00b7 ${r.subcategory}` : ""}</span>
                        {r.description && <span className="text-[11px] text-muted-foreground truncate">{r.description}</span>}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-foreground flex-shrink-0">${(r.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <button onClick={() => deleteReceipt.mutate(r.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4" onClick={() => { setShowAdd(false); setScanPreview(null); setScanImagePreview(null); setScanStage("idle"); }}>
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                {scanImagePreview && <img src={scanImagePreview} alt="" className="w-10 h-10 rounded-lg object-cover border border-border" />}
                <h3 className="text-base font-semibold text-foreground">
                  {scanPreview ? "Review Scanned Receipt" : "Add Receipt"}
                </h3>
              </div>
              <button onClick={() => { setShowAdd(false); setScanPreview(null); setScanImagePreview(null); setScanStage("idle"); }} className="p-1 hover:bg-muted rounded-full">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {scanPreview && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <p className="text-xs text-violet-700 dark:text-violet-300">AI extracted \u2014 review and adjust before saving</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Vendor</label>
                  <input value={form.vendor || ""} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} placeholder="e.g. Amazon" className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Amount ($)</label>
                  <input value={form.amount ?? ""} onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) || undefined }))} type="number" step="0.01" placeholder="0.00" className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Date</label>
                  <input value={form.receipt_date || ""} onChange={e => setForm(f => ({ ...f, receipt_date: e.target.value }))} type="date" className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Tax Year</label>
                  <select value={form.tax_year || selectedYear} onChange={e => setForm(f => ({ ...f, tax_year: parseInt(e.target.value) }))} className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select></div>
              </div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Category</label>
                <select value={form.category || "Business"} onChange={e => setForm(f => ({ ...f, category: e.target.value, subcategory: "" }))} className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                  {TAX_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
                </select></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Subcategory</label>
                <select value={form.subcategory || ""} onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))} className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                  <option value="">Select subcategory</option>
                  {(TAX_CATEGORIES.find(c => c.id === form.category)?.sub || []).map(s => <option key={s} value={s}>{s}</option>)}
                </select></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Description</label>
                <input value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What was this for?" className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.deductible ?? true} onChange={e => setForm(f => ({ ...f, deductible: e.target.checked }))} className="w-4 h-4 accent-emerald-600" />
                <span className="text-sm text-foreground">Tax deductible</span>
              </label>
              <div className="flex gap-2 pt-1">
                <button onClick={() => { setShowAdd(false); setScanPreview(null); setScanImagePreview(null); setScanStage("idle"); }} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition">Cancel</button>
                <button onClick={() => addReceipt.mutate({ ...form, user_id: user?.id, tax_year: form.tax_year || selectedYear, ai_extracted: !!scanPreview, source: scanPreview ? "scan" : "manual" } as any)}
                  disabled={addReceipt.isPending || !form.vendor || !form.amount}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition disabled:opacity-60">
                  {addReceipt.isPending ? "Saving..." : "Save Receipt"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
