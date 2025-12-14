"use client"

import { useEffect } from "react"

interface SectionObserverProps {
  ids: string[]
}

export default function SectionObserver({ ids }: SectionObserverProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.umami) {
                window.umami.track(`${entry.target.id}_section_view`)
            }
          }
        })
      },
      { threshold: 0.75 }
    )

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids])

  return null
}
