import { activeTheme, themeCss } from '@/src/lib/theme'

// Colour tokens for the configured theme (SITE_THEME), inlined so they apply before first paint.
const css = themeCss(activeTheme)

export default function ThemeStyles() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
