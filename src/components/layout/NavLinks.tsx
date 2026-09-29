'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/src/lib/constants'

interface NavLinksProps {
  className?: string
  linkClassName?: string
  onNavigate?: () => void
}

export const isActivePath = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`)

export default function NavLinks({ className = '', linkClassName = '', onNavigate }: NavLinksProps) {
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
