"use client"

import { useAuthStore } from "@/store/authStore"
import { useAuth } from "@/hooks/useAuth"

export default function Header() {
  const nombre = useAuthStore((s) => s.nombre)
  const { cerrarSesion } = useAuth()

  return (
    <header className="flex items-center justify-between px-5 py-4 sticky top-0 z-40 bg-carbon/85 backdrop-blur-md border-b border-hierro-border">
      <div className="flex items-baseline gap-1">
        <span className="font-display-expanded text-lg tracking-tight">BRASA</span>
        <span className="w-1.5 h-1.5 rounded-full bg-ember inline-block" />
      </div>
      <div className="flex items-center gap-2.5">
        {nombre && <span className="text-xs text-ceniza font-semibold max-w-[110px] truncate">{nombre}</span>}
        <button
          onClick={cerrarSesion}
          className="text-xs text-ceniza hover:text-hueso transition-colors font-semibold"
        >
          Salir
        </button>
      </div>
    </header>
  )
}
