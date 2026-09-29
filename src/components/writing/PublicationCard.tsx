import Image from 'next/image'
import type { Publication } from '@/src/content/types'
import IconBuilder from '@/src/helpers/IconBuilder'

interface PublicationCardProps {
  publication: Publication
  headingLevel?: 'h2' | 'h3'
}

const eventName = (title: string) => `blog_click_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`

export default function PublicationCard({ publication, headingLevel = 'h3' }: PublicationCardProps) {
  const Heading = headingLevel
  return (
    <article className="reveal group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-subtle">
        <Image
          src={publication.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs text-faint">
          <span className="text-accent">{publication.category}</span> · {publication.publisher}
          {publication.publishedAt && <> · <time dateTime={publication.publishedAt}>{publication.publishedAt}</time></>}
        </p>
        <Heading className="mt-3 text-lg font-semibold leading-snug tracking-tight">
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event={eventName(publication.title)}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-accent"
          >
            {publication.title}
            <span className="sr-only"> (opens on {publication.publisher})</span>
          </a>
        </Heading>
        <p className="mt-2 flex-1 text-sm text-muted">{publication.description}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
          Read on {publication.publisher}
          <IconBuilder type="arrowUpRight" paint="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  )
}
