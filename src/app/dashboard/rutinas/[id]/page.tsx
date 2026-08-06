"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, ChevronRight, Clock, Dumbbell, Flame, RefreshCw, Trash2, WifiOff } from "lucide-react"
import { api } from "@/lib/api"
import OfflineBanner from "@/components/OfflineBanner"

const DIAS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
]

export default function RutinaDetallePage() {
  const params = useParams()
  const id = String(params.id)
  const router = useRouter()
  const queryClient = useQueryClient()

  const rutinaQuery = useQuery({
    queryKey: ["rutina", "detalle", id],
    queryFn: () => api.rutinas.getOne(id),
    enabled: !!id,
  })

  const eliminarMutation = useMutation({
    mutationFn: () => api.rutinas.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutinas"] })
      router.push("/dashboard/rutinas")
    },
  })

  const ejercicios = useMemo(() => {
    const lista = rutinaQuery.data?.ejercicios
    return Array.isArray(lista) ? lista : []
  }, [rutinaQuery.data])

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

  /* -------- Estado de carga -------- */
  if (rutinaQuery.isLoading) {
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

  /* -------- Error de red: sin caché y sin conexión -------- */
  if (rutinaQuery.isError && !rutinaQuery.data) {
    return (
      <main className="px-6 pt-6 pb-6">
        <div className="pt-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-hierro border border-hierro-border flex items-center justify-center mb-4">
            <WifiOff className="w-8 h-8 text-secondary/70" />
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
            Sin conexión
          </h1>
          <p className="font-sans text-sm text-text-secondary mb-6">
            No pudimos cargar esta rutina. Revisá tu conexión y volvé a intentarlo.
          </p>
          <button
            onClick={() => rutinaQuery.refetch()}
            className="bg-primary text-text-primary font-bold rounded-xl h-12 px-6 flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </button>
        </div>
      </main>
    )
  }

  /* -------- Error: ID inexistente -------- */
  if (rutinaQuery.isError || !rutinaQuery.data) {
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

  const rutina = rutinaQuery.data
  const count = ejercicios.length
  const duracion = count > 0 ? count * 12 : null

  const confirmarEliminacion = () => {
    if (window.confirm(`¿Seguro que querés eliminar "${rutina.nombre}"?`)) {
      eliminarMutation.mutate()
    }
  }

  return (
    <main className="px-6 pt-6 pb-6 animate-fade-in">
      {/* -------- Banner offline (datos de caché) -------- */}
      {rutinaQuery.isError && <OfflineBanner />}

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
                {lista.map((ej) => (
                  <Link
                    key={ej.id}
                    href={
                      ej.ejercicio_id
                        ? `/dashboard/ejercicios/${ej.ejercicio_id}?descanso=${ej.descanso_segundos ?? 90}`
                        : "/dashboard/rutinas"
                    }
                    className="flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-light transition-colors active:scale-[0.98] active:bg-surface-elevated cursor-pointer"
                  >
                    <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Dumbbell className="w-4 h-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-sans text-sm font-semibold text-text-primary capitalize truncate">
                        {ej.nombre ?? `Ejercicio #${ej.ejercicio_id}`}
                      </span>
                      {ej.series != null && ej.repeticiones && (
                        <span className="inline-block mt-1 bg-surface-elevated text-text-muted font-sans text-[11px] font-semibold rounded-full px-2.5 py-0.5">
                          {ej.series} x {ej.repeticiones}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-secondary/40 shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* -------- Eliminar rutina -------- */}
      <div className="mt-10 border-t border-hierro-border pt-6">
        <button
          onClick={confirmarEliminacion}
          disabled={eliminarMutation.isPending}
          className="w-full bg-red-500/10 text-red-500 border border-red-500/30 font-sans font-bold rounded-2xl h-12 flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors active:scale-[0.98] disabled:opacity-60"
        >
          <Trash2 className="w-4 h-4" />
          {eliminarMutation.isPending ? "Eliminando..." : "Eliminar Rutina"}
        </button>
        {eliminarMutation.isError && (
          <p className="mt-3 text-center font-sans text-xs text-red-500/80">
            No se pudo eliminar la rutina. Intentá de nuevo.
          </p>
        )}
      </div>
    </main>
  )
}
