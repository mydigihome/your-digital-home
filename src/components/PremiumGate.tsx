import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";

interface PremiumGateProps {
  children: React.ReactNode;
  feature?: string;
  blur?: boolean;
}

export function usePremiumStatus() {
  const { user } = useAuth();
  const { data: prefs } = useUserPreferences();

  // Admin always gets full access
  const isAdmin = user?.email === "myslimher@gmail.com";
  if (isAdmin) return { isPremium: true, isFounding: true, isSubscribed: true };

  const p = prefs as any;
  const isPremium = p?.plan_tier === "pro"
    || p?.plan_tier === "standard"
    || p?.plan_tier === "founding"
    || p?.is_subscribed === true
    || p?.founding_member === true;

  return {
    isPremium,
    isFounding: p?.plan_tier === "founding" || p?.founding_member === true,
    isSubscribed: p?.is_subscribed === true,
  };
}

export default function PremiumGate({ children, feature, blur = false }: PremiumGateProps) {
  const { isPremium } = usePremiumStatus();

  if (isPremium) return <>{children}</>;

  if (blur) {
    return (
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none" }}>{children}</div>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12,
          background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)", borderRadius: 16
        }}>
          <div style={{ fontSize: 28 }}>🔒</div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "white", fontFamily: "Inter, sans-serif", textAlign: "center", padding: "0 16px" }}>
            {feature || "Premium Feature"}
          </p>
          <a href="/settings?tab=billing" style={{
            padding: "8px 20px", background: "#6366f1", color: "white", borderRadius: 10,
            fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "Inter, sans-serif"
          }}>Upgrade to unlock</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
        {feature || "Premium Feature"}
      </p>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>Upgrade your plan to unlock this feature.</p>
      <a href="/settings?tab=billing" style={{
        padding: "10px 24px", background: "#6366f1", color: "white", borderRadius: 10,
        fontSize: 14, fontWeight: 600, textDecoration: "none"
      }}>View Plans</a>
    </div>
  );
}
