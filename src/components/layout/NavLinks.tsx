'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/src/lib/constants'
import { trackingAttributes, type NavPlacement } from '@/src/lib/analytics'

interface NavLinksProps {
  location: NavPlacement
  className?: string
  linkClassName?: string
  onNavigate?: () => void
}

export const isActivePath = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`)

export default function NavLinks({ location, className = '', linkClassName = '', onNavigate }: NavLinksProps) {
  const pathname = usePathname()
  return (
    <ul className={className}>
      {NAV_LINKS.map((link) => {
        const active = isActivePath(pathname, link.href)
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              onClick={onNavigate}
              {...trackingAttributes({ name: 'nav_click', data: { item: link.name.toLowerCase(), location } })}
              className={`${linkClassName} ${active ? 'text-fg' : 'text-muted hover:text-fg'}`}
            >
              {link.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
