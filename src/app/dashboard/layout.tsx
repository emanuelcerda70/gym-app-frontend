"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/layout/BottomNav"
import RestBar from "@/components/entrenamiento/RestBar"
import ClerkSync from "@/components/auth/ClerkSync"
import { usePerfil } from "@/hooks/usePerfil"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { perfil, isLoading: perfilLoading } = usePerfil()

  useEffect(() => {
    console.log("DEBUG PERFIL:", { cargando: perfilLoading, datos: perfil })
    if (!perfilLoading && !perfil?.objetivo) {
      router.push("/onboarding")
    }
  }, [perfilLoading, perfil, router])

  return (
    <div className="min-h-screen bg-surface">
      <ClerkSync />
      <RestBar />
      <div className="pb-24">{children}</div>
      <BottomNav />
    </div>
  )
}