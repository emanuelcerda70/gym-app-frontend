"use client"

import { useState } from "react"
import Link from "next/link"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Button from "@/components/ui/Button"
import Fueguito from "@/components/ui/Fueguito"
import { useCheckin } from "@/hooks/useCheckin"
import { usePerfil } from "@/hooks/usePerfil"
import { useRutinas } from "@/hooks/useRutinas"
import { cn } from "@/lib/utils"

function proximoHito(racha: number): { falta: number; hito: number } | null {
  if (racha <= 0) return null
  if (racha % 7 === 0) return null
  const hito = (Math.floor(racha / 7) + 1) * 7
  return { falta: hito - racha, hito }
}

export default function HomePage() {
  const { perfil } = usePerfil()
  const { historial, registrar } = useCheckin()
  const { rutinaActual } = useRutinas()

  const [flare, setFlare] = useState(false)
  const [rachaLocal, setRachaLocal] = useState<number | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)

  const racha = rachaLocal ?? perfil?.racha_actual_dias ?? 0
  const totalDias = historial.data?.total_dias ?? 0
  const fechas = historial.data?.fechas ?? []
  const tieneRutina = rutinaActual.data && !rutinaActual.isError

  const hoyISO = new Date().toISOString().slice(0, 10)
  const checkeadoHoy = fechas.includes(hoyISO)

  const handleCheckin = () => {
    registrar.mutate(undefined, {
      onSuccess: (res) => {
        setAviso(res.mensaje)
        if (res.racha_actual > racha || racha === 0) {
          setRachaLocal(res.racha_actual)
          setFlare(true)
          setTimeout(() => setFlare(false), 700)
        }
        setTimeout(() => setAviso(null), 2600)
      },
    })
  }

  const ultimaSemana = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-5 pb-28 space-y-3.5 animate-fade-in max-w-md mx-auto">
        {/* Hero de racha */}
        <section className="glass rounded-xl p-5 flex items-center gap-4">
          <Fueguito racha={racha} size={64} flare={flare} />
          <div className="min-w-0">
            <div key={`n-${racha}`} className={cn("font-display-expanded text-[72px] leading-none", racha > 0 && "text-ember-glow", flare && "animate-tick")}>
              {racha}
            </div>
            <p className="label-caps -mt-0.5">días de racha</p>
            {proximoHito(racha) && (
              <p className="text-[11px] text-ceniza mt-1.5">
                Te faltan <span className="text-ember-soft font-bold">{proximoHito(racha)!.falta}</span> para el hito de {proximoHito(racha)!.hito} 🔥
              </p>
            )}
          </div>
          <div className="ml-auto flex flex-col items-end gap-1.5">
            <Button
              onClick={handleCheckin}
              disabled={registrar.isPending || checkeadoHoy}
              className="!py-2.5 !px-5 text-[13px]"
            >
              {checkeadoHoy ? "Listo por hoy" : registrar.isPending ? "..." : "Check-in"}
            </Button>
            <p className="text-[10px] text-ceniza-dim text-right">
              {totalDias > 0 ? `${totalDias} días entrenados` : "Arrancá hoy"}
            </p>
          </div>
        </section>

        {aviso && (
          <div className="bg-ember/10 border border-ember/25 rounded-lg px-4 py-2.5 text-[13px] text-ember-soft font-medium animate-float-in">
            {aviso.replace(/💪|🔥/g, "")}
          </div>
        )}

        {/* Bento */}
        <div className="grid grid-cols-3 gap-3.5">
          {/* Entrená hoy */}
          <div className="col-span-3 glass rounded-xl p-5 relative overflow-hidden">
            <p className="label-caps mb-1">Hoy</p>
            {tieneRutina ? (
              <>
                <h2 className="font-display text-lg font-bold leading-tight mb-0.5">
                  {rutinaActual.data?.nombre_rutina}
                </h2>
                <p className="text-xs text-ceniza mb-4">
                  {rutinaActual.data?.ejercicios.length} ejercicios · ¡dale con todo!
                </p>
                <Link href="/entrenamiento">
                  <Button fullWidth className="!py-3 text-[15px]">Empezar a entrenar</Button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="font-display text-lg font-bold leading-tight mb-0.5">
                  ¿Qué entrenamos hoy?
                </h2>
                <p className="text-xs text-ceniza mb-4">
                  Pedile una rutina a tu coach y la dejás lista acá.
                </p>
                <Link href="/chat">
                  <Button fullWidth variant="soft" className="!py-3 text-[15px]">
                    Pedir mi rutina
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Súper Entrenador */}
          <Link href="/chat" className="col-span-2 glass rounded-xl p-4 flex flex-col justify-between min-h-[132px] active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-brasa flex items-center justify-center shrink-0">
                <Fueguito racha={1} size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold">Súper Entrenador</p>
                <p className="text-[11px] text-ceniza truncate">Consultá lo que quieras</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] text-ceniza">Sin respuesta todavía</span>
              <span className="text-ember-soft font-bold text-sm">→</span>
            </div>
          </Link>

          {/* Total días */}
          <div className="glass rounded-xl p-4 flex flex-col justify-center items-center">
            <div className="font-display-expanded text-3xl leading-none">{totalDias}</div>
            <p className="label-caps mt-1.5 text-center">días totales</p>
          </div>

          {/* Brazas de la semana */}
          <div className="col-span-3 glass rounded-xl px-5 py-4 flex items-center justify-between">
            <p className="label-caps">Tu semana</p>
            <div className="flex gap-1.5">
              {ultimaSemana.map((d, i) => {
                const prendido = fechas.includes(d)
                const hoy = d === hoyISO
                return (
                  <div
                    key={d}
                    className={cn(
                      "w-7 h-9 rounded-md border transition-all",
                      prendido
                        ? "bg-gradient-to-b from-brasa to-ember border-ember/40 ember-glow"
                        : "bg-hierro-soft border-hierro-border",
                      hoy && "ring-1 ring-hueso/30",
                      !prendido && hoy && "border-ember/40"
                    )}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
 
