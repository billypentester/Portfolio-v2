import Link from 'next/link'
import IconBuilder from '@/src/helpers/IconBuilder'
import Container from '@/src/components/ui/Container'
import { fullName, profile, socialLinks } from '@/src/content/profile'
import { FOOTER_LINKS } from '@/src/lib/constants'
import { trackingAttributes } from '@/src/lib/analytics'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-lg font-semibold tracking-tight">{fullName}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            {profile.role}, {profile.specialty.toLowerCase()}. Reliable web applications, from APIs and integrations to responsive interfaces, built with security in mind.
          </p>
          <a
            href={`mailto:${profile.email}`}
            {...trackingAttributes({ name: 'social_click', data: { platform: 'email', location: 'footer' } })}
            className="mt-6 inline-block font-mono text-sm text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-mono text-eyebrow uppercase text-faint">Site</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted hover:text-fg"
                  {...trackingAttributes({ name: 'nav_click', data: { item: link.name.toLowerCase(), location: 'footer' } })}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.resumeUrl} target="_blank" rel="noopener" {...trackingAttributes({ name: 'resume_download', data: { location: 'footer' } })} className="text-muted hover:text-fg">
                Download resume
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-mono text-eyebrow uppercase text-faint">Elsewhere</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  {...(link.platform === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  {...trackingAttributes({ name: 'social_click', data: { platform: link.platform, location: 'footer' } })}
                  className="inline-flex items-center gap-2 text-muted hover:text-fg"
                >
                  <IconBuilder type={link.platform} paint="h-4 w-4" />
                  {link.label}
                  {link.platform !== 'email' && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 font-mono text-xs text-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {fullName} · {profile.handle}</p>
        <p>Built with Next.js + TypeScript</p>
      </Container>
    </footer>
  )
}
