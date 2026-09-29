import 'server-only'
import { sendEmail } from './sendEmail'
import { isSpamSubmission, validateContactForm, type ContactField } from './validator'

export type ContactResult =
    | { status: 'success'; message: string }
    | { status: 'invalid'; message: string; fieldErrors: Partial<Record<ContactField, string>> }
    | { status: 'error'; message: string }

const SUCCESS_MESSAGE = 'Thanks for reaching out. I\'ll get back to you soon.'
const FAILURE_MESSAGE = 'Your message could not be sent right now. Please try again, or email me directly.'

// Single entry point shared by the server action and the /api/contact route.
export const submitContact = async (input: Record<string, unknown>): Promise<ContactResult> => {
    // Pretend success so bots get no signal to retry.
    if (isSpamSubmission(input.company)) {
        return { status: 'success', message: SUCCESS_MESSAGE }
    }

    const validation = validateContactForm(input)
    if (!validation.valid) {
        return { status: 'invalid', message: validation.error, fieldErrors: validation.fieldErrors }
    }

    const result = await sendEmail(validation.data)
    if (!result.status) {
        return { status: 'error', message: FAILURE_MESSAGE }
    }

    return { status: 'success', message: SUCCESS_MESSAGE }
}
