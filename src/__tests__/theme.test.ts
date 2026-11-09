import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_THEME, THEMES, type ThemeId } from '../config/themes.ts'
import { buildTheme, resolveThemeId, themeCss, type ColorMode, type TokenName } from '../lib/theme.ts'
import { contrastRatio, fromHex, toCss, toHex } from '../utils/color.ts'

const THEME_IDS = Object.keys(THEMES) as ThemeId[]
const MODES: ColorMode[] = ['light', 'dark']

// [foreground, background, minimum ratio]: WCAG AA for text (4.5) and for UI components (3).
const CONTRAST_PAIRS: [TokenName, TokenName, number][] = [
  ['fg', 'canvas', 4.5],
  ['fg', 'subtle', 4.5],
  ['muted', 'canvas', 4.5],
  ['muted', 'surface', 4.5],
  ['muted', 'subtle', 4.5],
  ['fg', 'accent-soft', 4.5],
  ['muted', 'accent-soft', 4.5],
  ['faint', 'canvas', 4.5],
  ['faint', 'surface', 4.5],
  ['faint', 'subtle', 4.5],
  ['accent', 'canvas', 4.5],
  ['accent', 'surface', 4.5],
  ['accent-fg', 'accent', 4.5],
  ['canvas', 'fg', 4.5],
  ['success', 'canvas', 4.5],
  ['success', 'surface', 4.5],
  ['danger', 'canvas', 4.5],
  ['danger', 'surface', 4.5],
  ['control', 'canvas', 3],
  ['control', 'surface', 3],
  ['focus', 'canvas', 3],
  ['focus', 'surface', 3],
  ['focus', 'subtle', 3],
  // Accent icons on hover fills (Snapshot, Capabilities).
  ['accent', 'subtle', 3],
  ['accent', 'accent-soft', 3],
  // Brand colour on hovered card borders, timeline markers and tag dots (non-text UI).
  ['brand', 'canvas', 3],
  ['brand', 'surface', 3],
  // Gradient display headings run from spectrum-4 through brand to accent: large text, 3:1.
  ['spectrum-4', 'canvas', 3],
]

test('offers a curated set of seven themes', () => {
  assert.equal(THEME_IDS.length, 7, `found ${THEME_IDS.length}`)
  assert.ok(THEME_IDS.includes(DEFAULT_THEME))
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
  assert.equal(resolveThemeId(' Emerald '), 'emerald')
  assert.equal(warn.mock.callCount(), 0)
})

test('falls back to the default theme and warns on an unknown id', (t) => {
  const warn = t.mock.method(console, 'warn', () => {})
  assert.equal(resolveThemeId('neon'), DEFAULT_THEME)
  assert.equal(resolveThemeId('toString'), DEFAULT_THEME)
  assert.equal(warn.mock.callCount(), 2)
})

test('renders every token for light, dark and the OS-preference fallback', () => {
  const css = themeCss(buildTheme('indigo'))
  assert.match(css, /^:root\{color-scheme:light;/)
  assert.match(css, /:root\[data-theme="dark"\]\{color-scheme:dark;/)
  assert.match(css, /@media \(prefers-color-scheme:dark\)\{:root:not\(\[data-theme="light"\]\)\{color-scheme:dark;/)
  for (const token of Object.keys(buildTheme('indigo').light)) {
    assert.equal(css.split(`--${token}:`).length - 1, 3, `--${token} should appear once per block`)
  }
})

test('renders the expected design tokens', () => {
  const css = themeCss(buildTheme('midnight'))
  assert.ok(css.includes('--canvas:oklch(98.6% 0.009 245)'))
  assert.ok(css.includes('--fg:oklch(21% 0.027 262)'))
  assert.ok(css.includes('--accent:oklch(54% 0.17 260)'))
  assert.ok(css.includes('--accent:oklch(73% 0.1547 252)'))
  assert.ok(css.includes('--canvas:oklch(16.5% 0.0135 262)'))
})

test('preserves the Evergreen source colours', () => {
  const palette = buildTheme('evergreen').light
  assert.equal(toHex(palette.canvas), '#fafafa')
  assert.equal(toHex(palette.accent), '#004643')
})

test('preserves the Clay source colours', () => {
  const { light, dark } = buildTheme('clay')
  const expected: Partial<Record<TokenName, string>> = {
    canvas: '#ffffff',
    surface: '#ffffff',
    subtle: '#faf9f7',
    line: '#e5e5e5',
    fg: '#1d1d1f',
    muted: '#5c5c61',
    accent: '#b05f43',
    brand: '#cc785c',
    'accent-soft': '#f3e3db',
    'spectrum-1': '#7cc6e8',
    'spectrum-4': '#e05252',
  }
  for (const [token, hex] of Object.entries(expected) as [TokenName, string][]) {
    assert.equal(toHex(light[token]), hex, `light ${token}`)
  }
  assert.equal(toHex(dark['spectrum-2']), '#f2c34e')
})

test('overriding the accent carries focus and brand with it', () => {
  const { light } = buildTheme('evergreen')
  assert.deepEqual(light.focus, light.accent)
  assert.deepEqual(light.brand, light.accent)
})

test('converts hex to OKLCH and back without loss', () => {
  for (const hex of ['#ffffff', '#000000', '#1d1d1f', '#cc785c', '#004643', '#7cc6e8', '#f2c34e']) {
    assert.equal(toHex(fromHex(hex)), hex)
  }
  assert.equal(toCss(fromHex('#ffffff')), 'oklch(100% 0 0)')
  assert.throws(() => fromHex('cc785c'), /#rrggbb/)
  assert.throws(() => fromHex('#fff'), /#rrggbb/)
})

test('converts OKLCH to hex, mapping out-of-gamut colours into sRGB', () => {
  assert.equal(toHex({ l: 62.8, c: 0.2577, h: 29.23 }), '#ff0000')
  assert.equal(toHex({ l: 45.2, c: 0.313, h: 264.05 }), '#0000ff')
  assert.equal(toHex({ l: 100, c: 0, h: 0 }), '#ffffff')
  assert.equal(toHex({ l: 0, c: 0, h: 0 }), '#000000')
  assert.match(toHex({ l: 70, c: 0.4, h: 150 }), /^#[0-9a-f]{6}$/)
})
