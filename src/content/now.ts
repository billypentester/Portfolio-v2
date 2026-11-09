import type { NowContent } from './types'

// The "Now" section stays hidden while both lists are empty.
// Add `stack` and `href` to an item once they are public.
export const now: NowContent = {
  building: [
    {
      title: 'Funds Grid',
      description:
        'A portfolio tracker for PSX stocks, ETFs and Pakistani mutual funds, designed and built on my own outside client work.',
      status: 'In progress',
      stack: ['Next.js', 'NestJS', 'Prisma', 'MySQL'],
      href: '/projects/funds-grid',
    },
  ],
  learning: [
    {
      title: 'Agentic AI Application Development',
      description:
        'Exploring agent architectures, tool use, multi-step workflows, and building practical AI applications.',
      status: 'Learning',
    },
  ],
}
