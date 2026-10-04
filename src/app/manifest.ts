import type { MetadataRoute } from 'next'
import { fullName } from '@/src/content/profile'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/src/lib/seo'
import { getActiveTheme } from '@/src/lib/admin/settings'
import { toHex } from '@/src/utils/color'

const ICON_SIZES = ['144x144', '192x192', '512x512']

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const canvas = toHex((await getActiveTheme()).light.canvas)
  return {
    name: SITE_TITLE,
    short_name: fullName,
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: canvas,
    theme_color: canvas,
    categories: ['portfolio', 'developer'],
    icons: ICON_SIZES.flatMap((sizes) => [
      { src: `/images/manifest-${sizes}.png`, sizes, type: 'image/png', purpose: 'any' as const },
      { src: `/images/manifest-${sizes}.png`, sizes, type: 'image/png', purpose: 'maskable' as const },
    ]),
  }
}
