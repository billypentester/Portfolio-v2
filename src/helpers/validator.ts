export const CONTACT_LIMITS = {
    name: 100,
    email: 254,
    message: 5000,
} as const

export interface ContactInput {
    name: string
    email: string
    message: string
}

export type ContactField = keyof ContactInput

export type ContactValidationResult =
    | { valid: true; data: ContactInput }
    | { valid: false; error: string; fieldErrors: Partial<Record<ContactField, string>> }

// Domain labels exclude dots so the pattern cannot backtrack.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/
// Header-breaking characters are never legitimate in a name or address.
const LINE_BREAK = /[\r\n]/

const asTrimmedString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

// Accepts untrusted input from either the form action or the JSON API.
const validateContactForm = (body: Record<string, unknown>): ContactValidationResult => {
    const name = asTrimmedString(body.name)
    const email = asTrimmedString(body.email)
    const message = asTrimmedString(body.message)
    const fieldErrors: Partial<Record<ContactField, string>> = {}

    if (name.length === 0) {
        fieldErrors.name = 'Please enter your name.'
    } else if (name.length > CONTACT_LIMITS.name || LINE_BREAK.test(name)) {
        fieldErrors.name = `Name must be a single line under ${CONTACT_LIMITS.name} characters.`
    }

    if (email.length > CONTACT_LIMITS.email || LINE_BREAK.test(email) || !EMAIL_PATTERN.test(email)) {
        fieldErrors.email = 'Please enter a valid email address.'
    }

    if (message.length === 0) {
        fieldErrors.message = 'Please write a short message.'
    } else if (message.length > CONTACT_LIMITS.message) {
        fieldErrors.message = `Message must be under ${CONTACT_LIMITS.message} characters.`
    }

    const firstError = Object.values(fieldErrors)[0]
    if (firstError) {
        return { valid: false, error: firstError, fieldErrors }
    }

    return { valid: true, data: { name, email, message } }
}

// Hidden field that people never see; bots that fill every input do.
export const isSpamSubmission = (honeypot: unknown): boolean => typeof honeypot === 'string' && honeypot.trim().length > 0

export { validateContactForm }
