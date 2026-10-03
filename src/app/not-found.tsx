import type { Metadata } from 'next'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import ButtonLink from '@/src/components/ui/ButtonLink'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <Eyebrow>Error 404</Eyebrow>
        <h1 id="not-found-heading" className="mt-5 text-title font-semibold">This page doesn&apos;t exist.</h1>
        <p className="mt-5 max-w-xl text-lede text-muted">
          The link may be old or mistyped. The work, experience and writing are all a click away.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" icon="arrowRight" className="w-full sm:w-auto">Back to home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary" className="w-full sm:w-auto">View work</ButtonLink>
        </div>
      </Container>
    </section>
  )
}
