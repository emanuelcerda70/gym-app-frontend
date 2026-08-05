"use client"

import { CalendarCheck, Dumbbell, Flame, TrendingUp } from "lucide-react"
import { usePerfil } from "@/hooks/usePerfil"

const BARRAS = [34, 48, 41, 58, 52, 66, 60, 74, 69, 82, 77, 92]

function ProgressCard({
  icon: Icon,
  label,
  value,
  contexto,
  tendencia,
}: {
  icon: React.ElementType
  label: string
  value: string
  contexto?: string
  tendencia?: string
}) {
  return (
    <div className="bg-surface-light border border-border rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-primary" />
          <p className="font-sans text-xs font-semibold text-text-secondary">
            {label}
          </p>
        </div>
        {tendencia && (
          <span className="flex items-center gap-1 font-sans text-[10px] font-bold text-secondary">
            <TrendingUp className="w-3 h-3" />
            {tendencia}
          </span>
        )}
      </div>
      <p className="font-display text-2xl font-bold text-text-primary">{value}</p>
      {contexto && (
        <p className="font-sans text-xs text-text-secondary mt-1">{contexto}</p>
      )}
    </div>
  )
}

export default function ProgresoPage() {
  const { perfil, isLoading } = usePerfil()
  const racha = perfil?.racha_actual_dias ?? 0

  return (
    <main className="px-6 pt-6 pb-6">
      {/* -------- Header -------- */}
      <h1 className="font-display text-2xl font-bold text-text-primary mb-6">
        Progreso
      </h1>

      {/* -------- Módulo Constancia -------- */}
      <section className="bg-surface-light border border-border rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3 mb-2">
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
        <p className="font-sans text-sm text-text-secondary leading-relaxed">
          {racha > 0
            ? "La constancia ya es tu superpoder. Cada sesión cuenta para tu objetivo."
            : "Toda racha empieza con un primer entrenamiento. El plan está listo cuando vos lo estés."}
        </p>
      </section>

      {/* -------- Grid de Progress Cards -------- */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ProgressCard
          icon={CalendarCheck}
          label="Entrenamientos este mes"
          value="12"
          contexto="Este mes vas imparable"
          tendencia="+8%"
        />
        <ProgressCard
          icon={Dumbbell}
          label="Volumen total"
          value="4,500 kg"
          contexto="Acumulado en la temporada"
          tendencia="+12%"
        />
      </div>

      {/* -------- Placeholder de Gráfico -------- */}
      <section className="relative w-full bg-surface-light border border-border rounded-2xl p-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,255,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Evolución de fuerza
            </p>
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>

          {/* Barras simulando evolución */}
          <div className="flex items-end gap-1.5 h-24 mb-3">
            {BARRAS.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-t-md ${
                  i === BARRAS.length - 1
                    ? "bg-gradient-to-t from-primary to-secondary"
                    : "bg-primary/30"
                }`}
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