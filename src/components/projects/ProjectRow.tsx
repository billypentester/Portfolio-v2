import Link from 'next/link'
import type { ShowcaseProject } from '@/src/content/types'
import ArrowLink from '@/src/components/ui/ArrowLink'
import TagList from '@/src/components/ui/TagList'
import ProjectCover from './ProjectCover'

interface ProjectRowProps {
  project: ShowcaseProject
  index: number
  priority?: boolean
}

const ROLE_LABEL = (project: ShowcaseProject): string =>
  project.kind === 'professional' ? (project.employer ? `At ${project.employer}` : 'Professional work') : 'Personal project'

// Large, alternating image + narrative composition used for featured work.
export default function ProjectRow({ project, index, priority = false }: ProjectRowProps) {
  const href = project.caseStudy ? `/projects/${project.slug}` : project.links?.live
  const reversed = index % 2 === 1
  const domain = project.kind === 'professional' ? project.domain : project.status

  return (
    <article className="reveal group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        {href && project.caseStudy ? (
          <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
            <ProjectCover title={project.title} cover={project.cover} priority={priority} sizes="(min-width: 1024px) 640px, 100vw" />
          </Link>
        ) : (
          <ProjectCover title={project.title} cover={project.cover} priority={priority} sizes="(min-width: 1024px) 640px, 100vw" />
        )}
      </div>

      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
        <p className="font-mono text-eyebrow uppercase text-faint">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> · {domain}
        </p>
        <h3 className="mt-3 text-heading font-semibold">{project.title}</h3>
        <p className="mt-3 text-muted">{project.summary}</p>
        <p className="mt-4 text-sm text-faint">{ROLE_LABEL(project)}</p>

        {project.kind === 'professional' && project.highlights.length > 0 && (
          <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 text-sm">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className="text-muted">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <TagList items={project.stack} label={`${project.title} technologies`} className="mt-6" />

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {project.caseStudy && (
            <ArrowLink href={`/projects/${project.slug}`} event="project_case_study_click">
              Read the case study<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
          {project.links?.live && (
            <ArrowLink href={project.links.live} external event="project_live_click">
              Visit live site<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
          {project.links?.github && (
            <ArrowLink href={project.links.github} external event="project_github_click">
              Source<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
        </div>
      </div>
    </article>
  )
}
