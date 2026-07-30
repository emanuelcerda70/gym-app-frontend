"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Badge from "@/components/ui/Badge"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useState, useMemo } from "react"
import type { Ejercicio } from "@/types"

const GRUPO_MUSCULAR = new Map<string, string>([
  ["pectoral", "Pecho"],
  ["pecho", "Pecho"],
  ["espalda", "Espalda"],
  ["dorsal", "Espalda"],
  ["hombro", "Hombros"],
  ["hombros", "Hombros"],
  ["deltoides", "Hombros"],
  ["biceps", "Bíceps"],
  ["triceps", "Tríceps"],
  ["trapecio", "Trapecio"],
  ["abdominales", "Abdominales"],
  ["abdominal", "Abdominales"],
  ["core", "Abdominales"],
  ["lumbar", "Lumbar"],
  ["cuadriceps", "Cuádriceps"],
  ["cuádriceps", "Cuádriceps"],
  ["isquiotibiales", "Isquiotibiales"],
  ["femoral", "Isquiotibiales"],
  ["gluteo", "Glúteos"],
  ["gluteos", "Glúteos"],
  ["glúteos", "Glúteos"],
  ["gemelo", "Gemelos"],
  ["gemelos", "Gemelos"],
  ["pantorrilla", "Gemelos"],
  ["pantorrillas", "Gemelos"],
  ["ante brazo", "Antebrazos"],
  ["antebrazo", "Antebrazos"],
  ["antebrazos", "Antebrazos"],
])

const GRUPO_CATEGORIA = new Map<string, "Tren Superior" | "Tren Inferior">([
  ["Pecho", "Tren Superior"],
  ["Espalda", "Tren Superior"],
  ["Hombros", "Tren Superior"],
  ["Bíceps", "Tren Superior"],
  ["Tríceps", "Tren Superior"],
  ["Trapecio", "Tren Superior"],
  ["Abdominales", "Tren Superior"],
  ["Lumbar", "Tren Superior"],
  ["Antebrazos", "Tren Superior"],
  ["Cuádriceps", "Tren Inferior"],
  ["Isquiotibiales", "Tren Inferior"],
  ["Glúteos", "Tren Inferior"],
  ["Gemelos", "Tren Inferior"],
])

function normalizarMusculo(musculo: string): string {
  const key = musculo.toLowerCase().trim()
  return GRUPO_MUSCULAR.get(key) || musculo
}

function categoriaDe(grupo: string): "Tren Superior" | "Tren Inferior" | "Otros" {
  return GRUPO_CATEGORIA.get(grupo) || "Otros"
}

export default function BibliotecaPage() {
  const [busqueda, setBusqueda] = useState("")
  const { data: ejercicios, isLoading } = useQuery({
    queryKey: ["ejercicios", busqueda],
    queryFn: () => api.ejercicios.list(busqueda || undefined),
  })

  const grupos = useMemo(() => {
    if (!ejercicios) return []

    const subgrupos = new Map<string, Ejercicio[]>()
    for (const ej of ejercicios) {
      const grupo = normalizarMusculo(ej.musculo_objetivo || "Sin clasificar")
      if (!subgrupos.has(grupo)) subgrupos.set(grupo, [])
      subgrupos.get(grupo)!.push(ej)
    }

    const superior: { grupo: string; ejercicios: Ejercicio[] }[] = []
    const inferior: { grupo: string; ejercicios: Ejercicio[] }[] = []
    const otros: { grupo: string; ejercicios: Ejercicio[] }[] = []

    for (const [grupo, lista] of subgrupos) {
      const cat = categoriaDe(grupo)
      const entry = { grupo, ejercicios: lista }
      if (cat === "Tren Superior") superior.push(entry)
      else if (cat === "Tren Inferior") inferior.push(entry)
      else otros.push(entry)
    }

    const ordenar = (arr: { grupo: string; ejercicios: Ejercicio[] }[]) =>
      arr.sort((a, b) => a.grupo.localeCompare(b.grupo))

    return [
      { categoria: "Tren Superior", items: ordenar(superior) },
      { categoria: "Tren Inferior", items: ordenar(inferior) },
      ...(otros.length ? [{ categoria: "Otros", items: ordenar(otros) }] : []),
    ].filter((s) => s.items.length > 0)
  }, [ejercicios])

  return (
    <AuthGuard>
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-var(--nav-height)-100px)] px-4 pt-4 pb-28 animate-fade-in">
        <h2 className="text-lg font-bold mb-4">Biblioteca de Ejercicios</h2>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por músculo..."
          className="w-full bg-white/10 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-muted-dim outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 mb-4"
        />

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 rounded-lg h-24 animate-pulse" />
            ))}
          </div>
        ) : grupos.length === 0 ? (
          <p className="text-sm text-muted text-center py-8">No se encontraron ejercicios</p>
        ) : (
          <div className="space-y-6">
            {grupos.map(({ categoria, items }) => (
              <section key={categoria}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-black text-emerald-400 uppercase tracking-wider">
                    {categoria === "Tren Superior" ? "💪" : categoria === "Tren Inferior" ? "🦵" : "📌"}
                  </span>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    {categoria}
                  </h3>
                </div>

                <div className="space-y-3">
                  {items.map(({ grupo, ejercicios: lista }) => (
                    <div key={grupo}>
                      <h4 className="text-xs font-bold text-muted mb-1.5 px-1">{grupo}</h4>
                      <div className="space-y-1.5">
                        {lista.map((ej: Ejercicio, i: number) => (
                          <div
                            key={ej.id ?? i}
                            className="bg-card-glass backdrop-blur-md border border-white/10 rounded-lg overflow-hidden flex"
                          >
                            {ej.gif_url && (
                              <div className="w-20 shrink-0 bg-black/40 flex items-center justify-center">
                                <img
                                  src={ej.gif_url}
                                  alt={ej.nombre}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                            )}
                            <div className="p-2.5 flex-1 min-w-0 flex items-center">
                              <h5 className="text-sm font-medium capitalize truncate">{ej.nombre}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
