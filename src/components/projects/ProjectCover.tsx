import Image from 'next/image'
import type { ProjectImage } from '@/src/content/types'

interface ProjectCoverProps {
  title: string
  cover?: ProjectImage
  sizes: string
  // Module names shown on the fallback panel when there is no screenshot.
  modules?: string[]
  preload?: boolean
  // Bleeds to the edges of a parent card instead of drawing its own frame: "side" fills a card
  // column and stretches to its height on desktop, "top" spans the top of a card at 16:10.
  bleed?: 'side' | 'top'
  className?: string
}

const FRAME = {
  framed: 'aspect-[16/10] rounded-card border border-line',
  side: 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-80',
  top: 'aspect-[16/10]',
} as const

// Falls back to a typographic "module sheet" so a missing screenshot never breaks the layout.
export default function ProjectCover({ title, cover, sizes, modules = [], preload = false, bleed, className = '' }: ProjectCoverProps) {
  return (
    <div className={`relative overflow-hidden bg-subtle ${FRAME[bleed ?? 'framed']} ${className}`}>
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
        />
      ) : (
        <div aria-hidden="true" className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
          <div className="grid-texture absolute inset-0 opacity-80" />
          <p className="relative text-sm font-medium text-accent">{title}</p>
          {modules.length > 0 ? (
            <ul className="relative grid max-w-sm gap-2">
              {modules.map((name) => (
                <li key={name} className="flex w-fit items-center gap-3 rounded-full border border-line bg-canvas px-4 py-2 text-sm font-medium text-fg transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-fg bg-brand" />
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="relative text-heading font-semibold text-muted">{title}</p>
          )}
        </div>
      )}
    </div>
  )
}
