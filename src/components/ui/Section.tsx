import Container from './Container'
import Eyebrow from './Eyebrow'

interface SectionProps {
  id: string
  eyebrow: string
  index?: string
  title: string
  lede?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export default function Section({ id, eyebrow, index, title, lede, action, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={`border-t border-line py-20 sm:py-28 ${className}`}>
      <Container>
        <header className="reveal mb-12 grid gap-6 sm:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            <h2 id={headingId} className="mt-4 text-title font-semibold">
              {title}
            </h2>
            {lede && <p className="mt-5 max-w-2xl text-lede text-muted">{lede}</p>}
          </div>
          {action && <div className="lg:col-span-4 lg:justify-self-end">{action}</div>}
        </header>
        {children}
      </Container>
    </section>
  )
}
