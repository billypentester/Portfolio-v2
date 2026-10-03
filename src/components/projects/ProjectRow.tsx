import type { ShowcaseProject } from '@/src/content/types'
import ArrowLink from '@/src/components/ui/ArrowLink'
import TagList from '@/src/components/ui/TagList'
import ProjectCover from './ProjectCover'

interface ProjectRowProps {
  project: ShowcaseProject
  index: number
  preload?: boolean
}

const ROLE_LABEL = (project: ShowcaseProject): string =>
  project.kind === 'professional' ? (project.employer ? `At ${project.employer}` : 'Professional work') : 'Personal project'

const STATUS_LABEL = { active: 'In progress', shipped: 'Shipped', paused: 'Paused' } as const

// Stretches the case-study link over the whole card, so the card is one large tap target.
const STRETCHED_LINK =
  'after:absolute after:inset-0 after:z-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus'

// Featured-work card: screenshot and narrative side by side, alternating on desktop.
export default function ProjectRow({ project, index, preload = false }: ProjectRowProps) {
  const reversed = index % 2 === 1
  const category = project.kind === 'professional' ? project.domain : STATUS_LABEL[project.status]
  const modules = project.caseStudy?.features.map((feature) => feature.title)

  return (
    <article className="reveal group relative grid overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift lg:grid-cols-12">
      <div className={`border-b border-line lg:col-span-7 lg:border-b-0 ${reversed ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`}>
        <ProjectCover
          title={project.title}
          cover={project.cover}
          modules={modules}
          preload={preload}
          bleed
          sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 100vw"
        />
      </div>

      <div className={`flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10 ${reversed ? 'lg:order-1' : ''}`}>
        <p className="font-mono text-eyebrow uppercase text-faint">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> · {category}
        </p>
        <h3 className="mt-3 text-heading font-semibold">{project.title}</h3>
        <p className="mt-3 text-muted">{project.summary}</p>
        <p className="mt-3 text-sm text-faint">{ROLE_LABEL(project)}</p>

        {project.kind === 'professional' && project.highlights.length > 0 && (
          <ul aria-label="What I built" className="mt-6 grid gap-2.5 border-t border-line pt-6 text-sm">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className="text-muted">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <TagList items={project.stack} label={`${project.title} technologies`} className="mt-6" />

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-8">
          {project.caseStudy && (
            <ArrowLink href={`/projects/${project.slug}`} event="project_case_study_click" className={STRETCHED_LINK}>
              Read the case study<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
          {/* Raised above the stretched link so it stays independently clickable. */}
          {project.links?.live && (
            <ArrowLink href={project.links.live} external event="project_live_click" className="relative z-10">
              Visit live site<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
          {project.links?.github && (
            <ArrowLink href={project.links.github} external event="project_github_click" className="relative z-10">
              Source<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
        </div>
      </div>
    </article>
  )
}
