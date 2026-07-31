"use client"

import { useState } from "react"
import Link from "next/link"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Ejercicio } from "@/types"

const CATEGORIAS = [
  {
    id: "Tren Superior",
    label: "TREN SUPERIOR",
    emoji: "💪",
    desc: "Pecho, Espalda, Hombros, Brazos",
  },
  {
    id: "Tren Inferior",
    label: "TREN INFERIOR",
    emoji: "🦵",
    desc: "Cuádriceps, Isquiotibiales, Glúteos, Gemelos",
  },
]

const MUSCULO_CATEGORIA = new Map([
  ["Pecho", "Tren Superior"],
  ["Pectorales", "Tren Superior"],
  ["Espalda", "Tren Superior"],
  ["Espalda alta", "Tren Superior"],
  ["Dorsales", "Tren Superior"],
  ["Hombros", "Tren Superior"],
  ["Bíceps", "Tren Superior"],
  ["Tríceps", "Tren Superior"],
  ["Trapecio", "Tren Superior"],
  ["Trapecios", "Tren Superior"],
  ["Abdominales", "Tren Superior"],
  ["Lumbar", "Tren Superior"],
  ["Espalda baja", "Tren Superior"],
  ["Antebrazos", "Tren Superior"],
  ["Cuádriceps", "Tren Inferior"],
  ["Isquiotibiales", "Tren Inferior"],
  ["Glúteos", "Tren Inferior"],
  ["Gemelos", "Tren Inferior"],
  ["Aductores", "Tren Inferior"],
  ["Abductores", "Tren Inferior"],
  ["Cuello", "Tren Superior"],
])

export default function EjerciciosPage() {
  const [categoria, setCategoria] = useState<string | null>(null)
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string | null>(null)

  const { data: ejercicios, isLoading } = useQuery({
    queryKey: ["ejercicios", grupoSeleccionado],
    queryFn: () => api.ejercicios.list(grupoSeleccionado || undefined),
    enabled: !!grupoSeleccionado,
  })

  const gruposMusculares = ejercicios
    ? [...new Set(ejercicios.map((ej: Ejercicio) => ej.musculo_objetivo || "General"))].sort()
    : []

  if (!categoria) {
    return (
      <AuthGuard>
        <Header />
        <main className="min-h-[calc(100vh-var(--nav-height)-100px)] px-4 pt-8 pb-28 flex flex-col animate-fade-in">
          <h2 className="text-xl font-black text-center mb-2">Ejercicios</h2>
          <p className="text-sm text-muted text-center mb-8">Seleccioná una categoría</p>
          <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className="group relative bg-card-glass backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all active:scale-[0.98]"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="text-lg font-black text-white">{cat.label}</h3>
                <p className="text-sm text-muted mt-1">{cat.desc}</p>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-muted group-hover:text-emerald-400 transition-colors">
                  →
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setCategoria("Otros")}
            className="text-sm text-muted text-center mt-6 underline"
          >
            Ver todos los grupos
          </button>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  if (!grupoSeleccionado) {
    const grupos = categoria === "Otros"
      ? [...MUSCULO_CATEGORIA.keys()].sort()
      : [...MUSCULO_CATEGORIA.entries()]
          .filter(([, cat]) => cat === categoria)
          .map(([musculo]) => musculo)
          .sort()

    return (
      <AuthGuard>
        <Header />
        <main className="min-h-[calc(100vh-var(--nav-height)-100px)] px-4 pt-4 pb-28 animate-fade-in">
          <button
            onClick={() => { setCategoria(null); setGrupoSeleccionado(null) }}
            className="text-sm text-muted mb-4 flex items-center gap-1"
          >
            ← Volver
          </button>
          <h2 className="text-lg font-bold mb-1">
            {categoria === "Tren Superior" ? "💪" : "🦵"} {categoria}
          </h2>
          <p className="text-xs text-muted mb-5">Elegí un grupo muscular</p>

          <div className="space-y-2.5 max-w-md mx-auto">
            {grupos.map((grupo) => (
              <button
                key={grupo}
                onClick={() => setGrupoSeleccionado(grupo)}
                className="w-full bg-card-glass backdrop-blur-md border border-white/10 rounded-xl px-4 py-3.5 text-left hover:border-emerald-500/50 transition-all active:scale-[0.98] flex items-center justify-between"
              >
                <span className="text-sm font-bold capitalize">{grupo}</span>
                <span className="text-muted">→</span>
              </button>
            ))}
          </div>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <Header />
      <main className="min-h-[calc(100vh-var(--nav-height)-100px)] px-4 pt-4 pb-28 animate-fade-in">
        <button
          onClick={() => setGrupoSeleccionado(null)}
          className="text-sm text-muted mb-4 flex items-center gap-1"
        >
          ← Volver a grupos
        </button>

        <h2 className="text-lg font-bold mb-1 capitalize">{grupoSeleccionado}</h2>
        <p className="text-xs text-muted mb-4">
          {isLoading ? "Cargando..." : `${ejercicios?.length || 0} ejercicios`}
        </p>

        {isLoading ? (
          <div className="space-y-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 rounded-lg h-16 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-w-md mx-auto">
            {ejercicios?.map((ej: Ejercicio) => (
              <Link
                key={ej.id}
                href={`/ejercicios/${ej.id}`}
                className="flex items-center gap-3 bg-card-glass backdrop-blur-md border border-white/10 rounded-xl p-2.5 hover:border-emerald-500/50 transition-all active:scale-[0.98]"
              >
                {ej.gif_url ? (
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/40 shrink-0">
                    <img src={ej.gif_url} alt="" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">
                    🏋️
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold capitalize truncate">{ej.nombre}</h3>
                  {ej.equipo && (
                    <p className="text-xs text-muted truncate">{ej.equipo}</p>
                  )}
                </div>
                <span className="text-muted text-lg">→</span>
              </Link>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
