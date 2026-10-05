import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatDuration, formatYearMonth, getInitials, monthsBetween, slugify, yearsSince } from '../utils/index.ts'

const SEPT_2026 = new Date(2026, 8, 29)

test('formats year-month values', () => {
  assert.equal(formatYearMonth('2023-09'), 'Sep 2023')
  assert.equal(formatYearMonth(null), 'Present')
  assert.throws(() => formatYearMonth('2023-13'))
})

test('counts months inclusively', () => {
  assert.equal(monthsBetween('2022-09', '2023-09'), 13)
  assert.equal(monthsBetween('2023-01', '2023-01'), 1)
  assert.equal(monthsBetween('2023-09', null, SEPT_2026), 37)
})

test('formats durations', () => {
  assert.equal(formatDuration(13), '1 yr 1 mo')
  assert.equal(formatDuration(24), '2 yrs')
  assert.equal(formatDuration(5), '5 mos')
})

test('computes whole years elapsed', () => {
  assert.equal(yearsSince('2022-09', SEPT_2026), 4)
  assert.equal(yearsSince('2022-10', SEPT_2026), 3)
})

test('derives initials from a name', () => {
  assert.equal(getInitials('Cache First'), 'CF')
  assert.equal(getInitials('Simplex Technology Solutions'), 'ST')
  assert.equal(getInitials('  simplex  '), 'S')
  assert.equal(getInitials(''), '')
})

test('slugifies titles', () => {
  assert.equal(slugify('Web3.js in Practice: Part I'), 'web3-js-in-practice-part-i')
  assert.equal(slugify('Machine Learning'), 'machine-learning')
  assert.equal(slugify('  --Hello, World!--  '), 'hello-world')
})
