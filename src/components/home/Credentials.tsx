import Image from 'next/image'
import ArrowLink from '@/src/components/ui/ArrowLink'
import Section from '@/src/components/ui/Section'
import { cardStyles } from '@/src/components/ui/card'
import { certifications, education } from '@/src/content/credentials'

const featured = certifications.filter((c) => c.featured)

export default function Credentials() {
  const [degree] = education

  return (
    <Section id="credentials" index="07" eyebrow="Education & certifications" title="The foundations.">
      <div className="grid gap-10 lg:grid-cols-12">
        {degree && (
          <div className={`reveal flex items-center gap-5 self-start p-6 lg:col-span-5 ${cardStyles}`}>
            <Image src={degree.logo} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
            <div>
              <h3 className="text-lg font-medium leading-snug">{degree.degree}</h3>
              <p className="mt-1 text-sm text-muted">{degree.institution}, {degree.city}</p>
              <p className="mt-1 text-xs text-faint tabular-nums">{degree.start} – {degree.end}</p>
            </div>
          </div>
        )}

        <div className="lg:col-span-7">
          <ul className="divide-y divide-line border-y border-line">
            {featured.map((cert) => (
              <li key={cert.id} className="flex items-center justify-between gap-4 py-4">
                <span>
                  <span className="block font-medium">{cert.title}</span>
                  {cert.issuer && <span className="mt-0.5 block text-sm text-muted">{cert.issuer}</span>}
                </span>
                {cert.topics && <span className="shrink-0 text-xs text-faint">{cert.topics[0]}</span>}
              </li>
            ))}
          </ul>
          <ArrowLink href="/certificates" tracking={{ name: 'cta_click', data: { cta: 'all-certificates', location: 'credentials' } }} className="mt-6">
            All {certifications.length} certificates
          </ArrowLink>
        </div>
      </div>
    </Section>
  )
}
