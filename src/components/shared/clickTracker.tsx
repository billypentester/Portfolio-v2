'use client'

import { useEffect } from 'react'
import { TRACKED_ELEMENT_SELECTOR, trackElement } from '@/src/lib/analytics'

// One listener for every element marked with trackingAttributes(), so server-rendered links need no
// client code of their own. It only observes clicks and never changes how they behave.
export default function ClickTracker() {
  useEffect(() => {
    const handle = (event: MouseEvent) => {
      // auxclick also fires for right clicks; only a middle click opens the link.
      if (event.type === 'auxclick' && event.button !== 1) return
      if (!(event.target instanceof Element)) return
      const element = event.target.closest(TRACKED_ELEMENT_SELECTOR)
      if (element) trackElement(element)
    }

    // Capture phase, so handlers that stop propagation don't hide the click.
    document.addEventListener('click', handle, true)
    document.addEventListener('auxclick', handle, true)
    return () => {
      document.removeEventListener('click', handle, true)
      document.removeEventListener('auxclick', handle, true)
    }
  }, [])

  return null
}
