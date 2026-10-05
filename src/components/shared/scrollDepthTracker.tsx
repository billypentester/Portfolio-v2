'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { reachedScrollDepths, track, type ScrollDepth } from '@/src/lib/analytics'

// Depth is measured where scrolling comes to rest, so the smooth scroll back to the top after a
// navigation (which starts from the previous page's position) doesn't count as reading the page.
const SETTLE_MS = 300

// Reports 25/50/75/100% scroll depth once each per page view.
export default function ScrollDepthTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const reported = new Set<ScrollDepth>()
    let timer = 0

    const measure = () => {
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      // A page that fits on screen has no depth to measure.
      if (documentHeight <= viewportHeight) return
      for (const depth of reachedScrollDepths(window.scrollY + viewportHeight, documentHeight)) {
        if (reported.has(depth)) continue
        reported.add(depth)
        track({ name: 'scroll_depth', data: { depth } })
      }
    }

    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(measure, SETTLE_MS)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [pathname])

  return null
}
