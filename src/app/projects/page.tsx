import type { Metadata } from 'next'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import PageHeader from '@/src/components/ui/PageHeader'
import JsonLd from '@/src/components/seo/JsonLd'
import ProjectRow from '@/src/components/projects/ProjectRow'
import ArchiveGrid from '@/src/components/projects/ArchiveGrid'
import { archivedProjects, caseStudyProjects, showcaseProjects } from '@/src/content/projects'
import type { ShowcaseProject } from '@/src/content/types'
import { buildMetadata, caseStudyNode, pageSchema } from '@/src/lib/seo'

const PAGE = {
  title: 'Work and case studies',
  description: 'Case studies from production ordering, loyalty and healthcare platforms, including KFC Pakistan, Domino\'s Pakistan and Hospinizer, plus earlier projects.',
  path: '/projects',
}

export const metadata: Metadata = buildMetadata(PAGE)

const byFeatured = (a: ShowcaseProject, b: ShowcaseProject) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))

const groups: { id: string; label: string; description: string; projects: ShowcaseProject[] }[] = [
  {
    id: 'professional',
    label: 'Professional work',
    description: 'Production platforms I have worked on as an engineer. Only publicly shareable information is included: no proprietary code, credentials, confidential architecture or sensitive business details.',
    projects: showcaseProjects.filter((p) => p.kind === 'professional').sort(byFeatured),
  },
  {
    id: 'personal',
    label: 'Personal projects',
    description: 'Products I build and run on my own time.',
    projects: showcaseProjects.filter((p) => p.kind === 'personal').sort(byFeatured),
  },
]

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={pageSchema({
        path: PAGE.path,
        name: PAGE.title,
        description: PAGE.description,
        type: 'CollectionPage',
        breadcrumbs: [{ name: 'Work', path: PAGE.path }],
        hasPart: caseStudyProjects.map(caseStudyNode),
      })} />
      <PageHeader
        eyebrow="Work"
        title="Projects and case studies."
        lede="What each product needed, what I built, and the stack behind it."
      />

      {groups.filter((group) => group.projects.length > 0).map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-heading`} className="border-t border-line py-16 sm:py-24">
          <Container>
            <div className="mb-12 max-w-2xl sm:mb-16">
              <Eyebrow as="h2" id={`${group.id}-heading`}>{group.label}</Eyebrow>
              <p className="mt-3 text-muted">{group.description}</p>
            </div>
            <div className="grid gap-6 sm:gap-8">
              {group.projects.map((project, index) => (
                <ProjectRow key={project.slug} project={project} index={index} preload={group.id === 'professional' && index === 0} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      {archivedProjects.length > 0 && (
        <section aria-labelledby="archive-heading" className="border-t border-line py-16 sm:py-24">
          <Container>
            <div className="mb-10 max-w-2xl">
              <Eyebrow>Archive</Eyebrow>
              <h2 id="archive-heading" className="mt-3 text-heading font-semibold">Earlier projects</h2>
              <p className="mt-3 text-muted">Earlier work, kept for the record.</p>
            </div>
            <ArchiveGrid projects={archivedProjects} />
          </Container>
        </section>
      )}
    </>
  )
}
