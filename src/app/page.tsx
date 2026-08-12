"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { TrendingUp, Users, Trophy, ArrowRight } from "lucide-react"

const CARACTERISTICAS = [
  { icon: TrendingUp, titulo: "Progreso real", sub: "Registrá series y mirá tu evolución" },
  { icon: Users, titulo: "Plan a tu medida", sub: "Objetivos y rutinas adaptadas a vos" },
  { icon: Trophy, titulo: "Constancia", sub: "Rachas que te mantienen en movimiento" },
]

export default function HomePage() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  // Si ya hay sesión iniciada, saltamos directo al dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard")
    }
  }, [isLoaded, isSignedIn, router])

  // Al entrar al estado de autenticación, vamos al login real de Clerk
  useEffect(() => {
    if (showAuth) {
      router.push("/sign-in")
    }
  }, [showAuth, router])

  return (
    <main className="h-screen w-full relative bg-surface overflow-hidden bg-[url('/ascend-bg.png')] bg-cover bg-center">
      {/* ESTADO 1: Splash de bienvenida */}
      {!showAuth && (
        <div className="relative z-10 flex h-full flex-col animate-fade-in">
          {/* Layout superior con el logo */}
          <header className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-ascend.png"
                alt="ASCEND"
                className="h-9 w-auto drop-shadow-[0_0_20px_rgba(108,92,255,0.45)]"
              />
              <span className="font-display text-lg font-black tracking-tighter text-text-primary">
                ASCEND
              </span>
            </div>
          </header>

          {/* Contenido central */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <h1 className="font-display text-4xl font-black tracking-tighter text-text-primary drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] mb-4">
              Entrená mejor.
              <br />
              Superá tus límites.
              <br />
              Alcanzá tu cima.
            </h1>

            <ul className="w-full max-w-sm space-y-3 mt-8">
              {CARACTERISTICAS.map(({ icon: Icon, titulo, sub }) => (
                <li
                  key={titulo}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 px-5 py-4 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-sans text-sm font-bold text-text-primary">{titulo}</p>
                    <p className="font-sans text-xs text-text-secondary">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Acciones inferiores */}
          <div className="flex flex-col items-center gap-3 px-6 pb-10">
            <button
              type="button"
              onClick={() => setShowAuth(true)}
              className="w-full max-w-sm h-14 rounded-2xl font-sans text-base font-bold text-white bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_8px_32px_rgba(108,92,255,0.4)]"
            >
              Comenzar
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowAuth(true)}
              className="font-sans text-sm text-text-secondary underline underline-offset-4 hover:text-text-primary transition-colors"
            >
              ¿Ya tenés una cuenta? Iniciá sesión
            </button>
          </div>
        </div>
      )}

      {/* ESTADO 2: Overlay difuminado sobre el mismo fondo */}
      {showAuth && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-md transition-all duration-500 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 animate-fade-in px-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-ascend.png"
              alt="ASCEND"
              className="h-12 w-auto drop-shadow-[0_0_20px_rgba(108,92,255,0.45)]"
            />
            <p className="font-sans text-sm text-text-secondary">
              Cargando el acceso a ASCEND...
            </p>
          </div>
        </div>
      )}
    </main>
  )
}