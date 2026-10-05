'use client'

import Script from 'next/script'
import { SITE_URL } from '@/src/content/profile'
import { analyticsDomains, flushQueuedEvents } from '@/src/lib/analytics'
import { getUmamiConfig, UMAMI_PROXY_PATH } from '@/src/lib/umami'
import ClickTracker from './clickTracker'
import ScrollDepthTracker from './scrollDepthTracker'

const DOMAINS = analyticsDomains(SITE_URL).join(',')

// Loaded through the same-domain proxy. Hashes are dropped so /#contact counts as /, and
// data-performance reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB) for each page view.
export const UmamiAnalytics = () => {
  const config = getUmamiConfig()
  if (!config) return null

  return (
    <>
      <Script
        src={`${UMAMI_PROXY_PATH}/script.js`}
        data-website-id={config.websiteId}
        data-host-url={UMAMI_PROXY_PATH}
        data-domains={DOMAINS}
        data-exclude-hash="true"
        data-performance="true"
        strategy="afterInteractive"
        onLoad={flushQueuedEvents}
      />
      <ClickTracker />
      <ScrollDepthTracker />
    </>
  )
}
