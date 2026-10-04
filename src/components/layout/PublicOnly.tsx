'use client'

import { usePathname } from 'next/navigation'

// Hides public-site extras (the contact section, analytics) on the private /admin pages.
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return pathname.startsWith('/admin') ? null : children
}
