import type { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import PageHeader from '@/src/components/ui/PageHeader'
import TagList from '@/src/components/ui/TagList'
import ArrowLink from '@/src/components/ui/ArrowLink'
import JsonLd from '@/src/components/seo/JsonLd'
import BulletList from '@/src/components/projects/BulletList'
import SectionObserver from '@/src/components/shared/sectionObserver'
import { journey } from '@/src/content/experience'
import { fullName, profile } from '@/src/content/profile'
import { allSkills, principles, skillGroups } from '@/src/content/skills'
import { now } from '@/src/content/now'
import { buildMetadata, pageSchema } from '@/src/lib/seo'

const PAGE = {
  title: 'About',
  description: 'Bilal Ahmad is a software engineer focused on backend and full-stack development. His background, engineering principles and the tools he works with.',
  path: '/about-me',
}

export const metadata: Metadata = buildMetadata({ ...PAGE, type: 'profile' })

// Reported as section_view; a block that isn't rendered (such as an empty learning list) is skipped.
const TRACKED_SECTIONS = ['journey', 'enjoy', 'approach', 'tools', 'learning', 'outside']

function AboutBlock({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="reveal grid gap-6 border-t border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <Eyebrow>{label}</Eyebrow>
        <h2 id={`${id}-heading`} className="mt-3 text-heading font-semibold">{title}</h2>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  )
}

export default function AboutPage() {
  const learning = now.learning

  return (
    <>
      <JsonLd data={pageSchema({
        path: PAGE.path,
        name: `About ${fullName}`,
        description: PAGE.description,
        type: 'ProfilePage',
        breadcrumbs: [{ name: PAGE.title, path: PAGE.path }],
        mainEntity: 'person',
      })} />
      <SectionObserver ids={TRACKED_SECTIONS} />
      <PageHeader eyebrow="About" title={`Hi, I'm ${fullName}.`} lede={profile.headline} />

      <Container>
        <div className="grid gap-10 pb-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Image
              src={profile.photo}
              alt={`Portrait of ${fullName}`}
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 360px, 100vw"
              className="aspect-[4/5] w-full max-w-sm rounded-card border border-line object-cover"
            />
          </div>
          <div className="grid max-w-prose gap-5 text-lede text-muted lg:col-span-8">
            {profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <AboutBlock id="journey" label="Journey" title="How I got here">
          <ol className="grid gap-0">
            {journey.map((milestone) => (
              <li key={milestone.title} className="grid gap-1 border-b border-line py-5 first:pt-0 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="font-mono text-xs text-faint sm:pt-1">{milestone.period}</p>
                <div>
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="mt-1 text-muted">{milestone.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </AboutBlock>

        <AboutBlock id="enjoy" label="What I enjoy" title="The problems I like most">
          <BulletList items={profile.enjoyBuilding} />
        </AboutBlock>

        <AboutBlock id="approach" label="Approach" title="How I approach engineering">
          <dl className="grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title}>
                <dt className="font-semibold">{principle.title}</dt>
                <dd className="mt-1 text-sm text-muted">{principle.description}</dd>
              </div>
            ))}
          </dl>
        </AboutBlock>

        <AboutBlock id="tools" label="Tools" title="Technologies I work with">
          <dl className="grid gap-5">
            {skillGroups.map((group) => (
              <div key={group.title} className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold sm:pt-0.5">{group.title}</dt>
                <dd><TagList items={allSkills(group)} label={`${group.title} skills`} /></dd>
              </div>
            ))}
          </dl>
        </AboutBlock>

        {learning.length > 0 && (
          <AboutBlock id="learning" label="Learning" title="What I am learning now">
            <BulletList items={learning.map((item) => `${item.title}: ${item.description}`)} />
          </AboutBlock>
        )}

        <AboutBlock id="outside" label="Outside work" title="Beyond the code">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-eyebrow uppercase text-faint">Languages</dt>
              <dd className="mt-2">{profile.languages.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-mono text-eyebrow uppercase text-faint">Interests</dt>
              <dd className="mt-2">{profile.interests.join(', ')}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            <ArrowLink href="/experience" tracking={{ name: 'cta_click', data: { cta: 'full-timeline', location: 'about' } }}>
              See the full experience timeline
            </ArrowLink>
            <ArrowLink href="/projects" tracking={{ name: 'cta_click', data: { cta: 'case-studies', location: 'about' } }}>
              Read the case studies
            </ArrowLink>
            <ArrowLink href="/blogs" tracking={{ name: 'cta_click', data: { cta: 'all-writing', location: 'about' } }}>
              Browse my writing
            </ArrowLink>
          </div>
        </AboutBlock>
      </Container>
    </>
  )
}
