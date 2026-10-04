import { getActiveTheme } from '@/src/lib/admin/settings'
import { themeCss } from '@/src/lib/theme'

// Colour tokens for the theme saved in /admin (or the SITE_THEME fallback), inlined so they apply before first paint.
export default async function ThemeStyles() {
  const css = themeCss(await getActiveTheme())
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
