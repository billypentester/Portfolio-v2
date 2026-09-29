import Link from 'next/link'
import { fullName, profile } from '@/src/content/profile'
import ButtonLink from '@/src/components/ui/ButtonLink'
import Container from '@/src/components/ui/Container'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import ThemeToggle from './ThemeToggle'

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-canvas/80 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2 rounded-sm">
          <span className="text-[0.9375rem] font-semibold tracking-tight">{fullName}</span>
          <span className="hidden font-mono text-xs text-faint transition-colors group-hover:text-accent sm:inline">/ {profile.role.toLowerCase()}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks className="flex items-center gap-1" linkClassName="rounded-control px-3 py-2 text-sm transition-colors" />
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <ButtonLink href={profile.resumeUrl} download variant="ghost" size="sm" event="resume_download">
              Resume
            </ButtonLink>
            <ButtonLink href="/#contact" size="sm">
              Contact
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
