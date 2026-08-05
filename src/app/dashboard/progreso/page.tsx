"use client"

/* eslint-disable @next/next/no-img-element */
import type { ElementType } from "react"
import {
  CalendarCheck,
  ChevronDown,
  Dumbbell,
  Filter,
  Flame,
  TrendingUp,
} from "lucide-react"
import { usePerfil } from "@/hooks/usePerfil"
import { getMascotAvatar } from "@/utils/mascot"

const BARRAS_FUERZA = [34, 48, 41, 58, 52, 66, 60, 74, 69, 82, 77, 92]
const SPARK_ALTURAS = ["h-2", "h-4", "h-3", "h-5", "h-3", "h-4", "h-5", "h-3"]

function Sparkline({ alturas }: { alturas: string[] }) {
  return (
    <div className="flex items-end gap-1 mt-3">
      {alturas.map((h, i) => (
        <div
          key={i}
          className={`flex-1 ${h} rounded-sm ${
            i % 2 === 0 ? "bg-primary" : "bg-secondary"
          }`}
        />
      ))}
    </div>
  )
}

function ProgressCard({
  icon: Icon,
  label,
  value,
  contexto,
  tendencia,
  sparkline,
}: {
  icon: ElementType
  label: string
  value: string
  contexto?: string
  tendencia?: string
  sparkline?: string[]
}) {
  return (
    <div className="bg-surface-light border border-border rounded-2xl p-4 overflow-hidden">
      <div className="flex items-start justify-between w-full gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-4 h-4 text-primary shrink-0" />
          <p className="font-sans text-xs font-semibold text-text-secondary truncate">
            {label}
          </p>
        </div>
        {tendencia && (
          <span className="shrink-0 flex items-center gap-1 font-sans text-[10px] font-bold text-secondary">
            <TrendingUp className="w-3 h-3" />
            {tendencia}
          </span>
        )}
      </div>
      <p className="font-display text-2xl font-bold text-text-primary">{value}</p>
      {contexto && (
        <p className="font-sans text-xs text-text-secondary mt-1">{contexto}</p>
      )}
      {sparkline && <Sparkline alturas={sparkline} />}
    </div>
  )
}

export default function ProgresoPage() {
  const { perfil, isLoading } = usePerfil()
  const racha = perfil?.racha_actual_dias ?? 0

  return (
    <main className="px-6 pt-6 pb-6">
      {/* -------- Header -------- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Progreso
        </h1>
        <button
          aria-label="Filtrar"
          className="w-10 h-10 rounded-full bg-surface-light border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors active:scale-95"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* -------- Módulo Constancia -------- */}
      <section className="relative bg-surface-light border border-border rounded-2xl p-5 mb-4 overflow-hidden">
        <div className="flex items-center gap-3 mb-2 pr-24">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="font-sans text-xs text-text-secondary">Constancia</p>
            {isLoading ? (
              <p className="font-sans text-sm text-text-secondary">
                Cargando tu racha...
              </p>
            ) : racha > 0 ? (
              <p className="font-display text-xl font-bold text-text-primary">
                ¡{racha} {racha === 1 ? "día" : "días"} de racha!
              </p>
            ) : (
              <p className="font-display text-xl font-bold text-text-primary">
                Sumá tu primer día
              </p>
            )}
          </div>
        </div>
        <p className="font-sans text-sm text-text-secondary leading-relaxed pr-24">
          {racha > 0
            ? "La constancia ya es tu superpoder. Cada sesión cuenta para tu objetivo."
            : "Toda racha empieza con un primer entrenamiento. El plan está listo cuando vos lo estés."}
        </p>

        {/* Mascota evolutiva */}
        <img
          src={getMascotAvatar(racha)}
          alt="Tu mascota"
          className="absolute right-4 bottom-0 w-24 h-24 object-contain pointer-events-none"
        />
      </section>

      {/* -------- Grid de Progress Cards -------- */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ProgressCard
          icon={CalendarCheck}
          label="Entrenamientos este mes"
          value="12"
          contexto="Este mes vas imparable"
          tendencia="+8%"
          sparkline={SPARK_ALTURAS}
        />
        <ProgressCard
          icon={Dumbbell}
          label="Volumen total"
          value="4,500 kg"
          contexto="Acumulado en la temporada"
          tendencia="+12%"
          sparkline={[...SPARK_ALTURAS].reverse()}
        />
      </div>

      {/* -------- Evolución de Fuerza -------- */}
      <section className="relative w-full bg-surface-light border border-border rounded-2xl p-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,255,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Evolución de fuerza
            </p>
            <button className="flex items-center gap-1 font-sans text-xs text-text-secondary hover:text-text-primary transition-colors">
              Últimas 4 semanas
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Barras con degradado vertical */}
          <div className="flex items-end gap-1.5 h-24 mb-3">
            {BARRAS_FUERZA.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary/20 to-secondary"
              />
            ))}
          </div>

          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            Tendencia positiva en fuerza durante las últimas 4 semanas. Seguí
            así y los próximos rondos lo van a reflejar.
          </p>
        </div>
      </section>
    </main>
  )
}