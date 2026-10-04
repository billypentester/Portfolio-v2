import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseStoredSettings, validateSettingsInput, type PortfolioSettings } from '../lib/admin/settings-schema.ts'

const DEFAULTS: PortfolioSettings = { theme: 'midnight', resume: { active: null }, updatedAt: null }
const RESUMES = ['resume/cv-2026-AbC123.pdf', 'resume/cv-2025-XyZ789.pdf']

test('reads valid stored settings', () => {
  const stored = { theme: 'amber', resume: { active: 'resume/cv-2026-AbC123.pdf' }, updatedAt: '2026-10-04T00:00:00.000Z' }
  assert.deepEqual(parseStoredSettings(stored, DEFAULTS), stored)
})

test('falls back to the defaults when nothing is stored', () => {
  assert.deepEqual(parseStoredSettings(null, DEFAULTS), DEFAULTS)
  assert.deepEqual(parseStoredSettings('not json', DEFAULTS), DEFAULTS)
  assert.deepEqual(parseStoredSettings([], DEFAULTS), DEFAULTS)
})

test('replaces each invalid stored field with its default', () => {
  const stored = { theme: 'neon', resume: { active: '../../etc/passwd' }, updatedAt: 'yesterday' }
  assert.deepEqual(parseStoredSettings(stored, DEFAULTS), DEFAULTS)
  assert.equal(parseStoredSettings({ theme: 'toString' }, DEFAULTS).theme, 'midnight')
  assert.equal(parseStoredSettings({ resume: { active: 'https://example.com/resume/x.pdf' } }, DEFAULTS).resume.active, null)
  assert.equal(parseStoredSettings({ theme: 'emerald', resume: 'resume/x.pdf' }, DEFAULTS).theme, 'emerald')
})

test('accepts a known theme with a stored resume or the newest upload', () => {
  assert.deepEqual(validateSettingsInput({ theme: 'indigo', resume: RESUMES[1] }, RESUMES), {
    valid: true,
    data: { theme: 'indigo', resume: { active: RESUMES[1] } },
  })
  assert.deepEqual(validateSettingsInput({ theme: 'graphite', resume: '' }, []), {
    valid: true,
    data: { theme: 'graphite', resume: { active: null } },
  })
})

test('rejects themes that are not in THEMES', () => {
  for (const theme of ['neon', 'toString', '__proto__', '', null, 42]) {
    assert.equal(validateSettingsInput({ theme, resume: '' }, RESUMES).valid, false, `accepted ${String(theme)}`)
  }
})

test('rejects resumes that are not currently stored', () => {
  for (const resume of ['resume/deleted.pdf', '../secrets.pdf', 'https://evil.example/cv.pdf', null]) {
    assert.equal(validateSettingsInput({ theme: 'amber', resume }, RESUMES).valid, false, `accepted ${String(resume)}`)
  }
})
