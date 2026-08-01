/* eslint-disable @next/next/no-img-element */
"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import { getPrevRoute } from "@/components/layout/RouteRecorder"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import Link from "next/link"
import DiagramaMuscular from "@/components/ejercicios/DiagramaMuscular"
import { getDiagrama } from "@/lib/wger"
import { cn } from "@/lib/utils"

const TABS = [
  { key: "resumen", label: "Resumen" },
  { key: "historia", label: "Historia" },
  { key: "indicaciones", label: "Indicaciones" },
] as const

type Tab = (typeof TABS)[number]["key"]

function calcular1rm(peso: number, repeticiones: number): number {
  const divisor = Math.max(37 - Math.max(repeticiones, 1), 1)
  return Math.round(peso * (36 / divisor) * 100) / 100
}

export default function EjercicioDetallePage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [tab, setTab] = useState<Tab>("resumen")

  const { data: ej, isLoading, error } = useQuery({
    queryKey: ["ejercicio", id],
    queryFn: () => api.ejercicios.detalle(id),
    enabled: !!id,
  })

  const { data: progreso } = useQuery({
    queryKey: ["progreso", id],
    queryFn: () => api.progreso.getByEjercicio(id),
    enabled: !!id,
  })

  const mejor1rm = useMemo(() => {
    if (!progreso?.ultimos_registros?.length) return null
    return Math.max(...progreso.ultimos_registros.map((r) => calcular1rm(r.peso_kg, r.repeticiones)))
  }, [progreso])

  if (isLoading) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
          <div className="bg-hierro-soft rounded-xl h-64 animate-pulse mb-4" />
          <div className="bg-hierro-soft rounded-lg h-8 animate-pulse w-2/3 mb-3" />
          <div className="bg-hierro-soft rounded-lg h-4 animate-pulse w-1/3 mb-6" />
          <div className="bg-hierro-soft rounded-lg h-32 animate-pulse" />
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  if (error || !ej) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
          <p className="text-sm text-ceniza text-center py-8">Ejercicio no encontrado</p>
          <Link href="/ejercicios" className="text-ember-soft text-sm text-center block underline underline-offset-2">Volver a ejercicios</Link>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
        <button
          onClick={() => {
            const prev = getPrevRoute()
            if (prev && prev !== "/ejercicios/" + id) router.push(prev)
            else router.push("/ejercicios")
          }}
          className="text-sm text-ceniza flex items-center gap-1 mb-4"
        >
          ← Volver
        </button>

        {/* GIF 3D arriba de todo, fondo neutro */}
        <div className="bg-hierro border border-hierro-border rounded-xl overflow-hidden mb-4 flex items-center justify-center" style={{ minHeight: 220 }}>
          {ej.gif_url ? (
            <img src={ej.gif_url} alt={ej.nombre} className="w-full max-h-80 object-contain" />
          ) : (
            <div className="flex items-center justify-center text-5xl h-48">🏋️</div>
          )}
        </div>

        {/* Título y chips */}
        <h1 className="font-display text-xl font-black capitalize mb-2">{ej.nombre}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {ej.musculo_objetivo && (
            <span className="text-[11px] bg-ember/15 text-ember-soft border border-ember/30 px-2.5 py-0.5 rounded-full font-semibold uppercase">
              {ej.musculo_objetivo}
            </span>
          )}
          {ej.equipo && (
            <span className="text-[11px] bg-hierro-soft text-ceniza border border-hierro-border px-2.5 py-0.5 rounded-full font-semibold uppercase">
              {ej.equipo}
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-hierro-border mb-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex-1 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2",
                tab === t.key
                  ? "text-hueso border-ember"
                  : "text-ceniza-dim border-transparent hover:text-ceniza"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "resumen" && (
          <div className="space-y-4">
            {/* Récords personales */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-4">
                <p className="label-caps mb-1.5">Mayor peso</p>
                {progreso?.marca_maxima_kg ? (
                  <p className="font-display-expanded text-2xl text-hueso">
                    {progreso.marca_maxima_kg}
                    <span className="text-sm text-ceniza font-sans font-semibold ml-1">kg</span>
                  </p>
                ) : (
                  <p className="font-display-expanded text-2xl text-ceniza-dim">—</p>
                )}
              </div>
              <div className="glass rounded-xl p-4">
                <p className="label-caps mb-1.5">Mejor 1RM</p>
                {mejor1rm ? (
                  <p className="font-display-expanded text-2xl text-ember-soft">
                    {mejor1rm}
                    <span className="text-sm text-ceniza font-sans font-semibold ml-1">kg</span>
                  </p>
                ) : (
                  <p className="font-display-expanded text-2xl text-ceniza-dim">—</p>
                )}
              </div>
            </div>

            {/* Músculos trabajados */}
            {getDiagrama(ej.musculo_objetivo || "") && (
              <div className="glass rounded-xl p-4">
                <h3 className="label-caps mb-2">Músculos trabajados</h3>
                <div className="flex items-center gap-3 text-xs mb-2">
                  <span className="flex items-center gap-1 text-ceniza"><span className="w-3 h-3 rounded bg-ember inline-block" /> Principal</span>
                  <span className="flex items-center gap-1 text-ceniza"><span className="w-3 h-3 rounded bg-brasa inline-block" /> Accesorio</span>
                </div>
                <DiagramaMuscular musculo={ej.musculo_objetivo || ""} />
              </div>
            )}
          </div>
        )}

        {tab === "historia" && (
          <div className="space-y-2">
            {progreso?.ultimos_registros?.length ? (
              progreso.ultimos_registros.slice(0, 15).map((r, i) => (
                <div key={i} className="glass rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-ceniza tabular-nums">{r.fecha}</span>
                  <span className="text-sm font-bold text-hueso tabular-nums">
                    {r.peso_kg} kg <span className="text-ceniza font-semibold">× {r.repeticiones}</span>
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-ceniza text-center py-8">
                Todavía no registraste series de este ejercicio.
              </p>
            )}
          </div>
        )}

        {tab === "indicaciones" && (
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <p className="label-caps mb-2">Instrucciones</p>
              {ej.instrucciones ? (
                <p className="text-sm text-hueso leading-relaxed whitespace-pre-line">{ej.instrucciones}</p>
              ) : (
                <p className="text-sm text-ceniza">Sin instrucciones cargadas.</p>
              )}
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
