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
