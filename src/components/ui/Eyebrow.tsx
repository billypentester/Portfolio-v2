interface EyebrowProps {
  children: React.ReactNode
  index?: string
  className?: string
}

// Monospace label used above headings, e.g. "01 / Work".
export default function Eyebrow({ children, index, className = '' }: EyebrowProps) {
  return (
    <p className={`flex items-center gap-2 font-mono text-eyebrow uppercase text-faint ${className}`}>
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-6 bg-line-strong" />}
      <span>{children}</span>
    </p>
  )
}
