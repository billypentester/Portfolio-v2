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
    <section id={id} aria-labelledby={headingId} className={`py-8 sm:py-12 ${className}`}>
      <Container>
        <header className="reveal mb-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            <h2 id={headingId} className="mt-3 text-title font-semibold">
              {title}
            </h2>
            {lede && <p className="mt-3 max-w-2xl text-muted">{lede}</p>}
          </div>
          {action && <div className="lg:col-span-4 lg:justify-self-end">{action}</div>}
        </header>
        {children}
      </Container>
    </section>
  )
}
