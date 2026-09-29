import Container from '@/src/components/ui/Container'

// Skeleton that mirrors the page header, so navigation never shows a blank screen.
export default function Loading() {
  return (
    <Container className="pt-32 pb-24 sm:pt-40" >
      <div role="status" aria-live="polite" className="grid gap-5">
        <span className="sr-only">Loading…</span>
        <div className="h-3 w-24 animate-pulse rounded bg-subtle" />
        <div className="h-12 w-full max-w-2xl animate-pulse rounded-control bg-subtle" />
        <div className="h-5 w-full max-w-xl animate-pulse rounded bg-subtle" />
        <div className="mt-8 aspect-[16/7] w-full animate-pulse rounded-card bg-subtle" />
      </div>
    </Container>
  )
}
