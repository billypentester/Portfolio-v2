import Section from '@/src/components/ui/Section'
import TagList from '@/src/components/ui/TagList'
import ArrowLink from '@/src/components/ui/ArrowLink'
import { now } from '@/src/content/now'
import type { NowItem } from '@/src/content/types'

function NowColumn({ title, items }: { title: string; items: NowItem[] }) {
  if (items.length === 0) return null
  return (
    <div>
      <h3 className="font-mono text-eyebrow uppercase text-faint">{title}</h3>
      <ul className="mt-5 grid gap-4">
        {items.map((item) => (
          <li key={item.title} className="reveal rounded-card border border-line bg-surface p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold">{item.title}</p>
              {item.status && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-faint">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item.status}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
            {item.stack && <TagList items={item.stack} label={`${item.title} technologies`} className="mt-4" />}
            {item.href && <ArrowLink href={item.href} className="mt-4">Learn more</ArrowLink>}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Hidden until src/content/now.ts has at least one entry.
export default function Now() {
  if (now.building.length === 0 && now.learning.length === 0) return null

  return (
    <Section id="now" eyebrow="Now" title="What I am building and learning.">
      <div className="grid gap-10 md:grid-cols-2">
        <NowColumn title="Currently building" items={now.building} />
        <NowColumn title="Currently learning" items={now.learning} />
      </div>
    </Section>
  )
}
