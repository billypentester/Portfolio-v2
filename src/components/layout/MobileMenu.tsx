'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import IconBuilder from '@/src/helpers/IconBuilder'
import { fullName, profile, socialLinks } from '@/src/content/profile'
import { buttonStyles } from '@/src/components/ui/button'
import NavLinks from './NavLinks'

// Native <dialog> gives focus trapping, Escape to close and an inert background for free.
export default function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  // The menu is hidden at the md breakpoint, so an open modal would leave the page inert.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close()
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  const closeOnBackdrop = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) close()
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-control text-fg hover:bg-subtle md:hidden"
      >
        <IconBuilder type="menu" paint="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        onClick={closeOnBackdrop}
        aria-label="Site menu"
        className="sheet m-0 ml-auto h-dvh max-h-dvh w-full max-w-sm bg-canvas p-0 text-fg open:flex open:flex-col md:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-ui font-semibold tracking-tight">{fullName}</span>
            <span className="truncate font-mono text-xs text-faint">{profile.role.toLowerCase()}</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-control hover:bg-subtle"
          >
            <IconBuilder type="close" paint="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
          <NavLinks
            onNavigate={close}
            className="flex flex-col"
            linkClassName="flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight"
          />
        </nav>

        <div className="grid gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link href="/#contact" onClick={close} className={buttonStyles('primary', 'md', 'w-full')}>
            Let&apos;s talk
          </Link>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener"
            data-umami-event="resume_download"
            className={buttonStyles('secondary', 'md', 'w-full')}
          >
            Download resume
            <IconBuilder type="download" paint="h-4 w-4" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <ul className="mt-2 flex justify-center gap-1" aria-label="Social links">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  {...(link.platform === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  data-umami-event={`${link.platform}_click`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-control text-muted hover:bg-subtle hover:text-fg"
                >
                  <IconBuilder type={link.platform} paint="h-[18px] w-[18px]" />
                  <span className="sr-only">{link.label}{link.platform === 'email' ? '' : ' (opens in a new tab)'}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  )
}
