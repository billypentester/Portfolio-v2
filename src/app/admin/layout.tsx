import type { Metadata } from 'next'

// Private pages: never indexed. Each page checks the session itself; this layout does not.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
