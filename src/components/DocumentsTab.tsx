import { useState } from "react";
import { useDocuments, useUploadDocument, useDeleteDocument } from "@/hooks/useDocuments";
import { FileText, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DocumentsTab({ projectId }: { projectId: string }) {
  const { data: docs = [], isLoading } = useDocuments(projectId);
  const uploadDoc = useUploadDocument();
  const deleteDoc = useDeleteDocument();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { await uploadDoc.mutateAsync({ projectId, file }); toast.success("Document uploaded!"); } catch { toast.error("Upload failed"); }
  };

  if (isLoading) return <div className="py-8 text-center text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-foreground">Playbooks & Documents</h3>
        <label className="cursor-pointer"><input type="file" className="hidden" onChange={handleUpload} /><Button variant="outline" size="sm" asChild><span><Upload className="mr-1.5 h-3.5 w-3.5" /> Upload</span></Button></label>
      </div>
      {docs.length === 0 ? (
        <div className="py-12 text-center"><FileText className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" /><p className="text-sm text-muted-foreground">No documents yet</p></div>
      ) : (
        <div className="space-y-2">{docs.map((doc: any) => (
          <div key={doc.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{doc.name || doc.title}</p></div>
            <button onClick={() => deleteDoc.mutate(doc.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}</div>
      )}
    </div>
  );
}
