import Link from 'next/link'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import IconBuilder from '@/src/helpers/IconBuilder'
import { snapshot } from '@/src/content/snapshot'
import { trackingAttributes } from '@/src/lib/analytics'
import { slugify } from '@/src/utils'
import { interactiveCardStyles } from '@/src/components/ui/card'

export default function Snapshot() {
  return (
    <section id="snapshot" aria-labelledby="snapshot-heading" className="py-12 sm:py-16">
      <Container>
        <Eyebrow as="h2" id="snapshot-heading" className="mb-5">Engineering snapshot</Eyebrow>
        <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {snapshot.map((metric) => (
            <li key={metric.label}>
              <Link
                href={metric.href}
                className={`group flex h-full flex-col p-5 sm:p-6 ${interactiveCardStyles}`}
                {...trackingAttributes({ name: 'cta_click', data: { cta: slugify(metric.label), location: 'snapshot' } })}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="text-metric font-semibold tabular-nums">{metric.value}</span>
                  <IconBuilder type="arrowUpRight" paint="h-4 w-4 shrink-0 text-faint transition-[color,translate] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </span>
                <span className="mt-3 border-t border-line pt-3 font-medium sm:text-lg">{metric.label}</span>
                <span className="mt-1 text-sm text-muted">{metric.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
