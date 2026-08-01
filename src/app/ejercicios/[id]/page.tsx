/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Badge from "@/components/ui/Badge"
import DiagramaMuscular from "@/components/ejercicios/DiagramaMuscular"
import { getDiagrama } from "@/lib/wger"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

const TABS = [
  { key: "resumen", label: "Resumen" },
  { key: "historia", label: "Historia" },
  { key: "indicaciones", label: "Indicaciones" },
] as const

type Tab = (typeof TABS)[number]["key"]

const RECORDS = [
  { key: "mayor_peso", label: "Mayor Peso", field: "mayor_peso" },
  { key: "mejor_1rm", label: "Mejor 1RM", field: "mejor_1rm", destacado: true },
  { key: "mayor_volumen", label: "Mayor Volumen", field: "mejor_volumen_serie" },
] as const

function formatKg(v: number) {
  return v % 1 === 0 ? String(v) : v.toFixed(1)
}

export default function EjercicioDetallePage() {
  const params = useParams()
  const id = Number(params.id)
  const [tab, setTab] = useState<Tab>("resumen")

  const { data: ej, isLoading, error } = useQuery({
    queryKey: ["ejercicio", id],
    queryFn: () => api.ejercicios.detalle(id),
    enabled: !!id,
  })

  const { data: resumen, isLoading: cargandoResumen } = useQuery({
    queryKey: ["resumen", id],
    queryFn: () => api.ejercicios.resumen(id),
    enabled: !!id,
  })

  const hayRecords = !!resumen?.records && (
    resumen.records.mayor_peso > 0 ||
    resumen.records.mejor_1rm > 0 ||
    resumen.records.mejor_volumen_serie > 0
  )

  if (isLoading) {
    return (
      <AuthGuard>
        <Header backTo="/ejercicios" />
        <main className="pb-28 animate-fade-in">
          <div className="bg-carbon-deep min-h-[240px] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-hierro-border border-t-ember animate-spin" />
          </div>
          <div className="px-4 pt-4 max-w-md mx-auto space-y-3">
            <div className="bg-hierro-soft rounded-lg h-8 animate-pulse w-2/3" />
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-hierro-soft rounded-xl h-24 animate-pulse" />
              <div className="bg-hierro-soft rounded-xl h-24 animate-pulse" />
              <div className="bg-hierro-soft rounded-xl h-24 animate-pulse" />
            </div>
            <div className="bg-hierro-soft rounded-lg h-32 animate-pulse" />
          </div>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  if (error || !ej) {
    return (
      <AuthGuard>
        <Header backTo="/ejercicios" />
        <main className="px-4 pt-8 pb-28 animate-fade-in max-w-md mx-auto">
          <p className="text-sm text-ceniza text-center py-8">Ejercicio no encontrado</p>
          <Link href="/ejercicios" className="text-ember-soft text-sm text-center block underline underline-offset-2">Volver a ejercicios</Link>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <Header backTo="/ejercicios" />

      {/* Reproductor: visualizador limpio tipo modelo 3D */}
      <div className="bg-carbon-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.07),transparent_65%)] pointer-events-none" />
        <div className="relative max-w-md mx-auto px-4 py-5 flex items-center justify-center min-h-[240px]">
          {ej.gif_url ? (
            <img src={ej.gif_url} alt={ej.nombre} className="w-full max-h-[320px] object-contain" />
          ) : (
            <div className="flex items-center justify-center text-5xl">🏋️</div>
          )}
        </div>
      </div>

      <main className="px-4 pb-28 animate-fade-in max-w-md mx-auto">
        {/* Título */}
        <h1 className="font-display text-xl font-black capitalize pt-5 pb-4">{ej.nombre}</h1>

        {/* Menú de pestañas sticky */}
        <div className="sticky top-[60px] z-30 flex border-b border-hierro-border bg-carbon/90 backdrop-blur-md -mx-4 px-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex-1 py-3 text-sm font-semibold transition-colors -mb-px border-b-2",
                tab === t.key
                  ? "text-hueso border-ember"
                  : "text-ceniza border-transparent hover:text-ceniza"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="pt-5">
          {tab === "resumen" && (
            <div className="space-y-4">
              {cargandoResumen ? (
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-hierro-soft rounded-xl h-24 animate-pulse" />
                  <div className="bg-hierro-soft rounded-xl h-24 animate-pulse" />
                  <div className="bg-hierro-soft rounded-xl h-24 animate-pulse" />
                </div>
              ) : hayRecords ? (
                <div className="grid grid-cols-3 gap-3">
                  {RECORDS.map((r) => {
                    const valor = resumen!.records[r.field]
                    return (
                      <div key={r.key} className="bg-hierro border border-hierro-border rounded-xl p-3.5">
                        <p className="label-caps mb-2">{r.label}</p>
                        <p
                          className={cn(
                            "font-display-expanded text-2xl tabular-nums",
                            r.destacado ? "text-ember-soft" : "text-hueso"
                          )}
                        >
                          {formatKg(valor)}
                          <span className="text-xs text-ceniza font-sans font-semibold ml-0.5">kg</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-ceniza text-center py-10">
                  Aún no hay récords para este ejercicio
                </p>
              )}

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
            <p className="text-sm text-ceniza text-center py-10">
              Próximamente: Historial de series
            </p>
          )}

          {tab === "indicaciones" && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {ej.musculo_objetivo && (
                  <Badge variant="ember">{ej.musculo_objetivo}</Badge>
                )}
                {ej.equipo && (
                  <Badge variant="ghost">{ej.equipo}</Badge>
                )}
              </div>
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
        </div>
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
