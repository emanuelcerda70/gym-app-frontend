"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import type { ReactNode } from "react"

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)

  useEffect(() => {
    if (!token) router.replace("/")
  }, [token, router])

  if (!token) return null

  return <>{children}</>
}
 
