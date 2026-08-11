"use client"

import { useEffect, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import { useAuthStore } from "@/store/authStore"
import { api } from "@/lib/api"

export default function ClerkSync() {
  const { isLoaded, isSignedIn, user } = useUser()
  const setAuth = useAuthStore((s) => s.setAuth)
  const token = useAuthStore((s) => s.token)
  const syncDisparado = useRef(false)

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return
    if (syncDisparado.current) return

    const email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress

    if (!email) return

    syncDisparado.current = true
    const nombre =
      user.firstName || user.username || email.split("@")[0] || "Atleta"

    api.auth.sync(email, nombre)
      .then((data) => {
        setAuth(data.access_token, data.usuario_id, data.nombre)
      })
      .catch(() => {
        syncDisparado.current = false
      })
  }, [isLoaded, isSignedIn, user, token, setAuth])

  return null
}