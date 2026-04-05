import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  applyTheme,
  getPreferredTheme,
  getStoredTheme,
  getSystemTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme"

export function ModeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const nextTheme = getPreferredTheme()

    setTheme(nextTheme)
    applyTheme(nextTheme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleSystemThemeChange = () => {
      if (getStoredTheme() !== null) {
        return
      }

      const systemTheme = getSystemTheme()
      setTheme(systemTheme)
      applyTheme(systemTheme)
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return
      }

      const storedTheme = getPreferredTheme()
      setTheme(storedTheme)
      applyTheme(storedTheme)
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark"

    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Change mode to ${theme === "dark" ? "light" : "dark"}`}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      {theme === "dark" ? "Light mode " : "Dark mode"}
    </Button>
  )
}
