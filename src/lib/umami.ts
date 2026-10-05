// Umami settings shared by next.config.ts (proxy rewrites), the tracker script and server-side events.
// Keep this file free of imports: next.config.ts loads it before the app is compiled.

// The script and collection endpoint are served from this path on the site's own domain, so
// blockers that filter umami.is don't drop visits. next.config.ts rewrites it to Umami.
export const UMAMI_PROXY_PATH = '/a'

export interface UmamiConfig {
  websiteId: string
  scriptUrl: string
  // Collection endpoint on the same Umami host as the script (Umami Cloud or self-hosted).
  apiUrl: string
}

// null when analytics is not configured; throws when the script URL is not an absolute URL.
export const getUmamiConfig = (): UmamiConfig | null => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_URL
  if (!websiteId || !scriptUrl) return null

  let origin: string
  try {
    origin = new URL(scriptUrl).origin
  } catch {
    throw new Error(`NEXT_PUBLIC_UMAMI_URL must be an absolute URL such as https://cloud.umami.is/script.js, got "${scriptUrl}"`)
  }
  return { websiteId, scriptUrl, apiUrl: `${origin}/api/send` }
}
