import type { Metadata } from 'next'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import PageHeader from '@/src/components/ui/PageHeader'
import JsonLd from '@/src/components/seo/JsonLd'
import PublicationCard from '@/src/components/writing/PublicationCard'
import { publications } from '@/src/content/publications'
import type { PublicationCategory } from '@/src/content/types'
import { breadcrumbSchema, buildMetadata } from '@/src/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Writing',
  description: 'Articles by Bilal Ahmad on backend and frontend development, Web3, security and machine learning.',
  path: '/blogs',
})

const PUBLISHERS = [...new Set(publications.map((p) => p.publisher))]

const CATEGORY_ORDER: PublicationCategory[] = ['Engineering', 'Career', 'Web3', 'Security', 'Machine Learning']

export default function BlogsPage() {
  const groups = CATEGORY_ORDER
    .map((category) => ({ category, items: publications.filter((p) => p.category === category) }))
    .filter((group) => group.items.length > 0)

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Writing', path: '/blogs' }])} />
      <PageHeader
        eyebrow="Writing"
        title="Articles and notes."
        lede={`Guides and write-ups on development, Web3, security and machine learning, published on ${PUBLISHERS.join(', ')}.`}
      >
        <nav aria-label="Topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <li key={group.category}>
                <a href={`#${group.category.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex h-9 items-center gap-2 rounded-control border border-line bg-surface px-3 text-sm text-muted hover:border-fg hover:text-fg">
                  {group.category}
                  <span className="font-mono text-xs text-faint">{group.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {groups.length === 0 ? (
        <Container className="border-t border-line py-16 text-muted">No articles yet.</Container>
      ) : (
        groups.map((group) => {
          const id = group.category.toLowerCase().replace(/\s+/g, '-')
          return (
            <section key={group.category} id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20 border-t border-line py-14 sm:py-20">
              <Container>
                <Eyebrow>{group.category}</Eyebrow>
                <h2 id={`${id}-heading`} className="sr-only">{group.category}</h2>
                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((publication) => (
                    <li key={publication.url}>
                      <PublicationCard publication={publication} />
                    </li>
                  ))}
                </ul>
              </Container>
            </section>
          )
        })
      )}
    </>
  )
}
