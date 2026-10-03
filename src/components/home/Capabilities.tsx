import Link from 'next/link'
import IconBuilder from '@/src/helpers/IconBuilder'
import Section from '@/src/components/ui/Section'
import { capabilities } from '@/src/content/skills'

export default function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="01"
      eyebrow="What I build"
      title="Backend and full-stack engineering, end to end."
      lede="The kind of work I take on, from the data model and API to the interface people use."
    >
      <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <li key={capability.title} className="reveal flex flex-col bg-surface p-6 sm:p-8">
            <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">{capability.title}</h3>
            <p className="mt-2 text-muted">{capability.description}</p>
          </li>
        ))}
        {/* Sixth cell completes the 2- and 3-column grids and routes to the evidence. */}
        <li className="bg-subtle">
          <Link href="/projects" className="group flex h-full min-h-48 flex-col justify-between p-6 transition-colors hover:bg-accent-soft sm:p-8">
            <span className="font-mono text-xs text-muted">See it in practice</span>
            <span className="mt-6 flex items-end justify-between gap-4">
              <span className="text-lg font-semibold tracking-tight">Read the case studies</span>
              <IconBuilder type="arrowRight" paint="h-5 w-5 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent" />
            </span>
          </Link>
        </li>
      </ol>
    </Section>
  )
}
