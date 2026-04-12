export default function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rounded-full transition-all ${i === current ? 'w-4 h-2 bg-primary' : 'w-2 h-2 bg-border'}`} />
      ))}
    </div>
  );
}
