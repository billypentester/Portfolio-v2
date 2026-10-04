import Image from 'next/image'
import type { Experience, ShowcaseProject } from '@/src/content/types'
import TagList from '@/src/components/ui/TagList'
import ArrowLink from '@/src/components/ui/ArrowLink'
import { getProject } from '@/src/content/projects'
import { formatDuration, formatYearMonth, getInitials, monthsBetween } from '@/src/utils'

interface ExperienceTimelineProps {
  roles: Experience[]
  variant: 'compact' | 'full'
  headingLevel?: 'h3' | 'h2'
}

const COMPACT_HIGHLIGHTS = 2

export default function ExperienceTimeline({ roles, variant, headingLevel = 'h3' }: ExperienceTimelineProps) {
  const Heading = headingLevel

  return (
    <ol className="relative grid gap-12 border-l border-line pl-6 sm:pl-10">
      {roles.map((role) => {
        const isCurrent = role.end === null
        const highlights = variant === 'compact' ? role.highlights.slice(0, COMPACT_HIGHLIGHTS) : role.highlights
        const hiddenCount = role.highlights.length - highlights.length
        const caseStudies = (role.projects ?? []).map(getProject).filter((project): project is ShowcaseProject => project?.caseStudy !== undefined)

        return (
          <li key={role.id} id={role.id} className="reveal relative scroll-mt-24">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[calc(1.5rem+5px)] h-2.5 w-2.5 rounded-full border-2 border-canvas sm:-left-[calc(2.5rem+5px)] ${isCurrent ? 'bg-accent' : 'bg-line-strong'}`}
            />
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-faint">
                  <time dateTime={role.start}>{formatYearMonth(role.start)}</time>
                  {' — '}
                  {role.end ? <time dateTime={role.end}>{formatYearMonth(role.end)}</time> : <span className="text-accent">Present</span>}
                </p>
                <p className="mt-1 font-mono text-xs text-faint">{formatDuration(monthsBetween(role.start, role.end))} · {role.location}</p>
                <div className="mt-4 flex items-center gap-3">
                  {role.logo ? (
                    <Image src={role.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-md border border-line bg-surface object-contain" />
                  ) : (
                    <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface font-mono text-xs font-semibold text-muted">
                      {getInitials(role.company)}
                    </span>
                  )}
                  <div>
                    <Heading className="font-semibold leading-tight">{role.role}</Heading>
                    {role.url ? (
                      <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
                        {role.company}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <p className="text-sm text-muted">{role.company}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <p className="text-fg">{role.summary}</p>
                {variant === 'full' && role.ownership && (
                  <p className="mt-4 rounded-control border border-line bg-subtle px-4 py-3 text-sm text-muted">
                    <span className="font-mono text-xs uppercase text-faint">Ownership · </span>
                    {role.ownership}
                  </p>
                )}
                <ul className="mt-5 grid gap-3 text-sm text-muted">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {hiddenCount > 0 && (
                  <p className="mt-3 font-mono text-xs text-faint">+{hiddenCount} more on the experience page</p>
                )}
                <TagList items={role.stack} label={`${role.company} technologies`} className="mt-5" />
                {caseStudies.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-line pt-5">
                    <span className="font-mono text-eyebrow uppercase text-faint">Case studies</span>
                    {caseStudies.map((project) => (
                      <ArrowLink key={project.slug} href={`/projects/${project.slug}`} event="project_case_study_click">
                        {project.title}
                      </ArrowLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
