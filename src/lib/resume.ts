import { del, list, put } from '@vercel/blob'

// The Blob store is connected on Vercel with the PORTFOLIO prefix, so its token is PORTFOLIO_READ_WRITE_TOKEN.
// When neither is set the SDK falls back to its own credential lookup (and reports what is missing).
export const BLOB_TOKEN = process.env.PORTFOLIO_READ_WRITE_TOKEN ?? process.env.BLOB_READ_WRITE_TOKEN

// Resumes live under this Blob prefix. The one chosen in /admin is live; with no choice saved (or once
// the chosen file is deleted) the newest upload is. Uploads replace older files unless told to keep them.
export const RESUME_PREFIX = 'portfolio/'

// Tag for the cached lookup behind /resume. Revalidate it after replacing the resume.
export const RESUME_CACHE_TAG = 'portfolio'

export const MAX_RESUME_BYTES = 5 * 1024 * 1024

interface StoredResume {
  url: string
  uploadedAt: Date
}

export const pickLatestResume = <T extends StoredResume>(blobs: T[]): T | null =>
  blobs.reduce<T | null>((latest, blob) => (!latest || blob.uploadedAt > latest.uploadedAt ? blob : latest), null)

export interface ResumeFile extends StoredResume {
  pathname: string
}

// Newest first.
export const listResumes = async (): Promise<ResumeFile[]> => {
  const { blobs } = await list({ prefix: RESUME_PREFIX, token: BLOB_TOKEN })
  return blobs
    .map(({ pathname, url, uploadedAt }) => ({ pathname, url, uploadedAt }))
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
}

// The resume chosen in /admin wins while it still exists; otherwise the newest upload is served.
export const selectResume = <T extends ResumeFile>(resumes: T[], active: string | null): T | null =>
  resumes.find((resume) => resume.pathname === active) ?? pickLatestResume(resumes)

export type ReplaceResumeResult =
  | { status: 'success'; url: string }
  | { status: 'invalid'; message: string }

interface ReplaceResumeOptions {
  /** Keep the previous uploads so they stay selectable in /admin. */
  keepPrevious?: boolean
}

// Uploads the new resume first and only then deletes the previous ones, so the site never
// points at a missing file. Blob errors are thrown for the caller to report.
export const replaceResume = async (file: File, { keepPrevious = false }: ReplaceResumeOptions = {}): Promise<ReplaceResumeResult> => {
  if (file.type !== 'application/pdf') return { status: 'invalid', message: 'Resume must be a PDF.' }
  if (file.size === 0) return { status: 'invalid', message: 'Resume file is empty.' }
  if (file.size > MAX_RESUME_BYTES) return { status: 'invalid', message: 'Resume must be 5 MB or smaller.' }

  const uploaded = await put(`${RESUME_PREFIX}${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/pdf',
    token: BLOB_TOKEN,
  })
  if (keepPrevious) return { status: 'success', url: uploaded.url }

  const { blobs } = await list({ prefix: RESUME_PREFIX, token: BLOB_TOKEN })
  const stale = blobs.filter((blob) => blob.url !== uploaded.url).map((blob) => blob.url)
  if (stale.length > 0) await del(stale, { token: BLOB_TOKEN })

  return { status: 'success', url: uploaded.url }
}
