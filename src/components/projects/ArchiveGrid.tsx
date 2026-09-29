import Image from 'next/image'
import type { ArchivedProject } from '@/src/content/types'

export default function ArchiveGrid({ projects }: { projects: ArchivedProject[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
      {projects.map((project) => (
        <li key={project.slug} className="reveal">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-control border border-line bg-subtle">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(min-width: 1024px) 270px, (min-width: 480px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover object-top opacity-90 grayscale-[35%] transition duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-3 text-sm font-medium">{project.title}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
