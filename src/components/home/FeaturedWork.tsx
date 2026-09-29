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
      title="Production platforms I have helped build."
      lede="Ordering, loyalty and healthcare platforms I have worked on as an engineer at Simplex. Only publicly visible details are shared."
      action={<ArrowLink href="/projects">All projects</ArrowLink>}
    >
      <div className="grid gap-20 sm:gap-28">
        {featuredProjects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
