import type { ShowcaseProject } from '@/src/content/types'
import ArrowLink from '@/src/components/ui/ArrowLink'
import TagList from '@/src/components/ui/TagList'
import { interactiveCardStyles } from '@/src/components/ui/card'
import ProjectCover from './ProjectCover'
import { projectCategory, projectRole, STRETCHED_LINK } from './labels'

interface ProjectCardProps {
  project: ShowcaseProject
}

// Compact project card for the home page grid: the full screenshot, what it is, and where to go next.
// The detailed breakdown lives on the case study and in ProjectRow on /projects.
export default function ProjectCard({ project }: ProjectCardProps) {
  const modules = project.caseStudy?.features.map((feature) => feature.title)

  return (
    <article className={`reveal group relative flex h-full flex-col overflow-hidden ${interactiveCardStyles}`}>
      <div className="border-b border-line">
        <ProjectCover
          title={project.title}
          cover={project.cover}
          modules={modules}
          bleed="top"
          sizes="(min-width: 1152px) 360px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium text-accent">{projectCategory(project)}</p>
        <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>
        <p className="mt-3 text-sm font-medium text-fg">{projectRole(project)}</p>

        <TagList items={project.stack} label={`${project.title} technologies`} className="mt-5" />

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
          {project.caseStudy && (
            <ArrowLink href={`/projects/${project.slug}`} tracking={{ name: 'project_click', data: { project: project.slug, action: 'case-study', location: 'project-card' } }} className={STRETCHED_LINK}>
              Read the case study<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
          {/* Raised above the stretched link so it stays independently clickable. */}
          {project.links?.live && (
            <ArrowLink href={project.links.live} external tracking={{ name: 'project_click', data: { project: project.slug, action: 'live', location: 'project-card' } }} className="relative z-10">
              Live site<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
          {project.links?.github && (
            <ArrowLink href={project.links.github} external tracking={{ name: 'project_click', data: { project: project.slug, action: 'github', location: 'project-card' } }} className="relative z-10">
              Source<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          )}
        </div>
      </div>
    </article>
  )
}
