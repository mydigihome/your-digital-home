import { useEffect } from "react";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

function hexToHsl(hex: string): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function useThemeApplicator() {
  const { data: prefs } = useUserPreferences();
  const { user } = useAuth();

  // On mount: apply stored accent, ALWAYS default to light mode
  useEffect(() => {
    // Remove dark mode by default
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");

    const accent = localStorage.getItem("dh_accent_color") || "#6366f1";
    const hsl = hexToHsl(accent);
    const root = document.documentElement;
    root.style.setProperty("--primary", hsl);
    root.style.setProperty("--ring", hsl);
  }, []);

  useEffect(() => {
    if (!user) return;
    (supabase as any).from("user_preferences")
      .update({ last_active_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .then(() => {});
  }, [user?.id]);

  useEffect(() => {
    if (!prefs) return;
    const root = document.documentElement;

    // Dark mode — only apply if explicitly set to true
    if (prefs.dark_mode === true) {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      // Default: light mode
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    // Theme color
    const color = (prefs as any).theme_color || "#6366f1";
    localStorage.setItem("dh_accent_color", color);
    const hsl = hexToHsl(color);
    root.style.setProperty("--primary", hsl);
    root.style.setProperty("--ring", hsl);
    root.style.setProperty("--sidebar-primary", hsl);
  }, [prefs]);
}
