import ArrowLink from '@/src/components/ui/ArrowLink'
import Section from '@/src/components/ui/Section'
import ExperienceTimeline from '@/src/components/experience/ExperienceTimeline'
import { experience } from '@/src/content/experience'

export default function ExperiencePreview() {
  if (experience.length === 0) return null

  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="From client projects to owning production backends."
      action={<ArrowLink href="/experience">Full timeline</ArrowLink>}
    >
      <ExperienceTimeline roles={experience} variant="compact" />
    </Section>
  )
}
