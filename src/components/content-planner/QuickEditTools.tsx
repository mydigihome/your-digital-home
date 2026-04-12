export default function QuickEditTools({ onBold, onItalic, onEmoji }: { onBold?: () => void; onItalic?: () => void; onEmoji?: () => void; }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onBold} className="px-2 py-1 text-xs font-bold border border-border rounded hover:bg-muted">B</button>
      <button onClick={onItalic} className="px-2 py-1 text-xs italic border border-border rounded hover:bg-muted">I</button>
      <button onClick={onEmoji} className="px-2 py-1 text-xs border border-border rounded hover:bg-muted">😊</button>
    </div>
  );
}
