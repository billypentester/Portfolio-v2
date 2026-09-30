import Section from '@/src/components/ui/Section'
import TagList from '@/src/components/ui/TagList'
import ArrowLink from '@/src/components/ui/ArrowLink'
import { now } from '@/src/content/now'
import type { NowItem } from '@/src/content/types'

function NowCard({ item, headingLevel }: { item: NowItem; headingLevel: 'h3' | 'h4' }) {
  const Heading = headingLevel
  return (
    <li className="reveal flex flex-col rounded-card border border-line bg-surface p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <Heading className="text-lg font-semibold tracking-tight">{item.title}</Heading>
        {item.status && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {item.status}
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-muted">{item.description}</p>
      {item.stack && <TagList items={item.stack} label={`${item.title} technologies`} className="mt-5" />}
      {item.href && <ArrowLink href={item.href} className="mt-5">Learn more<span className="sr-only">: {item.title}</span></ArrowLink>}
    </li>
  )
}

// Hidden until src/content/now.ts has at least one entry. A list with no items is not rendered.
export default function Now() {
  const columns = [
    { title: 'Currently building', items: now.building },
    { title: 'Currently learning', items: now.learning },
  ].filter((column) => column.items.length > 0)
  if (columns.length === 0) return null

  // With one list the cards use the full width; with two, each list gets a column.
  const single = columns.length === 1

  return (
    <Section
      id="now"
      eyebrow="Currently building"
      title="Independent work, outside client projects."
      lede="Systems I design and build on my own time, end to end."
    >
      <div className={single ? '' : 'grid gap-10 md:grid-cols-2'}>
        {columns.map((column) => (
          <div key={column.title}>
            {!single && <h3 className="mb-5 font-mono text-eyebrow uppercase text-faint">{column.title}</h3>}
            <ul className={`grid gap-4 ${single ? 'md:grid-cols-2' : ''}`}>
              {column.items.map((item) => <NowCard key={item.title} item={item} headingLevel={single ? 'h3' : 'h4'} />)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
