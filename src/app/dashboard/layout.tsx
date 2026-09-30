"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/layout/BottomNav"
import RestBar from "@/components/entrenamiento/RestBar"
import ClerkSync from "@/components/auth/ClerkSync"
import SubscriptionGate from "@/components/auth/SubscriptionGate"
import { usePerfil } from "@/hooks/usePerfil"
import { useAuthStore } from "@/store/authStore"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)
  const { perfil, isLoading: perfilLoading } = usePerfil()

  useEffect(() => {
    if (!token) return
    console.log("DEBUG PERFIL:", { cargando: perfilLoading, datos: perfil })
    if (!perfilLoading && !perfil?.objetivo) {
      router.push("/onboarding")
    }
  }, [perfilLoading, perfil, router, token])

  return (
    <>
      <ClerkSync />
      <SubscriptionGate>
        <div className="min-h-screen bg-surface">
          <RestBar />
          <div className="pb-24">{children}</div>
          <BottomNav />
        </div>
      </SubscriptionGate>
    </>
  )
}