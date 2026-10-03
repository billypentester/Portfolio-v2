import Link from 'next/link'
import Container from '@/src/components/ui/Container'
import IconBuilder from '@/src/helpers/IconBuilder'
import { snapshot } from '@/src/content/snapshot'

export default function Snapshot() {
  return (
    <section id="snapshot" aria-labelledby="snapshot-heading" className="pb-20 sm:pb-28">
      <Container>
        <h2 id="snapshot-heading" className="sr-only">Engineering snapshot</h2>
        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line grid-cols-2 lg:grid-cols-4">
          {snapshot.map((metric) => (
            <li key={metric.label} className="bg-surface">
              <Link href={metric.href} className="group flex h-full flex-col p-4 transition-colors hover:bg-subtle sm:p-7">
                <span className="flex items-start justify-between">
                  <span className="text-metric font-semibold tabular-nums">{metric.value}</span>
                  <IconBuilder type="arrowUpRight" paint="h-4 w-4 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </span>
                <span className="mt-4 text-sm font-medium sm:text-base">{metric.label}</span>
                <span className="mt-1 text-sm text-muted">{metric.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
