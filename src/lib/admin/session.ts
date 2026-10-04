import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { jwtVerify, SignJWT } from 'jose'

// Stateless session: an HS256-signed token in an HTTP-only cookie. Nothing is stored server-side,
// so rotating SESSION_SECRET signs every session out.
const SESSION_COOKIE = 'admin_session'
const SESSION_DURATION_SECONDS = 8 * 60 * 60
const TOKEN_AUDIENCE = 'portfolio-admin'
const MIN_SECRET_LENGTH = 32

// The cookie is only sent to /admin (pages and their Server Actions), never with public pages.
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/admin',
} as const

const secretKey = (): Uint8Array | null => {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    console.error(`SESSION_SECRET must be set to at least ${MIN_SECRET_LENGTH} characters; admin sign-in is disabled.`)
    return null
  }
  return new TextEncoder().encode(secret)
}

// Throws when SESSION_SECRET is missing or too short.
export const createSession = async (): Promise<void> => {
  const key = secretKey()
  if (!key) throw new Error('SESSION_SECRET is not configured')

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject('admin')
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(key)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, { ...COOKIE_OPTIONS, maxAge: SESSION_DURATION_SECONDS })
}

export const deleteSession = async (): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, '', { ...COOKIE_OPTIONS, maxAge: 0 })
}

// Memoised per request, so a page and the components it renders verify the token once.
export const isAuthenticated = cache(async (): Promise<boolean> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return false

  const key = secretKey()
  if (!key) return false

  try {
    await jwtVerify(token, key, { algorithms: ['HS256'], audience: TOKEN_AUDIENCE, subject: 'admin' })
    return true
  } catch {
    // Expired, tampered with or signed with a previous secret: treat the visitor as signed out.
    return false
  }
})
