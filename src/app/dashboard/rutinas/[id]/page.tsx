"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, ChevronRight, Clock, Dumbbell, Flame } from "lucide-react"
import { api } from "@/lib/api"

const DIAS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
]

const MOCK_EJERCICIOS = [
  {
    id: 1,
    ejercicio_id: 1,
    nombre: "Press de Banca",
    series: 4,
    repeticiones: "8-10",
    descanso: 90,
    dia_semana: "Día 1: Empuje",
  },
  {
    id: 2,
    ejercicio_id: 2,
    nombre: "Sentadilla con Barra",
    series: 4,
    repeticiones: "8-10",
    descanso: 120,
    dia_semana: "Día 1: Empuje",
  },
  {
    id: 3,
    ejercicio_id: 3,
    nombre: "Dominadas",
    series: 3,
    repeticiones: "Al fallo",
    descanso: 90,
    dia_semana: "Día 2: Tirón",
  },
  {
    id: 4,
    ejercicio_id: 4,
    nombre: "Remo con Barra",
    series: 4,
    repeticiones: "8-12",
    descanso: 90,
    dia_semana: "Día 2: Tirón",
  },
  {
    id: 5,
    ejercicio_id: 5,
    nombre: "Plancha Abdominal",
    series: 3,
    repeticiones: "45-60 seg",
    descanso: 60,
    dia_semana: "Día 3: Core",
  },
]

export default function RutinaDetallePage() {
  const params = useParams()
  const id = Number(params.id)

  const rutinasQuery = useQuery({
    queryKey: ["rutinas", "todas"],
    queryFn: api.rutinas.getAll,
  })

  const catalogoQuery = useQuery({
    queryKey: ["ejercicios", "catalogo"],
    queryFn: () => api.ejercicios.list(undefined, true),
    staleTime: 10 * 60_000,
  })

  const ejercicios = useMemo(() => {
    const r = rutinasQuery.data?.find((x) => x.id === id)
    const reales = Array.isArray(r?.ejercicios) ? r.ejercicios : []
    return reales.length > 0 ? reales : MOCK_EJERCICIOS
  }, [rutinasQuery.data, id])

  const gruposPorDia = useMemo(() => {
    const mapa = new Map<string, typeof ejercicios>()
    for (const ej of ejercicios) {
      const dia = ej.dia_semana ?? "Sesión única"
      const lista = mapa.get(dia) ?? []
      lista.push(ej)
      mapa.set(dia, lista)
    }
    const orden = new Map<string, number>()
    DIAS.forEach((d, i) => orden.set(d, i))
    return [...mapa.entries()].sort((a, b) => {
      const iA = orden.get(a[0]) ?? 99
      const iB = orden.get(b[0]) ?? 99
      return iA - iB
    })
  }, [ejercicios])

  const nombreDe = (ejercicioId?: number) =>
    catalogoQuery.data?.find((e) => e.id === ejercicioId)?.nombre

  /* -------- Estado de carga -------- */
  if (rutinasQuery.isLoading) {
    return (
      <main className="px-6 pt-6 pb-6">
        <div className="h-5 w-20 bg-hierro-soft rounded-lg animate-pulse mb-6" />
        <div className="h-9 bg-hierro-soft rounded-lg animate-pulse w-2/3 mb-4" />
        <div className="h-4 bg-hierro-soft rounded-md animate-pulse w-1/2 mb-8" />
        <div className="h-56 bg-hierro-soft rounded-2xl border border-hierro-border animate-pulse mb-6" />
        <div className="h-40 bg-hierro-soft rounded-2xl border border-hierro-border animate-pulse" />
      </main>
    )
  }

  const rutina = rutinasQuery.data?.find((r) => r.id === id)

  /* -------- Error: ID inexistente -------- */
  if (rutinasQuery.isError || !rutina) {
    return (
      <main className="px-6 pt-6 pb-6">
        <div className="pt-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-hierro border border-hierro-border flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-text-secondary/50" />
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
            Rutina no encontrada
          </h1>
          <p className="font-sans text-sm text-text-secondary mb-6">
            La rutina que buscás no existe o fue eliminada.
          </p>
          <Link
            href="/dashboard/rutinas"
            className="bg-primary text-text-primary font-bold rounded-xl h-12 px-6 flex items-center justify-center hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            Volver a Mis Rutinas
          </Link>
        </div>
      </main>
    )
  }

  const count = ejercicios.length || rutina.ejercicios_count
  const duracion = typeof count === "number" ? count * 12 : null

  return (
    <main className="px-6 pt-6 pb-6 animate-fade-in">
      {/* -------- Header: volver + título -------- */}
      <Link
        href="/dashboard/rutinas"
        className="inline-flex items-center gap-2 font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver
      </Link>

      <h1 className="font-display text-2xl font-bold text-text-primary mb-3">
        {rutina.nombre}
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-block bg-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1">
          Fuerza
        </span>
        <span className="inline-block bg-secondary/20 text-secondary text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1">
          {count} ejercicios
        </span>
      </div>

      {rutina.descripcion && (
        <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
          {rutina.descripcion}
        </p>
      )}

      {/* -------- Plan por día -------- */}
      {gruposPorDia.length === 0 ? (
        <div className="bg-hierro-soft rounded-2xl p-6 border border-hierro-border text-center">
          <div className="w-12 h-12 rounded-full bg-hierro border border-hierro-border flex items-center justify-center mx-auto mb-3">
            <Flame className="w-6 h-6 text-text-secondary/50" />
          </div>
          <p className="font-sans text-sm text-text-secondary">
            Esta rutina todavía no tiene ejercicios cargados.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {gruposPorDia.map(([dia, lista]) => (
            <section
              key={dia}
              className="bg-surface border border-border rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-surface-elevated">
                <h2 className="font-display text-sm font-bold text-text-primary">
                  {dia}
                </h2>
                {duracion !== null && (
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <Clock className="w-3.5 h-3.5" />
                    {lista.length * 12} min aprox
                  </span>
                )}
              </div>
              <div className="divide-y divide-border/60">
                {lista.map((ej) => {
                  const nombre = ej.nombre ?? nombreDe(ej.ejercicio_id)
                  return (
                    <Link
                      key={ej.id}
                      href={
                        ej.ejercicio_id
                          ? `/dashboard/ejercicios/${ej.ejercicio_id}`
                          : "/dashboard/rutinas"
                      }
                      className="flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-light transition-colors active:scale-[0.98] active:bg-surface-elevated cursor-pointer"
                    >
                      <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Dumbbell className="w-4 h-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-sans text-sm font-semibold text-text-primary capitalize truncate">
                          {nombre ?? `Ejercicio #${ej.ejercicio_id}`}
                        </span>
                        {typeof ej.series === "number" && ej.repeticiones && (
                          <span className="inline-block mt-1 bg-surface-elevated text-text-muted font-sans text-[11px] font-semibold rounded-full px-2.5 py-0.5">
                            {ej.series} x {ej.repeticiones}
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-secondary/40 shrink-0" />
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  )
}
