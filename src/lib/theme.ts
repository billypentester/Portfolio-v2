import { DEFAULT_THEME, THEMES, type ThemeDefinition, type ThemeId } from '../config/themes.ts'
import { toCss, type Oklch } from '../utils/color.ts'

// Relative imports keep this module loadable by the Node test runner, which does not resolve "@/".

export type ColorMode = 'light' | 'dark'

// Names match the CSS custom properties that globals.css maps to Tailwind colours (bg-canvas, text-muted, ...).
export type TokenName =
  | 'canvas'
  | 'surface'
  | 'subtle'
  | 'line'
  | 'line-strong'
  | 'control'
  | 'fg'
  | 'muted'
  | 'faint'
  | 'accent'
  | 'accent-fg'
  | 'accent-soft'
  | 'success'
  | 'danger'

export type Palette = Record<TokenName, Oklch>

export interface ResolvedTheme {
  id: ThemeId
  label: string
  light: Palette
  dark: Palette
}

// Status colours stay constant so success and error states read the same in every theme.
const STATUS: Record<ColorMode, Pick<Palette, 'success' | 'danger'>> = {
  light: { success: { l: 48, c: 0.12, h: 155 }, danger: { l: 52, c: 0.19, h: 25 } },
  dark: { success: { l: 74, c: 0.13, h: 155 }, danger: { l: 71, c: 0.17, h: 25 } },
}

const SHADOWS: Record<ColorMode, string> = {
  light: '0 1px 2px oklch(20% 0.01 260 / 0.04), 0 8px 24px -12px oklch(20% 0.01 260 / 0.14)',
  dark: '0 1px 2px oklch(0% 0 0 / 0.3), 0 12px 32px -16px oklch(0% 0 0 / 0.6)',
}

// The lightness scale below is the original design's; only hue and chroma vary between themes.
// Form control borders ("control") stay at least 3:1 against canvas and surface (WCAG 1.4.11).
const lightPalette = ({ paperHue, inkHue, tint, accent }: ThemeDefinition): Palette => {
  const paper = (l: number, c: number): Oklch => ({ l, c: c * tint, h: paperHue })
  const ink = (l: number, c: number): Oklch => ({ l, c: c * tint, h: inkHue })
  return {
    canvas: paper(98.6, 0.004),
    surface: paper(100, 0),
    subtle: paper(96.2, 0.005),
    line: paper(90.5, 0.006),
    'line-strong': paper(82, 0.008),
    control: ink(62, 0.01),
    fg: ink(21, 0.012),
    muted: ink(44, 0.012),
    faint: ink(54, 0.01),
    accent: { l: 54, c: accent.chroma, h: accent.hue },
    'accent-fg': { l: 99, c: Math.min(accent.chroma, 0.005), h: accent.hue },
    'accent-soft': { l: 94, c: Math.min(accent.chroma * 0.25, 0.035), h: accent.hue },
    ...STATUS.light,
  }
}

const darkPalette = ({ paperHue, inkHue, tint, accent }: ThemeDefinition): Palette => {
  const paper = (l: number, c: number): Oklch => ({ l, c: c * tint, h: paperHue })
  const ink = (l: number, c: number): Oklch => ({ l, c: c * tint, h: inkHue })
  const accentHue = accent.darkHue ?? accent.hue
  return {
    canvas: ink(16.5, 0.006),
    surface: ink(19.5, 0.007),
    subtle: ink(22.5, 0.007),
    line: ink(28.5, 0.007),
    'line-strong': ink(37, 0.008),
    control: ink(52, 0.01),
    fg: paper(95.5, 0.004),
    muted: ink(73, 0.01),
    faint: ink(63, 0.01),
    accent: { l: 73, c: accent.chroma * 0.91, h: accentHue },
    'accent-fg': { l: 18, c: Math.min(accent.chroma, 0.02), h: accentHue },
    'accent-soft': { l: 28, c: Math.min(accent.chroma * 0.35, 0.05), h: accentHue },
    ...STATUS.dark,
  }
}

export const buildTheme = (id: ThemeId): ResolvedTheme => {
  const definition: ThemeDefinition = THEMES[id]
  return { id, label: definition.label, light: lightPalette(definition), dark: darkPalette(definition) }
}

const isThemeId = (value: string): value is ThemeId => Object.hasOwn(THEMES, value)

// A typo in the environment falls back to the default rather than failing the build over a cosmetic setting.
export const resolveThemeId = (value: string | undefined): ThemeId => {
  const id = value?.trim().toLowerCase()
  if (!id) return DEFAULT_THEME
  if (isThemeId(id)) return id
  console.warn(`Unknown SITE_THEME "${value}", using "${DEFAULT_THEME}". Available themes: ${Object.keys(THEMES).join(', ')}`)
  return DEFAULT_THEME
}

const declarations = (palette: Palette, mode: ColorMode): string =>
  [
    `color-scheme:${mode}`,
    ...Object.entries(palette).map(([name, color]) => `--${name}:${toCss(color)}`),
    `--shadow-lift:${SHADOWS[mode]}`,
  ].join(';')

// An explicit [data-theme] (set by ThemeToggle) wins; with no stored choice the OS preference applies.
export const themeCss = ({ light, dark }: ResolvedTheme): string => {
  const darkDeclarations = declarations(dark, 'dark')
  return [
    `:root{${declarations(light, 'light')}}`,
    `:root[data-theme="dark"]{${darkDeclarations}}`,
    `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${darkDeclarations}}}`,
  ].join('\n')
}

// Pages are prerendered, so SITE_THEME is read at build time; changing it needs a rebuild.
export const activeTheme: ResolvedTheme = buildTheme(resolveThemeId(process.env.SITE_THEME))
