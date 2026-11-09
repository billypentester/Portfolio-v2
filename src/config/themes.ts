import type { TokenName } from '../lib/theme.ts'

// Colour themes. Each theme is a handful of hues and chroma levels; src/lib/theme.ts derives the
// full light and dark token sets from them on a fixed lightness scale, so every theme keeps the
// contrast of the original design (enforced by src/__tests__/theme.test.ts).
//
// Pick the active theme in /admin. SITE_THEME (or DEFAULT_THEME below) is the fallback used until a
// theme is saved there, or while the settings store is unreachable.

/** Exact #rrggbb colours that replace derived tokens, for palettes reproduced from a source design. */
export type ColorOverrides = Partial<Record<TokenName, string>>

export interface ThemeDefinition {
  label: string
  /** Hue of the light neutrals: light-mode backgrounds and dark-mode text. */
  paperHue: number
  /** Hue of the dark neutrals: light-mode text and dark-mode backgrounds. */
  inkHue: number
  /** Strength of the neutral tint. 1 is the barely-there tint of the original design, 0 is pure grey. */
  tint: number
  accent: {
    hue: number
    /** Light-mode chroma; dark mode uses slightly less. Out-of-gamut values are mapped into sRGB. */
    chroma: number
    /** Dark-mode hue, when the accent reads better shifted on dark backgrounds. Defaults to `hue`. */
    darkHue?: number
  }
  /** Source colours applied over the derived light palette. The contrast tests still apply to them. */
  light?: ColorOverrides
  /** Source colours applied over the derived dark palette. */
  dark?: ColorOverrides
}

// Warm decorative spectrum of the Clay theme (sky, sun, orange, red), used for the hero glow,
// the gradient name, the portrait backing and the footer rule. Decorative only, so it is the same in both modes.
const CLAY_SPECTRUM: ColorOverrides = {
  'spectrum-1': '#7cc6e8',
  'spectrum-2': '#f2c34e',
  'spectrum-3': '#ee8a4e',
  'spectrum-4': '#e05252',
}

// Each theme pairs its accent with its own neutrals, so the page character changes with it, not just the links.
export const THEMES = {
  // White canvas, near-black ink and a terracotta clay brand colour with a warm sky-to-red spectrum.
  // Light mode reproduces the source palette exactly. `brand` is the source clay (3.3:1, so borders,
  // markers and fills only); `accent` is the same hue at the lightness where link text meets AA.
  clay: {
    label: 'Clay',
    paperHue: 70,
    inkHue: 285,
    tint: 0.4,
    accent: { hue: 39.15, chroma: 0.1131, darkHue: 45 },
    light: {
      canvas: '#ffffff',
      surface: '#ffffff',
      subtle: '#faf9f7',
      line: '#e5e5e5',
      fg: '#1d1d1f',
      muted: '#5c5c61',
      accent: '#b05f43',
      'accent-fg': '#ffffff',
      brand: '#cc785c',
      'accent-soft': '#f3e3db',
      ...CLAY_SPECTRUM,
    },
    dark: { ...CLAY_SPECTRUM },
  },
  // Evergreen palette based on #004643 with a #FAFAFA light-mode canvas.
  evergreen: {
    label: 'Evergreen',
    paperHue: 190,
    inkHue: 190,
    tint: 0,
    accent: { hue: 189.91, chroma: 0.0614, darkHue: 190 },
    light: { canvas: '#fafafa', accent: '#004643' },
  },
  // Navy-tinted neutrals (a deep blue-black in dark mode) with a clear azure accent.
  midnight: { label: 'Midnight', paperHue: 245, inkHue: 262, tint: 2.25, accent: { hue: 260, chroma: 0.17, darkHue: 252 } },
  // Cool sea-glass neutrals that keep dark mode slate rather than green, with an emerald accent.
  emerald: { label: 'Emerald', paperHue: 170, inkHue: 205, tint: 1.5, accent: { hue: 162, chroma: 0.14, darkHue: 160 } },
  // Faintly violet neutrals with a saturated indigo accent, in the style of modern product tools.
  indigo: { label: 'Indigo', paperHue: 285, inkHue: 280, tint: 1.75, accent: { hue: 277, chroma: 0.2, darkHue: 280 } },
  // Near-neutral graphite with a restrained cyan accent: the most understated option.
  graphite: { label: 'Graphite', paperHue: 250, inkHue: 255, tint: 0.6, accent: { hue: 218, chroma: 0.1, darkHue: 212 } },
  // Warm stone neutrals with a burnt-amber accent that turns golden on dark backgrounds.
  amber: { label: 'Amber', paperHue: 75, inkHue: 55, tint: 1.75, accent: { hue: 50, chroma: 0.15, darkHue: 70 } },
} satisfies Record<string, ThemeDefinition>

export type ThemeId = keyof typeof THEMES

// Fallback when no theme is saved in /admin and SITE_THEME is unset or not a known theme id.
export const DEFAULT_THEME: ThemeId = 'clay'
