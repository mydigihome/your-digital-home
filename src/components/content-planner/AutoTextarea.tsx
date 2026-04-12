// Auto-resizing textarea
import { useEffect, useRef } from "react";

export default function AutoTextarea({ value, onChange, placeholder, className }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (ref.current) { ref.current.style.height = "auto"; ref.current.style.height = ref.current.scrollHeight + "px"; }
  }, [value]);
  return <textarea ref={ref} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`resize-none overflow-hidden ${className}`} rows={1} />;
}
