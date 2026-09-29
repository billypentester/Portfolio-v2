import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CONTACT_LIMITS, isSpamSubmission, validateContactForm } from '../helpers/validator.ts'

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello there' }

test('accepts and trims a valid submission', () => {
  const result = validateContactForm({ name: '  Ada Lovelace ', email: ' ada@example.com ', message: ' Hello there ' })
  assert.deepEqual(result, { valid: true, data: valid })
})

test('reports every missing field', () => {
  const result = validateContactForm({})
  assert.equal(result.valid, false)
  if (!result.valid) assert.deepEqual(Object.keys(result.fieldErrors).sort(), ['email', 'message', 'name'])
})

test('rejects non-string values from the JSON API', () => {
  const result = validateContactForm({ name: 42, email: ['a@b.co'], message: { text: 'hi' } })
  assert.equal(result.valid, false)
})

test('rejects malformed email addresses', () => {
  for (const email of ['plainaddress', 'a@b', 'a@@b.com', 'a b@c.com', 'a@b..com']) {
    assert.equal(validateContactForm({ ...valid, email }).valid, false, email)
  }
})

test('rejects header injection through name or email', () => {
  assert.equal(validateContactForm({ ...valid, name: 'Ada\r\nBcc: x@y.com' }).valid, false)
  assert.equal(validateContactForm({ ...valid, email: 'ada@example.com\nBcc: x@y.com' }).valid, false)
})

test('enforces length limits', () => {
  assert.equal(validateContactForm({ ...valid, name: 'a'.repeat(CONTACT_LIMITS.name + 1) }).valid, false)
  assert.equal(validateContactForm({ ...valid, message: 'a'.repeat(CONTACT_LIMITS.message + 1) }).valid, false)
  assert.equal(validateContactForm({ ...valid, message: 'a'.repeat(CONTACT_LIMITS.message) }).valid, true)
})

test('stays fast on long hostile email input', () => {
  const started = performance.now()
  validateContactForm({ ...valid, email: `a@${'b.'.repeat(120)}` })
  assert.ok(performance.now() - started < 50)
})

test('flags only filled honeypots as spam', () => {
  assert.equal(isSpamSubmission(null), false)
  assert.equal(isSpamSubmission('   '), false)
  assert.equal(isSpamSubmission('ACME'), true)
})
