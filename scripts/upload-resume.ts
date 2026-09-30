// Uploads a resume PDF to Vercel Blob and deletes the previous one.
// Usage: yarn resume:upload <path-to-pdf>   (needs BLOB_READ_WRITE_TOKEN in .env or .env.local)
import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'
import { replaceResume } from '../src/lib/resume.ts'

const path = process.argv[2]
if (!path) {
  console.error('Usage: yarn resume:upload <path-to-pdf>')
  process.exit(1)
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('BLOB_READ_WRITE_TOKEN is not set. Add it to .env or .env.local.')
  process.exit(1)
}

try {
  const file = new File([await readFile(path)], basename(path), { type: 'application/pdf' })
  const result = await replaceResume(file)
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
