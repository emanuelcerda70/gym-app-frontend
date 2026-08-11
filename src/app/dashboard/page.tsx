"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  Calendar,
  Clock,
  Dumbbell,
  Flame,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getMascotAvatar } from "@/utils/mascot"
import { useAuthStore } from "@/store/authStore"
import { useRutinas } from "@/hooks/useRutinas"
import { useCheckin } from "@/hooks/useCheckin"
import { usePerfil } from "@/hooks/usePerfil"

const DIAS_SEMANA = 7

export default function DashboardPage() {
  const router = useRouter()
  const storeNombre = useAuthStore((s) => s.nombre)
  const { rutinaActual } = useRutinas()
  const { historial } = useCheckin()
  const { perfil, isLoading: perfilLoading } = usePerfil()

  console.log("DEBUG PERFIL:", { cargando: perfilLoading, datos: perfil })

  useEffect(() => {
    if (!perfilLoading && !perfil?.objetivo) {
      router.push("/onboarding")
    }
  }, [perfilLoading, perfil, router])

  const nombre = storeNombre || perfil?.nombre || "Atleta"
  const frecuencia = historial.data?.total_dias ?? 0
  const racha = perfil?.racha_actual_dias ?? 0
  const rutina = rutinaActual.data
  const duracionEstimada = rutina ? rutina.ejercicios.length * 12 : 0

  return (
    <main className="px-6 pb-6">
      {/* Header Superior */}
      <header className="flex justify-between items-start pt-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Hola, {nombre} ⚡
          </h1>
          <p className="font-sans text-sm text-text-secondary mt-1">
            Listo para ser tu mejor versión hoy 💪
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            aria-label="Notificaciones"
            className="w-10 h-10 rounded-full bg-hierro border border-hierro-border flex items-center justify-center text-text-secondary"
          >
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Hero Card - Racha Actual */}
      <section className="mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-hierro to-surface border border-hierro-border p-6">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-secondary" />
              <p className="label-caps">Racha Actual</p>
            </div>
            <div className="flex items-end gap-2 mt-3">
              <span className="font-display text-5xl font-bold text-text-primary">
                {perfilLoading ? "--" : racha}
              </span>
              <span className="font-sans text-sm text-text-secondary mb-2">días</span>
            </div>
            <p className="font-sans text-sm text-text-secondary mt-2">
              {racha > 0
                ? "¡Vamos! No la cortes hoy 🔥"
                : "Arrancá tu racha hoy: cada día suma."}
            </p>
            <div className="flex gap-1.5 mt-5">
              {Array.from({ length: DIAS_SEMANA }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-1.5 rounded-full transition-colors",
                    i < Math.min(racha, DIAS_SEMANA)
                      ? "bg-gradient-to-r from-primary to-secondary"
                      : "bg-surface-light border border-hierro-border"
                  )}
                />
              ))}
            </div>
            <p className="font-sans text-[11px] text-text-secondary mt-2">Meta semanal</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getMascotAvatar(racha)}
            alt="Mascota ASCEND"
            className="w-24 h-24 object-contain shrink-0"
          />
        </div>
      </section>

      {/* Grid de Métricas Rápidas */}
      <section className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-hierro rounded-2xl p-4 border border-hierro-border">
          <Calendar className="w-5 h-5 text-primary mb-3" />
          <p className="label-caps">Frecuencia Semanal</p>
          <p className="font-display text-2xl font-bold text-text-primary mt-1">
            {historial.isLoading ? "--" : `${frecuencia}/7`}
          </p>
          <div className="flex gap-1 mt-3">
            {Array.from({ length: DIAS_SEMANA }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-1 rounded-full transition-colors",
                  i < frecuencia
                    ? "bg-primary"
                    : "bg-surface-light border border-hierro-border"
                )}
              />
            ))}
          </div>
        </div>

        <div className="bg-hierro rounded-2xl p-4 border border-hierro-border">
          <Flame className="w-5 h-5 text-secondary mb-3" />
          <p className="label-caps">Calorías esta semana</p>
          <p className="font-display text-2xl font-bold text-text-primary mt-1">
            2.450 kcal
          </p>
          <div className="flex gap-1 mt-3">
            {Array.from({ length: DIAS_SEMANA }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-1 rounded-full transition-colors",
                  i < 4
                    ? "bg-gradient-to-r from-primary to-secondary"
                    : "bg-surface-light border border-hierro-border"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Rutina de Hoy */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-sans text-sm font-semibold text-text-secondary">
            RUTINA DE HOY
          </h2>
          <Link
            href="/dashboard/rutinas"
            className="font-sans text-xs font-semibold text-primary"
          >
            Ver todas
          </Link>
        </div>

        {rutinaActual.isLoading ? (
          <div className="w-full bg-hierro-soft rounded-2xl p-6 border border-hierro-border animate-pulse" />
        ) : rutina ? (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-hierro-soft to-surface border border-hierro-border p-5">
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative">
              <span className="inline-block bg-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1">
                Fuerza
              </span>
              <h3 className="font-display text-xl font-bold text-text-primary mt-3">
                {rutina.nombre_rutina}
              </h3>
              <p className="font-sans text-sm text-text-secondary mt-1">
                {rutina.descripcion}
              </p>
              <div className="flex items-center gap-4 mt-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {duracionEstimada} min aprox
                </span>
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="w-4 h-4" />
                  {rutina.ejercicios.length} ejercicios
                </span>
              </div>
              <button className="mt-5 w-full bg-primary text-text-primary font-bold rounded-xl h-12 flex items-center justify-center hover:bg-primary-hover transition-colors active:scale-[0.98]">
                Comenzar entrenamiento
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-hierro-soft rounded-2xl p-6 border border-hierro-border text-center">
            <Dumbbell className="w-12 h-12 text-text-secondary/50 mx-auto mb-4" />
            <p className="font-sans text-sm text-text-secondary mb-6">
              Aún no tienes rutinas asignadas. Habla con el asistente para crear
              tu primer plan de entrenamiento.
            </p>
            <Link
              href="/dashboard/chat"
              className="w-full bg-primary text-text-primary font-bold rounded-xl h-12 flex items-center justify-center hover:bg-primary-hover transition-colors active:scale-[0.98]"
            >
              Crear mi primera rutina
            </Link>
          </div>
        )}
      </section>

      {/* Grid Inferior Horizontal */}
      <section className="mt-8">
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar">
          <div className="min-w-[200px] snap-center bg-hierro rounded-2xl p-4 border border-hierro-border">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="label-caps">Progreso</p>
            <p className="font-display text-lg font-bold text-text-primary mt-1">
              +10kg en Press
            </p>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Este mes subiste tu mejor marca.
            </p>
          </div>

          <div className="min-w-[200px] snap-center bg-hierro rounded-2xl p-4 border border-hierro-border">
            <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-3">
              <Trophy className="w-4 h-4" />
            </div>
            <p className="label-caps">Logros</p>
            <p className="font-display text-lg font-bold text-text-primary mt-1">
              3 de 5
            </p>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Desbloqueaste logros esta semana.
            </p>
          </div>

          <div className="min-w-[200px] snap-center bg-hierro rounded-2xl p-4 border border-hierro-border">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="label-caps">Consejo del día</p>
            <p className="font-display text-lg font-bold text-text-primary mt-1">
              Hidratación
            </p>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Tomá agua antes y durante el entrenamiento.
            </p>
          </div>
        </div>
      </section>

      {/* Banner: Tu Entrenador IA */}
      <section className="mt-2">
        <div className="rounded-2xl bg-hierro/50 backdrop-blur-md border border-hierro-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getMascotAvatar(racha)}
                alt="Mascota IA"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-sans text-sm font-bold text-text-primary">
                  Tu entrenador IA
                </p>
                <span className="bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5">
                  Activo
                </span>
              </div>
              <p className="font-sans text-xs text-text-secondary mt-0.5">
                Hoy aumenta el peso en Press Banca.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/chat"
            className="mt-4 w-full bg-primary text-text-primary font-bold rounded-xl h-12 flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            Abrir chat
            <MessageCircle className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
