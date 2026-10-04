import { ImageResponse } from 'next/og'
import OgCard, { OG_SIZE } from '@/src/components/seo/OgCard'
import { fullName } from '@/src/content/profile'
import { caseStudyProjects, getProject } from '@/src/content/projects'
import { getActiveTheme } from '@/src/lib/admin/settings'

export const alt = 'Case study'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }))
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  const eyebrow = project?.kind === 'professional' ? `Case study · ${project.domain}` : 'Case study'

  return new ImageResponse(
    <OgCard
      theme={await getActiveTheme()}
      eyebrow={eyebrow}
      title={project?.title ?? 'Case study'}
      description={project?.summary ?? ''}
      footer={fullName}
    />,
    size,
  )
}
