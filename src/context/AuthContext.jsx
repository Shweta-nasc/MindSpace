import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { profile } from '../data/content'

/**
 * Shared-password gate.
 *
 * SECURITY NOTE: this is a *soft* gate only. The password lives in the
 * client bundle, so this is not real protection for sensitive data.
 * For genuine privacy, layer Netlify password protection / Basic-Auth
 * (see netlify.toml) on top. This just keeps casual eyes out.
 */
const AuthContext = createContext(null)

const STORAGE_KEY = 'mindspace.unlocked'

export function AuthProvider({ children }) {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true)
    } catch {
      /* sessionStorage unavailable — stay locked */
    }
  }, [])

  const attempt = useCallback((value) => {
    const ok = value.trim() === profile.password
    if (ok) {
      setUnlocked(true)
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
    }
    return ok
  }, [])

  const lock = useCallback(() => {
    setUnlocked(false)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <AuthContext.Provider value={{ unlocked, attempt, lock }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
