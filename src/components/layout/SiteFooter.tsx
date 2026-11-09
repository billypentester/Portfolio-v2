import Link from 'next/link'
import IconBuilder from '@/src/helpers/IconBuilder'
import Container from '@/src/components/ui/Container'
import { fullName, profile, socialLinks } from '@/src/content/profile'
import { FOOTER_LINKS } from '@/src/lib/constants'
import { trackingAttributes } from '@/src/lib/analytics'

export default function SiteFooter() {
  return (
    <footer className="bg-subtle">
      <div aria-hidden="true" className="spectrum-rule h-[3px]" />
      <Container className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-xl font-semibold tracking-tight">{fullName}</p>
          <p className="mt-3 max-w-md text-sm text-muted">
            {profile.role}, {profile.specialty.toLowerCase()}. Reliable web applications, from APIs and integrations to responsive interfaces, built with security in mind.
          </p>
          <a
            href={`mailto:${profile.email}`}
            {...trackingAttributes({ name: 'social_click', data: { platform: 'email', location: 'footer' } })}
            className="mt-4 inline-block text-sm font-medium hover:text-accent hover:underline">
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="text-label font-medium uppercase text-muted">Site</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-accent hover:underline"
                  {...trackingAttributes({ name: 'nav_click', data: { item: link.name.toLowerCase(), location: 'footer' } })}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.resumeUrl} target="_blank" rel="noopener" {...trackingAttributes({ name: 'resume_download', data: { location: 'footer' } })} className="hover:text-accent hover:underline">
                Download resume
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-label font-medium uppercase text-muted">Elsewhere</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  {...(link.platform === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  {...trackingAttributes({ name: 'social_click', data: { platform: link.platform, location: 'footer' } })}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3.5 py-1.5 transition-colors hover:border-brand hover:text-accent"
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
      <Container className="flex flex-col gap-1 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {fullName} · {profile.handle}</p>
        <p>Built with Next.js + TypeScript</p>
      </Container>
    </footer>
  )
}
