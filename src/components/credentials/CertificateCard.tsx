import Image from 'next/image'
import type { Certification } from '@/src/content/types'
import ArrowLink from '@/src/components/ui/ArrowLink'
import { formatYearMonth } from '@/src/utils'
import { trackingAttributes } from '@/src/lib/analytics'

interface CertificateCardProps {
  certification: Certification
  headingLevel?: 'h2' | 'h3'
}

export default function CertificateCard({ certification, headingLevel = 'h3' }: CertificateCardProps) {
  const Heading = headingLevel
  const { id, title, image, issuer, issuedAt, credentialId, verifyUrl, topics } = certification

  return (
    <article className="reveal flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
      <a
        href={image.src}
        target="_blank"
        rel="noopener"
        {...trackingAttributes({ name: 'certificate_view', data: { certificate: id } })}
        className="group relative block aspect-[4/3] overflow-hidden border-b border-line bg-subtle"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-contain p-3 transition-transform duration-500 ease-out-soft group-hover:scale-[1.02]"
        />
        <span className="sr-only">View full-size {title} certificate (opens in a new tab)</span>
      </a>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-semibold leading-snug tracking-tight">{title}</Heading>
        {(issuer || issuedAt) && (
          <p className="mt-1 text-sm text-muted">
            {issuer}
            {issuer && issuedAt && ' · '}
            {issuedAt && <time dateTime={issuedAt}>{formatYearMonth(issuedAt)}</time>}
          </p>
        )}
        {topics && topics.length > 0 && (
          <p className="mt-3 font-mono text-xs text-faint">{topics.join(' · ')}</p>
        )}
        {credentialId && <p className="mt-2 font-mono text-xs text-faint">ID {credentialId}</p>}
        {verifyUrl && (
          <ArrowLink href={verifyUrl} external tracking={{ name: 'certificate_verify', data: { certificate: id } }} className="mt-auto pt-4">
            Verify credential
          </ArrowLink>
        )}
      </div>
    </article>
  )
}
