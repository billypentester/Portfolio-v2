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
  const palette = theme.light
  const [canvas, line, fg, muted, accent] = [palette.canvas, palette.line, palette.fg, palette.muted, palette.accent].map(toHex)
  const spectrum = [palette['spectrum-1'], palette['spectrum-2'], palette['spectrum-3'], palette['spectrum-4']].map(toHex)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: canvas,
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        color: fg,
      }}
    >
      <div style={{ display: 'flex', height: 8, backgroundImage: `linear-gradient(90deg, ${spectrum.join(', ')})` }} />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: '64px 80px 72px' }}>
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 500, color: accent }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>{title}</div>
          <div style={{ marginTop: 32, fontSize: 34, lineHeight: 1.4, color: muted, maxWidth: 980 }}>{description}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `2px solid ${line}`, paddingTop: 24, fontSize: 26 }}>
          <span>{footer}</span>
          <span style={{ color: muted }}>billypentester.pk</span>
        </div>
      </div>
    </div>
  )
}
