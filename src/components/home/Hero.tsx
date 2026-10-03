import Image from 'next/image'
import ButtonLink from '@/src/components/ui/ButtonLink'
import Container from '@/src/components/ui/Container'
import IconBuilder from '@/src/helpers/IconBuilder'
import { fullName, profile, socialLinks } from '@/src/content/profile'

const HERO_LINKS = socialLinks.filter((l) => l.platform === 'github' || l.platform === 'linkedin' || l.platform === 'email')

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <Image src={profile.photo} alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-line object-cover lg:hidden" />
              <p className="font-mono text-eyebrow uppercase text-muted">
                {profile.location} <span className="text-accent">/</span> {profile.timezone}
              </p>
            </div>

            <h1 id="hero-heading" className="mt-6 text-display font-semibold">
              {fullName}
            </h1>

            <p className="mt-6 max-w-2xl text-heading font-medium text-balance text-fg">
              {profile.headline}
            </p>
            <p className="mt-4 max-w-2xl text-lede text-muted">
              {profile.intro}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href="#work" icon="arrowRight" className="w-full sm:w-auto">View selected work</ButtonLink>
              <ButtonLink href="#contact" variant="secondary" className="w-full sm:w-auto">Let&apos;s talk</ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="ghost" icon="download" event="resume_download" className="w-full sm:w-auto">
                Download resume
              </ButtonLink>
            </div>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <figure className="rounded-card border border-line bg-surface p-2 shadow-lift">
              {/* Desktop only: the 1px mobile size keeps phones from downloading a hidden portrait. */}
              <Image
                src={profile.photo}
                alt={`Portrait of ${fullName}`}
                preload
                sizes="(min-width: 1024px) 360px, 1px"
                placeholder="blur"
                className="aspect-square w-full rounded-[calc(var(--radius-card)-0.375rem)] object-cover"
              />
              <figcaption className="flex items-center justify-between px-2 pt-3 pb-1">
                <span className="font-mono text-xs text-faint">@{profile.handle}</span>
                <ul className="flex gap-1" aria-label="Social links">
                  {HERO_LINKS.map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        {...(link.platform === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                        data-umami-event={`${link.platform}_click`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-fg"
                      >
                        <IconBuilder type={link.platform} paint="h-4 w-4" />
                        <span className="sr-only">{link.label}{link.platform === 'email' ? '' : ' (opens in a new tab)'}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  )
}
