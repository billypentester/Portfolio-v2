'use client'

import { useEffect, useState } from 'react'

// Distance in px the page must scroll before the header gains its glass background.
const SCROLL_THRESHOLD = 24

interface HeaderShellProps {
  children: React.ReactNode
}

// Transparent over the top of the page; frosted glass once content scrolls beneath it.
export default function HeaderShell({ children }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    // Covers reloads and hash links that restore a position mid-page.
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out-soft ${
        scrolled
          ? 'border-line/70 bg-canvas/80 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70'
          : 'border-transparent bg-transparent'
      }`}
    >
      {children}
    </header>
  )
}
