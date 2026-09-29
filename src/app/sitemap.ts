import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/src/content/profile'
import { caseStudyProjects } from '@/src/content/projects'

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/projects', priority: 0.9 },
  { path: '/experience', priority: 0.8 },
  { path: '/about-me', priority: 0.8 },
  { path: '/blogs', priority: 0.6 },
  { path: '/certificates', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' as const, priority })),
    ...caseStudyProjects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
