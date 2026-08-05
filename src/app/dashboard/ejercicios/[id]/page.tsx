"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, BookOpen, Dumbbell, Play } from "lucide-react"
import { api } from "@/lib/api"

const MUSCULO_CATEGORIA = new Map<string, string>([
  ["Pecho", "Tren Superior"],
  ["Pectorales", "Tren Superior"],
  ["Pectoral", "Tren Superior"],
  ["Espalda", "Tren Superior"],
  ["Espalda alta", "Tren Superior"],
  ["Dorsales", "Tren Superior"],
  ["Dorsal", "Tren Superior"],
  ["Hombros", "Tren Superior"],
  ["Deltoides", "Tren Superior"],
  ["Bíceps", "Tren Superior"],
  ["Tríceps", "Tren Superior"],
  ["Trapecio", "Tren Superior"],
  ["Antebrazos", "Tren Superior"],
  ["Cuádriceps", "Tren Inferior"],
  ["Isquiotibiales", "Tren Inferior"],
  ["Glúteos", "Tren Inferior"],
  ["Gemelos", "Tren Inferior"],
  ["Sóleo", "Tren Inferior"],
  ["Aductores", "Tren Inferior"],
  ["Abdominales", "Core"],
  ["Recto abdominal", "Core"],
  ["Oblicuos", "Core"],
  ["Transverso abdominal", "Core"],
  ["Lumbar", "Core"],
  ["Espalda baja", "Core"],
])

function categoriaDe(musculo?: string): string {
  if (!musculo) return "General"
  return MUSCULO_CATEGORIA.get(musculo) ?? "General"
}

export default function EjercicioDetallePage() {
  const params = useParams()
  const id = Number(params.id)

  const { data: ej, isLoading, isError, refetch } = useQuery({
    queryKey: ["ejercicio", id],
    queryFn: () => api.ejercicios.detalle(id),
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

      <h1 className="font-display text-2xl font-bold text-text-primary capitalize mb-6">
        {ej.nombre}
      </h1>

      {/* -------- Visual placeholder 3D -------- */}
      <div className="relative w-full bg-surface border border-border rounded-2xl overflow-hidden mb-6 min-h-[220px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,92,255,0.10),transparent_65%)] pointer-events-none" />
        <div className="relative w-20 h-20 rounded-full bg-hierro border border-hierro-border flex items-center justify-center">
          {ej.gif_url ? (
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-text-primary ml-0.5">
              <Play className="w-4 h-4 fill-current" />
            </span>
          ) : (
            <Dumbbell className="w-9 h-9 text-primary" />
          )}
        </div>
        <span className="absolute bottom-3 right-3 font-sans text-[10px] text-text-secondary/60">
          Vista animada próximamente
        </span>
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
    </main>
  )
}