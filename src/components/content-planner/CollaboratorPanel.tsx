export default function CollaboratorPanel({ projectId }: { projectId?: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <h3 className="font-semibold mb-2">Collaborators</h3>
      <p className="text-sm text-muted-foreground">Invite collaborators to this project from Settings.</p>
    </div>
  );
}
