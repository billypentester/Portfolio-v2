import type { MetadataRoute } from 'next'
import { fullName } from '@/src/content/profile'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/src/lib/seo'
import { activeTheme } from '@/src/lib/theme'
import { toHex } from '@/src/utils/color'

const ICON_SIZES = ['144x144', '192x192', '512x512']
const CANVAS = toHex(activeTheme.light.canvas)

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: fullName,
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: CANVAS,
    theme_color: CANVAS,
    categories: ['portfolio', 'developer'],
    icons: ICON_SIZES.flatMap((sizes) => [
      { src: `/images/manifest-${sizes}.png`, sizes, type: 'image/png', purpose: 'any' as const },
      { src: `/images/manifest-${sizes}.png`, sizes, type: 'image/png', purpose: 'maskable' as const },
    ]),
  }
}
