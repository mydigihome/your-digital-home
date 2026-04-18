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
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveStoredJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
