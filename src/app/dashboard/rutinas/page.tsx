"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight, ClipboardList, Clock, Dumbbell, Search, SlidersHorizontal, Sparkles } from "lucide-react"
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
  {
    id: "Core",
    label: "CORE",
    emoji: "🎯",
    desc: "Abdominales, Lumbar, Oblicuos",
  },
]

const MUSCULO_CATEGORIA = new Map<string, string>([
  ["Pecho", "Tren Superior"],
  ["Pectorales", "Tren Superior"],
  ["Pectoral", "Tren Superior"],
  ["Espalda", "Tren Superior"],
  ["Espalda alta", "Tren Superior"],
  ["Dorsales", "Tren Superior"],
  ["Dorsal", "Tren Superior"],
  ["Dorsal ancho", "Tren Superior"],
  ["Hombros", "Tren Superior"],
  ["Deltoides", "Tren Superior"],
  ["Deltoide anterior", "Tren Superior"],
  ["Deltoide posterior", "Tren Superior"],
  ["Bíceps", "Tren Superior"],
  ["Tríceps", "Tren Superior"],
  ["Tríceps braquial", "Tren Superior"],
  ["Trapecio", "Tren Superior"],
  ["Trapecios", "Tren Superior"],
  ["Antebrazos", "Tren Superior"],
  ["Cuello", "Tren Superior"],
  ["Cuádriceps", "Tren Inferior"],
  ["Cuádriceps femorales", "Tren Inferior"],
  ["Isquiotibiales", "Tren Inferior"],
  ["Glúteos", "Tren Inferior"],
  ["Glúteo medio", "Tren Inferior"],
  ["Gemelos", "Tren Inferior"],
  ["Sóleo", "Tren Inferior"],
  ["Aductores", "Tren Inferior"],
  ["Abductores", "Tren Inferior"],
  ["Abdominales", "Core"],
  ["Recto abdominal", "Core"],
  ["Oblicuos", "Core"],
  ["Transverso abdominal", "Core"],
  ["Lumbar", "Core"],
  ["Espalda baja", "Core"],
  ["Erectores espinales", "Core"],
])

