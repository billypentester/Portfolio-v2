import 'server-only'
import { Redis } from '@upstash/redis'

// Vercel's Upstash integration injects PORTFOLIO_KV_REST_API_* (the store was connected with the
// PORTFOLIO prefix); a database created on upstash.com uses UPSTASH_REDIS_REST_*. The
// PORTFOLIO_REDIS_URL that Vercel also injects is a TCP URL this client cannot use.
const url = process.env.PORTFOLIO_KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token = process.env.PORTFOLIO_KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

// Null when Redis is not configured, so callers fall back to defaults instead of failing.
// Few retries: the public site would rather render the fallback than wait out a long backoff.
export const redis: Redis | null = url && token ? new Redis({ url, token, retry: { retries: 2 } }) : null
