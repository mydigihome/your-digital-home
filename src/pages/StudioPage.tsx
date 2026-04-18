import { useState } from "react";
import AppShell from "@/components/AppShell";
import StudioOverview from "@/components/studio/StudioOverview";
import StudioHQView from "@/components/studio/StudioHQView";
import StudioPlatformsView from "@/components/studio/StudioPlatformsView";
import StudioDealsView from "@/components/studio/StudioDealsView";
import StudioRevenueView from "@/components/studio/StudioRevenueView";
import StudioHeaderCard from "@/components/studio/StudioHeaderCardV2";
import StudioUploadPanel from "@/components/studio/StudioUploadPanel";
import StudioReportModal from "@/components/studio/StudioReportModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3 } from "lucide-react";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();

  // Admin always has studio unlocked
  const isAdmin = user?.email === "myslimher@gmail.com";
  const studioUnlocked = isAdmin
    || (prefs as any)?.studio_unlocked === true
    || (prefs as any)?.is_subscribed === true
    || (prefs as any)?.plan_tier === "pro"
    || (prefs as any)?.plan_tier === "standard"
    || (prefs as any)?.plan_tier === "founding";

  // Fetch studio profile and deals for report generation
  const { data: studioProfile } = useQuery({
    queryKey: ["studio_profile_for_report", user?.id],
    queryFn: async () => {
      const { data } = await (supabase as any).from("studio_profile").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user,
  });
  const { data: studioDeals = [] } = useQuery({
    queryKey: ["brand_deals_for_report", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("brand_deals").select("*").order("created_at", { ascending: false }).limit(10);
      return data || [];
    },
    enabled: !!user,
  });

  // Get accent color from user prefs
  const accentColor = (prefs as any)?.theme_color || localStorage.getItem("dh_accent_color") || "#10B981";

  const [showReport, setShowReport] = useState(false);

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

          {/* Tab pills + action buttons row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "8px", overflowX: isMobile ? "auto" : undefined, WebkitOverflowScrolling: "touch", flex: 1 }}>
              {TABS.map(tab => {
                const tabId = tab.toLowerCase();
                const isActive = activeTab === tabId;
                return (
                  <button key={tab} onClick={() => setActiveTab(tabId)} style={{
                    padding: "7px 18px", borderRadius: "999px", border: "1px solid",
                    borderColor: isActive ? accentColor : (isDark ? "rgba(255,255,255,0.15)" : "#E5E7EB"),
                    background: isActive ? accentColor : (isDark ? "transparent" : "white"),
                    color: isActive ? "white" : (isDark ? "rgba(255,255,255,0.6)" : "#374151"),
                    fontSize: "13px", fontWeight: isActive ? 600 : 400, cursor: "pointer",
                    fontFamily: "Inter, sans-serif", transition: "all 150ms ease",
                    boxShadow: isActive ? `0 2px 8px ${accentColor}50` : "none",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Action buttons: Upload + Report */}
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <StudioUploadPanel accentColor={accentColor} />
              <button
                onClick={() => setShowReport(true)}
                style={{ background: isDark ? "#252528" : "white", color: isDark ? "rgba(255,255,255,0.8)" : "#374151", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E5E7EB"}` }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-80 transition-all"
              >
                <BarChart3 className="w-4 h-4" style={{ color: accentColor }} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Studio content */}
          {studioUnlocked ? (
            renderContent()
          ) : (
            <div style={{ position: "relative" }}>
              <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none" }}>{renderContent()}</div>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", zIndex: 10 }}>
                <div style={{ background: "white", borderRadius: 20, padding: 32, maxWidth: 380, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Unlock Studio</p>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>Your creator HQ. One-time payment, yours forever.</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 16 }}>$29.99 one-time</p>
                  <button onClick={() => window.location.href = "https://buy.stripe.com/7sY7sL9FUagu4T2fKiak004"} style={{ width: "100%", padding: 13, background: accentColor, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Unlock Studio</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report modal */}
      {showReport && (
        <StudioReportModal
          onClose={() => setShowReport(false)}
          profile={studioProfile}
          deals={studioDeals}
          accentColor={accentColor}
        />
      )}
    </AppShell>
  );
}
