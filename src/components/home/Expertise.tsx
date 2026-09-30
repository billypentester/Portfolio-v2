import Section from '@/src/components/ui/Section'
import Tag from '@/src/components/ui/Tag'
import TagList from '@/src/components/ui/TagList'
import { skillGroups } from '@/src/content/skills'

export default function Expertise() {
  return (
    <Section
      id="expertise"
      index="05"
      eyebrow="Technical expertise"
      title="Tools I reach for, and where I have used them."
      lede="Grouped by the work they do. Highlighted tools are the ones I use in production every day; the rest I have shipped with on projects or in earlier roles."
    >
      <p className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2"><Tag tone="accent">Primary</Tag> Daily, in production</span>
        <span className="inline-flex items-center gap-2"><Tag>Additional</Tag> Worked with</span>
      </p>
      <dl className="divide-y divide-line border-y border-line">
        {skillGroups.map((group) => (
          <div key={group.title} className="reveal grid gap-4 py-6 sm:grid-cols-12 sm:gap-8">
            <dt className="sm:col-span-3">
              <span className="font-semibold">{group.title}</span>
            </dt>
            <dd className="sm:col-span-9">
              <div className="flex flex-wrap gap-1.5">
                <TagList items={group.primary} tone="accent" label={`${group.title}: primary`} />
                <TagList items={group.additional} label={`${group.title}: additional`} />
              </div>
              {group.appliedIn && <p className="mt-3 text-sm text-muted">{group.appliedIn}</p>}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
