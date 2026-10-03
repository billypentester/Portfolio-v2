import IconBuilder from '@/src/helpers/IconBuilder'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import ButtonLink from '@/src/components/ui/ButtonLink'
import { profile, socialLinks } from '@/src/content/profile'
import type { SocialPlatform } from '@/src/content/types'
import ContactForm from './ContactForm'

// Professional profiles first, chat apps after.
const CHANNEL_ORDER: SocialPlatform[] = ['linkedin', 'github', 'whatsapp', 'messenger']
const DIRECT_CHANNELS = CHANNEL_ORDER
  .map((platform) => socialLinks.find((link) => link.platform === platform))
  .filter((link) => link !== undefined)

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-card border border-line bg-surface">
          <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
            <div className="lg:col-span-5">
              <Eyebrow>Contact</Eyebrow>
              <h2 id="contact-heading" className="mt-4 text-subtitle font-semibold">Have a project, role or engineering problem in mind?</h2>
              <p className="mt-5 text-lede text-muted">
                Tell me about the product, the problem or the role, and how I can help.
              </p>

              <dl className="mt-10 grid gap-5 text-sm">
                <div>
                  <dt className="font-mono text-eyebrow uppercase text-faint">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${profile.email}`} className="text-base font-medium underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-eyebrow uppercase text-faint">Based in</dt>
                  <dd className="mt-1 text-muted">{profile.location} · {profile.timezone}</dd>
                </div>
                <div>
                  <dt className="font-mono text-eyebrow uppercase text-faint">Elsewhere</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-2">
                      {DIRECT_CHANNELS.map((link) => (
                        <li key={link.platform}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-umami-event={`${link.platform}_click`}
                            className="inline-flex h-10 items-center gap-2 rounded-control border border-line bg-canvas px-3 text-muted transition-colors hover:border-fg hover:text-fg"
                          >
                            <IconBuilder type={link.platform} paint="h-4 w-4" />
                            {link.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-eyebrow uppercase text-faint">Resume</dt>
                  <dd className="mt-2">
                    <ButtonLink href={profile.resumeUrl} download variant="secondary" size="sm" icon="download" event="resume_download">
                      Download resume <span className="font-mono text-xs text-faint">PDF</span>
                    </ButtonLink>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
