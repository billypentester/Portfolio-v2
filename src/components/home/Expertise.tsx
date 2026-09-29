import Section from '@/src/components/ui/Section'
import TagList from '@/src/components/ui/TagList'
import { skillGroups } from '@/src/content/skills'

export default function Expertise() {
  return (
    <Section
      id="expertise"
      index="05"
      eyebrow="Technical expertise"
      title="Tools I reach for, and where I have used them."
    >
      <dl className="divide-y divide-line border-y border-line">
        {skillGroups.map((group) => (
          <div key={group.title} className="reveal grid gap-4 py-6 sm:grid-cols-12 sm:gap-8">
            <dt className="sm:col-span-3">
              <span className="font-semibold">{group.title}</span>
            </dt>
            <dd className="sm:col-span-9">
              <TagList items={group.skills} label={`${group.title} skills`} />
              {group.appliedIn && <p className="mt-3 text-sm text-muted">{group.appliedIn}</p>}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
