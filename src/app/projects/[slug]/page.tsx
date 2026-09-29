import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import IconBuilder from '@/src/helpers/IconBuilder'
import ButtonLink from '@/src/components/ui/ButtonLink'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import TagList from '@/src/components/ui/TagList'
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
    ...(project.cover
      ? { image: { url: project.cover.src.src, width: project.cover.src.width, height: project.cover.src.height, alt: project.cover.alt } }
      : {}),
  })
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
    ...(project.kind === 'professional' ? [{ label: 'Domain', value: project.domain }] : []),
    ...(project.kind === 'professional' && project.employer ? [{ label: 'Company', value: project.employer }] : []),
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
          <Eyebrow className="mt-8">Case study</Eyebrow>
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
        </Container>
      </header>

      <Container>
        {project.cover && (
          <ProjectCover title={project.title} cover={project.cover} priority sizes="(min-width: 1152px) 1088px, 100vw" className="shadow-lift" />
        )}

        <CaseStudySection id="overview" label="Overview" title="Context">
          <p className="text-lede text-muted">{caseStudy.context}</p>
          <TagList items={project.stack} label="Technologies" className="mt-8" />
        </CaseStudySection>

        <CaseStudySection id="role" label="My role" title="What I was responsible for">
          <BulletList items={caseStudy.responsibilities} />
        </CaseStudySection>

        <CaseStudySection id="features" label="Key features" title="What shipped">
          <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {caseStudy.features.map((feature, index) => (
              <li key={feature.title} className="bg-surface p-6 sm:odd:last:col-span-2">
                <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </li>
            ))}
          </ol>
        </CaseStudySection>

        {caseStudy.layers && caseStudy.layers.length > 0 && (
          <CaseStudySection id="stack" label="Stack" title="How the pieces fit">
            <StackDiagram layers={caseStudy.layers} />
          </CaseStudySection>
        )}

        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <CaseStudySection id="challenges" label="Challenges" title="Problems and solutions">
            <dl className="grid gap-6">
              {caseStudy.challenges.map((item) => (
                <div key={item.challenge} className="rounded-card border border-line bg-surface p-6">
                  <dt className="font-semibold">{item.challenge}</dt>
                  <dd className="mt-2 text-muted">{item.solution}</dd>
                </div>
              ))}
            </dl>
          </CaseStudySection>
        )}

        {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
          <CaseStudySection id="outcomes" label="Results" title="Outcomes">
            <BulletList items={caseStudy.outcomes} />
          </CaseStudySection>
        )}

        {caseStudy.gallery && caseStudy.gallery.length > 0 && (
          <CaseStudySection id="gallery" label="Screens" title="Screenshots">
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
          </CaseStudySection>
        )}

        {caseStudy.lessons && caseStudy.lessons.length > 0 && (
          <CaseStudySection id="lessons" label="Reflection" title="Lessons learned">
            <BulletList items={caseStudy.lessons} />
          </CaseStudySection>
        )}

        {next && next.slug !== project.slug && (
          <nav aria-label="Next case study" className="border-t border-line py-12 sm:py-16">
            <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8">
              <span>
                <span className="font-mono text-eyebrow uppercase text-faint">Next case study</span>
                <span className="mt-2 block text-heading font-semibold">{next.title}</span>
              </span>
              <IconBuilder type="arrowRight" paint="h-6 w-6 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </nav>
        )}
      </Container>
    </article>
  )
}
