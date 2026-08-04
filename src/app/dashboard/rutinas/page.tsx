"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Clock, Dumbbell, Search } from "lucide-react"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { useRutinas } from "@/hooks/useRutinas"
import type { Ejercicio } from "@/types"

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim()
}

export default function RutinasPage() {
  const [activeTab, setActiveTab] = useState<"rutinas" | "ejercicios">("rutinas")

  return (
    <main className="px-6 pt-6 pb-6">
      {/* Selector de pestañas */}
      <div className="bg-hierro-soft p-1 rounded-xl flex gap-2">
        <button
          onClick={() => setActiveTab("rutinas")}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors",
            activeTab === "rutinas"
              ? "bg-surface text-primary shadow"
              : "text-text-secondary"
          )}
        >
          Mis Rutinas
        </button>
        <button
          onClick={() => setActiveTab("ejercicios")}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors",
            activeTab === "ejercicios"
              ? "bg-surface text-primary shadow"
              : "text-text-secondary"
          )}
        >
          Biblioteca
        </button>
      </div>

      {activeTab === "rutinas" ? <MisRutinas /> : <Biblioteca />}
    </main>
  )
}

function MisRutinas() {
  const { todas } = useRutinas()

  if (todas.isLoading) {
    return (
      <div className="mt-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-hierro-soft rounded-2xl border border-hierro-border animate-pulse" />
        ))}
      </div>
    )
  }

  const rutinas = todas.data ?? []

  if (rutinas.length === 0) {
    return (
      <div className="mt-6 w-full bg-hierro-soft rounded-2xl p-6 border border-hierro-border text-center">
        <Dumbbell className="w-12 h-12 text-text-secondary/50 mx-auto mb-4" />
        <p className="font-sans text-sm text-text-secondary mb-6">
          Aún no tenés rutinas creadas. Hablá con el asistente para que arme tu
          primer plan de entrenamiento.
        </p>
        <Link
          href="/dashboard/chat"
          className="w-full bg-primary text-text-primary font-bold rounded-xl h-12 flex items-center justify-center hover:bg-primary-hover transition-colors active:scale-[0.98]"
        >
          Crear mi primera rutina
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      {rutinas.map((r) => {
        const count = Array.isArray(r.ejercicios) ? r.ejercicios.length : r.ejercicios_count
        const duracion = typeof count === "number" ? count * 12 : null
        return (
          <div
            key={r.id}
            className="bg-hierro rounded-2xl p-4 border border-hierro-border"
          >
            <span className="inline-block bg-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1">
              Fuerza
            </span>
            <h3 className="font-display text-lg font-bold text-text-primary mt-3 truncate">
              {r.nombre}
            </h3>
            <p className="font-sans text-sm text-text-secondary mt-1 line-clamp-2">
              {r.descripcion}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
              {duracion !== null && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {duracion} min aprox
                </span>
              )}
              {typeof count === "number" && (
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="w-4 h-4" />
                  {count} ejercicios
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Biblioteca() {
  const [busqueda, setBusqueda] = useState("")

  const { data: ejercicios, isLoading } = useQuery({
    queryKey: ["ejercicios", "catalogo"],
    queryFn: () => api.ejercicios.list(undefined, true),
    staleTime: 10 * 60_000,
  })

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda)
    if (!q) return ejercicios ?? []
    return (ejercicios ?? []).filter(
      (e) => normalizar(e.nombre).includes(q) || normalizar(e.musculo_objetivo || "").includes(q)
    )
  }, [ejercicios, busqueda])

  return (
    <div className="mt-6">
      {/* Búsqueda */}
      <div className="flex items-center gap-2 bg-hierro border border-hierro-border rounded-full px-4 py-2.5">
        <Search className="w-4 h-4 text-text-secondary shrink-0" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o músculo..."
          className="flex-1 bg-transparent outline-none text-sm font-sans text-text-primary placeholder:text-text-secondary/60"
        />
      </div>

      <p className="font-sans text-xs text-text-secondary mt-4 mb-3">
        {isLoading
          ? "Cargando ejercicios..."
          : `${filtrados.length} ejercicios`}
      </p>

      {isLoading ? (
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-hierro-soft rounded-xl border border-hierro-border animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtrados.map((ej: Ejercicio) => (
            <Link
              key={ej.id}
              href={`/ejercicios/${ej.id}`}
              className="flex items-center gap-3 bg-hierro rounded-xl p-3.5 border border-hierro-border hover:border-primary/40 transition-colors active:scale-[0.98]"
            >
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-text-primary capitalize truncate">
                  {ej.nombre}
                </h3>
                <p className="text-xs text-text-secondary truncate">
                  {ej.musculo_objetivo || "General"}
                  {ej.equipo ? ` · ${ej.equipo}` : ""}
                </p>
              </div>
              <span className="text-text-secondary/40">→</span>
            </Link>
          ))}
          {filtrados.length === 0 && !isLoading && (
            <p className="text-center text-sm text-text-secondary py-8">
              No se encontraron ejercicios para esa búsqueda.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
