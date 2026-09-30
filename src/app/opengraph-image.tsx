import { ImageResponse } from 'next/og'
import OgCard, { OG_SIZE } from '@/src/components/seo/OgCard'
import { fullName, profile } from '@/src/content/profile'

export const alt = `${fullName}, ${profile.role}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <OgCard
      eyebrow={`${profile.role} · ${profile.specialty}`}
      title={fullName}
      description="Production backend and full-stack systems: APIs, commerce flows and integrations."
      footer={`${profile.location} · NestJS · Next.js · MySQL · Redis`}
    />,
    size,
  )
}
