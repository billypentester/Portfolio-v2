import type { Metadata } from 'next'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import PageHeader from '@/src/components/ui/PageHeader'
import JsonLd from '@/src/components/seo/JsonLd'
import ProjectRow from '@/src/components/projects/ProjectRow'
import ArchiveGrid from '@/src/components/projects/ArchiveGrid'
import { archivedProjects, showcaseProjects } from '@/src/content/projects'
import type { ShowcaseProject } from '@/src/content/types'
import { breadcrumbSchema, buildMetadata } from '@/src/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description: 'Case studies from production ordering, loyalty and healthcare platforms, including KFC Pakistan, Domino\'s Pakistan and Hospinizer, plus earlier projects.',
  path: '/projects',
})

const byFeatured = (a: ShowcaseProject, b: ShowcaseProject) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))

const groups: { id: string; label: string; description: string; projects: ShowcaseProject[] }[] = [
  {
    id: 'professional',
    label: 'Professional work',
    description: 'Production platforms I have worked on as an engineer. Only publicly visible details are shared.',
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
      <JsonLd data={breadcrumbSchema([{ name: 'Work', path: '/projects' }])} />
      <PageHeader
        eyebrow="Work"
        title="Projects and case studies."
        lede="What each product needed, what I built, and the stack behind it."
      />

      {groups.filter((group) => group.projects.length > 0).map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-heading`} className="border-t border-line py-16 sm:py-24">
          <Container>
            <div className="mb-12 max-w-2xl sm:mb-16">
              <Eyebrow>{group.label}</Eyebrow>
              <h2 id={`${group.id}-heading`} className="sr-only">{group.label}</h2>
              <p className="mt-3 text-muted">{group.description}</p>
            </div>
            <div className="grid gap-20 sm:gap-28">
              {group.projects.map((project, index) => (
                <ProjectRow key={project.slug} project={project} index={index} priority={group.id === 'professional' && index === 0} />
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
