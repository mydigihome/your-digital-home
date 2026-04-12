import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface Props { open: boolean; onOpenChange: (open: boolean) => void; projectId: string; projectName: string; }

export default function AITaskGenerator({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="text-center py-8">
          <Sparkles className="mx-auto mb-3 h-10 w-10 text-primary" />
          <h3 className="text-lg font-semibold text-foreground mb-2">AI Task Generator</h3>
          <p className="text-sm text-muted-foreground">AI task generation coming soon. This feature will automatically create tasks based on your project goals.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
