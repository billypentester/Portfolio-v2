import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickLatestResume, selectResume } from '../lib/resume.ts'

const blob = (url: string, uploadedAt: string) => ({ url, uploadedAt: new Date(uploadedAt) })

test('picks the most recently uploaded resume', () => {
  const blobs = [blob('a', '2026-01-01'), blob('c', '2026-09-30'), blob('b', '2026-05-01')]
  assert.equal(pickLatestResume(blobs)?.url, 'c')
})

test('returns null when no resume is stored', () => {
  assert.equal(pickLatestResume([]), null)
})

const file = (pathname: string, uploadedAt: string) => ({ pathname, url: `https://blob/${pathname}`, uploadedAt: new Date(uploadedAt) })
const files = [file('resume/old.pdf', '2025-01-01'), file('resume/new.pdf', '2026-09-30')]

test('serves the resume chosen in admin while it exists', () => {
  assert.equal(selectResume(files, 'resume/old.pdf')?.pathname, 'resume/old.pdf')
})

test('serves the newest resume when none is chosen or the choice was deleted', () => {
  assert.equal(selectResume(files, null)?.pathname, 'resume/new.pdf')
  assert.equal(selectResume(files, 'resume/deleted.pdf')?.pathname, 'resume/new.pdf')
  assert.equal(selectResume([], 'resume/old.pdf'), null)
})
