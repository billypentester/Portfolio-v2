'use client'

import { useEffect } from 'react'

// Umami's tracker sends nothing while this key is set, so the owner's own visits stay out of the stats.
const UMAMI_DISABLED_KEY = 'umami.disabled'

// Rendered on the signed-in admin page: opts this browser out of analytics on the public site.
export default function AnalyticsOptOut() {
  useEffect(() => {
    try {
      localStorage.setItem(UMAMI_DISABLED_KEY, '1')
    } catch (error) {
      // Private mode or blocked storage: visits from this browser will still be counted.
      console.warn('Could not opt this browser out of analytics', error)
    }
  }, [])

  return null
}
