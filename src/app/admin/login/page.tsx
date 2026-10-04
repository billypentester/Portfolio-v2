import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import LoginForm from '@/src/components/admin/LoginForm'
import Container from '@/src/components/ui/Container'
import Eyebrow from '@/src/components/ui/Eyebrow'
import { isAuthenticated } from '@/src/lib/admin/session'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage() {
  if (await isAuthenticated()) redirect('/admin')

  return (
    <section aria-labelledby="login-heading" className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <div className="mx-auto max-w-sm rounded-card border border-line bg-surface p-6 shadow-lift sm:p-8">
          <Eyebrow>Admin</Eyebrow>
          <h1 id="login-heading" className="mt-4 text-subtitle font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-muted">Private area for managing the site&apos;s settings.</p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
