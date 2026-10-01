import { useEffect, useState } from 'react'

// Generic persisted state: reads once from localStorage at mount, then
// mirrors every update back to it.
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage unavailable (private mode, quota) — fail silently
    }
  }, [key, value])

  return [value, setValue]
}
