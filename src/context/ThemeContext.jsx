import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { getTheme, DEFAULT_THEME } from '../theme/themes'

/**
 * Drives the per-section atmosphere. Holds the active section id, derives
 * the matching theme, and mirrors its accent palette onto CSS custom
 * properties on <html> so any component can read --accent etc. The visible
 * 800ms morph is performed by the Atmosphere layers (crossfade) and by
 * CSS transitions on the variables below.
 */
const ThemeContext = createContext(null)

const hexToRgb = (hex) => {
  const h = hex.replace('#', '')
  const n = parseInt(
    h.length === 3
      ? h.split('').map((c) => c + c).join('')
      : h,
    16
  )
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

export function ThemeProvider({ children, initial = DEFAULT_THEME }) {
  const [sectionId, setSectionId] = useState(initial)
  const theme = useMemo(() => getTheme(sectionId), [sectionId])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', theme.accent)
    root.style.setProperty('--accent-2', theme.accent2)
    root.style.setProperty('--accent-3', theme.accent3)
    root.style.setProperty('--accent-rgb', hexToRgb(theme.accent))
    root.style.setProperty('--atmo-base', theme.base)
  }, [theme])

  const setSection = useCallback((id) => setSectionId(id), [])

  const value = useMemo(
    () => ({ sectionId, theme, setSection }),
    [sectionId, theme, setSection]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
