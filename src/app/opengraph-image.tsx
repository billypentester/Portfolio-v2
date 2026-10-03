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
      description="Modern, reliable and scalable web applications, from APIs and business logic to responsive interfaces."
      footer={`@${profile.handle}`}
    />,
    size,
  )
}
