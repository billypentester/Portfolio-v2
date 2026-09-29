interface TagProps {
  children: React.ReactNode
  tone?: 'default' | 'accent'
}

export default function Tag({ children, tone = 'default' }: TagProps) {
  const toneClass = tone === 'accent' ? 'border-transparent bg-accent-soft text-fg' : 'border-line bg-subtle text-muted'
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs ${toneClass}`}>
      {children}
    </span>
  )
}
