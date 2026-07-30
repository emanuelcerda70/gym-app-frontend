"use client"

import { useAuthStore } from "@/store/authStore"
import { useAuth } from "@/hooks/useAuth"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

export default function Header() {
  const nombre = useAuthStore((s) => s.nombre)
  const { cerrarSesion } = useAuth()

  return (
    <header className="flex items-center justify-between px-5 py-4 bg-surface-secondary/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <h1 className="font-extrabold text-lg text-gradient">GYM APP</h1>
        <Badge>AI COACH</Badge>
      </div>
      <div className="flex items-center gap-2.5">
        {nombre && <span className="text-xs text-muted font-semibold">{nombre}</span>}
        <Button variant="ghost" className="text-xs !py-1 !px-3" onClick={cerrarSesion}>
          Salir
        </Button>
      </div>
    </header>
  )
}
