import { useState } from "react";
import AppShell from "@/components/AppShell";
import StudioOverview from "@/components/studio/StudioOverview";
import StudioHQView from "@/components/studio/StudioHQView";
import StudioPlatformsView from "@/components/studio/StudioPlatformsView";
import StudioDealsView from "@/components/studio/StudioDealsView";
import StudioRevenueView from "@/components/studio/StudioRevenueView";
import StudioHeaderCard from "@/components/studio/StudioHeaderCardV2";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();

  // Admin always has studio unlocked
  const isAdmin = user?.email === "myslimher@gmail.com";
  // Check user prefs for studio unlock
  const studioUnlocked = isAdmin
    || (prefs as any)?.studio_unlocked === true
    || (prefs as any)?.is_subscribed === true
    || (prefs as any)?.plan_tier === "pro"
    || (prefs as any)?.plan_tier === "standard"
    || (prefs as any)?.plan_tier === "founding";

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
          <div style={{
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "center",
            gap: "8px",
            padding: "16px 0",
            overflowX: isMobile ? "auto" : undefined,
            WebkitOverflowScrolling: "touch",
          }}>
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
                    borderColor: isActive ? "#10B981" : (isDark ? "rgba(255,255,255,0.15)" : "#E5E7EB"),
                    background: isActive ? "#10B981" : (isDark ? "transparent" : "white"),
                    color: isActive ? "white" : (isDark ? "rgba(255,255,255,0.6)" : "#374151"),
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 150ms ease",
                    boxShadow: isActive ? "0 2px 8px rgba(16,185,129,0.3)" : "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Admin and unlocked users see content directly, others see locked overlay */}
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
                    style={{ width: "100%", padding: 13, background: "#7B5EA7", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}
                  >
                    Unlock Studio
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
