import Image from 'next/image'
import ButtonLink from '@/src/components/ui/ButtonLink'
import Container from '@/src/components/ui/Container'
import IconBuilder from '@/src/helpers/IconBuilder'
import { experience } from '@/src/content/experience'
import { fullName, profile, socialLinks } from '@/src/content/profile'
import { formatYearMonth } from '@/src/utils'

const currentRole = experience.find((role) => role.end === null)

export default function Hero() {
  const facts = [
    currentRole && { label: 'Currently', value: `${currentRole.role} at ${currentRole.company.replace(' Technology Solutions', '')}`, note: `Since ${formatYearMonth(currentRole.start)}` },
    { label: 'Focus', value: 'Backend · APIs · Integrations', note: 'Full-stack when the feature needs it' },
    { label: 'Stack', value: profile.primaryStack.slice(0, 4).join(' · '), note: 'Day-to-day tools' },
    { label: 'Based in', value: profile.location, note: profile.timezone },
  ].filter((fact): fact is { label: string; value: string; note: string } => Boolean(fact))

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex animate-rise items-center gap-3">
              <Image src={profile.photo} alt="" width={40} height={40} className="h-10 w-10 rounded-full border border-line object-cover lg:hidden" />
              <p className="font-mono text-eyebrow uppercase text-faint">
                {profile.role} <span className="text-accent">/</span> {profile.location}
              </p>
            </div>

            <h1 id="hero-heading" className="mt-6 animate-rise text-display font-semibold [animation-delay:60ms]">
              {fullName}
            </h1>

            <p className="mt-8 max-w-3xl animate-rise text-heading font-medium text-fg [animation-delay:120ms]">
              {profile.headline}
            </p>
            <p className="mt-5 max-w-2xl animate-rise text-lede text-muted [animation-delay:180ms]">
              {profile.intro}
            </p>

            <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href="/projects" icon="arrowRight" className="w-full sm:w-auto">View work</ButtonLink>
              <ButtonLink href="#contact" variant="secondary" className="w-full sm:w-auto">Contact</ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="ghost" icon="download" event="resume_download" className="w-full sm:w-auto">
                Resume
              </ButtonLink>
            </div>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <figure className="animate-rise rounded-card border border-line bg-surface p-2 shadow-lift [animation-delay:120ms]">
              <Image
                src={profile.photo}
                alt={`Portrait of ${fullName}`}
                priority
                sizes="360px"
                placeholder="blur"
                className="aspect-square w-full rounded-[calc(var(--radius-card)-0.375rem)] object-cover"
              />
              <figcaption className="flex items-center justify-between px-2 pt-3 pb-1">
                <span className="font-mono text-xs text-faint">@{profile.handle}</span>
                <ul className="flex gap-1" aria-label="Social links">
                  {socialLinks.filter((l) => l.platform === 'github' || l.platform === 'linkedin' || l.platform === 'email').map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-umami-event={`${link.platform}_click`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-fg"
                      >
                        <IconBuilder type={link.platform} paint="h-4 w-4" />
                        <span className="sr-only">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          </div>
        </div>

        <dl className="mt-16 grid animate-rise grid-cols-1 border-t border-line [animation-delay:300ms] sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-b border-line py-5 sm:pr-6 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6">
              <dt className="font-mono text-eyebrow uppercase text-faint">{fact.label}</dt>
              <dd className="mt-2 font-medium">{fact.value}</dd>
              <dd className="mt-0.5 text-sm text-faint">{fact.note}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
