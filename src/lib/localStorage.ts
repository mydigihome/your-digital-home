// Dashboard localStorage key cleanup + light mode bootstrap
// This runs on app startup to fix stale dark mode state

export function bootstrapTheme() {
  const saved = localStorage.getItem("digi-home-theme");
  const dhDark = localStorage.getItem("dh_dark_mode");
  
  // If no explicit preference, default to light
  if (!saved && !dhDark) {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    return;
  }
  
  // Respect explicit choice
  const wantsDark = saved === "dark" || dhDark === "true";
  if (wantsDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
  }
}

export function loadStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    // If parsed result is an empty array and fallback is non-empty array, use fallback
    if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(fallback) && (fallback as unknown[]).length > 0) {
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveStoredJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
