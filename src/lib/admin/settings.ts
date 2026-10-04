import 'server-only'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { redis } from '@/src/lib/redis'
import { buildTheme, resolveThemeId, type ResolvedTheme } from '@/src/lib/theme'
import { parseStoredSettings, type PortfolioSettings, type SettingsInput } from './settings-schema'

export const SETTINGS_KEY = 'portfolio:settings'

// Tag for the cached settings read. Saving in /admin refreshes it, which also refreshes every page built from it.
export const SETTINGS_CACHE_TAG = 'portfolio-settings'

// Used until settings are saved in /admin, and whenever Redis is unreachable:
// the SITE_THEME theme (or DEFAULT_THEME) and the newest uploaded resume.
export const DEFAULT_SETTINGS: PortfolioSettings = {
  theme: resolveThemeId(process.env.SITE_THEME),
  resume: { active: null },
  updatedAt: null,
}

export type AdminSettingsResult =
  | { status: 'ok'; settings: PortfolioSettings }
  | { status: 'unavailable'; settings: PortfolioSettings; message: string }

const errorMessage = (error: unknown): string => (error instanceof Error ? error.message : String(error))

// Throws when Redis is not configured or the request fails; callers decide how to fall back.
const readSettings = async (): Promise<PortfolioSettings> => {
  if (!redis) throw new Error('Redis is not configured')
  return parseStoredSettings(await redis.get<unknown>(SETTINGS_KEY), DEFAULT_SETTINGS)
}

// Shared across requests so pages do not cost a Redis read each. Errors are not cached.
const readCachedSettings = unstable_cache(readSettings, ['portfolio-settings'], {
  tags: [SETTINGS_CACHE_TAG],
  revalidate: 3600,
})

// For the public site. Never throws: without Redis the site still renders, using DEFAULT_SETTINGS.
export const getPortfolioSettings = cache(async (): Promise<PortfolioSettings> => {
  if (!redis) return DEFAULT_SETTINGS
  try {
    return await readCachedSettings()
  } catch (error) {
    console.error('Portfolio settings unavailable, using defaults:', errorMessage(error))
    return DEFAULT_SETTINGS
  }
})

export const getActiveTheme = async (): Promise<ResolvedTheme> => buildTheme((await getPortfolioSettings()).theme)

// For /admin: reads Redis directly (never a stale cache) and reports a failure instead of hiding it.
export const loadSettingsForAdmin = async (): Promise<AdminSettingsResult> => {
  if (!redis) {
    return {
      status: 'unavailable',
      settings: DEFAULT_SETTINGS,
      message: 'Redis is not configured, so settings cannot be saved. Set PORTFOLIO_KV_REST_API_URL and PORTFOLIO_KV_REST_API_TOKEN.',
    }
  }
  try {
    return { status: 'ok', settings: await readSettings() }
  } catch (error) {
    console.error('Could not load portfolio settings:', errorMessage(error))
    return {
      status: 'unavailable',
      settings: DEFAULT_SETTINGS,
      message: 'Could not reach Redis. The site is using its default settings until it is back.',
    }
  }
}

// Throws when Redis is unavailable. The calling Server Action refreshes SETTINGS_CACHE_TAG afterwards.
export const saveSettings = async (input: SettingsInput): Promise<PortfolioSettings> => {
  if (!redis) throw new Error('Redis is not configured')
  const settings: PortfolioSettings = { ...input, updatedAt: new Date().toISOString() }
  await redis.set(SETTINGS_KEY, settings)
  return settings
}
