import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (enabled) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('darkMode', String(enabled))
  }, [enabled])

  return [enabled, setEnabled] as const
}
