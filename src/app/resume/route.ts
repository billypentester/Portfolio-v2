import { unstable_cache } from 'next/cache'
import { findResumeUrl, RESUME_CACHE_TAG } from '@/src/lib/resume'

// Caches the Blob lookup so each visit does not cost a list operation. Errors are not cached.
const getResumeUrl = unstable_cache(findResumeUrl, ['resume-url'], {
    tags: [RESUME_CACHE_TAG],
    revalidate: 3600,
})

// Stable link for the resume. The PDF itself lives in Vercel Blob and its URL changes on every upload.
export async function GET() {
    try {
        const url = await getResumeUrl()
        if (!url) {
            console.error('Resume not found: no blob under the resume/ prefix')
            return new Response('Resume not found.', { status: 404 })
        }
        return Response.redirect(url, 307)
    } catch (error) {
        console.error('Resume lookup failed', error instanceof Error ? error.message : error)
        return new Response('Resume is temporarily unavailable.', { status: 503 })
    }
}
