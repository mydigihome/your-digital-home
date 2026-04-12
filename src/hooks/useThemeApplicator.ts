import { useEffect } from "react";
import { useUserPreferences, useUpsertPreferences } from "@/hooks/useUserPreferences";
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

function applyThemeOverride(primary: string, secondary: string) {
  const old = document.getElementById("dh-theme-override");
  if (old) old.remove();
  const style = document.createElement("style");
  style.id = "dh-theme-override";
  style.innerHTML = `:root { --accent-hex: ${primary}; }`;
  document.head.appendChild(style);
  document.documentElement.style.setProperty("--accent-hex", primary);
  localStorage.setItem("dh_accent", primary);
  localStorage.setItem("dh_secondary", secondary);
}

export { applyThemeOverride };

export function useThemeApplicator() {
  const { data: prefs } = useUserPreferences();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const accent = localStorage.getItem("dh_accent_color") || localStorage.getItem("dh_accent");
    const secondary = localStorage.getItem("dh_secondary") || "#7B5EA7";
    if (accent) {
      const hsl = hexToHsl(accent);
      const root = document.documentElement;
      root.style.setProperty("--primary", hsl);
      root.style.setProperty("--ring", hsl);
      applyThemeOverride(accent, secondary);
    }
    const darkMode = localStorage.getItem("dh-home-theme") || localStorage.getItem("dh_dark_mode");
    if (darkMode === "dark" || darkMode === "true") document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (!user || !prefs) return;
    (supabase as any).from("user_preferences").update({ last_active_at: new Date().toISOString() }).eq("user_id", user.id).then(() => {});
  }, [user?.id]);

  useEffect(() => {
    if (!prefs) return;
    const root = document.documentElement;
    if ((prefs as any).theme_color) {
      localStorage.setItem("dh_accent_color", (prefs as any).theme_color);
      const hsl = hexToHsl((prefs as any).theme_color);
      root.style.setProperty("--primary", hsl);
      root.style.setProperty("--ring", hsl);
      const secondary = (prefs as any).secondary_color || localStorage.getItem("dh_secondary") || "#7B5EA7";
      applyThemeOverride((prefs as any).theme_color, secondary);
    }
    if (prefs.dark_mode === true) {
      root.classList.add("dark"); document.body.classList.add("dark");
    } else if (prefs.dark_mode === false) {
      root.classList.remove("dark"); document.body.classList.remove("dark");
    }
  }, [prefs]);
}
