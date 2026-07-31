"use client"

import { useQuery } from "@tanstack/react-query"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Card from "@/components/ui/Card"
import Fueguito from "@/components/ui/Fueguito"
import { useCheckin } from "@/hooks/useCheckin"
import { usePerfil } from "@/hooks/usePerfil"
import { useRutinas } from "@/hooks/useRutinas"
import { useEjercicioCatalog } from "@/hooks/useEjercicios"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

const DIAS = ["L", "M", "X", "J", "V", "S", "D"]

function Heatmap({ fechas }: { fechas: string[] }) {
  const hoy = new Date()
  const dias: string[] = []
  for (let i = 34; i >= 0; i--) {
    const d = new Date(hoy)
    d.setDate(d.getDate() - i)
    dias.push(d.toISOString().slice(0, 10))
  }

  return (
    <Card>
      <p className="label-caps mb-4">Constancia · últimos 35 días</p>
      <div className="flex gap-1.5">
        <div className="flex flex-col gap-1.5 mr-0.5">
          {DIAS.map((d) => (
            <span key={d} className="w-3 text-[9px] text-ceniza-dim text-center leading-[13px]">{d}</span>
          ))}
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1">
          {dias.map((f) => {
            const prendido = fechas.includes(f)
            const esHoy = f === hoy.toISOString().slice(0, 10)
            return (
              <div
                key={f}
                title={f}
                className={cn(
                  "rounded-[4px] h-3.5 w-full transition-all",
                  prendido
                    ? "bg-gradient-to-b from-brasa to-ember ember-glow"
                    : "bg-hierro-soft border border-hierro-border",
                  esHoy && "ring-1 ring-hueso/40"
                )}
              />
            )
          })}
        </div>
      </div>
    </Card>
  )
}

function PRCard({ ejercicioId, nombre }: { ejercicioId: number; nombre: string }) {
  const { data } = useQuery({
    queryKey: ["progreso", ejercicioId],
    queryFn: () => api.progreso.getByEjercicio(ejercicioId),
  })

  const registros = (data?.ultimos_registros ?? []).slice().reverse()
  const puntos = registros.map((r) => r.peso_kg)
  const maxPunto = Math.max(...puntos, 1)
  const W = 160
  const H = 44
  const coords = puntos
    .map((p, i) => {
      const x = puntos.length > 1 ? (i / (puntos.length - 1)) * W : W / 2
      const y = H - (p / maxPunto) * (H - 6) - 3
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <p className="text-xs text-ceniza truncate capitalize">{nombre}</p>
        <span className="label-caps shrink-0">PR</span>
      </div>
      {data?.marca_maxima_kg ? (
        <div className="flex items-end justify-between gap-3">
          <div className="font-display-expanded text-[34px] leading-none text-ember-glow">
            {data.marca_maxima_kg}
            <span className="text-sm text-ceniza font-sans font-semibold ml-1">kg</span>
          </div>
          <div className="flex-1 max-w-[160px]">
            {puntos.length >= 2 ? (
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-11 overflow-visible">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,77,0,0.4)" />
                    <stop offset="100%" stopColor="rgba(255,77,0,0)" />
                  </linearGradient>
                </defs>
                <polyline
                  points={`0,${H} ${coords} ${W},${H}`}
                  fill="url(#chartGrad)"
                  stroke="none"
                />
                <polyline points={coords} fill="none" stroke="#FF7A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <p className="text-[11px] text-ceniza text-right">{registros[0]?.peso_kg} kg · última carga</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-ceniza-dim">Sin cargas todavía</p>
      )}
    </div>
  )
}

export default function ProgresoPage() {
  const { perfil } = usePerfil()
  const { historial } = useCheckin()
  const { rutinaActual } = useRutinas()
  const { findByName } = useEjercicioCatalog()

  const racha = perfil?.racha_actual_dias ?? 0
  const totalDias = historial.data?.total_dias ?? 0
  const fechas = historial.data?.fechas ?? []
  const consistencia = totalDias > 0 ? Math.min(100, Math.round((totalDias / Math.max(racha, totalDias)) * 100)) : 0

  const prs = (rutinaActual.data?.ejercicios ?? [])
    .map((ej) => {
      const match = findByName(ej.nombre)
      return match ? { id: match.id, nombre: ej.nombre } : null
    })
    .filter((x): x is { id: number; nombre: string } => x !== null)
    .slice(0, 4)

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-5 pb-28 space-y-3.5 animate-fade-in max-w-md mx-auto">
        <h2 className="font-display text-xl font-bold mb-1">Tu progreso</h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-xl p-4 flex flex-col items-center justify-center">
            <Fueguito racha={racha} size={34} className="mb-1.5" />
            <div className="font-display-expanded text-2xl leading-none">{racha}</div>
            <p className="label-caps mt-1.5 text-center">racha</p>
          </div>
          <div className="glass rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="font-display-expanded text-2xl leading-none">{totalDias}</div>
            <p className="label-caps mt-1.5 text-center">días totales</p>
          </div>
          <div className="glass rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="font-display-expanded text-2xl leading-none text-ember-soft">{consistencia}%</div>
            <p className="label-caps mt-1.5 text-center">constancia</p>
          </div>
        </div>

        <Heatmap fechas={fechas} />

        {/* PRs */}
        {prs.length > 0 && (
          <div>
            <p className="label-caps mb-2.5 mt-4">Marcas en tu rutina</p>
            <div className="grid grid-cols-2 gap-3">
              {prs.map((p) => (
                <PRCard key={p.id} ejercicioId={p.id} nombre={p.nombre} />
              ))}
            </div>
          </div>
        )}

        {prs.length === 0 && (
          <Card className="text-center">
            <p className="text-sm text-ceniza mb-1">Tus marcas van a aparecer acá</p>
            <p className="text-xs text-ceniza-dim">
              Registrá series en Entrenar y seguí tu evolución de cargas.
            </p>
          </Card>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
 
