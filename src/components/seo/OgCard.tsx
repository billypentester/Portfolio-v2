import { activeTheme } from '@/src/lib/theme'
import { toHex } from '@/src/utils/color'

// Layout for generated Open Graph images (rendered by next/og, so only inline styles and hex colours).
export const OG_SIZE = { width: 1200, height: 630 }

const { canvas, line, fg, muted, accent } = activeTheme.light
const COLORS = { canvas: toHex(canvas), line: toHex(line), fg: toHex(fg), muted: toHex(muted), accent: toHex(accent) }

interface OgCardProps {
  eyebrow: string
  title: string
  description: string
  footer: string
}

export default function OgCard({ eyebrow, title, description, footer }: OgCardProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: COLORS.canvas,
        backgroundImage: `linear-gradient(to right, ${COLORS.line} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.line} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        color: COLORS.fg,
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.muted }}>
        <span style={{ color: COLORS.accent, marginRight: 16 }}>/</span>
        {eyebrow}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
        <div style={{ marginTop: 32, fontSize: 34, lineHeight: 1.35, color: COLORS.muted, maxWidth: 980 }}>{description}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `2px solid ${COLORS.fg}`, paddingTop: 24, fontSize: 26 }}>
        <span>{footer}</span>
        <span style={{ color: COLORS.muted }}>billypentester.pk</span>
      </div>
    </div>
  )
}
