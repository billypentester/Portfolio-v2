import ArrowLink from '@/src/components/ui/ArrowLink'
import Section from '@/src/components/ui/Section'
import ProjectCard from '@/src/components/projects/ProjectCard'
import { featuredProjects } from '@/src/content/projects'

export default function FeaturedWork() {
  if (featuredProjects.length === 0) return null

  return (
    <Section
      id="work"
      index="02"
      eyebrow="Selected work"
      title="Production platforms, and the parts I built."
      lede="Ordering and loyalty platforms I work on at Simplex, and Funds Grid, a product I build on my own. Each case study covers the problem, what I built and what made it hard."
      action={<ArrowLink href="/projects" tracking={{ name: 'cta_click', data: { cta: 'all-projects', location: 'work' } }}>All projects</ArrowLink>}
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          // In the two-column layout a lone last card is centred rather than left with an empty cell beside it.
          <li key={project.slug} className="sm:max-lg:odd:last:col-span-2 sm:max-lg:odd:last:mx-auto sm:max-lg:odd:last:w-[calc(50%-0.75rem)]">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
