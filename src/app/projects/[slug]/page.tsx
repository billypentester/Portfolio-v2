import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import IconBuilder from '@/src/helpers/IconBuilder'
import ButtonLink from '@/src/components/ui/ButtonLink'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import JsonLd from '@/src/components/seo/JsonLd'
import BulletList from '@/src/components/projects/BulletList'
import CaseStudySection from '@/src/components/projects/CaseStudySection'
import ProjectCover from '@/src/components/projects/ProjectCover'
import StackDiagram from '@/src/components/projects/StackDiagram'
import { caseStudyProjects, getProject } from '@/src/content/projects'
import { breadcrumbSchema, buildMetadata, projectSchema } from '@/src/lib/seo'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project?.caseStudy) return {}

  return buildMetadata({
    title: `${project.title} case study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: 'article',
    image: { url: `/projects/${project.slug}/opengraph-image`, width: 1200, height: 630, alt: `${project.title} case study` },
  })
}

const DISCLOSURE =
  'Only publicly shareable information is included. No proprietary code, credentials, confidential architecture or sensitive business information is shown.'

interface CaseStudyBlock {
  id: string
  label: string
  title: string
  content: React.ReactNode
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project?.caseStudy) notFound()

  const { caseStudy } = project
  const position = caseStudyProjects.findIndex((p) => p.slug === project.slug)
  const next = caseStudyProjects[(position + 1) % caseStudyProjects.length]
  const meta = [
    { label: 'Role', value: caseStudy.role },
    ...(project.kind === 'professional' && project.employer ? [{ label: 'Company', value: project.employer }] : []),
    ...(project.stack.length > 0 ? [{ label: 'Stack', value: project.stack.join(' · ') }] : []),
  ]

  // Optional blocks drop out when the content file has nothing for them, and numbering follows.
  const blocks: CaseStudyBlock[] = [
    {
      id: 'project',
      label: 'Project',
      title: 'What the system is',
      content: <p className="text-lede text-muted">{caseStudy.context}</p>,
    },
    {
      id: 'problem',
      label: 'Problem',
      title: 'What needed solving',
      content: <p className="text-lede text-muted">{caseStudy.problem}</p>,
    },
    {
      id: 'contribution',
      label: 'Contribution',
      title: 'What I worked on',
      content: <BulletList items={caseStudy.responsibilities} />,
    },
    {
      id: 'engineering',
      label: 'Engineering',
      title: 'What shipped',
      content: (
        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {caseStudy.features.map((feature, index) => (
            <li key={feature.title} className="bg-surface p-6 sm:odd:last:col-span-2">
              <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </li>
          ))}
        </ol>
      ),
    },
    ...(caseStudy.layers && caseStudy.layers.length > 0
      ? [{ id: 'stack', label: 'Stack', title: 'How the pieces fit', content: <StackDiagram layers={caseStudy.layers} /> }]
      : []),
    ...(caseStudy.complexity && caseStudy.complexity.length > 0
      ? [{ id: 'complexity', label: 'Complexity', title: 'What made it non-trivial', content: <BulletList items={caseStudy.complexity} /> }]
      : []),
    ...(caseStudy.challenges && caseStudy.challenges.length > 0
      ? [{
          id: 'challenges',
          label: 'Challenges',
          title: 'Problems and solutions',
          content: (
            <dl className="grid gap-6">
              {caseStudy.challenges.map((item) => (
                <div key={item.challenge} className="rounded-card border border-line bg-surface p-6">
                  <dt className="font-semibold">{item.challenge}</dt>
                  <dd className="mt-2 text-muted">{item.solution}</dd>
                </div>
              ))}
            </dl>
          ),
        }]
      : []),
    ...(caseStudy.outcomes && caseStudy.outcomes.length > 0
      ? [{ id: 'outcome', label: 'Outcome', title: 'What it changed', content: <BulletList items={caseStudy.outcomes} /> }]
      : []),
    ...(caseStudy.gallery && caseStudy.gallery.length > 0
      ? [{
          id: 'gallery',
          label: 'Screens',
          title: 'Screenshots',
          content: (
            <ul className="grid gap-5 sm:grid-cols-2">
              {caseStudy.gallery.map((shot) => (
                <li key={shot.alt}>
                  <figure>
                    <Image src={shot.src} alt={shot.alt} placeholder="blur" sizes="(min-width: 1024px) 400px, 100vw" className="rounded-card border border-line" />
                    {shot.caption && <figcaption className="mt-2 text-sm text-faint">{shot.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          ),
        }]
      : []),
    ...(caseStudy.lessons && caseStudy.lessons.length > 0
      ? [{ id: 'lessons', label: 'Reflection', title: 'Lessons learned', content: <BulletList items={caseStudy.lessons} /> }]
      : []),
  ]

  return (
    <article>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Work', path: '/projects' }, { name: project.title, path: `/projects/${project.slug}` }]),
        projectSchema(project),
      ]} />

      <header className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
        <Container className="relative">
          <nav aria-label="Breadcrumb">
            <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-faint hover:text-fg">
              <IconBuilder type="arrowLeft" paint="h-3.5 w-3.5" />
              All work
            </Link>
          </nav>
          <Eyebrow className="mt-8">
            {project.kind === 'professional' ? `Case study · ${project.domain}` : 'Case study'}
          </Eyebrow>
          <h1 className="mt-4 max-w-4xl animate-rise text-display font-semibold">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-heading font-medium text-muted">{project.summary}</p>

          <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-eyebrow uppercase text-faint">{item.label}</dt>
                <dd className="mt-2 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>

          {(project.links?.live || project.links?.github) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.links?.live && (
                <ButtonLink href={project.links.live} external icon="arrowUpRight" event="project_live_click" className="w-full sm:w-auto">
                  Visit live site
                </ButtonLink>
              )}
              {project.links?.github && (
                <ButtonLink href={project.links.github} external variant="secondary" icon="github" event="project_github_click" className="w-full sm:w-auto">
                  View source
                </ButtonLink>
              )}
            </div>
          )}
        </Container>
      </header>

      <Container>
        {/* Without a screenshot the modules are already listed under Engineering, so no placeholder panel. */}
        {project.cover && (
          <ProjectCover title={project.title} cover={project.cover} preload sizes="(min-width: 1152px) 1088px, 100vw" className="shadow-lift" />
        )}

        {blocks.map((block, index) => (
          <CaseStudySection key={block.id} id={block.id} index={String(index + 1).padStart(2, '0')} label={block.label} title={block.title}>
            {block.content}
          </CaseStudySection>
        ))}

        <aside aria-label="Disclosure" className="border-t border-line py-8">
          <p className="max-w-3xl text-sm text-faint">
            <span className="font-mono text-xs uppercase">Disclosure · </span>
            {DISCLOSURE}
          </p>
        </aside>

        {next && next.slug !== project.slug && (
          <nav aria-label="Next case study" className="border-t border-line py-12 sm:py-16">
            <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8">
              <span>
                <span className="font-mono text-eyebrow uppercase text-faint">Next case study</span>
                <span className="mt-2 block text-heading font-semibold">{next.title}</span>
                <span className="mt-2 block text-sm text-muted">{next.summary}</span>
              </span>
              <IconBuilder type="arrowRight" paint="h-6 w-6 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </nav>
        )}
      </Container>
    </article>
  )
}
