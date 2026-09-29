import Link from 'next/link'
import IconBuilder from '@/src/helpers/IconBuilder'

interface ArrowLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
  event?: string
  className?: string
}

export default function ArrowLink({ href, children, external = false, event, className = '' }: ArrowLinkProps) {
  const classes = `group inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent ${className}`
  const arrow = (
    <IconBuilder
      type={external ? 'arrowUpRight' : 'arrowRight'}
      paint="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
    />
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} data-umami-event={event}>
        {children}
        {arrow}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link href={href} className={classes} data-umami-event={event}>
      {children}
      {arrow}
    </Link>
  )
}
