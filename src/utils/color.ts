// OKLCH helpers. Themes are authored in OKLCH (perceptual lightness keeps contrast steady across
// hues); hex output serves places that cannot read CSS colour functions, such as next/og and the manifest.

export interface Oklch {
    /** Perceptual lightness, 0–100 (%). */
    l: number
    /** Chroma, 0 to roughly 0.37. */
    c: number
    /** Hue angle in degrees. */
    h: number
}

type Rgb = [number, number, number]

const round = (value: number, digits: number): number => Number(value.toFixed(digits))

export const toCss = ({ l, c, h }: Oklch): string => `oklch(${round(l, 2)}% ${round(c, 4)} ${round(h, 2)})`

// Björn Ottosson's OKLab -> linear sRGB transform (https://bottosson.github.io/posts/oklab/).
const toLinearRgb = ({ l, c, h }: Oklch): Rgb => {
    const lightness = l / 100
    const radians = (h * Math.PI) / 180
    const a = c * Math.cos(radians)
    const b = c * Math.sin(radians)

    const lc = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
    const mc = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
    const sc = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3

    return [
        4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc,
        -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc,
        -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc,
    ]
}

const GAMUT_EPSILON = 1e-4

const inGamut = (rgb: Rgb): boolean => rgb.every((channel) => channel >= -GAMUT_EPSILON && channel <= 1 + GAMUT_EPSILON)

// Like browsers, bring out-of-gamut colours into sRGB by lowering chroma, keeping lightness and hue.
const toGamutLinearRgb = (color: Oklch): Rgb => {
    const rgb = toLinearRgb(color)
    if (inGamut(rgb)) return rgb

    let low = 0
    let high = color.c
    for (let step = 0; step < 24; step++) {
        const mid = (low + high) / 2
        if (inGamut(toLinearRgb({ ...color, c: mid }))) low = mid
        else high = mid
    }
    return toLinearRgb({ ...color, c: low })
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))

const encodeGamma = (channel: number): number =>
    channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055

const decodeGamma = (channel: number): number =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4

// Inverse of toHex, for themes that reproduce exact source colours. Expects #rrggbb.
export const fromHex = (hex: string): Oklch => {
    const digits = /^#([0-9a-f]{6})$/i.exec(hex)?.[1]
    if (digits === undefined) throw new Error(`Expected a #rrggbb colour, received "${hex}"`)
    const [r, g, b] = [0, 2, 4].map((offset) => decodeGamma(parseInt(digits.slice(offset, offset + 2), 16) / 255))

    const lc = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
    const mc = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
    const sc = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

    const lightness = 0.2104542553 * lc + 0.793617785 * mc - 0.0040720468 * sc
    const a = 1.9779984951 * lc - 2.428592205 * mc + 0.4505937099 * sc
    const bb = 0.0259040371 * lc + 0.7827717662 * mc - 0.808675766 * sc
    const c = Math.hypot(a, bb)
    // Greys have no meaningful hue; 0 keeps the CSS output stable.
    const h = c < 1e-6 ? 0 : ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360
    return { l: lightness * 100, c: c < 1e-6 ? 0 : c, h }
}

export const toHex = (color: Oklch): string =>
    '#' +
    toGamutLinearRgb(color)
        .map((channel) => Math.round(clamp01(encodeGamma(clamp01(channel))) * 255).toString(16).padStart(2, '0'))
        .join('')

const relativeLuminance = (color: Oklch): number => {
    const [r, g, b] = toGamutLinearRgb(color).map(clamp01)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2 contrast ratio, from 1 to 21. */
export const contrastRatio = (first: Oklch, second: Oklch): number => {
    const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((x, y) => y - x)
    return (lighter + 0.05) / (darker + 0.05)
}
