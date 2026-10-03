import ArrowLink from '@/src/components/ui/ArrowLink'
import Section from '@/src/components/ui/Section'
import { workflow } from '@/src/content/skills'

export default function Approach() {
  return (
    <Section
      id="approach"
      index="04"
      eyebrow="How I build"
      title="From requirements to production, and back again."
      action={<ArrowLink href="/about-me#approach">Engineering principles</ArrowLink>}
    >
      <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {workflow.map((step, index) => (
          <li key={step.title} className="reveal flex flex-col bg-surface p-6 sm:last:col-span-2 lg:last:col-span-1">
            <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
