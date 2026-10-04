import type { ThemeId } from '../../config/themes.ts'
import { RESUME_PREFIX } from '../resume.ts'
import { isThemeId } from '../theme.ts'

// Relative imports keep this module loadable by the Node test runner, which does not resolve "@/".

// Stored as JSON under one Redis key and edited in /admin.
export interface PortfolioSettings {
  theme: ThemeId
  resume: {
    /** Blob pathname of the resume served at /resume, or null to serve the newest upload. */
    active: string | null
  }
  /** ISO timestamp of the last save from /admin; null while only the defaults apply. */
  updatedAt: string | null
}

export type SettingsInput = Omit<PortfolioSettings, 'updatedAt'>

export type SettingsValidationResult =
  | { valid: true; data: SettingsInput }
  | { valid: false; error: string }

const MAX_PATHNAME_LENGTH = 256

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isResumePathname = (value: unknown): value is string =>
  typeof value === 'string' &&
  value.length <= MAX_PATHNAME_LENGTH &&
  value.startsWith(RESUME_PREFIX) &&
  value.toLowerCase().endsWith('.pdf')

// Redis only holds what /admin wrote, but it is read defensively: a field that is missing or no
// longer valid (for example a theme removed from THEMES) falls back to its default instead of failing.
export const parseStoredSettings = (value: unknown, defaults: PortfolioSettings): PortfolioSettings => {
  if (!isRecord(value)) return defaults
  const resume = isRecord(value.resume) ? value.resume : {}
  return {
    theme: typeof value.theme === 'string' && isThemeId(value.theme) ? value.theme : defaults.theme,
    resume: { active: isResumePathname(resume.active) ? resume.active : defaults.resume.active },
    updatedAt:
      typeof value.updatedAt === 'string' && !Number.isNaN(Date.parse(value.updatedAt)) ? value.updatedAt : defaults.updatedAt,
  }
}

// Form values are untrusted: the theme must be a key of THEMES and the resume one of the files that
// currently exist in Blob storage. An empty resume value means "always serve the newest upload".
export const validateSettingsInput = (
  input: { theme: unknown; resume: unknown },
  availableResumes: readonly string[],
): SettingsValidationResult => {
  if (typeof input.theme !== 'string' || !isThemeId(input.theme)) {
    return { valid: false, error: 'Choose one of the available themes.' }
  }
  if (input.resume === '') {
    return { valid: true, data: { theme: input.theme, resume: { active: null } } }
  }
  if (typeof input.resume !== 'string' || !availableResumes.includes(input.resume)) {
    return { valid: false, error: 'Choose one of the uploaded resumes.' }
  }
  return { valid: true, data: { theme: input.theme, resume: { active: input.resume } } }
}
