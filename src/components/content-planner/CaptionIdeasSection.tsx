// CaptionIdeasSection
import { useCaptionIdeas } from "@/hooks/useCaptionIdeas";

export default function CaptionIdeasSection() {
  const { data: ideas = [] } = useCaptionIdeas();
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Caption Ideas</h3>
      {(ideas as any[]).length === 0 ? <p className="text-sm text-muted-foreground">No caption ideas saved</p> : (
        (ideas as any[]).map((i: any) => <div key={i.id} className="p-3 bg-muted/50 rounded-lg text-sm">{i.text || i.content}</div>)
      )}
    </div>
  );
}
