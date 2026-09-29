import type { NowContent } from './types'

// The "Now" section stays hidden until at least one item is added, e.g.
// building: [{ title: 'Funds Grid', description: '...', status: 'In progress', stack: ['Next.js'], href: '/projects/funds-grid' }]
export const now: NowContent = {
  building: [],
  learning: [],
}
