"use client"

import { Suspense } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Award, BookOpen, Dumbbell, Trophy } from "lucide-react"
import { api } from "@/lib/api"
import SetLogger from "@/components/entrenamiento/SetLogger"

const CATEGORIA_IDS = new Set(["Pecho", "Espalda", "Hombros", "Brazos", "Piernas", "Core"])

const MUSCULO_CATEGORIA = new Map<string, string>([
  ["Pechito", "Pecho"], // legacy
  ["Pectorales", "Pecho"],
  ["Pectoral", "Pecho"],
  ["Espalda", "Espalda"],
  ["Espalda alta", "Espalda"],
  ["Dorsales", "Espalda"],
  ["Dorsal", "Espalda"],
  ["Dorsal ancho", "Espalda"],
  ["Trapecio", "Espalda"],
  ["Trapecios", "Espalda"],
  ["Hombros", "Hombros"],
  ["Deltoides", "Hombros"],
  ["Deltoide anterior", "Hombros"],
  ["Deltoide posterior", "Hombros"],
  ["Cuello", "Hombros"],
  ["Bíceps", "Brazos"],
  ["Bíceps braquial", "Brazos"],
  ["Tríceps", "Brazos"],
  ["Tríceps braquial", "Brazos"],
  ["Antebrazos", "Brazos"],
  ["Cuádriceps", "Piernas"],
  ["Cuádriceps femorales", "Piernas"],
  ["Isquiotibiales", "Piernas"],
  ["Glúteos", "Piernas"],
  ["Glúteo medio", "Piernas"],
  ["Gemelos", "Piernas"],
  ["Sóleo", "Piernas"],
  ["Aductores", "Piernas"],
  ["Abductores", "Piernas"],
  ["Abdominales", "Core"],
  ["Recto abdominal", "Core"],
  ["Oblicuos", "Core"],
  ["Transverso abdominal", "Core"],
  ["Lumbar", "Core"],
  ["Espalda baja", "Core"],
  ["Erectores espinales", "Core"],
])

function categoriaDe(musculo?: string): string {
  if (!musculo) return "General"
  if (CATEGORIA_IDS.has(musculo)) return musculo
  return MUSCULO_CATEGORIA.get(musculo) ?? "General"
}

export default function EjercicioDetallePageWrapper() {
  return (
    <Suspense fallback={null}>
      <EjercicioDetallePage />
    </Suspense>
  )
}

function EjercicioDetallePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = Number(params.id)
  const descansoId = Number(searchParams.get("descanso")) || null

  const { data: ej, isLoading, isError, refetch } = useQuery({
    queryKey: ["ejercicio", id],
    queryFn: () => api.ejercicios.detalle(id),
    enabled: !!id,
  })

  const { data: progreso } = useQuery({
    queryKey: ["progreso", id],
    queryFn: () => api.progreso.getByEjercicio(id),
    enabled: !!id,
  })

  /* -------- Estado de carga -------- */
  if (isLoading) {
    return (
      <main className="px-6 pt-6 pb-6 animate-fade-in">
        <div className="h-12 w-12 rounded-full bg-hierro border border-hierro-border animate-pulse mb-4" />
        <div className="h-9 bg-hierro-soft rounded-lg animate-pulse w-2/3 mb-6" />
        <div className="h-64 bg-hierro-soft rounded-2xl border border-hierro-border animate-pulse mb-6" />
        <div className="flex gap-2 mb-6">
          <div className="h-8 w-24 bg-hierro-soft rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-hierro-soft rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-hierro-soft rounded-full animate-pulse" />
        </div>
        <div className="h-40 bg-hierro-soft rounded-2xl border border-hierro-border animate-pulse" />
      </main>
    )
  }

  /* -------- Error: ID inexistente -------- */
  if (isError || !ej) {
    return (
      <main className="px-6 pt-6 pb-6">
        <div className="pt-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-hierro border border-hierro-border flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-text-secondary/50" />
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
            Ejercicio no encontrado
          </h1>
          <p className="font-sans text-sm text-text-secondary mb-6">
            El ejercicio que buscás no existe o fue eliminado.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="bg-primary text-text-primary font-bold rounded-xl h-12 px-6 hover:bg-primary-hover transition-colors active:scale-[0.98]"
            >
              Reintentar
            </button>
            <Link
              href="/dashboard/rutinas"
              className="bg-hierro border border-hierro-border text-text-primary font-semibold rounded-xl h-12 px-6 flex items-center justify-center hover:border-primary/40 transition-colors active:scale-[0.98]"
            >
              Volver
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const categoria = categoriaDe(ej.musculo_objetivo)

  const registros = progreso?.ultimos_registros ?? []
  const ultimoRegistro = registros[registros.length - 1]

  const registroDeSerie = (setNumber: number) => {
    const r = registros[setNumber - 1] ?? ultimoRegistro
    if (!r) return { previousWeight: null, previousReps: null }
    return { previousWeight: r.peso_kg, previousReps: r.repeticiones }
  }

  const formatearFecha = (fecha: string) => {
    const d = new Date(fecha)
    if (Number.isNaN(d.getTime())) return "—"
    const dd = String(d.getDate()).padStart(2, "0")
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    return `${dd}/${mm}/${d.getFullYear()}`
  }

  const marca = progreso?.marca_maxima_kg ?? 0
  const registrosHistorial = registros.slice(0, 5)

  return (
    <>
    <main className="px-6 pt-6 pb-6 animate-fade-in">
      {/* -------- Header: volver + título -------- */}
      <Link
        href="/dashboard/rutinas"
        className="inline-flex items-center gap-2 font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver
      </Link>

      <h1 className="font-display text-2xl font-bold text-text-primary capitalize mb-6">
        {ej.nombre}
      </h1>

{/* -------- Visual 3D / animación -------- */}
      <div className="relative w-full bg-surface border border-border rounded-2xl overflow-hidden mb-6 min-h-[220px] flex items-center justify-center">
        {ej.gif_url ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={ej.gif_url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,92,255,0.10),transparent_65%)] pointer-events-none" />
            <div className="relative w-20 h-20 rounded-full bg-hierro border border-hierro-border flex items-center justify-center">
              <Dumbbell className="w-9 h-9 text-primary" />
            </div>
            <span className="absolute bottom-3 right-3 font-sans text-[10px] text-text-secondary/60">
              Vista animada próximamente
            </span>
          </>
        )}
      </div>

      {/* -------- Metadatos (pills) -------- */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ej.musculo_objetivo && (
          <span className="bg-secondary/20 text-secondary font-sans text-xs font-semibold rounded-full px-3 py-1.5">
            {ej.musculo_objetivo}
          </span>
        )}
        {ej.equipo && (
          <span className="bg-primary/20 text-primary font-sans text-xs font-semibold rounded-full px-3 py-1.5">
            {ej.equipo}
          </span>
        )}
        <span className="bg-hierro border border-hierro-border text-text-secondary font-sans text-xs font-medium rounded-full px-3 py-1.5">
          {categoria}
        </span>
      </div>

      {/* -------- Instrucciones -------- */}
      <section className="bg-hierro-soft rounded-2xl p-5 border border-hierro-border">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-primary" />
          <h2 className="font-sans text-sm font-bold text-text-primary">
            Instrucciones
          </h2>
        </div>

        {ej.instrucciones ? (
          <p className="font-sans text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {ej.instrucciones}
          </p>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 rounded-full bg-hierro border border-hierro-border flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-text-secondary/50" />
            </div>
            <p className="font-sans text-sm text-text-secondary">
              Sin instrucciones cargadas para este ejercicio.
            </p>
          </div>
        )}
      </section>

      {/* -------- Registro de Series -------- */}
      <section className="mt-6 bg-hierro-soft rounded-2xl p-5 border border-hierro-border">
        <h2 className="font-display text-lg font-bold text-text-primary mb-1">
          Registro de Series
        </h2>
        <p className="font-sans text-xs text-text-muted mb-4">
          Cargá el peso y las repeticiones de cada serie.
        </p>
        <div className="divide-y divide-hierro-border/60">
          {[1, 2, 3, 4].map((num) => (
            <SetLogger
              key={num}
              setNumber={num}
              ejercicioId={ej.id ?? 0}
              descansoDefault={descansoId ?? 90}
              {...registroDeSerie(num)}
            />
          ))}
        </div>
      </section>

      {/* -------- Historial y Récords -------- */}
      <section className="mt-6 bg-hierro-soft rounded-2xl p-5 border border-hierro-border">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-bold text-text-primary">
            Historial y Récords
          </h2>
        </div>

        {marca > 0 && (
          <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-primary">
                Récord Personal (PR)
              </p>
              <p className="font-display text-2xl font-bold text-text-primary">
                {marca} kg
              </p>
            </div>
          </div>
        )}

        {registrosHistorial.length > 0 ? (
          <div className="space-y-1.5">
            {registrosHistorial.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-surface border border-border rounded-lg px-3 py-2"
              >
                <span className="font-sans text-xs text-text-muted tabular-nums">
                  {formatearFecha(r.fecha)}
                </span>
                <span className="font-sans text-sm font-bold text-text-primary tabular-nums">
                  {r.peso_kg} kg
                </span>
                <span className="font-sans text-xs text-text-secondary tabular-nums">
                  x {r.repeticiones}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 rounded-full bg-hierro border border-hierro-border flex items-center justify-center mb-3">
              <Dumbbell className="w-6 h-6 text-text-secondary/50" />
            </div>
            <p className="font-sans text-sm text-text-secondary">
              Es tu primer entrenamiento de este ejercicio. ¡Dale, subí la primera serie! 💪
            </p>
          </div>
        )}
      </section>
      </main>

      {/* -------- Barra de acción rápida -------- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border z-10">
        <button
          onClick={() => router.back()}
          className="w-full bg-primary text-text-primary font-bold rounded-2xl h-12 flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors active:scale-[0.98]"
        >
          Volver a la Rutina
        </button>
      </div>
    </>
  )
}