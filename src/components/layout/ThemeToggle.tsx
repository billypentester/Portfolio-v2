'use client'

import IconBuilder from '@/src/helpers/IconBuilder'
import { THEME_STORAGE_KEY } from '@/src/lib/constants'
import { track } from '@/src/lib/analytics'

type Theme = 'light' | 'dark'

const currentTheme = (): Theme => {
  const explicit = document.documentElement.dataset.theme
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Icon visibility is handled in CSS from [data-theme], so there is no hydration mismatch or flash.
export default function ThemeToggle() {
  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    track({ name: 'theme_toggle', data: { theme: next } })
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch (error) {
      // Private mode or blocked storage: the theme still applies for this visit.
      console.warn('Could not persist theme preference', error)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex h-9 w-9 items-center justify-center rounded-control text-muted transition-colors hover:bg-subtle hover:text-fg"
    >
      <IconBuilder type="moon" paint="theme-icon-moon h-[18px] w-[18px]" />
      <IconBuilder type="sun" paint="theme-icon-sun h-[18px] w-[18px]" />
    </button>
  )
}
