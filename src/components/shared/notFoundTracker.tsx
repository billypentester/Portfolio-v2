'use client'

import { useEffect } from 'react'
import { track } from '@/src/lib/analytics'

// Keeps visitor-controlled strings to a sensible size in the event data.
const MAX_LENGTH = 200

// A 404 is otherwise an ordinary page view, so this marks it and records where the broken link was.
export default function NotFoundTracker() {
  useEffect(() => {
    track({
      name: 'page_not_found',
      data: {
        path: window.location.pathname.slice(0, MAX_LENGTH),
        referrer: (document.referrer || 'direct').slice(0, MAX_LENGTH),
      },
    })
  }, [])

  return null
}
