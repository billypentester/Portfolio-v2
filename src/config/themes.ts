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

export const THEMES = {
  ember: { label: 'Ember', paperHue: 85, inkHue: 260, tint: 1, accent: { hue: 42, chroma: 0.165, darkHue: 52 } },
  sepia: { label: 'Sepia', paperHue: 80, inkHue: 60, tint: 4, accent: { hue: 55, chroma: 0.11 } },
  amber: { label: 'Amber', paperHue: 85, inkHue: 70, tint: 2, accent: { hue: 70, chroma: 0.15 } },
  olive: { label: 'Olive', paperHue: 110, inkHue: 120, tint: 2, accent: { hue: 122, chroma: 0.13 } },
  forest: { label: 'Forest', paperHue: 145, inkHue: 160, tint: 1.5, accent: { hue: 150, chroma: 0.14 } },
  mint: { label: 'Mint', paperHue: 170, inkHue: 190, tint: 2, accent: { hue: 168, chroma: 0.13 } },
  teal: { label: 'Teal', paperHue: 195, inkHue: 210, tint: 1.5, accent: { hue: 195, chroma: 0.12 } },
  sky: { label: 'Sky', paperHue: 220, inkHue: 240, tint: 1.5, accent: { hue: 225, chroma: 0.14 } },
  nord: { label: 'Nord', paperHue: 230, inkHue: 250, tint: 3, accent: { hue: 235, chroma: 0.08 } },
  ocean: { label: 'Ocean', paperHue: 240, inkHue: 255, tint: 1.5, accent: { hue: 245, chroma: 0.16 } },
  cobalt: { label: 'Cobalt', paperHue: 260, inkHue: 262, tint: 0.5, accent: { hue: 262, chroma: 0.22 } },
  indigo: { label: 'Indigo', paperHue: 275, inkHue: 278, tint: 1.5, accent: { hue: 280, chroma: 0.19 } },
  violet: { label: 'Violet', paperHue: 300, inkHue: 290, tint: 1.5, accent: { hue: 300, chroma: 0.18 } },
  fuchsia: { label: 'Fuchsia', paperHue: 320, inkHue: 290, tint: 0.5, accent: { hue: 328, chroma: 0.22 } },
  plum: { label: 'Plum', paperHue: 340, inkHue: 330, tint: 2, accent: { hue: 342, chroma: 0.12 } },
  rose: { label: 'Rose', paperHue: 10, inkHue: 355, tint: 2, accent: { hue: 5, chroma: 0.16 } },
  crimson: { label: 'Crimson', paperHue: 30, inkHue: 260, tint: 0.5, accent: { hue: 22, chroma: 0.2 } },
  graphite: { label: 'Graphite', paperHue: 260, inkHue: 260, tint: 0.5, accent: { hue: 260, chroma: 0.02 } },
} satisfies Record<string, ThemeDefinition>

export type ThemeId = keyof typeof THEMES

// Used when SITE_THEME is unset or not a known theme id.
export const DEFAULT_THEME: ThemeId = 'nord'
