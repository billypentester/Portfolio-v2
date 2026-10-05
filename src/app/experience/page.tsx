import type { Metadata } from 'next'
import Container from '@/src/components/ui/Container'
import PageHeader from '@/src/components/ui/PageHeader'
import ButtonLink from '@/src/components/ui/ButtonLink'
import JsonLd from '@/src/components/seo/JsonLd'
import ExperienceTimeline from '@/src/components/experience/ExperienceTimeline'
import SectionObserver from '@/src/components/shared/sectionObserver'
import { experience } from '@/src/content/experience'
import { profile } from '@/src/content/profile'
import { buildMetadata, pageSchema } from '@/src/lib/seo'

const PAGE = {
  title: 'Experience',
  description: 'Career timeline of Bilal Ahmad: Software Engineer at Simplex Technology Solutions since 2023, and MERN stack developer at Cache First before that.',
  path: '/experience',
}

export const metadata: Metadata = buildMetadata(PAGE)

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={pageSchema({
        path: PAGE.path,
        name: PAGE.title,
        description: PAGE.description,
        breadcrumbs: [{ name: PAGE.title, path: PAGE.path }],
      })} />
      <SectionObserver ids={experience.map((role) => role.id)} />
      <PageHeader
        eyebrow="Experience"
        title="Where I have worked, and what I owned."
        lede="Responsibilities, stack and the work I shipped in each role."
      >
        <div className="mt-8">
          <ButtonLink href={profile.resumeUrl} download variant="secondary" icon="download" tracking={{ name: 'resume_download', data: { location: 'experience-page' } }}>
            Download resume
          </ButtonLink>
        </div>
      </PageHeader>
      <section aria-label="Career timeline" className="border-t border-line py-16 sm:py-24">
        <Container>
          <ExperienceTimeline roles={experience} variant="full" headingLevel="h2" />
        </Container>
      </section>
    </>
  )
}
