"use client"

import { usePerfil } from "@/hooks/usePerfil"
import { useClerk, useUser } from "@clerk/nextjs"
import { Sparkles, ShieldAlert, MessageCircle, LogOut, CheckCircle2, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface SubscriptionGateProps {
  children: React.ReactNode
}

export default function SubscriptionGate({ children }: SubscriptionGateProps) {
  const { perfil, isLoading } = usePerfil()
  const { signOut } = useClerk()
  const { isLoaded: userLoaded, user } = useUser()
  const [demoraServidor, setDemoraServidor] = useState(false)

  // Detectar si el servidor tarda en responder (típico cold-start de Render)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isLoading) {
      timer = setTimeout(() => {
        setDemoraServidor(true)
      }, 5000)
    } else {
      setDemoraServidor(false)
    }
    return () => clearTimeout(timer)
  }, [isLoading])

  // 1. Bypass completo e inmediato para Emanuel / Superadmin
  // ¡Se valida directo desde Clerk para que Emanuel NUNCA quede trabado esperando al backend!
  const emailClerk = user?.primaryEmailAddress?.emailAddress?.toLowerCase() || ""
  const esSuperAdmin =
    emailClerk === "emanuelcerda70@gmail.com" ||
    perfil?.es_admin ||
    perfil?.rol === "admin" ||
    (perfil?.email && perfil.email.toLowerCase() === "emanuelcerda70@gmail.com")

  if (esSuperAdmin) {
    return (
      <>
        {/* Barra superior de Superadmin visible en toda la app para Emanuel */}
        <div className="bg-gradient-to-r from-[#6C5CFF] via-[#00D4FF] to-[#6C5CFF] text-white text-[11px] font-black uppercase tracking-wider py-1.5 px-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-2">
            <Crown className="w-3.5 h-3.5 fill-white" />
            <span>Modo SuperAdmin Activo — Emanuel</span>
          </div>
          <Link
            href="/superadmin"
            className="bg-black/30 hover:bg-black/50 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold transition-all border border-white/20 flex items-center gap-1"
          >
            Panel de Control →
          </Link>
        </div>
        {children}
      </>
    )
  }

  // 2. Pantalla de carga mientras se verifica el perfil
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-ascend.png"
          alt="ASCEND"
          className="w-16 h-16 animate-pulse drop-shadow-[0_0_25px_rgba(108,92,255,0.6)]"
        />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#7A8090]">
          Sincronizando estado de cuenta...
        </p>
        {demoraServidor && (
          <div className="mt-4 max-w-xs bg-[#14141A] border border-[#2B2B36] rounded-xl p-3 text-xs text-[#9CA3AF]">
            <p className="text-white font-semibold mb-1">Reactivando servidor en la nube</p>
            <p className="text-[11px] text-[#7A8090]">
              El backend se está iniciando tras un reposo automático. Tomará solo unos segundos más...
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-[10px] text-[#00D4FF] hover:underline font-bold"
            >
              Reintentar
            </button>
          </div>
        )}
      </div>
    )
  }

  // Verificar si la suscripción está bloqueada o vencida
  const estaInactivo =
    perfil?.estado_suscripcion === "inactivo" ||
    (perfil?.estado_suscripcion === "prueba" && (perfil?.dias_restantes ?? 0) <= 0)

  if (estaInactivo) {
    const emailUsuario = perfil?.email || ""
    const waUrlAtleta = `https://wa.me/5492994191307?text=${encodeURIComponent(
      `Hola Emanuel! Quiero activar/renovar mi suscripción al Plan Atleta ($10 USD) en ASCEND. Mi email de cuenta es: ${emailUsuario}`
    )}`
    const waUrlGym = `https://wa.me/5492994191307?text=${encodeURIComponent(
      `Hola Emanuel! Entreno en un gimnasio y quiero que sumen ASCEND para tener acceso bonificado. Mi email es: ${emailUsuario}`
    )}`

    return (
      <main className="min-h-screen bg-[#09090B] text-[#F5F7FA] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Halos de luz de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6C5CFF]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D4FF]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-lg w-full bg-[#14141A]/90 border border-[#2B2B36] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          {/* Logo e Isotipo */}
          <div className="text-center flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-ascend.png"
              alt="ASCEND"
              className="w-16 h-16 object-contain drop-shadow-[0_0_30px_rgba(108,92,255,0.5)] mb-3"
            />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-bold text-red-400 mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              Suscripción Requerida
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
              Tu período ha finalizado
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-sm">
              Para seguir entrenando con el Asistente IA 24/7 y registrar tus récords, activá tu acceso mensual.
            </p>
          </div>

          {/* Opciones de Activación */}
          <div className="mt-6 space-y-3.5">
            {/* Tarjeta Plan Atleta */}
            <div className="bg-[#1C1C24] border border-[#6C5CFF]/40 hover:border-[#6C5CFF] rounded-2xl p-4 transition-all">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00D4FF]">
                    Opción Directa
                  </span>
                  <h2 className="text-base font-bold text-white mt-0.5">
                    Plan Atleta Particular
                  </h2>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    Acceso 100% independiente para entrenar en cualquier sala.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl font-extrabold text-white font-mono">$10</span>
                  <span className="text-[11px] text-[#7A8090] block">USD / mes</span>
                </div>
              </div>

              <ul className="mt-3 space-y-1.5 text-xs text-[#E4E4E7]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
                  <span>IA en Entrenamiento & Nutrición 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
                  <span>Catálogo de videos 3D anatómicos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
                  <span>Cálculo de 1RM y tracking de sobrecarga</span>
                </li>
              </ul>

              <a
                href={waUrlAtleta}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C5CFF] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-[#6C5CFF]/20 transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4" />
                Activar por WhatsApp ($10 USD)
              </a>
              <p className="text-[10px] text-center text-[#7A8090] mt-1.5">
                Transferencia bancaria en USD o en ARS al dólar blue del día.
              </p>
            </div>

            {/* Alternativa Gimnasio */}
            <div className="bg-[#1C1C24]/60 border border-[#2B2B36] rounded-2xl p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6C5CFF]/15 text-[#00D4FF] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">¿Querés que tu gym lo pague?</p>
                  <p className="text-[11px] text-[#9CA3AF]">
                    Si tu gimnasio adquiere ASCEND ($100 USD), tu acceso es 100% gratis.
                  </p>
                </div>
              </div>
              <a
                href={waUrlGym}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[11px] font-bold text-[#00D4FF] hover:text-white border border-[#00D4FF]/30 hover:border-[#00D4FF] px-3 py-1.5 rounded-lg transition-all"
              >
                Recomendar →
              </a>
            </div>
          </div>

          {/* Botón Salir */}
          <div className="mt-6 pt-4 border-t border-[#2B2B36] flex items-center justify-between text-xs">
            <span className="text-[#7A8090] truncate max-w-[200px]">{emailUsuario}</span>
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="text-[#9CA3AF] hover:text-red-400 flex items-center gap-1.5 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Usuario en período de prueba activo (14 días gratis)
  const esPrueba = perfil?.estado_suscripcion === "prueba"
  const diasRestantes = perfil?.dias_restantes ?? 14

  return (
    <div>
      {/* Banner informativo de prueba gratis para no-admins */}
      {esPrueba && diasRestantes > 0 && (
        <div className="bg-[#14141A] border-b border-[#6C5CFF]/30 text-xs py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-white font-medium">
              Prueba Gratuita: te quedan{" "}
              <strong className="text-[#00D4FF]">{diasRestantes} días</strong> de acceso total.
            </span>
          </div>
          <a
            href={`https://wa.me/5492994191307?text=${encodeURIComponent(
              `Hola Emanuel! Estoy usando la prueba de ASCEND y quiero abonar el Plan Atleta ($10 USD) para asegurar mi mes.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-[#6C5CFF] hover:text-white flex items-center gap-1 transition-colors"
          >
            Asegurar mi Mes <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      )}

      {children}
    </div>
  )
}
