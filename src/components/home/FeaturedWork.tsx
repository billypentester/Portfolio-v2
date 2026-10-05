import ArrowLink from '@/src/components/ui/ArrowLink'
import Section from '@/src/components/ui/Section'
import ProjectRow from '@/src/components/projects/ProjectRow'
import { featuredProjects } from '@/src/content/projects'

export default function FeaturedWork() {
  if (featuredProjects.length === 0) return null

  return (
    <Section
      id="work"
      index="02"
      eyebrow="Selected work"
      title="Production platforms, and the parts I built."
      lede="Ordering, loyalty and healthcare platforms I work on at Simplex. Each case study covers the problem, my contribution and what made it hard. Only publicly shareable details are included."
      action={<ArrowLink href="/projects" tracking={{ name: 'cta_click', data: { cta: 'all-projects', location: 'work' } }}>All projects</ArrowLink>}
    >
      <div className="grid gap-6 sm:gap-8">
        {featuredProjects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
