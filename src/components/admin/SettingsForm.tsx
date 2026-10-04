'use client'

import { startTransition, useActionState, useState } from 'react'
import IconBuilder from '@/src/helpers/IconBuilder'
import { THEMES, type ThemeId } from '@/src/config/themes'
import { updateSettings, type SettingsFormState } from '@/src/lib/admin/actions'
import { buildTheme, themeCss, type ResolvedTheme } from '@/src/lib/theme'
import { toCss } from '@/src/utils/color'
import { buttonStyles } from '@/src/components/ui/button'
import { inputStyles } from '@/src/components/ui/input'
import StatusMessage from '@/src/components/ui/StatusMessage'

const INITIAL_STATE: SettingsFormState = { status: 'idle' }

// Every theme in src/config/themes.ts, resolved so the cards can show real colours.
const THEME_OPTIONS: ResolvedTheme[] = (Object.keys(THEMES) as ThemeId[]).map(buildTheme)

export interface ResumeOption {
  pathname: string
  label: string
}

interface SettingsFormProps {
  /** The theme the live site uses. */
  theme: ThemeId
  /** The resume pathname to preselect, or '' for the newest upload. */
  resume: string
  resumes: ResumeOption[]
  /** False while Redis is unavailable; the page explains why. */
  canSave: boolean
}

function ThemeSwatch({ theme }: { theme: ResolvedTheme }) {
  return (
    <span aria-hidden="true" className="flex h-12 overflow-hidden rounded-control border border-line">
      {[theme.light, theme.dark].map((palette, index) => (
        <span key={index} className="flex flex-1 items-center justify-center gap-1.5" style={{ backgroundColor: toCss(palette.canvas) }}>
          <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: toCss(palette.fg) }} />
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: toCss(palette.accent) }} />
        </span>
      ))}
    </span>
  )
}

export default function SettingsForm({ theme, resume, resumes, canSave }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(updateSettings, INITIAL_STATE)
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(theme)
  const [selectedResume, setSelectedResume] = useState(resume)
  const previewing = selectedTheme !== theme

  // Submitting in a transition (as the contact form does) keeps the selections instead of resetting the form.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => formAction(formData))
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="grid gap-10" aria-describedby="settings-status">
      {/* Live preview: overrides the page's colour tokens until the choice is saved or reverted. */}
      {previewing && <style dangerouslySetInnerHTML={{ __html: themeCss(buildTheme(selectedTheme)) }} />}

      <fieldset>
        <legend className="text-heading font-semibold">Theme</legend>
        <p className="mt-1 text-sm text-muted">
          {previewing
            ? `Previewing ${THEMES[selectedTheme].label} on this page. Save to apply it to the site.`
            : 'Selecting a theme previews it on this page.'}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEME_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="grid cursor-pointer gap-3 rounded-card border border-line bg-surface p-3 transition-colors hover:border-line-strong has-[:checked]:border-fg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus"
            >
              <input
                type="radio"
                name="theme"
                value={option.id}
                checked={selectedTheme === option.id}
                onChange={() => setSelectedTheme(option.id)}
                className="sr-only"
              />
              <ThemeSwatch theme={option} />
              <span className="flex items-center justify-between gap-2 text-sm font-medium">
                {option.label}
                {option.id === theme && <span className="font-mono text-eyebrow uppercase text-faint">Live</span>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="resume" className="text-heading font-semibold">Resume</label>
        <p id="resume-help" className="mt-1 text-sm text-muted">
          Every download link on the site points to /resume, which serves this file.
        </p>
        <select
          id="resume"
          name="resume"
          value={selectedResume}
          onChange={(event) => setSelectedResume(event.target.value)}
          aria-describedby="resume-help"
          className={`${inputStyles} mt-4`}
        >
          <option value="">Newest upload (automatic)</option>
          {resumes.map((option) => (
            <option key={option.pathname} value={option.pathname}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div id="settings-status" role="status" aria-live="polite" className="min-h-6 text-sm">
          {state.status === 'success' && <StatusMessage tone="success">{state.message}</StatusMessage>}
          {state.status === 'error' && <StatusMessage tone="danger">{state.message}</StatusMessage>}
        </div>
        <button type="submit" disabled={pending || !canSave} className={buttonStyles('primary', 'md', 'w-full sm:w-auto')}>
          {pending ? (
            <>
              <IconBuilder type="spinner" paint="h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : (
            'Save changes'
          )}
        </button>
      </div>
    </form>
  )
}
