import 'server-only'
import { createHash, timingSafeEqual } from 'node:crypto'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { redis } from '@/src/lib/redis'
import { isAuthenticated } from './session'

export const LOGIN_PATH = '/admin/login'

// Brute-force protection: after this many failed sign-ins an IP is locked out for the window.
const MAX_FAILED_ATTEMPTS = 5
export const LOCKOUT_MINUTES = 15
const FAILED_ATTEMPTS_PREFIX = 'admin:failed-logins:'
// Only characters that occur in IPv4/IPv6 addresses reach the Redis key.
const IP_PATTERN = /^[0-9a-fA-F:.]{2,45}$/

// Call at the top of every admin page and Server Action. Middleware alone is not a security boundary.
export const requireAdmin = async (): Promise<void> => {
  if (!(await isAuthenticated())) redirect(LOGIN_PATH)
}

const sha256 = (value: string): Buffer => createHash('sha256').update(value).digest()

// Hashing first gives equal-length inputs, so the comparison time reveals nothing about either value.
const safeEqual = (actual: string, expected: string): boolean => timingSafeEqual(sha256(actual), sha256(expected))

export const verifyCredentials = (username: string, password: string): boolean => {
  const expectedUsername = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedUsername || !expectedPassword) {
    console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set; admin sign-in is disabled.')
    return false
  }
  // Both are always compared, so the response time does not reveal which one was wrong.
  const usernameMatches = safeEqual(username, expectedUsername)
  const passwordMatches = safeEqual(password, expectedPassword)
  return usernameMatches && passwordMatches
}

// Vercel sets x-forwarded-for itself and drops any value sent by the client. Behind other hosts
// make sure the proxy does the same, or the limit can be sidestepped with a forged header.
export const getClientIp = async (): Promise<string> => {
  const requestHeaders = await headers()
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? requestHeaders.get('x-real-ip')?.trim()
  return ip && IP_PATTERN.test(ip) ? ip : 'unknown'
}

const failedAttemptsKey = (ip: string): string => `${FAILED_ATTEMPTS_PREFIX}${ip}`

// Without Redis configured (local development) there is no limit. When Redis is configured but
// unreachable these throw, and sign-in fails closed rather than allowing unlimited attempts.
export const isLockedOut = async (ip: string): Promise<boolean> => {
  if (!redis) return false
  const failures = await redis.get<number>(failedAttemptsKey(ip))
  return (failures ?? 0) >= MAX_FAILED_ATTEMPTS
}

// Each failure restarts the window, so a steady guesser stays locked out.
export const recordFailedLogin = async (ip: string): Promise<void> => {
  if (!redis) return
  const key = failedAttemptsKey(ip)
  await redis.multi().incr(key).expire(key, LOCKOUT_MINUTES * 60).exec()
}

export const clearFailedLogins = async (ip: string): Promise<void> => {
  if (!redis) return
  await redis.del(failedAttemptsKey(ip))
}
