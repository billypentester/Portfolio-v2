import type { Metadata } from 'next'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import PageHeader from '@/src/components/ui/PageHeader'
import JsonLd from '@/src/components/seo/JsonLd'
import PublicationCard from '@/src/components/writing/PublicationCard'
import { publications } from '@/src/content/publications'
import type { PublicationCategory } from '@/src/content/types'
import { buildMetadata, externalArticleNode, pageSchema } from '@/src/lib/seo'
import { trackingAttributes } from '@/src/lib/analytics'
import { slugify } from '@/src/utils'

const PAGE = {
  title: 'Writing',
  description: 'Articles by Bilal Ahmad on backend and frontend development and security.',
  path: '/blogs',
}

export const metadata: Metadata = buildMetadata(PAGE)

const PUBLISHERS = [...new Set(publications.map((p) => p.publisher))]

const CATEGORY_ORDER: PublicationCategory[] = ['Engineering', 'Career', 'Web3', 'Security', 'Machine Learning']

export default function BlogsPage() {
  const groups = CATEGORY_ORDER
    .map((category) => ({ category, items: publications.filter((p) => p.category === category) }))
    .filter((group) => group.items.length > 0)

  return (
    <>
      <JsonLd data={pageSchema({
        path: PAGE.path,
        name: PAGE.title,
        description: PAGE.description,
        type: 'CollectionPage',
        breadcrumbs: [{ name: PAGE.title, path: PAGE.path }],
        hasPart: publications.map(externalArticleNode),
      })} />
      <PageHeader
        eyebrow="Writing"
        title="Articles and notes."
        lede={`Guides and write-ups on backend, frontend and security, published on ${PUBLISHERS.join(', ')}.`}
      >
        <nav aria-label="Topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <li key={group.category}>
                <a
                  href={`#${slugify(group.category)}`}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-canvas px-4 text-sm text-muted transition-colors hover:border-brand hover:text-accent"
                  {...trackingAttributes({ name: 'blog_topic_filter', data: { category: group.category } })}
                >
                  {group.category}
                  <span className="text-xs text-faint tabular-nums">{group.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {groups.length === 0 ? (
        <Container className="py-12 text-muted">No articles yet.</Container>
      ) : (
        groups.map((group) => {
          const id = slugify(group.category)
          return (
            <section key={group.category} id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20 py-8 sm:py-12">
              <Container>
                <Eyebrow as="h2" id={`${id}-heading`}>{group.category}</Eyebrow>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
