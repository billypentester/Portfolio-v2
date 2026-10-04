import type { Metadata } from 'next'
import SettingsForm, { type ResumeOption } from '@/src/components/admin/SettingsForm'
import Container from '@/src/components/ui/Container'
import PageHeader from '@/src/components/ui/PageHeader'
import StatusMessage from '@/src/components/ui/StatusMessage'
import { buttonStyles } from '@/src/components/ui/button'
import { logout } from '@/src/lib/admin/actions'
import { requireAdmin } from '@/src/lib/admin/auth'
import { loadSettingsForAdmin } from '@/src/lib/admin/settings'
import { BlobError } from '@vercel/blob'
import { listResumes, RESUME_PREFIX, type ResumeFile } from '@/src/lib/resume'

export const metadata: Metadata = { title: 'Settings' }

type ResumesResult = { status: 'ok'; resumes: ResumeFile[] } | { status: 'unavailable'; message: string }

// Dates are shown in Pakistan Standard Time (UTC+5, no daylight saving), whatever the server's time zone.
const TIME_ZONE = 'Asia/Karachi'
const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: TIME_ZONE })
const dateTimeFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short', timeZone: TIME_ZONE })

const loadResumes = async (): Promise<ResumesResult> => {
  try {
    return { status: 'ok', resumes: await listResumes() }
  } catch (error) {
    console.error('Could not list resumes:', error instanceof Error ? error.message : error)
    // Blob SDK messages name the cause (such as a missing BLOB_READ_WRITE_TOKEN) and hold no secrets;
    // this page is only shown to the signed-in admin.
    const reason = error instanceof BlobError ? ` ${error.message}` : ''
    return { status: 'unavailable', message: `Could not load the resumes from Blob storage, so only the automatic option is available.${reason}` }
  }
}

const toResumeOption = ({ pathname, uploadedAt }: ResumeFile): ResumeOption => ({
  pathname,
  label: `${pathname.slice(RESUME_PREFIX.length)} · uploaded ${dateFormat.format(uploadedAt)}`,
})

export default async function AdminPage() {
  await requireAdmin()

  const [settingsResult, resumesResult] = await Promise.all([loadSettingsForAdmin(), loadResumes()])
  const { settings } = settingsResult
  const resumes = resumesResult.status === 'ok' ? resumesResult.resumes : []
  const activeResumeExists = resumes.some((file) => file.pathname === settings.resume.active)
  // A saved resume that has since been deleted shows as "automatic", which is what /resume serves.
  const savedResumeMissing = resumesResult.status === 'ok' && settings.resume.active !== null && !activeResumeExists

  const notices = [
    settingsResult.status === 'unavailable' ? settingsResult.message : null,
    resumesResult.status === 'unavailable' ? resumesResult.message : null,
    savedResumeMissing ? 'The saved resume no longer exists, so /resume serves the newest upload.' : null,
  ].filter((notice) => notice !== null)

  return (
    <>
      <PageHeader eyebrow="Admin" title="Portfolio settings" lede="Choose the theme and resume the public site uses. Changes go live as soon as they are saved." />

      <section aria-label="Settings" className="border-t border-line py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            {notices.length > 0 && (
              <div role="alert" className="mb-10 grid gap-2 rounded-card border border-danger p-4 text-sm">
                {notices.map((notice) => (
                  <StatusMessage key={notice} tone="danger">{notice}</StatusMessage>
                ))}
              </div>
            )}

            <SettingsForm
              theme={settings.theme}
              resume={activeResumeExists && settings.resume.active ? settings.resume.active : ''}
              resumes={resumes.map(toResumeOption)}
              canSave={settingsResult.status === 'ok'}
            />

            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>
                Last updated:{' '}
                {settings.updatedAt ? (
                  <time dateTime={settings.updatedAt} className="text-fg">{dateTimeFormat.format(new Date(settings.updatedAt))} PKT</time>
                ) : (
                  'never (using the defaults)'
                )}
              </p>
              <form action={logout}>
                <button type="submit" className={buttonStyles('secondary', 'sm')}>Sign out</button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
