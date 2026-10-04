'use server'

// Server Actions only accept POST requests whose Origin matches the host, and the session cookie is
// SameSite=Lax, which together guard these mutations against CSRF.

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { listResumes, RESUME_CACHE_TAG } from '@/src/lib/resume'
import {
  clearFailedLogins,
  getClientIp,
  isLockedOut,
  LOCKOUT_MINUTES,
  LOGIN_PATH,
  recordFailedLogin,
  requireAdmin,
  verifyCredentials,
} from './auth'
import { createSession, deleteSession } from './session'
import { saveSettings, SETTINGS_CACHE_TAG } from './settings'
import { validateSettingsInput } from './settings-schema'

export type LoginState = { status: 'idle' } | { status: 'error'; message: string }

export type SettingsFormState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

const MAX_CREDENTIAL_LENGTH = 256

// One message for every wrong combination, so it never reveals which field was wrong.
const INVALID_CREDENTIALS: LoginState = { status: 'error', message: 'Incorrect username or password.' }
const SIGN_IN_UNAVAILABLE: LoginState = { status: 'error', message: 'Sign-in is unavailable right now. Please try again later.' }

const errorMessage = (error: unknown): string => (error instanceof Error ? error.message : String(error))

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get('username')
  const password = formData.get('password')
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    username.length > MAX_CREDENTIAL_LENGTH ||
    password.length > MAX_CREDENTIAL_LENGTH
  ) {
    return INVALID_CREDENTIALS
  }

  try {
    const ip = await getClientIp()
    if (await isLockedOut(ip)) {
      return { status: 'error', message: `Too many failed attempts. Try again in ${LOCKOUT_MINUTES} minutes.` }
    }
    if (!verifyCredentials(username, password)) {
      await recordFailedLogin(ip)
      return INVALID_CREDENTIALS
    }
    await clearFailedLogins(ip)
    await createSession()
  } catch (error) {
    // Never log the submitted credentials.
    console.error('Admin sign-in failed:', errorMessage(error))
    return SIGN_IN_UNAVAILABLE
  }

  // A fixed destination: no redirect target is read from the request, so this cannot be an open redirect.
  redirect('/admin')
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect(LOGIN_PATH)
}

export async function updateSettings(_previous: SettingsFormState, formData: FormData): Promise<SettingsFormState> {
  await requireAdmin()

  const theme = formData.get('theme')
  const resume = formData.get('resume')

  // Blob is only queried when a specific resume is chosen; "newest upload" needs no lookup.
  let availableResumes: string[] = []
  if (typeof resume === 'string' && resume !== '') {
    try {
      availableResumes = (await listResumes()).map((file) => file.pathname)
    } catch (error) {
      console.error('Could not list resumes:', errorMessage(error))
      return { status: 'error', message: 'Could not check the resume against Blob storage. Nothing was saved; try again.' }
    }
  }

  const validation = validateSettingsInput({ theme, resume }, availableResumes)
  if (!validation.valid) return { status: 'error', message: validation.error }

  try {
    await saveSettings(validation.data)
  } catch (error) {
    console.error('Could not save portfolio settings:', errorMessage(error))
    return { status: 'error', message: 'Settings could not be saved because Redis is unavailable. Try again shortly.' }
  }

  // Expire the cached settings and resume lookup now, so the next request renders with the new values.
  updateTag(SETTINGS_CACHE_TAG)
  updateTag(RESUME_CACHE_TAG)
  return { status: 'success', message: 'Saved. The live site now uses these settings.' }
}
