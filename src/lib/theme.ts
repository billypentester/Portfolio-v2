import { DEFAULT_THEME, THEMES, type ColorOverrides, type ThemeDefinition, type ThemeId } from '../config/themes.ts'
import { fromHex, toCss, type Oklch } from '../utils/color.ts'

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
  | 'brand'
  | 'spectrum-1'
  | 'spectrum-2'
  | 'spectrum-3'
  | 'spectrum-4'
  | 'focus'
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

// A single soft, wide drop for hovered cards and lifted panels.
const SHADOWS: Record<ColorMode, string> = {
  light: '0 8px 30px oklch(0% 0 0 / 0.06)',
  dark: '0 1px 2px oklch(0% 0 0 / 0.3), 0 12px 32px -16px oklch(0% 0 0 / 0.6)',
}

// Decorative spectrum, set around the accent hue like the Clay source palette: a complementary sky,
// then sun, orange and red stepping down to the accent. spectrum-4 also colours large gradient
// headings, so it keeps 3:1 against the canvas in both modes.
const SPECTRUM: { offset: number; l: number; c: number }[] = [
  { offset: 180, l: 79, c: 0.09 },
  { offset: 45, l: 83, c: 0.14 },
  { offset: 15, l: 72, c: 0.14 },
  { offset: -15, l: 62, c: 0.17 },
]

const spectrum = (hue: number): Pick<Palette, 'spectrum-1' | 'spectrum-2' | 'spectrum-3' | 'spectrum-4'> => {
  const [one, two, three, four] = SPECTRUM.map(({ offset, l, c }): Oklch => ({ l, c, h: (hue + offset + 360) % 360 }))
  return { 'spectrum-1': one, 'spectrum-2': two, 'spectrum-3': three, 'spectrum-4': four }
}

// Source colours win over derived ones. Focus rings and the brand colour follow the final accent
// unless they are set explicitly, so overriding the accent alone keeps them consistent.
const applyOverrides = (derived: Palette, overrides: ColorOverrides = {}): Palette => {
  const palette = { ...derived }
  for (const [token, hex] of Object.entries(overrides) as [TokenName, string][]) palette[token] = fromHex(hex)
  if (overrides.focus === undefined) palette.focus = palette.accent
  if (overrides.brand === undefined) palette.brand = palette.accent
  return palette
}

// The lightness scale below is the original design's; only hue and chroma vary between themes.
// Form control borders ("control") and focus rings stay at least 3:1 against canvas and surface (WCAG 1.4.11).
const lightPalette = ({ paperHue, inkHue, tint, accent, light }: ThemeDefinition): Palette => {
  const paper = (l: number, c: number): Oklch => ({ l, c: c * tint, h: paperHue })
  const ink = (l: number, c: number): Oklch => ({ l, c: c * tint, h: inkHue })
  const accentColor: Oklch = { l: 54, c: accent.chroma, h: accent.hue }
  return applyOverrides({
    canvas: paper(98.6, 0.004),
    surface: paper(100, 0),
    subtle: paper(96.2, 0.005),
    line: paper(90.5, 0.006),
    'line-strong': paper(82, 0.008),
    control: ink(62, 0.01),
    fg: ink(21, 0.012),
    muted: ink(44, 0.012),
    faint: ink(54, 0.01),
    accent: accentColor,
    'accent-fg': { l: 99, c: Math.min(accent.chroma, 0.005), h: accent.hue },
    'accent-soft': { l: 94, c: Math.min(accent.chroma * 0.25, 0.035), h: accent.hue },
    brand: accentColor,
    ...spectrum(accent.hue),
    focus: accentColor,
    ...STATUS.light,
  }, light)
}

const darkPalette = ({ paperHue, inkHue, tint, accent, dark }: ThemeDefinition): Palette => {
  const paper = (l: number, c: number): Oklch => ({ l, c: c * tint, h: paperHue })
  const ink = (l: number, c: number): Oklch => ({ l, c: c * tint, h: inkHue })
  const accentHue = accent.darkHue ?? accent.hue
  const accentColor: Oklch = { l: 73, c: accent.chroma * 0.91, h: accentHue }
  return applyOverrides({
    canvas: ink(16.5, 0.006),
    surface: ink(19.5, 0.007),
    subtle: ink(22.5, 0.007),
    line: ink(28.5, 0.007),
    'line-strong': ink(37, 0.008),
    control: ink(52, 0.01),
    fg: paper(95.5, 0.004),
    muted: ink(73, 0.01),
    faint: ink(63, 0.01),
    accent: accentColor,
    'accent-fg': { l: 18, c: Math.min(accent.chroma, 0.02), h: accentHue },
    'accent-soft': { l: 28, c: Math.min(accent.chroma * 0.35, 0.05), h: accentHue },
    brand: accentColor,
    ...spectrum(accentHue),
    focus: accentColor,
    ...STATUS.dark,
  }, dark)
}

export const buildTheme = (id: ThemeId): ResolvedTheme => {
  const definition: ThemeDefinition = THEMES[id]
  return { id, label: definition.label, light: lightPalette(definition), dark: darkPalette(definition) }
}

export const isThemeId = (value: string): value is ThemeId => Object.hasOwn(THEMES, value)

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
