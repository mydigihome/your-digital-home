import { useIsMobile } from "@/hooks/use-mobile";

export function ResponsiveGrid({ children, desktopColumns = "repeat(2, 1fr)", gap = "24px", className = "", style = {} }: { children: React.ReactNode; desktopColumns?: string; gap?: string; className?: string; style?: React.CSSProperties; }) {
  const isMobile = useIsMobile();
  return (
    <div className={className} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : desktopColumns, gap, ...style }}>
      {children}
    </div>
  );
}
