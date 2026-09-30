import Image from 'next/image'
import type { ProjectImage } from '@/src/content/types'

interface ProjectCoverProps {
  title: string
  cover?: ProjectImage
  sizes: string
  // Module names shown on the fallback panel when there is no screenshot.
  modules?: string[]
  preload?: boolean
  // Bleeds to the edges of a parent card instead of drawing its own frame.
  bleed?: boolean
  className?: string
}

// Falls back to a typographic "module sheet" so a missing screenshot never breaks the layout.
export default function ProjectCover({ title, cover, sizes, modules = [], preload = false, bleed = false, className = '' }: ProjectCoverProps) {
  const frame = bleed ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-80' : 'aspect-[16/10] rounded-card border border-line'
  return (
    <div className={`relative overflow-hidden bg-subtle ${frame} ${className}`}>
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
          <p className="relative font-mono text-eyebrow uppercase text-faint">{title}</p>
          {modules.length > 0 ? (
            <ul className="relative grid max-w-sm gap-2">
              {modules.map((name) => (
                <li key={name} className="flex items-center gap-3 rounded-control border border-line-strong bg-canvas px-4 py-3 font-mono text-sm text-fg transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