export default function RutinasPage() {
  const [activeTab, setActiveTab] = useState<"rutinas" | "ejercicios">("rutinas")

  return (
    <main className="px-6 pt-6 pb-6">
      {/* Selector de pestañas */}
      <div className="bg-hierro-soft p-1 rounded-xl flex gap-1.5">
        <button
          onClick={() => setActiveTab("rutinas")}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors",
            activeTab === "rutinas"
              ? "bg-surface-elevated border border-primary/30 text-text-primary shadow"
              : "border border-transparent text-text-muted hover:text-text-secondary"
          )}
        >
          Mis Rutinas
        </button>
        <button
          onClick={() => setActiveTab("ejercicios")}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors",
            activeTab === "ejercicios"
              ? "bg-surface-elevated border border-primary/30 text-text-primary shadow"
              : "border border-transparent text-text-muted hover:text-text-secondary"
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
      <div className="mt-4 w-full bg-surface rounded-[20px] border border-border p-8 flex flex-col items-center text-center">
        {/* Ícono central brillante */}
        <div className="relative w-32 h-32 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(108,92,255,0.15)]">
          <ClipboardList className="text-primary w-12 h-12" />
          <span className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Dumbbell className="text-primary w-5 h-5" />
          </span>
          <Sparkles className="absolute -top-2 -left-3 w-4 h-4 text-secondary animate-ember-pulse" />
          <Sparkles
            className="absolute top-6 -right-2 w-3 h-3 text-primary animate-ember-pulse"
            style={{ animationDelay: "0.3s" }}
          />
          <Sparkles
            className="absolute -top-1 right-1/3 w-3 h-3 text-secondary animate-ember-pulse"
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        <h2 className="font-display text-xl font-bold mb-2 text-text-primary">
          Aún no tenés rutinas creadas
        </h2>
        <p className="font-sans text-sm text-text-muted mb-8 max-w-xs">
          Hablá con el asistente para que arme tu primer plan de entrenamiento.
        </p>
        <Link
          href="/dashboard/chat"
          className="w-full bg-primary text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-sans font-bold hover:bg-primary-hover transition-colors active:scale-[0.98]"
        >
          Crear mi primera rutina
          <ArrowRight className="w-4 h-4" />
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
  const [categoria, setCategoria] = useState<string | null>(null)
  const [grupo, setGrupo] = useState<string | null>(null)

  const { data: ejercicios, isLoading, isError, refetch } = useQuery({
    queryKey: ["ejercicios", "catalogo"],
    queryFn: () => api.ejercicios.list(undefined, true),
    staleTime: 10 * 60_000,
  })

  const musculoDe = (ej: Ejercicio) => ej.musculo_objetivo || "General"
  const categoriaDe = (ej: Ejercicio) =>
    MUSCULO_CATEGORIA.get(musculoDe(ej)) ?? "Otros"

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda)
    if (!q) return null
    return (ejercicios ?? []).filter(
      (e) => normalizar(e.nombre).includes(q) || normalizar(e.musculo_objetivo || "").includes(q)
    )
  }, [ejercicios, busqueda])

  const gruposDeCategoria = useMemo(() => {
    const grupos = new Set<string>()
    for (const ej of ejercicios ?? []) {
      if (categoriaDe(ej) === categoria) grupos.add(musculoDe(ej))
    }
    return [...grupos].sort((a, b) => a.localeCompare(b, "es"))
  }, [ejercicios, categoria]) // eslint-disable-line react-hooks/exhaustive-deps

  const ejercicioCard = (ej: Ejercicio) => (
    <Link
      key={ej.id}
      href={`/dashboard/ejercicios/${ej.id}`}
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
          {musculoDe(ej)}
          {ej.equipo ? ` · ${ej.equipo}` : ""}
        </p>
      </div>
      <span className="text-text-secondary/40">→</span>
    </Link>
  )

  const volver = (
    <button
      onClick={() => {
        if (grupo) setGrupo(null)
        else setCategoria(null)
      }}
      className="flex items-center gap-1 text-sm font-sans text-text-secondary mb-4"
    >
      ← Volver
    </button>
  )

  const ejerciciosDelGrupo = (ejercicios ?? []).filter(
    (e) => musculoDe(e) === grupo
  )

  return (
    <div className="mt-6">
      {/* Encabezado */}
      <h2 className="font-display text-2xl font-bold text-text-primary mb-1">
        Biblioteca
      </h2>
      <p className="font-sans text-sm text-text-muted mb-5">
        Explorá ejercicios por músculo o categoría.
      </p>

      {/* Búsqueda + Filtros */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-hierro border border-hierro-border rounded-full px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-text-secondary shrink-0" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o músculo..."
            className="flex-1 bg-transparent outline-none text-sm font-sans text-text-primary placeholder:text-text-secondary/60"
          />
        </div>
        <button
          aria-label="Filtros"
          className="w-10 h-10 rounded-full bg-hierro border border-hierro-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors active:scale-95 shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Resultados de búsqueda */}
      {filtrados ? (
        <>
          <p className="font-sans text-xs text-text-secondary mt-4 mb-3">
            {isLoading ? "Cargando..." : `${filtrados.length} resultados`}
          </p>
          {isLoading ? (
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-hierro-soft rounded-xl border border-hierro-border animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtrados.map(ejercicioCard)}
              {filtrados.length === 0 && (
                <p className="text-center text-sm text-text-secondary py-8">
                  No se encontraron ejercicios para esa búsqueda.
                </p>
              )}
            </div>
          )}
        </>
      ) : isLoading ? (
        <div className="space-y-2.5 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-hierro-soft rounded-xl border border-hierro-border animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="mt-6 bg-hierro-soft rounded-2xl p-6 border border-hierro-border text-center">
          <p className="font-sans text-sm text-text-secondary mb-4">
            No pudimos cargar los ejercicios.
          </p>
          <button
            onClick={() => refetch()}
            className="bg-primary text-text-primary font-bold rounded-xl h-12 px-6 hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            Reintentar
          </button>
        </div>
      ) : !categoria ? (
        /* Nivel 1: Categorías madre */
        <div className="mt-6 space-y-4">
          {CATEGORIAS.map((cat) => {
            const count = (ejercicios ?? []).filter((e) => categoriaDe(e) === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className="w-full flex items-stretch bg-surface-light border border-border rounded-2xl overflow-hidden text-left hover:border-primary/40 transition-colors active:scale-[0.98] min-h-28"
              >
                <div className="flex-1 min-w-0 p-5">
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {cat.label}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    {cat.desc}
                  </p>
                  <span className="inline-block mt-3 bg-primary/10 text-primary text-[11px] font-bold rounded-full px-3 py-1">
                    {count} ejercicios
                  </span>
                </div>
                <div className="relative w-24 bg-gradient-to-l from-surface-elevated to-transparent flex items-end justify-end p-4 shrink-0">
                  <span className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            )
          })}
          {gruposDeCategoria.length > 0 && (
            <button
              onClick={() => setCategoria("Otros")}
              className="w-full flex items-stretch bg-surface-light border border-border rounded-2xl overflow-hidden text-left hover:border-primary/40 transition-colors active:scale-[0.98] min-h-28"
            >
              <div className="flex-1 min-w-0 p-5">
                <div className="text-3xl mb-2">🗂️</div>
                <h3 className="font-display text-base font-bold text-text-primary">OTROS</h3>
                <p className="font-sans text-xs text-text-secondary mt-1">
                  Grupos sin clasificar
                </p>
                <span className="inline-block mt-3 bg-primary/10 text-primary text-[11px] font-bold rounded-full px-3 py-1">
                  {gruposDeCategoria.length} grupos
                </span>
              </div>
              <div className="relative w-24 bg-gradient-to-l from-surface-elevated to-transparent flex items-end justify-end p-4 shrink-0">
                <span className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          )}
        </div>
      ) : !grupo ? (
        /* Nivel 2: Grupos musculares */
        <>
          {volver}
          <h2 className="font-display text-lg font-bold text-text-primary mb-1 capitalize">
            {categoria}
          </h2>
          <p className="font-sans text-xs text-text-secondary mb-5">
            Elegí un grupo muscular
          </p>
          <div className="space-y-2.5">
            {gruposDeCategoria.map((g) => {
              const count = (ejercicios ?? []).filter((e) => musculoDe(e) === g).length
              return (
                <button
                  key={g}
                  onClick={() => setGrupo(g)}
                  className="w-full flex items-center justify-between bg-hierro rounded-xl px-4 py-3.5 border border-hierro-border text-left hover:border-primary/40 transition-colors active:scale-[0.98]"
                >
                  <span className="text-sm font-semibold text-text-primary capitalize">
                    {g}
                  </span>
                  <span className="text-xs text-text-secondary">{count} · →</span>
                </button>
              )
            })}
            {gruposDeCategoria.length === 0 && (
              <p className="text-center text-sm text-text-secondary py-8">
                No hay ejercicios en esta categoría.
              </p>
            )}
          </div>
        </>
      ) : (
        /* Nivel 3: Ejercicios del grupo */
        <>
          {volver}
          <h2 className="font-display text-lg font-bold text-text-primary mb-1 capitalize">
            {grupo}
          </h2>
          <p className="font-sans text-xs text-text-secondary mb-4">
            {ejerciciosDelGrupo.length} ejercicios
          </p>
          <div className="space-y-2.5">
            {ejerciciosDelGrupo.map(ejercicioCard)}
            {ejerciciosDelGrupo.length === 0 && (
              <p className="text-center text-sm text-text-secondary py-8">
                No hay ejercicios para este grupo.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
