interface TagProps {
  children: React.ReactNode
  tone?: 'default' | 'accent'
}

export default function Tag({ children, tone = 'default' }: TagProps) {
  const toneClass = tone === 'accent' ? 'border-transparent bg-accent-soft text-fg' : 'border-line bg-subtle text-muted'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-xs ${toneClass}`}>
      {/* A shape cue as well as colour, so primary tags are distinguishable without colour vision (WCAG 1.4.1). */}
      {tone === 'accent' && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
      {children}
    </span>
  )
}
