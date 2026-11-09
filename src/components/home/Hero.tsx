import Image from 'next/image'
import ButtonLink from '@/src/components/ui/ButtonLink'
import Container from '@/src/components/ui/Container'
import IconBuilder from '@/src/helpers/IconBuilder'
import { fullName, profile, socialLinks } from '@/src/content/profile'
import { trackingAttributes } from '@/src/lib/analytics'

const HERO_LINKS = socialLinks.filter((l) => l.platform === 'github' || l.platform === 'linkedin' || l.platform === 'email')

// The marker band sits under the baseline so the accent text itself stays on the canvas colour (AA contrast).
function HighlightedHeadline({ text, highlight }: { text: string; highlight: string }) {
  const start = highlight ? text.indexOf(highlight) : -1
  if (start === -1) return text

  const end = start + highlight.length
  return (
    <>
      {text.slice(0, start)}
      <strong className="bg-linear-to-r from-accent-soft to-accent-soft bg-size-[100%_0.3em] bg-bottom bg-no-repeat font-semibold text-accent box-decoration-clone">
        {text.slice(start, end)}
      </strong>
      {text.slice(end)}
    </>
  )
}

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <Image src={profile.photo} alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-line object-cover lg:hidden" />
              {/* Stacked next to the avatar on phones; a single-line pill from sm up. */}
              <p className="flex flex-col gap-0.5 text-sm text-muted sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:border sm:border-line sm:bg-canvas/70 sm:px-4 sm:py-1.5 sm:backdrop-blur-sm">
                <span className="flex items-center gap-2 font-medium text-fg">
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                  {profile.role}
                </span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
                <span>
                  <span className="sr-only">, </span>
                  {profile.specialty}
                </span>
              </p>
            </div>

            {/* Bottom padding keeps descenders inside the clipped gradient. */}
            <h1 id="hero-heading" className="text-gradient mt-6 pb-1 text-display font-semibold">
              {fullName}
            </h1>

            <p className="mt-6 max-w-2xl text-heading font-medium text-fg">
              <HighlightedHeadline text={profile.headline} highlight={profile.headlineHighlight} />
            </p>
            <p className="mt-5 max-w-xl text-lede text-muted">
              {profile.intro}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href="#work" icon="arrowRight" tracking={{ name: 'cta_click', data: { cta: 'view-work', location: 'hero' } }} className="w-full sm:w-auto">View selected work</ButtonLink>
              <ButtonLink href="#contact" variant="secondary" tracking={{ name: 'cta_click', data: { cta: 'contact', location: 'hero' } }} className="w-full sm:w-auto">Let&apos;s talk</ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="ghost" icon="download" tracking={{ name: 'resume_download', data: { location: 'hero' } }} className="w-full sm:w-auto">
                Download resume
              </ButtonLink>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <figure className="w-full max-w-[320px]">
              {/* A tilted portrait on an offset colour block. */}
              <div className="relative -rotate-3">
                <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-card bg-spectrum-2" />
                {/* Desktop only: the 1px mobile size keeps phones from downloading a hidden portrait. */}
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${fullName}`}
                  preload
                  sizes="(min-width: 1024px) 320px, 1px"
                  placeholder="blur"
                  className="relative aspect-square w-full rounded-card border-[3px] border-fg object-cover"
                />
              </div>
              <figcaption className="mt-8 flex items-center justify-between">
                <span className="text-sm text-faint">@{profile.handle}</span>
                <ul className="flex gap-2" aria-label="Social links">
                  {HERO_LINKS.map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        {...(link.platform === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                        {...trackingAttributes({ name: 'social_click', data: { platform: link.platform, location: 'hero' } })}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-accent"
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
