import ArrowLink from '@/src/components/ui/ArrowLink'
import Section from '@/src/components/ui/Section'
import PublicationCard from '@/src/components/writing/PublicationCard'
import { featuredPublications } from '@/src/content/publications'

export default function Writing() {
  if (featuredPublications.length === 0) return null

  return (
    <Section
      id="writing"
      index="06"
      eyebrow="Writing"
      title="Notes on backend, frontend and Web3."
      action={<ArrowLink href="/blogs" tracking={{ name: 'cta_click', data: { cta: 'all-writing', location: 'writing' } }}>All writing</ArrowLink>}
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPublications.map((publication) => (
          <li key={publication.url}>
            <PublicationCard publication={publication} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
