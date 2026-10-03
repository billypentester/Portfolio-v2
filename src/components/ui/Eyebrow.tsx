interface EyebrowProps {
  children: React.ReactNode
  index?: string
  // Render as a heading when the label is the only title a section has, so it is not announced twice.
  as?: 'p' | 'h2'
  id?: string
  className?: string
}

// Monospace label used above headings, e.g. "01 / Work".
export default function Eyebrow({ children, index, as: Tag = 'p', id, className = '' }: EyebrowProps) {
  return (
    <Tag id={id} className={`flex items-center gap-2 font-mono text-eyebrow uppercase text-faint ${className}`}>
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-6 bg-line-strong" />}
      <span>{children}</span>
    </Tag>
  )
}
