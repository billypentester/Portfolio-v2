import Link from 'next/link'
import IconBuilder from '@/src/helpers/IconBuilder'
import Section from '@/src/components/ui/Section'
import { cardStyles } from '@/src/components/ui/card'
import { capabilities } from '@/src/content/skills'
import { trackingAttributes } from '@/src/lib/analytics'

export default function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="01"
      eyebrow="What I build"
      title="Backend and full-stack engineering, end to end."
      lede="The kind of work I take on, from the data model and API to the interface people use."
    >
      <ol className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <li key={capability.title} className={`reveal flex flex-col p-6 ${cardStyles}`}>
            <span className="text-sm font-medium text-accent tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-xl font-medium tracking-tight">{capability.title}</h3>
            <p className="mt-2 text-sm text-muted">{capability.description}</p>
          </li>
        ))}
        {/* Sixth cell completes the 2- and 3-column grids and routes to the evidence. */}
        <li>
          <Link
            href="/projects"
            className="group flex h-full min-h-48 flex-col justify-between rounded-card border border-line bg-subtle p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-lift"
            {...trackingAttributes({ name: 'cta_click', data: { cta: 'case-studies', location: 'capabilities' } })}
          >
            <span className="text-sm text-muted">See it in practice</span>
            <span className="mt-6 flex items-end justify-between gap-4">
              <span className="text-xl font-medium tracking-tight transition-colors group-hover:text-accent">Read the case studies</span>
              <IconBuilder type="arrowRight" paint="h-5 w-5 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent" />
            </span>
          </Link>
        </li>
      </ol>
    </Section>
  )
}
