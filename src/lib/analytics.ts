import type { PublicationCategory, SocialPlatform } from '@/src/content/types'

// Umami events. Never pass personal data (names, emails, message text) as event data.
// Event names are snake_case; data values are kebab-case so they group cleanly in reports.

export type AnalyticsData = Record<string, string | number | boolean>

// Where a repeated control sits, for links that appear in several places on the same page.
export type Placement =
  | 'header' | 'mobile-menu' | 'footer' | 'contact'
  | 'hero' | 'snapshot' | 'capabilities' | 'work' | 'now' | 'experience' | 'approach' | 'writing' | 'credentials'
  | 'about' | 'experience-page' | 'case-study' | 'not-found'

export type NavPlacement = 'header' | 'mobile-menu' | 'footer'

export type ProjectLinkPlacement = 'project-card' | 'experience-timeline' | 'case-study' | 'case-study-next'

export const SCROLL_DEPTHS = [25, 50, 75, 100] as const
export type ScrollDepth = (typeof SCROLL_DEPTHS)[number]

export type ReferrerSource = 'site' | 'external' | 'direct'

type AnalyticsEventMap = {
  section_view: { section: string }
  scroll_depth: { depth: ScrollDepth }
  nav_click: { item: string; location: NavPlacement }
  cta_click: { cta: string; location: Placement }
  resume_download: { location: Placement }
  social_click: { platform: SocialPlatform; location: Placement }
  project_click: { project: string; action: 'case-study' | 'live' | 'github'; location: ProjectLinkPlacement }
  blog_click: { article: string; category: PublicationCategory; publisher: string }
  blog_topic_filter: { category: PublicationCategory }
  certificate_view: { certificate: string }
  certificate_verify: { certificate: string }
  company_click: { company: string }
  theme_toggle: { theme: 'light' | 'dark' }
  mobile_menu_open: undefined
  contact_form_start: undefined
  contact_form_submit: undefined
  contact_form_success: undefined
  contact_form_error: { reason: 'invalid' | 'error'; fields: string }
  page_not_found: { path: string; referrer: string }
  // Sent by the server from /resume, so links shared outside the site are counted too.
  resume_served: { source: ReferrerSource }
}

export type AnalyticsEventName = keyof AnalyticsEventMap

export type TrackedEvent = {
  [Name in AnalyticsEventName]: AnalyticsEventMap[Name] extends undefined
    ? { name: Name; data?: undefined }
    : { name: Name; data: AnalyticsEventMap[Name] }
}[AnalyticsEventName]

// Declarative tracking for links and buttons, read by the click tracker. We don't use Umami's own
// data-umami-event: for same-tab links it cancels the click and reloads the page, which breaks
// client-side navigation.
const EVENT_ATTRIBUTE = 'data-track'
const DATA_ATTRIBUTE_PREFIX = `${EVENT_ATTRIBUTE}-`

export const TRACKED_ELEMENT_SELECTOR = `[${EVENT_ATTRIBUTE}]`

export type TrackingAttributes = Record<`${typeof EVENT_ATTRIBUTE}${string}`, string>

// Data keys must be lowercase: HTML lowercases attribute names.
export const trackingAttributes = (event?: TrackedEvent): TrackingAttributes => {
  if (!event) return {}
  const attributes: TrackingAttributes = { [EVENT_ATTRIBUTE]: event.name }
  for (const [key, value] of Object.entries(event.data ?? {})) {
    attributes[`${DATA_ATTRIBUTE_PREFIX}${key}`] = String(value)
  }
  return attributes
}

interface AttributeSource {
  getAttribute(name: string): string | null
  getAttributeNames(): string[]
}

export const readTrackingAttributes = (element: AttributeSource): { name: string; data: AnalyticsData } | null => {
  const name = element.getAttribute(EVENT_ATTRIBUTE)
  if (!name) return null
  const data: AnalyticsData = {}
  for (const attribute of element.getAttributeNames()) {
    if (!attribute.startsWith(DATA_ATTRIBUTE_PREFIX)) continue
    data[attribute.slice(DATA_ATTRIBUTE_PREFIX.length)] = element.getAttribute(attribute) ?? ''
  }
  return { name, data }
}

// Events fired before the tracker script loads (the hero section view, an early click) wait here
// and are sent once it is ready. Capped in case the script is blocked or analytics is off.
const MAX_QUEUED_EVENTS = 25
const queuedEvents: { name: string; data?: AnalyticsData }[] = []

const send = (name: string, data?: AnalyticsData): void => {
  if (window.umami) {
    window.umami.track(name, data)
  } else if (queuedEvents.length < MAX_QUEUED_EVENTS) {
    queuedEvents.push({ name, data })
  }
}

export const flushQueuedEvents = (): void => {
  for (const { name, data } of queuedEvents.splice(0)) window.umami?.track(name, data)
}

export const track = (event: TrackedEvent): void => {
  send(event.name, event.data)
}

export const trackElement = (element: AttributeSource): void => {
  const event = readTrackingAttributes(element)
  if (event) send(event.name, event.data)
}

// Milestones reached once the bottom of the viewport is at `viewportBottom` px of a `documentHeight` px page.
// The last few pixels count as the end, since mobile browsers rarely report the exact bottom.
const BOTTOM_TOLERANCE_PX = 8

export const reachedScrollDepths = (viewportBottom: number, documentHeight: number): ScrollDepth[] => {
  if (documentHeight <= 0) return []
  if (documentHeight - viewportBottom <= BOTTOM_TOLERANCE_PX) return [...SCROLL_DEPTHS]
  const percent = (viewportBottom / documentHeight) * 100
  return SCROLL_DEPTHS.filter((depth) => depth <= percent)
}

// Hostnames the tracker may report from, so local and preview deployments stay out of the stats.
export const analyticsDomains = (siteUrl: string): string[] => {
  const { hostname } = new URL(siteUrl)
  return [hostname, `www.${hostname}`]
}

export const referrerSource = (referrer: string | null, siteUrl: string): ReferrerSource => {
  if (!referrer) return 'direct'
  try {
    return analyticsDomains(siteUrl).includes(new URL(referrer).hostname) ? 'site' : 'external'
  } catch {
    // A malformed Referer header still came from somewhere other than this site.
    return 'external'
  }
}
