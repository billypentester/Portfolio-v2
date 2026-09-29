'use server'

import { submitContact, type ContactResult } from '../contact'

export type ContactFormState = ContactResult | { status: 'idle' }

// Calls the email service directly; no HTTP round trip to our own API.
async function sendContactData(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  return submitContact({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    company: formData.get('company'),
  })
}

export { sendContactData }
