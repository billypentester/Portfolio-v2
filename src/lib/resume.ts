import { del, list, put } from '@vercel/blob'

// Resumes live under this Blob prefix. The newest upload is the live one; older uploads are
// deleted after a replacement, so normally there is exactly one.
export const RESUME_PREFIX = 'resume/'

// Tag for the cached lookup behind /resume. Revalidate it after replacing the resume.
export const RESUME_CACHE_TAG = 'resume'

export const MAX_RESUME_BYTES = 5 * 1024 * 1024

interface StoredResume {
  url: string
  uploadedAt: Date
}

export const pickLatestResume = <T extends StoredResume>(blobs: T[]): T | null =>
  blobs.reduce<T | null>((latest, blob) => (!latest || blob.uploadedAt > latest.uploadedAt ? blob : latest), null)

export const findResumeUrl = async (): Promise<string | null> => {
  const { blobs } = await list({ prefix: RESUME_PREFIX })
  return pickLatestResume(blobs)?.url ?? null
}

export type ReplaceResumeResult =
  | { status: 'success'; url: string }
  | { status: 'invalid'; message: string }

// Uploads the new resume first and only then deletes the previous ones, so the site never
// points at a missing file. Blob errors are thrown for the caller to report.
export const replaceResume = async (file: File): Promise<ReplaceResumeResult> => {
  if (file.type !== 'application/pdf') return { status: 'invalid', message: 'Resume must be a PDF.' }
  if (file.size === 0) return { status: 'invalid', message: 'Resume file is empty.' }
  if (file.size > MAX_RESUME_BYTES) return { status: 'invalid', message: 'Resume must be 5 MB or smaller.' }

  const uploaded = await put(`${RESUME_PREFIX}${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/pdf',
  })

  const { blobs } = await list({ prefix: RESUME_PREFIX })
  const stale = blobs.filter((blob) => blob.url !== uploaded.url).map((blob) => blob.url)
  if (stale.length > 0) await del(stale)

  return { status: 'success', url: uploaded.url }
}
