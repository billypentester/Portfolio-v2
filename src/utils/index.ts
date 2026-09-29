import type { YearMonth } from '@/src/content/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parseYearMonth = (value: YearMonth): { year: number; month: number } => {
    const [year, month] = value.split('-').map(Number)
    if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
        throw new Error(`Invalid YearMonth "${value}", expected YYYY-MM`)
    }
    return { year, month }
}

export const formatYearMonth = (value: YearMonth | null): string => {
    if (value === null) return 'Present'
    const { year, month } = parseYearMonth(value)
    return `${MONTHS[month - 1]} ${year}`
}

// Counts both the start and end month, the way LinkedIn does: Sep 2022 to Sep 2023 is 13 months,
// and a role that starts and ends in the same month is 1 month.
export const monthsBetween = (start: YearMonth, end: YearMonth | null, now: Date = new Date()): number => {
    const from = parseYearMonth(start)
    const to = end === null ? { year: now.getFullYear(), month: now.getMonth() + 1 } : parseYearMonth(end)
    const months = (to.year - from.year) * 12 + (to.month - from.month)
    return Math.max(months, 0) + 1
}

export const formatDuration = (months: number): string => {
    const years = Math.floor(months / 12)
    const rest = months % 12
    const parts = [
        years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '',
        rest > 0 ? `${rest} mo${rest > 1 ? 's' : ''}` : '',
    ].filter(Boolean)
    return parts.join(' ') || '1 mo'
}

// Whole years elapsed since a start month, e.g. Sep 2022 -> 4 in Sep 2026.
export const yearsSince = (start: YearMonth, now: Date = new Date()): number => {
    return Math.floor((monthsBetween(start, null, now) - 1) / 12)
}
