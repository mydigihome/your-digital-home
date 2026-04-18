import { useState } from "react";
import AppShell from "@/components/AppShell";
import StudioOverview from "@/components/studio/StudioOverview";
import StudioHQView from "@/components/studio/StudioHQView";
import StudioPlatformsView from "@/components/studio/StudioPlatformsView";
import StudioDealsView from "@/components/studio/StudioDealsView";
import StudioRevenueView from "@/components/studio/StudioRevenueView";
import StudioHeaderCard from "@/components/studio/StudioHeaderCardV2";
import StudioUploadButton from "@/components/studio/StudioUploadButton";
import StudioReportGenerator from "@/components/studio/StudioReportGenerator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { BarChart2 } from "lucide-react";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();
  const [showReport, setShowReport] = useState(false);

  // Admin always has studio unlocked; paying users unlock via prefs
  const isAdmin = user?.email === "myslimher@gmail.com";
  const studioUnlocked = isAdmin
    || (prefs as any)?.studio_unlocked === true
    || (prefs as any)?.is_subscribed === true
    || (prefs as any)?.plan_tier === "pro"
    || (prefs as any)?.plan_tier === "standard"
    || (prefs as any)?.plan_tier === "founding";

  // User's accent color for buttons
  const accentColor = (prefs as any)?.theme_color ||
    (typeof window !== 'undefined' ? localStorage.getItem('dh_accent_color') : null) || '#10B981';

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <StudioOverview onNavigateDeals={() => setActiveTab("deals")} />;
      case "hq": return <StudioHQView />;
      case "platforms": return <StudioPlatformsView />;
      case "deals": return <StudioDealsView />;
      case "revenue": return <StudioRevenueView />;
      default: return <StudioOverview onNavigateDeals={() => setActiveTab("deals")} />;
    }
  };

  const isDark = document.documentElement.classList.contains("dark");
  const TABS = ["Overview", "HQ", "Platforms", "Deals", "Revenue"];

  return (
    <AppShell>
      <div className="h-full flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-background">
          <StudioHeaderCard activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab bar + action buttons */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: "12px",
          }}>
            {/* Pill tabs */}
            <div style={{ display: "flex", gap: "8px", overflowX: isMobile ? "auto" : undefined, WebkitOverflowScrolling: "touch", flexShrink: 0 }}>
              {TABS.map(tab => {
                const tabId = tab.toLowerCase();
                const isActive = activeTab === tabId;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tabId)}
                    style={{
                      padding: "7px 18px",
                      borderRadius: "999px",
                      border: "1px solid",
                      borderColor: isActive ? accentColor : (isDark ? "rgba(255,255,255,0.15)" : "#E5E7EB"),
                      background: isActive ? accentColor : (isDark ? "transparent" : "white"),
                      color: isActive ? "white" : (isDark ? "rgba(255,255,255,0.6)" : "#374151"),
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      transition: "all 150ms ease",
                      boxShadow: isActive ? `0 2px 8px ${accentColor}40` : "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Action buttons — Upload + Report */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
              <StudioUploadButton onUploaded={() => {}} />
              <button
                onClick={() => setShowReport(true)}
                style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "8px 16px", background: "transparent",
                  border: `1.5px solid ${accentColor}`,
                  borderRadius: "8px", fontSize: "13px",
                  fontWeight: 600, cursor: "pointer",
                  color: accentColor, fontFamily: "Inter, sans-serif",
                  transition: "all 150ms",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accentColor}15`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                <BarChart2 size={14} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Content — admin bypasses lock */}
          {studioUnlocked ? (
            renderContent()
          ) : (
            <div style={{ position: "relative" }}>
              <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none" }}>
                {renderContent()}
              </div>
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", zIndex: 10,
              }}>
                <div style={{
                  background: "white", borderRadius: 20, padding: 32,
                  maxWidth: 380, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                  textAlign: "center", fontFamily: "Inter, sans-serif",
                }}>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Unlock Studio</p>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>Your creator HQ. One-time payment, yours forever.</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 16 }}>$29.99 one-time</p>
                  <button
                    onClick={() => window.location.href = "https://buy.stripe.com/7sY7sL9FUagu4T2fKiak004"}
                    style={{ width: "100%", padding: 13, background: accentColor, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}
                  >
                    Unlock Studio
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Generator Modal */}
      {showReport && <StudioReportGenerator onClose={() => setShowReport(false)} />}
    </AppShell>
  );
}
