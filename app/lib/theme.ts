export const THEME_STORAGE_KEY = "theme"

export type Theme = "light" | "dark"

export function getSystemTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark"
  }

  return "light"
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null
  }

  const theme = window.localStorage.getItem(THEME_STORAGE_KEY)

  return theme === "dark" || theme === "light" ? theme : null
}

export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return
  }

  const root = document.documentElement

  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme
  root.setAttribute("data-theme", theme)
}
