import Link from 'next/link'
import IconBuilder from '@/src/helpers/IconBuilder'
import type { IconName } from '@/src/config/Icon'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './button'

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  external?: boolean
  download?: boolean
  event?: string
  className?: string
}

export default function ButtonLink({ href, children, variant, size, icon, external = false, download = false, event, className }: ButtonLinkProps) {
  const classes = buttonStyles(variant, size, className)
  const content = (
    <>
      {children}
      {icon && <IconBuilder type={icon} paint="h-4 w-4" />}
    </>
  )

  // Files and off-site links bypass the router.
  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        data-umami-event={event}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {content}
        {(external || download) && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} data-umami-event={event}>
      {content}
    </Link>
  )
}
