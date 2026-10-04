import { ImageResponse } from 'next/og'
import OgCard, { OG_SIZE } from '@/src/components/seo/OgCard'
import { fullName, profile } from '@/src/content/profile'
import { getActiveTheme } from '@/src/lib/admin/settings'

export const alt = `${fullName}, ${profile.role}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    <OgCard
      theme={await getActiveTheme()}
      eyebrow={`${profile.role} · ${profile.specialty}`}
      title={fullName}
      description="Modern, reliable and scalable web applications, from APIs and business logic to responsive interfaces."
      footer={`@${profile.handle}`}
    />,
    size,
  )
}
