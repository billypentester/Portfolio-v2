"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { track } from "@/src/lib/analytics"

interface SectionObserverProps {
  ids: string[]
}

// A section counts as viewed when at least 75% of it is visible, or, for sections taller than the
// screen, when it fills at least half the viewport, and it stays that way for DWELL_MS. The dwell
// keeps smooth scrolling (such as the scroll back to the top after navigation) and quick flings
// from reporting every section they pass.
const VISIBLE_RATIO = 0.75
const VIEWPORT_SHARE = 0.5
const DWELL_MS = 1000
const THRESHOLDS = [0, 0.05, 0.1, 0.25, 0.5, VISIBLE_RATIO, 1]

const isViewed = (entry: IntersectionObserverEntry): boolean => {
  if (!entry.isIntersecting) return false
  const fillsViewport = entry.rootBounds !== null && entry.intersectionRect.height >= entry.rootBounds.height * VIEWPORT_SHARE
  return entry.intersectionRatio >= VISIBLE_RATIO || fillsViewport
}

// Reports each section once per page view.
export default function SectionObserver({ ids }: SectionObserverProps) {
  // Re-runs on navigation too, for sections that live in the layout (such as contact).
  const pathname = usePathname()
  const idList = ids.join(" ")

  useEffect(() => {
    const seen = new Set<string>()
    const pending = new Map<string, number>()

    const cancel = (section: string) => {
      window.clearTimeout(pending.get(section))
      pending.delete(section)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.id
          if (seen.has(section)) return
          if (!isViewed(entry)) {
            cancel(section)
          } else if (!pending.has(section)) {
            pending.set(section, window.setTimeout(() => {
              pending.delete(section)
              seen.add(section)
              track({ name: "section_view", data: { section } })
            }, DWELL_MS))
          }
        })
      },
      { threshold: THRESHOLDS }
    )

    idList
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      pending.forEach((timer) => window.clearTimeout(timer))
    }
  }, [idList, pathname])

  return null
}
