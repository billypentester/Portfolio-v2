import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_THEME, THEMES, type ThemeId } from '../config/themes.ts'
import { buildTheme, resolveThemeId, themeCss, type ColorMode, type TokenName } from '../lib/theme.ts'
import { contrastRatio, toHex } from '../utils/color.ts'

const THEME_IDS = Object.keys(THEMES) as ThemeId[]
const MODES: ColorMode[] = ['light', 'dark']

// [foreground, background, minimum ratio]: WCAG AA for text (4.5) and for UI components (3).
const CONTRAST_PAIRS: [TokenName, TokenName, number][] = [
  ['fg', 'canvas', 4.5],
  ['fg', 'subtle', 4.5],
  ['muted', 'canvas', 4.5],
  ['muted', 'surface', 4.5],
  ['muted', 'subtle', 4.5],
  ['faint', 'canvas', 4.5],
  ['faint', 'surface', 4.5],
  ['accent', 'canvas', 4.5],
  ['accent', 'surface', 4.5],
  ['accent-fg', 'accent', 4.5],
  ['canvas', 'fg', 4.5],
  ['control', 'canvas', 3],
  ['control', 'surface', 3],
]

test('offers between 15 and 20 themes', () => {
  assert.ok(THEME_IDS.length >= 15 && THEME_IDS.length <= 20, `found ${THEME_IDS.length}`)
})

for (const id of THEME_IDS) {
  for (const mode of MODES) {
    test(`${id} (${mode}) meets WCAG AA contrast`, () => {
      const palette = buildTheme(id)[mode]
      for (const [foreground, background, minimum] of CONTRAST_PAIRS) {
        const ratio = contrastRatio(palette[foreground], palette[background])
        assert.ok(ratio >= minimum, `${foreground} on ${background} is ${ratio.toFixed(2)}:1, needs ${minimum}:1`)
      }
    })
  }
}

test('resolves the theme id from the environment value', (t) => {
  const warn = t.mock.method(console, 'warn', () => {})
  assert.equal(resolveThemeId(undefined), DEFAULT_THEME)
  assert.equal(resolveThemeId(''), DEFAULT_THEME)
  assert.equal(resolveThemeId(' Ocean '), 'ocean')
  assert.equal(warn.mock.callCount(), 0)
})

test('falls back to the default theme and warns on an unknown id', (t) => {
  const warn = t.mock.method(console, 'warn', () => {})
  assert.equal(resolveThemeId('neon'), DEFAULT_THEME)
  assert.equal(resolveThemeId('toString'), DEFAULT_THEME)
  assert.equal(warn.mock.callCount(), 2)
})

test('renders every token for light, dark and the OS-preference fallback', () => {
  const css = themeCss(buildTheme('ocean'))
  assert.match(css, /^:root\{color-scheme:light;/)
  assert.match(css, /:root\[data-theme="dark"\]\{color-scheme:dark;/)
  assert.match(css, /@media \(prefers-color-scheme:dark\)\{:root:not\(\[data-theme="light"\]\)\{color-scheme:dark;/)
  for (const token of Object.keys(buildTheme('ocean').light)) {
    assert.equal(css.split(`--${token}:`).length - 1, 3, `--${token} should appear once per block`)
  }
})

test('the default theme keeps the original design tokens', () => {
  const css = themeCss(buildTheme('ember'))
  assert.ok(css.includes('--canvas:oklch(98.6% 0.004 85)'))
  assert.ok(css.includes('--fg:oklch(21% 0.012 260)'))
  assert.ok(css.includes('--accent:oklch(54% 0.165 42)'))
  assert.ok(css.includes('--accent:oklch(73% 0.1502 52)'))
  assert.ok(css.includes('--canvas:oklch(16.5% 0.006 260)'))
})

test('converts OKLCH to hex, mapping out-of-gamut colours into sRGB', () => {
  assert.equal(toHex({ l: 62.8, c: 0.2577, h: 29.23 }), '#ff0000')
  assert.equal(toHex({ l: 45.2, c: 0.313, h: 264.05 }), '#0000ff')
  assert.equal(toHex({ l: 100, c: 0, h: 0 }), '#ffffff')
  assert.equal(toHex({ l: 0, c: 0, h: 0 }), '#000000')
  assert.match(toHex({ l: 70, c: 0.4, h: 150 }), /^#[0-9a-f]{6}$/)
})
