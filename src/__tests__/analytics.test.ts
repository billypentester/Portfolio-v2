import { test } from 'node:test'
import assert from 'node:assert/strict'
import { analyticsDomains, reachedScrollDepths, readTrackingAttributes, referrerSource, trackingAttributes } from '../lib/analytics.ts'

const SITE = 'https://billypentester.pk'

// Minimal stand-in for a DOM element: just the attribute API the reader uses.
const element = (attributes: Record<string, string>) => ({
  getAttribute: (name: string) => attributes[name] ?? null,
  getAttributeNames: () => Object.keys(attributes),
})

test('builds tracking attributes from an event', () => {
  assert.deepEqual(trackingAttributes({ name: 'project_click', data: { project: 'kfc', action: 'live', location: 'project-card' } }), {
    'data-track': 'project_click',
    'data-track-project': 'kfc',
    'data-track-action': 'live',
    'data-track-location': 'project-card',
  })
  assert.deepEqual(trackingAttributes({ name: 'mobile_menu_open' }), { 'data-track': 'mobile_menu_open' })
  assert.deepEqual(trackingAttributes(undefined), {})
})

test('reads back what trackingAttributes wrote', () => {
  const attributes = trackingAttributes({ name: 'social_click', data: { platform: 'github', location: 'footer' } })
  assert.deepEqual(readTrackingAttributes(element({ ...attributes, class: 'link', href: '/x' })), {
    name: 'social_click',
    data: { platform: 'github', location: 'footer' },
  })
})

test('ignores elements without a tracked event', () => {
  assert.equal(readTrackingAttributes(element({ href: '/x' })), null)
  assert.equal(readTrackingAttributes(element({ 'data-track': '' })), null)
})

test('reports scroll depth milestones by how far the viewport bottom has reached', () => {
  assert.deepEqual(reachedScrollDepths(900, 4000), [])
  assert.deepEqual(reachedScrollDepths(1000, 4000), [25])
  assert.deepEqual(reachedScrollDepths(3100, 4000), [25, 50, 75])
  assert.deepEqual(reachedScrollDepths(3995, 4000), [25, 50, 75, 100])
  assert.deepEqual(reachedScrollDepths(0, 0), [])
})

test('allows the site domain with and without www', () => {
  assert.deepEqual(analyticsDomains(SITE), ['billypentester.pk', 'www.billypentester.pk'])
})

test('classifies where a request came from', () => {
  assert.equal(referrerSource(null, SITE), 'direct')
  assert.equal(referrerSource('', SITE), 'direct')
  assert.equal(referrerSource('https://billypentester.pk/experience', SITE), 'site')
  assert.equal(referrerSource('https://www.billypentester.pk/', SITE), 'site')
  assert.equal(referrerSource('https://www.linkedin.com/', SITE), 'external')
  assert.equal(referrerSource('not a url', SITE), 'external')
})
