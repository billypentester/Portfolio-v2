import type { StackLayer } from '@/src/content/types'

interface StackDiagramProps {
  layers: StackLayer[]
}

// Layers flow left to right on desktop and top to bottom on mobile.
export default function StackDiagram({ layers }: StackDiagramProps) {
  return (
    <figure className="rounded-card border border-line bg-surface p-5 sm:p-8">
      <ol className="grid gap-3 lg:auto-cols-fr lg:grid-flow-col lg:items-stretch lg:gap-0">
        {layers.map((layer, index) => (
          <li key={layer.name} className="flex flex-col items-stretch lg:flex-row lg:items-center">
            <div className="flex-1 rounded-control border border-line-strong bg-canvas p-4">
              <p className="font-mono text-eyebrow uppercase text-accent">{layer.name}</p>
              <ul className="mt-3 grid gap-1.5 text-sm font-medium">
                {layer.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            {index < layers.length - 1 && (
              <span aria-hidden="true" className="grid place-items-center py-1 font-mono text-faint lg:px-2 lg:py-0">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-xs text-faint">
        Simplified view of the technologies involved, grouped by layer. Not a full architecture diagram.
      </figcaption>
    </figure>
  )
}
