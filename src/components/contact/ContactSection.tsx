import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import { profile } from '@/src/content/profile'
import { trackingAttributes } from '@/src/lib/analytics'
import SectionObserver from '@/src/components/shared/sectionObserver'
import ContactForm from './ContactForm'

// Kept to the essentials: social profiles and the resume are already in the header, hero and footer.
export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-8 pb-16 sm:pt-12 sm:pb-24">
      <SectionObserver ids={['contact']} />
      <Container>
        <div className="relative overflow-hidden rounded-card border border-line bg-subtle">
          <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Contact</Eyebrow>
              <h2 id="contact-heading" className="mt-3 text-subtitle font-semibold">Have a project, role or engineering problem in mind?</h2>
              <p className="mt-3 text-muted">
                Tell me about the product, the problem or the role, and how I can help.
              </p>

              <dl className="mt-10 grid gap-5 text-sm">
                <div>
                  <dt className="text-label font-medium uppercase text-muted">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${profile.email}`}
                      {...trackingAttributes({ name: 'social_click', data: { platform: 'email', location: 'contact' } })}
                      className="text-base font-medium text-accent underline decoration-brand/40 underline-offset-2 hover:decoration-brand">
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-label font-medium uppercase text-muted">Based in</dt>
                  <dd className="mt-1 text-muted">{profile.location} · {profile.timezone}</dd>
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
