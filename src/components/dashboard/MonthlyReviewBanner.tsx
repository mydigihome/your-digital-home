import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export default function MonthlyReviewBanner() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { data: prefs } = useUserPreferences();
  const [dismissed, setDismissed] = useState(false);

  const now = new Date();
  const dayOfMonth = now.getDate();
  const isFirstOfMonth = dayOfMonth === 1;
  const dismissKey = `review_prompt_${now.getFullYear()}_${now.getMonth() + 1}`;
  const alreadySeen = localStorage.getItem(dismissKey);

  if (!prefs?.onboarding_completed || !isFirstOfMonth || alreadySeen || dismissed) return null;

  const prevMonthName = new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleString("default", { month: "long" });

  return (
    <div onClick={() => { localStorage.setItem(dismissKey, 'seen'); setDismissed(true); navigate("/monthly-review"); }}
      style={{ width: "100%", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "center", background: "#eef2ff", borderBottom: "1px solid #c7d2fe", cursor: "pointer" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#312e81" }}>Your {prevMonthName} review is ready — </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", marginLeft: 4 }}>see how you did →</span>
    </div>
  );
}
