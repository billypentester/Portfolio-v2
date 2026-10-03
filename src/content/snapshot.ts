import { yearsSince } from '@/src/utils'
import { experience } from './experience'
import { showcaseProjects } from './projects'
import type { SnapshotMetric } from './types'

const careerStart = experience.reduce((earliest, role) => (role.start < earliest ? role.start : earliest), experience[0].start)
const professionalCount = showcaseProjects.filter((p) => p.kind === 'professional').length

// Figures come from the experience data or the resume; update them there, not here.
export const snapshot: SnapshotMetric[] = [
  {
    value: `${yearsSince(careerStart)}+`,
    label: 'Years engineering',
    detail: 'Client work since 2022, Simplex since 2023',
    href: '/experience',
  },
  {
    value: '20+',
    label: 'Production modules',
    detail: 'From business requirements to production at Simplex',
    href: '/experience#simplex',
  },
  {
    value: '10+',
    label: 'Client applications',
    detail: 'Crypto exchange, e-commerce, SPA and CMS at Cache First',
    href: '/experience#cache-first',
  },
  {
    value: String(professionalCount),
    label: 'Production platforms',
    detail: 'Ordering, loyalty and healthcare products',
    href: '/projects',
  },
]
