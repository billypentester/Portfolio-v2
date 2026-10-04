import type { NowContent } from './types'

// The "Now" section stays hidden while both lists are empty.
// Add `stack` and `href` to an item once they are public.
export const now: NowContent = {
  building: [
    {
      title: 'Funds Grid',
      description:
        'A personal investment and portfolio tracking application, designed and built on my own outside client work.',
      status: 'In progress',
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
