import Section from '@/src/components/ui/Section'
import { principles, workflow } from '@/src/content/skills'

export default function Approach() {
  return (
    <Section
      id="approach"
      index="04"
      eyebrow="How I work"
      title="Explicit rules, simple systems, no surprises in production."
    >
      <div className="grid gap-16 lg:grid-cols-12">
        <ol className="grid gap-px self-start overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {principles.map((principle) => (
            <li key={principle.title} className="reveal flex flex-col bg-surface p-6 sm:p-7">
              <h3 className="font-semibold tracking-tight">{principle.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{principle.description}</p>
              {principle.evidence && <p className="mt-5 border-l-2 border-accent pl-3 text-xs text-faint">{principle.evidence}</p>}
            </li>
          ))}
        </ol>

        <div className="lg:col-span-5">
          <h3 className="font-mono text-eyebrow uppercase text-faint">Delivery loop</h3>
          <ol className="relative mt-6 grid gap-0">
            {workflow.map((step, index) => (
              <li key={step.title} className="reveal relative grid grid-cols-[2.5rem_1fr] gap-4 pb-7 last:pb-0">
                {index < workflow.length - 1 && (
                  <span aria-hidden="true" className="absolute top-10 bottom-0 left-5 w-px -translate-x-1/2 bg-line" />
                )}
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-canvas font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="pt-2">
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
