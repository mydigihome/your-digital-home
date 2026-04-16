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

// Exported so SettingsPage can call it directly when user picks a theme
export function applyThemeOverride(primary: string, secondary: string) {
  const old = document.getElementById("dh-theme-override");
  if (old) old.remove();
  const style = document.createElement("style");
  style.id = "dh-theme-override";
  style.innerHTML = `
    :root { --accent-hex: ${primary}; }
    .bg-green-400,.bg-green-500,.bg-green-600,.bg-emerald-400,.bg-emerald-500,.bg-emerald-600 { background-color: ${primary} !important; }
    .text-green-400,.text-green-500,.text-green-600,.text-emerald-400,.text-emerald-500,.text-emerald-600 { color: ${primary} !important; }
    .border-green-400,.border-green-500,.border-emerald-400,.border-emerald-500 { border-color: ${primary} !important; }
  `;
  document.head.appendChild(style);
  document.documentElement.style.setProperty("--accent-hex", primary);
  localStorage.setItem("dh_accent", primary);
  localStorage.setItem("dh_secondary", secondary);
}

export function useThemeApplicator() {
  const { data: prefs } = useUserPreferences();
  const { user } = useAuth();

  // On mount: always start in light mode, apply any saved accent
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    const accent = localStorage.getItem("dh_accent_color") || "#6366f1";
    const secondary = localStorage.getItem("dh_secondary") || "#7B5EA7";
    const hsl = hexToHsl(accent);
    document.documentElement.style.setProperty("--primary", hsl);
    document.documentElement.style.setProperty("--ring", hsl);
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

    // Dark mode — only if explicitly true
    if (prefs.dark_mode === true) {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    // Theme color
    const color = (prefs as any).theme_color || "#6366f1";
    const secondary = (prefs as any).secondary_color || "#7B5EA7";
    localStorage.setItem("dh_accent_color", color);
    const hsl = hexToHsl(color);
    root.style.setProperty("--primary", hsl);
    root.style.setProperty("--ring", hsl);
    root.style.setProperty("--sidebar-primary", hsl);
    applyThemeOverride(color, secondary);
  }, [prefs]);
}
