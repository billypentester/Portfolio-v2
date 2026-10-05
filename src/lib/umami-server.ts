import 'server-only'
import { SITE_URL } from '@/src/content/profile'
import { analyticsDomains, type TrackedEvent } from '@/src/lib/analytics'
import { getUmamiConfig } from '@/src/lib/umami'

const TIMEOUT_MS = 3000

// Records an event for a request that never runs the tracker script, such as a direct /resume link.
// Never throws: analytics must not break the response. Call it from after() so it adds no latency.
export const trackServerEvent = async (event: TrackedEvent, request: Request): Promise<void> => {
  const config = getUmamiConfig()
  if (!config) return

  const { hostname, pathname } = new URL(request.url)
  // Same rule as the tracker's data-domains: local and preview deployments are not recorded.
  if (!analyticsDomains(SITE_URL).includes(hostname)) return

  // Umami ignores requests without a browser User-Agent, and uses it to filter out bots.
  const userAgent = request.headers.get('user-agent')
  if (!userAgent) return

  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const payload = {
    website: config.websiteId,
    hostname,
    url: pathname,
    referrer: request.headers.get('referer') ?? '',
    language: request.headers.get('accept-language')?.split(',')[0] ?? '',
    name: event.name,
    data: event.data,
  }

  try {
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        // Lets Umami place the visitor rather than this server.
        ...(clientIp ? { 'X-Forwarded-For': clientIp } : {}),
      },
      body: JSON.stringify({ type: 'event', payload }),
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) {
      console.error(`Umami rejected server event "${event.name}": HTTP ${response.status}`)
    }
  } catch (error) {
    console.error(`Could not send server event "${event.name}" to Umami:`, error instanceof Error ? error.message : error)
  }
}
