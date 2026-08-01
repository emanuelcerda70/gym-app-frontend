"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const KEY = "gymApp.prevRoute"

export function getPrevRoute(): string | null {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem(KEY)
}

export function clearPrevRoute() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(KEY)
}

export default function RouteRecorder() {
  const pathname = usePathname()

  useEffect(() => {
    const prev = sessionStorage.getItem(KEY)
    if (prev !== pathname) {
      sessionStorage.setItem(KEY, pathname)
    }
  }, [pathname])

  return null
}
