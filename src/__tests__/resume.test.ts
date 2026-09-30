import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickLatestResume } from '../lib/resume.ts'

const blob = (url: string, uploadedAt: string) => ({ url, uploadedAt: new Date(uploadedAt) })

test('picks the most recently uploaded resume', () => {
  const blobs = [blob('a', '2026-01-01'), blob('c', '2026-09-30'), blob('b', '2026-05-01')]
  assert.equal(pickLatestResume(blobs)?.url, 'c')
})

test('returns null when no resume is stored', () => {
  assert.equal(pickLatestResume([]), null)
})
