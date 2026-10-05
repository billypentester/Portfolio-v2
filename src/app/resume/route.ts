import { unstable_cache } from 'next/cache'
import { after } from 'next/server'
import { SITE_URL } from '@/src/content/profile'
import { referrerSource } from '@/src/lib/analytics'
import { trackServerEvent } from '@/src/lib/umami-server'
import { getPortfolioSettings } from '@/src/lib/admin/settings'
import { listResumes, RESUME_CACHE_TAG, selectResume } from '@/src/lib/resume'

// Caches the Blob lookup so each visit does not cost a list operation. The active pathname is part
// of the cache key, so choosing another resume in /admin takes effect at once. Errors are not cached.
const getResumeUrl = unstable_cache(
    async (active: string | null) => selectResume(await listResumes(), active)?.url ?? null,
    ['resume-url'],
    { tags: [RESUME_CACHE_TAG], revalidate: 3600 },
)

// Stable link for the resume. The PDF itself lives in Vercel Blob and its URL changes on every upload.
export async function GET(request: Request) {
    try {
        // Falls back to the newest upload when the settings store is unavailable.
        const { resume } = await getPortfolioSettings()
        const url = await getResumeUrl(resume.active)
        if (!url) {
            console.error('Resume not found: no blob under the resume/ prefix')
            return new Response('Resume not found.', { status: 404 })
        }
        // Counts every open, including links shared outside the site that never load the tracker.
        // resume_download (sent from the site's buttons) shows which button was used.
        after(() => trackServerEvent({ name: 'resume_served', data: { source: referrerSource(request.headers.get('referer'), SITE_URL) } }, request))
        return Response.redirect(url, 307)
    } catch (error) {
        console.error('Resume lookup failed', error instanceof Error ? error.message : error)
        return new Response('Resume is temporarily unavailable.', { status: 503 })
    }
}
