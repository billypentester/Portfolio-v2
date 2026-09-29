import Image from 'next/image'
import type { ProjectImage } from '@/src/content/types'

interface ProjectCoverProps {
  title: string
  cover?: ProjectImage
  sizes: string
  priority?: boolean
  className?: string
}

// Falls back to a typographic panel so a missing screenshot never breaks the layout.
export default function ProjectCover({ title, cover, sizes, priority = false, className = '' }: ProjectCoverProps) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-subtle ${className}`}>
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
        />
      ) : (
        <div className="grid h-full place-items-center p-6">
          <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-80" />
          <p className="relative text-center text-heading font-semibold text-muted">{title}</p>
        </div>
      )}
    </div>
  )
}
