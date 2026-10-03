import Container from './Container'
import Eyebrow from './Eyebrow'

interface PageHeaderProps {
  eyebrow: string
  title: string
  lede?: string
  children?: React.ReactNode
}

export default function PageHeader({ eyebrow, title, lede, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-page-title font-semibold">{title}</h1>
        {lede && <p className="mt-6 max-w-2xl text-lede text-muted">{lede}</p>}
        {children}
      </Container>
    </header>
  )
}
