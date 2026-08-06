"use client"

import { useEffect } from "react"
import { Timer, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRestTimerStore } from "@/store/restTimerStore"

const PRESETS = [
  { segundos: 30, etiqueta: "30s" },
  { segundos: 60, etiqueta: "1 min" },
  { segundos: 90, etiqueta: "1:30" },
  { segundos: 120, etiqueta: "2 min" },
  { segundos: 180, etiqueta: "3 min" },
]

function formato(total: number): string {
  const mm = Math.floor(total / 60)
  const ss = total % 60
  return `${mm}:${String(ss).padStart(2, "0")}`
}

export default function RestBar() {
  const {
    estado,
    serie,
    totalSegundos,
    restante,
    preseleccion,
    arrancar,
    saltar,
    cerrar,
  } = useRestTimerStore()

  useEffect(() => {
    if (estado !== "terminado") return
    const t = setTimeout(() => saltar(), 4000)
    return () => clearTimeout(t)
  }, [estado, saltar])

  if (estado === "cerrado") return null

  const R = 26
  const CIRC = 2 * Math.PI * R
  const progreso = estado === "corriendo" ? restante / totalSegundos : 1
  const tiempo = estado === "corriendo" || estado === "terminado" ? formato(estado === "terminado" ? 0 : restante) : null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pointer-events-none">
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-md rounded-2xl border p-4 shadow-lg animate-fade-in",
          estado === "terminado"
            ? "border-success/50 bg-success/10"
            : "bg-hierro/95 backdrop-blur-md border-hierro-border"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                estado === "terminado" ? "bg-success/20 text-success" : "bg-surface-elevated text-secondary"
              )}
            >
              <Timer className="w-4 h-4" />
            </span>
            <div>
              <p className="font-sans text-xs font-bold text-text-primary">
                {estado === "ofrecido" && "Descanso"}
                {estado === "corriendo" && "Descansando"}
                {estado === "terminado" && "¡Descanso terminado!"}
              </p>
              {serie !== null && (
                <p className="font-sans text-[11px] text-text-muted">Serie {serie}</p>
              )}
            </div>
          </div>
          <button
            onClick={cerrar}
            aria-label="Cerrar descanso"
            className="w-8 h-8 rounded-full bg-surface-elevated text-text-muted flex items-center justify-center hover:text-text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Estado: ofrecer opciones */}
        {estado === "ofrecido" && (
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.segundos}
                onClick={() => arrancar(p.segundos)}
                className={cn(
                  "font-sans text-xs font-bold rounded-full px-3.5 py-2 border transition-all active:scale-95",
                  p.segundos === preseleccion
                    ? "bg-secondary/20 border-secondary/50 text-secondary"
                    : "bg-surface-elevated border-border text-text-secondary hover:text-text-primary hover:border-secondary/40"
                )}
              >
                {p.etiqueta}
              </button>
            ))}
            <button
              onClick={saltar}
              className="font-sans text-xs font-semibold rounded-full px-3.5 py-2 text-text-muted hover:text-text-primary transition-colors"
            >
              Saltar descanso
            </button>
          </div>
        )}

        {/* Estado: cuenta regresiva */}
        {estado === "corriendo" && (
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r={R} fill="none" stroke="#23232C" strokeWidth="5" />
                <circle
                  cx="32" cy="32" r={R} fill="none"
                  stroke="#00D4FF"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - progreso)}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-display-expanded text-lg text-text-primary tabular-nums">
                {tiempo}
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-wrap gap-2">
              <button
                onClick={() => arrancar(30)}
                className="font-sans text-[11px] font-semibold rounded-full px-2.5 py-1.5 border border-border text-text-secondary hover:text-text-primary transition-colors"
              >
                +30s
              </button>
              <button
                onClick={() => arrancar(totalSegundos + 60)}
                className="font-sans text-[11px] font-semibold rounded-full px-2.5 py-1.5 border border-border text-text-secondary hover:text-text-primary transition-colors"
              >
                +1 min
              </button>
              <button
                onClick={saltar}
                className="font-sans text-[11px] font-semibold rounded-full px-2.5 py-1.5 bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
              >
                Saltar descanso
              </button>
            </div>
          </div>
        )}

        {/* Estado: terminado */}
        {estado === "terminado" && (
          <p className="font-sans text-sm font-bold text-success text-center py-1 animate-pop">
            ¡Dale, arrancá la siguiente serie! 💪
          </p>
        )}
      </div>
    </div>
  )
}