// Uploads a resume PDF to Vercel Blob and deletes the previous ones. With --keep the previous ones
// stay, so any of them can be made active in /admin.
// Usage: yarn resume:upload <path-to-pdf> [--keep]   (needs PORTFOLIO_READ_WRITE_TOKEN in .env or .env.local)
import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'
import { BLOB_TOKEN, replaceResume } from '../src/lib/resume.ts'

const args = process.argv.slice(2)
const keepPrevious = args.includes('--keep')
const path = args.find((arg) => !arg.startsWith('--'))
if (!path) {
  console.error('Usage: yarn resume:upload <path-to-pdf> [--keep]')
  process.exit(1)
}
if (!BLOB_TOKEN) {
  console.error('PORTFOLIO_READ_WRITE_TOKEN is not set. Add it to .env or .env.local.')
  process.exit(1)
}

try {
  const file = new File([await readFile(path)], basename(path), { type: 'application/pdf' })
  const result = await replaceResume(file, { keepPrevious })
  if (result.status === 'invalid') {
    console.error(result.message)
    process.exit(1)
  }
  console.log(`Uploaded ${result.url}`)
  console.log('Deployed sites keep the cached /resume lookup for up to 1 hour before serving the new file.')
} catch (error) {
  console.error('Resume upload failed:', error instanceof Error ? error.message : error)
  process.exit(1)
}
