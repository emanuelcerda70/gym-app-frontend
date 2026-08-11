"use client"

import { useRouter } from "next/navigation"
import { useClerk } from "@clerk/nextjs"
import { useAuthStore } from "@/store/authStore"
import { getPrevRoute } from "@/components/layout/RouteRecorder"

export default function Header({ backTo }: { backTo?: string }) {
  const router = useRouter()
  const nombre = useAuthStore((s) => s.nombre)
  const logout = useAuthStore((s) => s.logout)
  const { signOut } = useClerk()

  const cerrarSesion = async () => {
    logout()
    try {
      await signOut({ redirectUrl: "/sign-in" })
    } catch {
      router.push("/sign-in")
    }
  }

  return (
    <header className="flex h-[60px] items-center justify-between px-5 sticky top-0 z-40 bg-carbon/85 backdrop-blur-md border-b border-hierro-border">
      {backTo ? (
        <button
          onClick={() => {
            const prev = getPrevRoute()
            if (prev && prev !== window.location.pathname) router.push(prev)
            else router.push(backTo)
          }}
          className="flex items-center gap-1.5 text-sm font-semibold text-hueso hover:text-ember-soft transition-colors"
        >
          <span className="text-base leading-none">←</span> Volver
        </button>
      ) : (
        <div className="flex items-baseline gap-1">
          <span className="font-display-expanded text-lg tracking-tight">ASCEND</span>
          <span className="w-1.5 h-1.5 rounded-full bg-ember inline-block" />
        </div>
      )}
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
