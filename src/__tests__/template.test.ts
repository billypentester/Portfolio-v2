import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emailTemplate, escapeHtml } from '../config/template.ts'

test('escapes HTML special characters', () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;')
})

test('never renders submitted markup as HTML', () => {
  const html = emailTemplate({ name: '<b>Eve</b>', email: 'eve@example.com', message: '<script>alert(1)</script>', brandName: 'brand' })
  assert.ok(!html.includes('<script>alert(1)</script>'))
  assert.ok(!html.includes('<b>Eve</b>'))
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'))
})

test('does not expand replacement patterns in user input', () => {
  const html = emailTemplate({ name: 'Eve', email: 'eve@example.com', message: "cost is $& and $'", brandName: 'brand' })
  assert.ok(html.includes('cost is $&amp; and $&#39;'))
})

test('fills every placeholder', () => {
  const html = emailTemplate({ name: 'Eve', email: 'eve@example.com', message: 'hi', brandName: 'brand' })
  assert.ok(!/{{\w+}}/.test(html))
})
