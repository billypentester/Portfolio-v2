'use client'

import { useActionState } from 'react'
import IconBuilder from '@/src/helpers/IconBuilder'
import { login, type LoginState } from '@/src/lib/admin/actions'
import { buttonStyles } from '@/src/components/ui/button'
import { inputStyles } from '@/src/components/ui/input'
import StatusMessage from '@/src/components/ui/StatusMessage'

const INITIAL_STATE: LoginState = { status: 'idle' }

// Credentials go straight to the login Server Action; nothing about the session lives in the browser
// beyond the HTTP-only cookie it sets.
export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, INITIAL_STATE)

  return (
    <form action={formAction} className="grid gap-5" aria-describedby="login-status">
      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false}
          required aria-invalid={state.status === 'error'} className={inputStyles} />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password"
          required aria-invalid={state.status === 'error'} className={inputStyles} />
      </div>

      <div id="login-status" role="status" aria-live="polite" className="min-h-6 text-sm">
        {state.status === 'error' && <StatusMessage tone="danger">{state.message}</StatusMessage>}
      </div>

      <button type="submit" disabled={pending} className={buttonStyles('primary', 'md', 'w-full')}>
        {pending ? (
          <>
            <IconBuilder type="spinner" paint="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  )
}
