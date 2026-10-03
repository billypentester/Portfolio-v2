import type { Metadata } from 'next'
import Container from '@/src/components/ui/Container'
import PageHeader from '@/src/components/ui/PageHeader'
import JsonLd from '@/src/components/seo/JsonLd'
import CertificateCard from '@/src/components/credentials/CertificateCard'
import { certifications } from '@/src/content/credentials'
import { buildMetadata, pageSchema } from '@/src/lib/seo'

const PAGE = {
  title: 'Certificates',
  description: 'Certifications earned by Bilal Ahmad in network security, penetration testing, cloud development, API design and SQL.',
  path: '/certificates',
}

export const metadata: Metadata = buildMetadata(PAGE)

const ordered = [...certifications].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))

export default function CertificatesPage() {
  return (
    <>
      <JsonLd data={pageSchema({
        path: PAGE.path,
        name: PAGE.title,
        description: PAGE.description,
        type: 'CollectionPage',
        breadcrumbs: [{ name: PAGE.title, path: PAGE.path }],
      })} />
      <PageHeader
        eyebrow="Certificates"
        title="Certifications and recognition."
        lede="Security, cloud and engineering credentials. Select a certificate to view it full size."
      />
      <section aria-label="Certificates" className="border-t border-line py-14 sm:py-20">
        <Container>
          {ordered.length === 0 ? (
            <p className="text-muted">No certificates yet.</p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ordered.map((certification) => (
                <li key={certification.id}>
                  <CertificateCard certification={certification} headingLevel="h2" />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  )
}
