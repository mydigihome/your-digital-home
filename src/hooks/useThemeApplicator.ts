import { useEffect } from "react";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

function hexToHsl(hex: string): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
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

function generateAccentHsl(hsl: string): string {
  const parts = hsl.split(" ");
  return `${parts[0]} 89% 93%`;
}

function generateAccentForegroundHsl(hsl: string): string {
  const parts = hsl.split(" ");
  return `${parts[0]} 70% 50%`;
}

const FONT_SIZE_MAP: Record<string, string> = {
  small: "13px",
  medium: "14px",
  large: "16px",
};

const DENSITY_MAP: Record<string, string> = {
  compact: "0.2rem",
  comfortable: "0.25rem",
  spacious: "0.35rem",
};

function applyThemeOverride(primary: string, secondary: string) {
  const old = document.getElementById("dh-theme-override");
  if (old) old.remove();

  const style = document.createElement("style");
  style.id = "dh-theme-override";
  style.innerHTML = `
    :root {
      --accent: ${primary} !important;
      --accent-secondary: ${secondary} !important;
    }
    .bg-green-400, .bg-green-500, .bg-green-600, .bg-green-700,
    .bg-emerald-400, .bg-emerald-500, .bg-emerald-600, .bg-emerald-700,
    [class*="bg-green-"], [class*="bg-emerald-"] {
      background-color: ${primary} !important;
    }
    .text-green-400, .text-green-500, .text-green-600, .text-green-700,
    .text-emerald-400, .text-emerald-500, .text-emerald-600, .text-emerald-700,
    [class*="text-green-"], [class*="text-emerald-"] {
      color: ${primary} !important;
    }
    .border-green-400, .border-green-500, .border-green-600,
    .border-emerald-400, .border-emerald-500, .border-emerald-600,
    [class*="border-green-"], [class*="border-emerald-"] {
      border-color: ${primary} !important;
    }
    .bg-green-50, .bg-green-100, .bg-emerald-50, .bg-emerald-100 {
      background-color: ${primary}18 !important;
    }
    .progress-fill { background-color: ${primary} !important; }
    .bg-purple-500, .bg-violet-500, .bg-purple-600, .bg-violet-600,
    [class*="bg-purple-"], [class*="bg-violet-"] {
      background-color: ${secondary} !important;
    }
    .text-purple-500, .text-violet-500, .text-purple-600, .text-violet-600,
    [class*="text-purple-"], [class*="text-violet-"] {
      color: ${secondary} !important;
    }
  `;
  document.head.appendChild(style);

  document.documentElement.style.setProperty("--accent-hex", primary);
  document.documentElement.style.setProperty("--accent-secondary-hex", secondary);

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
      root.style.setProperty("--sidebar-primary", hsl);
      root.style.setProperty("--chart-1", hsl);
      applyThemeOverride(accent, secondary);
    }
    const darkMode = localStorage.getItem("dh_dark_mode");
    if (darkMode === "true") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!user || !prefs) return;
    (supabase as any).from("user_preferences").update({ last_active_at: new Date().toISOString() }).eq("user_id", user.id).then(() => {});
    const lastActive = (prefs as any)?.last_active_at;
    if (lastActive) {
      const daysSinceActive = (Date.now() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceActive > 30) signOut();
    }
  }, [user?.id]);

  useEffect(() => {
    if (!prefs) return;
    const root = document.documentElement;

    if ((prefs as any).theme_color) {
      localStorage.setItem("dh_accent_color", (prefs as any).theme_color);
      const hsl = hexToHsl((prefs as any).theme_color);
      root.style.setProperty("--primary", hsl);
      root.style.setProperty("--ring", hsl);
      root.style.setProperty("--sidebar-primary", hsl);
      root.style.setProperty("--sidebar-ring", hsl);
      root.style.setProperty("--accent", generateAccentHsl(hsl));
      root.style.setProperty("--accent-foreground", generateAccentForegroundHsl(hsl));
      root.style.setProperty("--sidebar-accent", generateAccentHsl(hsl));
      root.style.setProperty("--sidebar-accent-foreground", generateAccentForegroundHsl(hsl));
      root.style.setProperty("--chart-1", hsl);

      const secondary = (prefs as any).secondary_color || localStorage.getItem("dh_secondary") || "#7B5EA7";
      applyThemeOverride((prefs as any).theme_color, secondary);
    }

    const accentData = (prefs as any).accent_colors as Record<string, string> | null;
    const fontKey = accentData?.font_family || accentData?.font;
    if (fontKey) {
      const fontMap: Record<string, string> = {
        "Inter": "Inter, sans-serif",
        "Georgia": "Georgia, serif",
        "Mono": "monospace",
        "System": "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      };
      const resolvedFont = fontMap[fontKey] || fontKey;
      root.style.setProperty("--font-sans", resolvedFont);
      document.body.style.fontFamily = `${resolvedFont}`;
    }

    const fontSize = (prefs as any).font_size?.toLowerCase();
    if (fontSize && FONT_SIZE_MAP[fontSize]) {
      document.body.style.fontSize = FONT_SIZE_MAP[fontSize];
    }

    const density = (prefs as any).density?.toLowerCase();
    if (density && DENSITY_MAP[density]) {
      root.style.setProperty("--spacing", DENSITY_MAP[density]);
    }

    if ((prefs as any).sidebar_theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else if ((prefs as any).sidebar_theme === "light") {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [prefs]);
}