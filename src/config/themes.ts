// Colour themes. Each theme is a handful of hues and chroma levels; src/lib/theme.ts derives the
// full light and dark token sets from them on a fixed lightness scale, so every theme keeps the
// contrast of the original design (enforced by src/__tests__/theme.test.ts).
//
// Pick the active theme with the SITE_THEME environment variable, or change DEFAULT_THEME below.

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
}

// Each theme pairs its accent with its own neutrals, so the page character changes with it, not just the links.
export const THEMES = {
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

// Used when SITE_THEME is unset or not a known theme id.
export const DEFAULT_THEME: ThemeId = 'midnight'
