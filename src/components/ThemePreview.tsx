// ThemePreview component
interface ThemePreviewProps {
  theme: {
    name: string;
    primary: string;
    background: string;
    card: string;
    border: string;
    text: string;
    mutedText: string;
  };
  selected?: boolean;
  onClick?: () => void;
}

export default function ThemePreview({ theme, selected, onClick }: ThemePreviewProps) {
  return (
    <button onClick={onClick}
      className={`w-full rounded-xl border-2 p-3 text-left transition-all ${selected ? 'border-primary' : 'border-transparent hover:border-border'}`}
      style={{ background: theme.background }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 rounded-full" style={{ background: theme.primary }} />
        <span className="text-xs font-medium" style={{ color: theme.text }}>{theme.name}</span>
        {selected && <span className="ml-auto text-xs text-primary font-bold">Active</span>}
      </div>
      <div className="rounded-lg p-2" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
        <div className="h-1.5 rounded w-3/4 mb-1" style={{ background: theme.primary }} />
        <div className="h-1.5 rounded w-1/2" style={{ background: theme.mutedText }} />
      </div>
    </button>
  );
}
