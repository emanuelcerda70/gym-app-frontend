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
    <main className="h-screen w-full relative bg-surface overflow-hidden">
      {/* Fondo de montaña */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bg-onboarding.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradiente oscuro inferior para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

      {/* Contenido posicionado sobre el fondo */}
      <div className="relative z-10 flex h-full flex-col animate-fade-in">
        {/* Tarjetas de beneficios */}
        <div className="flex flex-1 items-end px-6 mb-[5px]">
          <ul className="w-full max-w-sm mx-auto space-y-3">
            {CARACTERISTICAS.map(({ icon: Icon, titulo, sub }) => (
              <li
                key={titulo}
                className="flex items-center gap-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 px-5 py-4 text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] text-hueso">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-sans text-sm font-bold text-hueso">{titulo}</p>
                  <p className="font-sans text-xs text-ceniza">{sub}</p>
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
            className="w-full max-w-sm h-14 rounded-2xl font-sans text-base font-bold text-hueso bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_8px_32px_rgba(108,92,255,0.4)]"
          >
            Comenzar
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowAuth(true)}
            className="font-sans text-sm text-ceniza underline underline-offset-4 hover:text-hueso transition-colors"
          >
            ¿Ya tenés una cuenta? Iniciá sesión
          </button>
        </div>
      </div>
    </main>
  )
}