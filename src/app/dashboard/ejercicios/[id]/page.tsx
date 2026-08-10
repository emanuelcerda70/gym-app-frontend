"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ChevronLeft, Dumbbell, Loader2, Maximize2, Minus, MoreVertical, Plus, X } from "lucide-react"
import { api } from "@/lib/api"

const TOTAL_SERIES = 4

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
  const queryClient = useQueryClient()

  const [serieActual, setSerieActual] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [showTecnica, setShowTecnica] = useState(false)
  const [peso, setPeso] = useState(0)
  const [reps, setReps] = useState(0)
  const [segundosRestantes, setSegundosRestantes] = useState(descansoId ?? 90)
  const [mostrarHistorial, setMostrarHistorial] = useState(false)
  const [errorGuardado, setErrorGuardado] = useState(false)
  const [showFullVideo, setShowFullVideo] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  useEffect(() => {
    if (!isResting) return
    setSegundosRestantes((s) => (s > 0 ? s : 90))
    intervalRef.current = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isResting])

  useEffect(() => {
    if (segundosRestantes === 0 && isResting) {
      finalizarDescanso()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segundosRestantes])

  const registros = progreso?.ultimos_registros ?? []
  const ultimoRegistro = registros[registros.length - 1] ?? null

  function guardarSerie() {
    if (peso <= 0 || reps <= 0) return
    setErrorGuardado(false)
    mutacion.mutate()
  }

  const mutacion = useMutation({
    mutationFn: () =>
      api.historial.create({
        ejercicio_id: ej?.id ?? 0,
        peso,
        repeticiones: reps,
        rutina_id: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progreso"] })
      queryClient.invalidateQueries({ queryKey: ["ejercicio", "resumen"] })
      queryClient.invalidateQueries({ queryKey: ["perfil"] })
      api.checkin.registrar().catch(() => {})
      setIsResting(true)
      setErrorGuardado(false)
    },
    onError: () => {
      setErrorGuardado(true)
    },
  })

  function finalizarDescanso() {
    setIsResting(false)
    setSegundosRestantes(descansoId ?? 90)
    setSerieActual((prev) => (prev < TOTAL_SERIES ? prev + 1 : 1))
  }

  const minutos = Math.floor(segundosRestantes / 60)
  const segundosString = String(segundosRestantes % 60).padStart(2, "0")
  const tiempoFormateado = `${String(minutos).padStart(2, "0")}:${segundosString}`

  const radio = 90
  const circunferencia = 2 * Math.PI * radio
  const duracionBase = descansoId ?? 90
  const progresoDescanso = duracionBase > 0 ? segundosRestantes / duracionBase : 0
  const offsetProgreso = circunferencia * (1 - Math.min(Math.max(progresoDescanso, 0), 1))

  if (isLoading) {
    return (
      <main className="px-5 pt-5 pb-6">
        <div className="h-12 bg-zinc-900 rounded-xl animate-pulse mb-4" />
        <div className="aspect-[9/16] max-w-sm mx-auto bg-zinc-900 rounded-3xl animate-pulse mb-4" />
        <div className="h-24 bg-zinc-900 rounded-xl animate-pulse mb-4" />
        <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse" />
      </main>
    )
  }

  if (isError || !ej) {
    return (
      <main className="px-5 pt-5 pb-6">
        <div className="pt-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-zinc-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Ejercicio no encontrado
          </h1>
          <p className="text-sm text-zinc-400 mb-6">
            El ejercicio que buscás no existe o fue eliminado.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="bg-violet-600 text-white font-bold rounded-2xl h-12 px-6 transition-colors active:scale-[0.98]"
            >
              Reintentar
            </button>
            <Link
              href="/dashboard/rutinas"
              className="bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-2xl h-12 px-6 flex items-center justify-center active:scale-[0.98]"
            >
              Volver
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const tieneVideo = Boolean(ej.gif_url)
  const tieneImagen = Boolean(ej.infografia_url)
  const labelTechnique = [ej.musculo_objetivo, ej.equipo].filter(Boolean).join(" · ") || "Técnica recomendada"
  const objetivoDescanso = `${peso} kg × ${reps} reps`

  return (
    <>
      <main className="px-5 pt-5 pb-6">
        {/* -------- Header minimalista -------- */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={() => router.back()}
            aria-label="Volver"
            className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 min-w-0 font-sans text-lg font-bold text-white text-center truncate px-2">
            {ej.nombre}
          </h1>
          <button
            aria-label="Opciones"
            className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 active:scale-95 transition-transform"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* -------- Contenedor de video vertical 9:16 -------- */}
        <div className="relative w-full max-w-sm mx-auto aspect-[9/16] bg-zinc-900 rounded-3xl overflow-hidden shadow-lg mb-4">
          {tieneVideo ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={ej.gif_url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          ) : tieneImagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ej.infografia_url}
              alt={`Guía técnica de ${ej.nombre}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-500">
              <Dumbbell className="w-14 h-14" />
              <span className="text-xs">Vista animada próximamente</span>
            </div>
          )}

          {(tieneVideo || tieneImagen) && (
            <button
              onClick={() => (tieneVideo ? setShowFullVideo(true) : setShowFullImage(true))}
              aria-label="Ampliar"
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center active:scale-95 transition-transform z-10"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Texto contextual y botón técnico */}
        <p className="text-center text-xs text-zinc-400 mb-3">{labelTechnique}</p>
        <button
          onClick={() => setShowTecnica(true)}
          className="w-full py-3 rounded-2xl bg-zinc-900 border border-zinc-700 font-sans text-sm font-semibold text-white active:scale-[0.97] transition-transform mb-6"
        >
          📖 Técnica
        </button>

        {/* -------- Banner Entrenador IA -------- */}
        <div className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-4 mb-6 flex justify-between items-center">
          <p className="text-xs text-zinc-300 pr-3">
            ¿Tenés dudas sobre este ejercicio? Consultá a tu entrenador 🤖
          </p>
          <button
            className="shrink-0 bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
            onClick={() =>
              router.push(
                "/dashboard/chat?mensaje=" +
                  encodeURIComponent("decime la tecnica correcta para realizar " + ej.nombre.toLowerCase()) +
                  "&contexto=" +
                  encodeURIComponent(ej.nombre) +
                  "&serie=" +
                  serieActual +
                  "&peso=" +
                  peso +
                  "&reps=" +
                  reps
              )
            }
          >
            Preguntarle
          </button>
        </div>

        {/* -------- Área de Registro de Serie -------- */}
        {!isResting && (
          <section className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-zinc-400 font-semibold">SERIE ACTUAL</p>
              <p className="text-sm text-zinc-400 font-semibold">{serieActual} / {TOTAL_SERIES}</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              {Array.from({ length: TOTAL_SERIES }).map((_, i) => (
                <span
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full ${
                    i < serieActual ? "bg-emerald-500" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>

            {/* Peso */}
            <div className="flex items-center justify-between bg-zinc-900 rounded-3xl p-2 mb-3">
              <button
                aria-label="Quitar peso"
                onClick={() => setPeso((p) => Math.max(0, Math.round((p - 2.5) * 10) / 10))}
                className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl text-white active:scale-95 transition-transform"
              >
                <Minus className="w-8 h-8" />
              </button>
              <p className="text-4xl font-bold text-white tabular-nums">
                {peso} <span className="text-lg text-zinc-400 font-semibold">kg</span>
              </p>
              <button
                aria-label="Sumar peso"
                onClick={() => setPeso((p) => Math.round((p + 2.5) * 10) / 10)}
                className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl text-white active:scale-95 transition-transform"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>

            {/* Reps */}
            <div className="flex items-center justify-between bg-zinc-900 rounded-3xl p-2 mb-3">
              <button
                aria-label="Quitar repeticiones"
                onClick={() => setReps((r) => Math.max(0, r - 1))}
                className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl text-white active:scale-95 transition-transform"
              >
                <Minus className="w-8 h-8" />
              </button>
              <p className="text-4xl font-bold text-white tabular-nums">
                {reps} <span className="text-lg text-zinc-400 font-semibold">reps</span>
              </p>
              <button
                aria-label="Sumar repeticiones"
                onClick={() => setReps((r) => r + 1)}
                className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl text-white active:scale-95 transition-transform"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>

            {/* Historial rápido */}
            <div className="flex items-center justify-between px-1 mb-4">
              <p className="text-xs text-zinc-500">
                Última vez: {ultimoRegistro ? `${ultimoRegistro.peso_kg} kg x ${ultimoRegistro.repeticiones} reps` : "Sin registros"}
              </p>
              <button
                onClick={() => setMostrarHistorial((m) => !m)}
                className="text-xs text-violet-400 font-semibold"
              >
                Ver historial
              </button>
            </div>

            {mostrarHistorial && registros.length > 0 && (
              <div className="mb-4 bg-zinc-900 rounded-2xl border border-zinc-800 divide-y divide-zinc-800">
                {registros.slice(-5).reverse().map((r, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-xs text-zinc-500">{r.fecha}</span>
                    <span className="text-sm font-semibold text-white tabular-nums">
                      {r.peso_kg} kg x {r.repeticiones}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {errorGuardado && (
              <p className="text-xs text-red-400 text-center mb-2">
                No se pudo guardar la serie. Intentá de nuevo.
              </p>
            )}
          </section>
        )}

        {/* -------- CTA principal -------- */}
        {!isResting && (
          <button
            onClick={guardarSerie}
            disabled={mutacion.isPending || peso <= 0 || reps <= 0}
            className="w-full bg-violet-600 text-white font-black text-xl py-5 rounded-[2rem] shadow-[0_8px_30px_rgba(124,58,237,0.4)] active:scale-95 transition-all mt-4 mb-20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:active:scale-100"
          >
            {mutacion.isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <span>✓ COMPLETAR SERIE</span>
            )}
          </button>
        )}

        {/* -------- Estado de descanso -------- */}
        {isResting && (
          <section className="flex flex-col items-center justify-center pt-8 pb-16">
            <p className="text-2xl font-bold text-white text-center mb-8">
              ¡Serie completada! 💪
            </p>

            {/* Temporizador circular */}
            <div className="relative w-56 h-56 mb-8">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r={radio}
                  fill="none"
                  strokeWidth="12"
                  className="stroke-zinc-800"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radio}
                  fill="none"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circunferencia}
                  strokeDashoffset={offsetProgreso}
                  className="stroke-violet-400 transition-[stroke-dashoffset] duration-1000 ease-linear"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-6xl font-mono text-violet-400 tabular-nums">
                {tiempoFormateado}
              </p>
            </div>

            {/* Controles sutiles */}
            <div className="flex gap-6 mb-8">
              <button
                onClick={() => setSegundosRestantes((s) => Math.max(0, s - 30))}
                className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-semibold active:scale-95 transition-transform"
              >
                -30s
              </button>
              <button
                onClick={() => setSegundosRestantes((s) => s + 30)}
                className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-semibold active:scale-95 transition-transform"
              >
                +30s
              </button>
            </div>

            <button
              onClick={finalizarDescanso}
              className="w-full border-2 border-violet-600 text-violet-400 py-3.5 rounded-xl text-center font-bold active:scale-[0.98] transition-transform mb-8"
            >
              Omitir descanso
            </button>

            <div className="text-center">
              <p className="text-sm text-zinc-400 font-semibold">
                {serieActual < TOTAL_SERIES
                  ? `PRÓXIMA SERIE ${serieActual + 1} / ${TOTAL_SERIES} - Objetivo: ${objetivoDescanso}`
                  : "¡Última serie completada!"}
              </p>
            </div>
          </section>
        )}
      </main>

      {/* -------- Modal video fullscreen -------- */}
      {showFullVideo && tieneVideo && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <button
            onClick={() => setShowFullVideo(false)}
            aria-label="Cerrar video"
            className="fixed top-4 right-4 z-[110] w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
          <video
            src={ej.gif_url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* -------- Modal infografía fullscreen -------- */}
      {showFullImage && tieneImagen && (
        <div className="fixed inset-0 z-[120] bg-black flex items-center justify-center">
          <button
            onClick={() => setShowFullImage(false)}
            aria-label="Cerrar infografía"
            className="fixed top-4 right-4 z-[130] w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ej.infografia_url}
            alt={`Guía técnica de ${ej.nombre}`}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* -------- Guía Técnica (bottom sheet) -------- */}
      {showTecnica && (
        <div
          className="fixed inset-0 bg-black/85 z-[100] flex items-end"
          onClick={() => setShowTecnica(false)}
        >
          <div
            className="bg-zinc-900 rounded-t-[2rem] w-full max-h-[85vh] p-6 overflow-y-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-white">
                Técnica de {ej.nombre}
              </h2>
              <button
                onClick={() => setShowTecnica(false)}
                aria-label="Cerrar"
                className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {ej.instrucciones && (
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line mb-5">
                {ej.instrucciones}
              </p>
            )}

            {/* Puntos clave */}
            <h3 className="text-sm font-bold text-white mb-2">Puntos clave</h3>
            <ul className="space-y-2 mb-5">
              <li className="text-sm text-zinc-400 flex gap-2">
                <span className="text-violet-400">•</span> Mantené la postura y el rango completo de movimiento.
              </li>
              <li className="text-sm text-zinc-400 flex gap-2">
                <span className="text-violet-400">•</span> Controlá la fase negativa del movimiento.
              </li>
              <li className="text-sm text-zinc-400 flex gap-2">
                <span className="text-violet-400">•</span> Exhalá en el esfuerzo e inspirá al volver.
              </li>
            </ul>

            {/* Errores frecuentes */}
            <h3 className="text-sm font-bold text-white mb-2">Errores frecuentes</h3>
            <ul className="space-y-2 mb-8">
              <li className="text-sm text-zinc-400 flex gap-2">
                <span className="text-red-400">✗</span> Usar impulso o balancearse para levantar más peso.
              </li>
              <li className="text-sm text-zinc-400 flex gap-2">
                <span className="text-red-400">✗</span> Recortar el rango para &quot;meter más series&quot;.
              </li>
              <li className="text-sm text-zinc-400 flex gap-2">
                <span className="text-red-400">✗</span> Perder la alineación de la columna en el esfuerzo.
              </li>
            </ul>

            <button
              onClick={() => setShowTecnica(false)}
              className="w-full bg-violet-600 text-white font-bold text-base py-4 rounded-2xl active:scale-95 transition-transform"
            >
              ← Entendido
            </button>
          </div>
        </div>
      )}
    </>
  )
}