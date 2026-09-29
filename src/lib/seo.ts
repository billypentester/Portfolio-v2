import type { Metadata } from 'next'
import { SITE_URL, fullName, profile, socialLinks } from '@/src/content/profile'
import { experience } from '@/src/content/experience'
import { skillGroups } from '@/src/content/skills'

export const SITE_TITLE = `${fullName} — Software Engineer`
export const SITE_DESCRIPTION = `${fullName} is a full-stack software engineer in ${profile.location} building backend systems for production commerce: loyalty engines, ordering flows, digital wallets and integrations with NestJS, Next.js, MySQL and Redis.`
const OG_IMAGE = { url: '/portfolio.webp', width: 1584, height: 1188, alt: SITE_TITLE }

interface PageMetadataInput {
  title?: string
  description: string
  path: string
  image?: { url: string; width?: number; height?: number; alt: string }
  type?: 'website' | 'article' | 'profile'
}

// Every page gets its own canonical URL and matching Open Graph/Twitter data.
export const buildMetadata = ({ title, description, path, image = OG_IMAGE, type = 'website' }: PageMetadataInput): Metadata => {
  const socialTitle = title ? `${title} — ${fullName}` : SITE_TITLE
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: fullName,
      title: socialTitle,
      description,
      images: [image],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image.url],
      creator: `@${profile.handle}`,
    },
  }
}

type JsonLdObject = { '@context'?: 'https://schema.org'; '@type': string; [key: string]: unknown }

const currentRole = experience.find((role) => role.end === null)

export const personSchema = (): JsonLdObject => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: fullName,
  alternateName: profile.handle,
  url: SITE_URL,
  image: `${SITE_URL}${profile.photo.src}`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
  ...(currentRole ? { worksFor: { '@type': 'Organization', name: currentRole.company, url: currentRole.url } } : {}),
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'COMSATS University Islamabad' },
  knowsAbout: skillGroups.flatMap((group) => group.skills),
  sameAs: [
    ...socialLinks.filter((l) => l.platform === 'github' || l.platform === 'linkedin').map((l) => l.url),
    'https://billypentester.medium.com',
    'https://twitter.com/billypentester',
    'https://www.facebook.com/billypentester',
    'https://www.instagram.com/billypentester',
    'https://www.fiverr.com/billypentester',
  ],
})

export const websiteSchema = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: fullName,
  url: SITE_URL,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` },
})

export const profilePageSchema = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE_URL}/about-me`,
  mainEntity: personSchema(),
})

export const homeSchema = (): JsonLdObject[] => [
  websiteSchema(),
  { '@context': 'https://schema.org', ...personSchema() },
]

export const breadcrumbSchema = (trail: { name: string; path: string }[]): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
  })),
})

export const projectSchema = (project: { title: string; summary: string; slug: string; stack: string[] }): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.summary,
  url: `${SITE_URL}/projects/${project.slug}`,
  keywords: project.stack.join(', '),
  creator: { '@id': `${SITE_URL}/#person` },
})
