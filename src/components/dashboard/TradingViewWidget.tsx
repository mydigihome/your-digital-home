import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function TradingViewWidget({ height = "500px", widgetId = "dashboard-market-watch" }: { height?: string; widgetId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    const savedSymbol = localStorage.getItem(`dh_tv_symbol_${widgetId}`) || "NASDAQ:AAPL";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true, symbol: savedSymbol, interval: "D", timezone: "America/New_York",
      theme: isDark ? "dark" : "light", style: "1", locale: "en",
      allow_symbol_change: true, calendar: false, support_host: "https://www.tradingview.com",
      withdateranges: true, hide_side_toolbar: false, details: true, hotlist: true,
      watchlist: ["NASDAQ:AAPL","NASDAQ:TSLA","NASDAQ:NVDA","NYSE:SPY","BINANCE:BTCUSDT"],
    });
    containerRef.current.appendChild(script);
    return () => { if (containerRef.current) containerRef.current.innerHTML = ""; };
  }, [isDark, user?.id, widgetId]);

  return <div className="tradingview-widget-container w-full" style={{ height }}><div ref={containerRef} className="w-full h-full" /></div>;
}
