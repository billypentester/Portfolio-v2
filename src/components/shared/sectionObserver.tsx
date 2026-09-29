"use client"

import { useEffect } from "react"
import { track } from "@/src/lib/analytics"

interface SectionObserverProps {
  ids: string[]
}

// Reports each section once per page view when it is at least 75% visible.
export default function SectionObserver({ ids }: SectionObserverProps) {
  useEffect(() => {
    const seen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id)
            track(`${entry.target.id}_section_view`)
          }
        })
      },
      { threshold: 0.75 }
    )

    ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids])

  return null
}
