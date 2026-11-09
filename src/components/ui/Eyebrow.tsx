interface EyebrowProps {
  children: React.ReactNode
  index?: string
  // Render as a heading when the label is the only title a section has, so it is not announced twice.
  as?: 'p' | 'h2'
  id?: string
  className?: string
}

// Accent label used above headings, optionally numbered, e.g. "01  Work".
export default function Eyebrow({ children, index, as: Tag = 'p', id, className = '' }: EyebrowProps) {
  return (
    <Tag id={id} className={`flex items-center gap-2.5 text-sm font-medium text-accent ${className}`}>
      {index && <span className="text-faint tabular-nums">{index}</span>}
      <span>{children}</span>
    </Tag>
  )
}
