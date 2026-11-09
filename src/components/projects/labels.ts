import type { ShowcaseProject } from '@/src/content/types'

const STATUS_LABEL = { active: 'In progress', shipped: 'Shipped', paused: 'Paused' } as const

// Shown above a project's title: the product domain, or the status of a personal project.
export const projectCategory = (project: ShowcaseProject): string =>
  project.kind === 'professional' ? project.domain : STATUS_LABEL[project.status]

export const projectRole = (project: ShowcaseProject): string => {
  if (project.kind === 'personal') return 'Personal project'
  const role = project.role ?? 'Professional work'
  return project.employer ? `${role} at ${project.employer}` : role
}

// Stretches the case-study link over the whole card, so the card is one large tap target.
export const STRETCHED_LINK =
  'after:absolute after:inset-0 after:z-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus'
