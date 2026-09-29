'use client'

import { startTransition, useActionState, useEffect, useRef } from 'react'
import IconBuilder from '@/src/helpers/IconBuilder'
import { sendContactData, type ContactFormState } from '@/src/helpers/action'
import { CONTACT_LIMITS, type ContactField } from '@/src/helpers/validator'
import { buttonStyles } from '@/src/components/ui/button'
import { track } from '@/src/lib/analytics'

const INITIAL_STATE: ContactFormState = { status: 'idle' }

const inputClass =
  'block w-full rounded-control border border-line-strong bg-canvas px-3.5 py-3 text-base text-fg placeholder:text-faint transition-colors hover:border-muted focus:border-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[invalid=true]:border-danger'

interface FieldProps {
  id: ContactField
  label: string
  error?: string
  children: (describedBy: string | undefined) => React.ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      {children(error ? errorId : undefined)}
      {error && <p id={errorId} className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  )
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactData, INITIAL_STATE)
  const formRef = useRef<HTMLFormElement>(null)
  const fieldErrors = state.status === 'invalid' ? state.fieldErrors : {}

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
    if (state.status === 'invalid' || state.status === 'error') track('contact_form_error', { reason: state.status })
  }, [state])

  // With JavaScript we submit in a transition so a failed attempt keeps what the visitor typed.
  // Without JavaScript the form still posts to the server action through `action`.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    track('contact_form_submit')
    startTransition(() => formAction(formData))
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="grid gap-5" aria-describedby="contact-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={fieldErrors.name}>
          {(describedBy) => (
            <input id="name" name="name" type="text" autoComplete="name" required maxLength={CONTACT_LIMITS.name}
              aria-invalid={Boolean(fieldErrors.name)} aria-describedby={describedBy} className={inputClass} />
          )}
        </Field>
        <Field id="email" label="Email" error={fieldErrors.email}>
          {(describedBy) => (
            <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={CONTACT_LIMITS.email}
              aria-invalid={Boolean(fieldErrors.email)} aria-describedby={describedBy} className={inputClass} />
          )}
        </Field>
      </div>

      <Field id="message" label="What are you working on?" error={fieldErrors.message}>
        {(describedBy) => (
          <textarea id="message" name="message" rows={5} required maxLength={CONTACT_LIMITS.message}
            placeholder="A few lines about the project, role or problem."
            aria-invalid={Boolean(fieldErrors.message)} aria-describedby={describedBy} className={`${inputClass} resize-y`} />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive tech, filled by naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div id="contact-status" role="status" aria-live="polite" className="min-h-6 text-sm">
          {state.status === 'success' && (
            <p className="flex items-start gap-2 text-success"><IconBuilder type="check" paint="mt-0.5 h-4 w-4" />{state.message}</p>
          )}
          {state.status === 'error' && (
            <p className="flex items-start gap-2 text-danger"><IconBuilder type="alert" paint="mt-0.5 h-4 w-4" />{state.message}</p>
          )}
        </div>
        <button type="submit" disabled={pending} className={buttonStyles('primary', 'md', 'w-full sm:w-auto')}>
          {pending ? (
            <>
              <IconBuilder type="spinner" paint="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <IconBuilder type="arrowRight" paint="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
