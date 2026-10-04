import type { ResolvedTheme } from '@/src/lib/theme'
import { toHex } from '@/src/utils/color'

// Layout for generated Open Graph images (rendered by next/og, so only inline styles and hex colours).
export const OG_SIZE = { width: 1200, height: 630 }

interface OgCardProps {
  theme: ResolvedTheme
  eyebrow: string
  title: string
  description: string
  footer: string
}

export default function OgCard({ theme, eyebrow, title, description, footer }: OgCardProps) {
  const { canvas, line, fg, muted, accent } = theme.light
  const colors = { canvas: toHex(canvas), line: toHex(line), fg: toHex(fg), muted: toHex(muted), accent: toHex(accent) }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: colors.canvas,
        backgroundImage: `linear-gradient(to right, ${colors.line} 1px, transparent 1px), linear-gradient(to bottom, ${colors.line} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        color: colors.fg,
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, letterSpacing: 3, textTransform: 'uppercase', color: colors.muted }}>
        <span style={{ color: colors.accent, marginRight: 16 }}>/</span>
        {eyebrow}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
        <div style={{ marginTop: 32, fontSize: 34, lineHeight: 1.35, color: colors.muted, maxWidth: 980 }}>{description}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `2px solid ${colors.fg}`, paddingTop: 24, fontSize: 26 }}>
        <span>{footer}</span>
        <span style={{ color: colors.muted }}>billypentester.pk</span>
      </div>
    </div>
  )
}
