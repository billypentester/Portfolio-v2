import Link from 'next/link'
import { fullName, profile } from '@/src/content/profile'
import ButtonLink from '@/src/components/ui/ButtonLink'
import Container from '@/src/components/ui/Container'
import { trackingAttributes } from '@/src/lib/analytics'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import ThemeToggle from './ThemeToggle'
import HeaderShell from './HeaderShell'

export default function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2 rounded-sm" {...trackingAttributes({ name: 'nav_click', data: { item: 'home', location: 'header' } })}>
          <span className="text-ui font-semibold tracking-tight">{fullName}</span>
          <span className="hidden font-mono text-xs text-faint transition-colors group-hover:text-accent sm:inline">/ {profile.role.toLowerCase()}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks location="header" className="flex items-center gap-1" linkClassName="rounded-control px-3 py-2 text-sm transition-colors" />
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <ButtonLink href={profile.resumeUrl} download variant="ghost" size="sm" icon="download" tracking={{ name: 'resume_download', data: { location: 'header' } }}>
              Resume
            </ButtonLink>
            <ButtonLink href="/#contact" size="sm" tracking={{ name: 'cta_click', data: { cta: 'contact', location: 'header' } }}>
              Let&apos;s talk
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </HeaderShell>
  )
}
