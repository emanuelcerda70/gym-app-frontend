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
  const [showFullVideo, setShowFullVideo] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [activeMedia, setActiveMedia] = useState(0) // 0 = Video, 1 = Infografía
  const [peso, setPeso] = useState(0)
  const [reps, setReps] = useState(0)
  const [segundosRestantes, setSegundosRestantes] = useState(descansoId ?? 90)
  const [mostrarHistorial, setMostrarHistorial] = useState(false)
  const [errorGuardado, setErrorGuardado] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const carruselRef = useRef<HTMLDivElement | null>(null)

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
  const segundos = String(segundosRestantes % 60).padStart(2, "0")
  const tiempoFormateado = `${String(minutos).padStart(2, "0")}:${segundos}`

  if (isLoading) {
    return (
      <main className="px-6 pt-6 pb-6">
        <div className="h-12 bg-zinc-900 rounded-xl animate-pulse mb-4" />
        <div className="aspect-video bg-zinc-900 rounded-2xl animate-pulse mb-4" />
        <div className="h-24 bg-zinc-900 rounded-xl animate-pulse mb-4" />
        <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse" />
      </main>
    )
  }

  if (isError || !ej) {
    return (
      <main className="px-6 pt-6 pb-6">
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
              className="bg-violet-600 text-white font-bold rounded-xl h-12 px-6 hover:bg-violet-500 transition-colors active:scale-[0.98]"
            >
              Reintentar
            </button>
            <Link
              href="/dashboard/rutinas"
              className="bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl h-12 px-6 flex items-center justify-center active:scale-[0.98]"
            >
              Volver
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const objetivoTexto = ultimoRegistro
    ? `${ultimoRegistro.peso_kg} kg x ${ultimoRegistro.repeticiones} reps`
    : "—"

  const tieneVideo = Boolean(ej.gif_url)
  const tieneImagen = Boolean(ej.infografia_url)
  const cantidadMedia = (tieneVideo ? 1 : 0) + (tieneImagen ? 1 : 0)

  function handleMediaScroll() {
    const el = carruselRef.current
    if (!el || el.clientWidth === 0) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActiveMedia(Math.min(Math.max(idx, 0), cantidadMedia - 1))
  }

  function irAMedia(i: number) {
    const el = carruselRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" })
    setActiveMedia(i)
  }

  return (
    <>
      <main className="px-5 pt-5 pb-32">
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

        {/* Carrusel multimedia */}
        <div className="mb-1">
          <div
            ref={carruselRef}
            onScroll={handleMediaScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl"
          >
            <div className="relative min-w-full snap-center aspect-video bg-zinc-900 flex items-center justify-center">
              {tieneVideo ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  src={ej.gif_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <Dumbbell className="w-12 h-12 text-zinc-500" />
                  <span className="absolute bottom-3 right-3 text-[11px] text-zinc-500">
                    Vista animada próximamente
                  </span>
                </>
              )}
              {tieneVideo && (
                <button
                  onClick={() => setShowFullVideo(true)}
                  aria-label="Ampliar video"
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center active:scale-95 transition-transform z-10"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {tieneImagen && (
              <div className="relative min-w-full snap-center aspect-video bg-zinc-900 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ej.infografia_url}
                  alt={`Guía técnica de ${ej.nombre}`}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <button
                  onClick={() => setShowFullImage(true)}
                  aria-label="Ampliar infografía"
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center active:scale-95 transition-transform z-10"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {cantidadMedia > 1 && (
            <div className="flex justify-center gap-2 mt-2">
              {Array.from({ length: cantidadMedia }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => irAMedia(i)}
                  aria-label={`Ir al medio ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-opacity ${
                    activeMedia === i ? "bg-white opacity-100" : "bg-white/30 opacity-60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Fila 1: Animación / Infografía / Técnica */}
        <div className="flex gap-4 mb-1">
          <button
            onClick={() => irAMedia(0)}
            className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 font-sans text-sm font-semibold text-white active:scale-[0.97] transition-transform"
          >
            ▶ Animación
          </button>
          {tieneImagen && (
            <button
              onClick={() => irAMedia(1)}
              className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 font-sans text-sm font-semibold text-white active:scale-[0.97] transition-transform"
            >
              🖼 Infografía
            </button>
          )}
          <button
            onClick={() => setShowTecnica(true)}
            className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 font-sans text-sm font-semibold text-white active:scale-[0.97] transition-transform"
          >
            📖 Técnica
          </button>
        </div>

        {/* Banner IA */}
        <div className="flex justify-between items-center bg-zinc-800/50 rounded-xl p-3 mt-3 border border-zinc-700/50">
          <p className="text-xs text-zinc-300 pr-3">
            ¿Necesitás ayuda con la técnica? Consultá a tu entrenador 🤖
          </p>
          <button
            className="shrink-0 bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
            onClick={() => {
              const mensajeIA =
                "decime la tecnica correcta para realizar " + ej.nombre.toLowerCase()
              router.push("/dashboard/chat?mensaje=" + encodeURIComponent(mensajeIA))
            }}
          >
            Preguntarle
          </button>
        </div>

        {/* Área de Registro */}
        {!isResting && (
          <section className="mt-5">
            {/* Indicador de serie */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-400 font-semibold">SERIE ACTUAL</p>
              <p className="text-sm text-zinc-400 font-semibold">{serieActual} / {TOTAL_SERIES}</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: TOTAL_SERIES }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full ${
                      i < serieActual ? "bg-emerald-500" : "bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Inputs gigantes */}
            <div className="flex items-center justify-between bg-zinc-900 rounded-2xl p-3 mb-3 border border-zinc-800">
              <button
                aria-label="Quitar peso"
                onClick={() => setPeso((p) => Math.max(0, Math.round((p - 2.5) * 10) / 10))}
                className="w-16 h-16 rounded-full bg-zinc-800 text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <Minus className="w-8 h-8" />
              </button>
              <p className="text-4xl font-bold text-white tabular-nums">
                {peso} <span className="text-xl text-zinc-400">kg</span>
              </p>
              <button
                aria-label="Sumar peso"
                onClick={() => setPeso((p) => Math.round((p + 2.5) * 10) / 10)}
                className="w-16 h-16 rounded-full bg-zinc-800 text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-zinc-900 rounded-2xl p-4 mb-4 border border-zinc-800">
              <button
                aria-label="Quitar repeticiones"
                onClick={() => setReps((r) => Math.max(0, r - 1))}
                className="w-16 h-16 rounded-full bg-zinc-800 text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <Minus className="w-8 h-8" />
              </button>
              <p className="text-4xl font-bold text-white tabular-nums">
                {reps} <span className="text-zinc-400">reps</span>
              </p>
              <button
                aria-label="Sumar repeticiones"
                onClick={() => setReps((r) => r + 1)}
                className="w-16 h-16 rounded-full bg-zinc-800 text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>

            {/* Historial rápido */}
            <div className="flex items-center justify-between px-1">
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
              <div className="mt-3 bg-zinc-900 rounded-xl border border-zinc-800 divide-y divide-zinc-800">
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
              <p className="text-xs text-red-400 text-center mt-4">
                No se pudo guardar la serie. Intentá de nuevo.
              </p>
            )}
          </section>
        )}

        {!isResting && (
          <div className="pt-4">
            <button
              onClick={guardarSerie}
              disabled={mutacion.isPending || peso <= 0 || reps <= 0}
              className="w-full bg-violet-600 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_0_15px_rgba(124,58,237,0.3)] active:scale-95 transition-transform disabled:opacity-40 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {mutacion.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span>✓ COMPLETAR SERIE</span>
              )}
            </button>
          </div>
        )}

        {/* Estado de descanso */}
        {isResting && (
          <section className="pt-6">
            <p className="text-2xl font-bold text-white text-center">
              ¡Serie completada! 💪
            </p>
            <p className="text-6xl font-mono text-violet-400 my-8 text-center tabular-nums">
              {tiempoFormateado}
            </p>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSegundosRestantes((s) => Math.max(0, s - 30))}
                className="flex-1 py-3 rounded-xl bg-zinc-800 text-white font-semibold active:scale-95 transition-transform"
              >
                -30s
              </button>
              <button
                onClick={() => setSegundosRestantes((s) => s + 30)}
                className="flex-1 py-3 rounded-xl bg-zinc-800 text-white font-semibold active:scale-95 transition-transform"
              >
                +30s
              </button>
            </div>

            <button
              onClick={finalizarDescanso}
              className="w-full border-2 border-violet-600 text-violet-400 py-3 rounded-xl text-center font-bold active:scale-[0.98] transition-transform"
            >
              OMITIR DESCANSO
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                {serieActual < TOTAL_SERIES
                  ? `Próxima serie: ${serieActual + 1}/${TOTAL_SERIES} - Objetivo: ${objetivoTexto}`
                  : "¡Última serie completada!"}
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Modal de video en pantalla completa */}
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

      {/* Modal de infografía con zoom */}
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

      {/* Modal técnico (bottom sheet) */}
      {showTecnica && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-end"
          onClick={() => setShowTecnica(false)}
        >
          <div
            className="bg-zinc-900 rounded-t-3xl w-full h-[75vh] p-6 overflow-y-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
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

            <div className="space-y-4 pb-4">
              {ej.instrucciones ? (
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                  {ej.instrucciones}
                </p>
              ) : (
                <p className="text-sm text-zinc-500">
                  Sin instrucciones cargadas para este ejercicio.
                </p>
              )}

              <div>
                <h3 className="text-sm font-bold text-white mb-2">Puntos clave</h3>
                <ul className="space-y-1.5">
                  <li className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-violet-400">•</span> Mantené la postura y el rango completo de movimiento.
                  </li>
                  <li className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-violet-400">•</span> Controlá la fase negativa del movimiento.
                  </li>
                  <li className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-violet-400">•</span> Si falla la técnica, baja el peso.
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowTecnica(false)}
              className="w-full bg-violet-600 text-white font-bold text-base py-4 rounded-2xl active:scale-95 transition-transform"
            >
              ENTENDIDO
            </button>
          </div>
        </div>
      )}
    </>
  )
}