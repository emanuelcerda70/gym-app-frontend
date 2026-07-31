"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Props {
  descansoSegundos: number
}

const PRESETS = [60, 90, 120]

export default function RestTimer({ descansoSegundos }: Props) {
  const [abierto, setAbierto] = useState(false)
  const [restante, setRestante] = useState(descansoSegundos)
  const [activo, setActivo] = useState(false)
  const [terminado, setTerminado] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const arrancar = (segundos: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRestante(segundos)
    setActivo(true)
    setTerminado(false)
    intervalRef.current = setInterval(() => {
      setRestante((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setActivo(false)
          setTerminado(true)
          setTimeout(() => setTerminado(false), 1200)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const detener = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setActivo(false)
    setRestante(descansoSegundos)
  }

  const total = restante > 0 ? restante : descansoSegundos
  const R = 26
  const CIRC = 2 * Math.PI * R
  const progreso = activo ? restante / descansoSegundos : 1
  const mm = Math.floor(total / 60)
  const ss = total % 60

  return (
    <div className="mt-2">
      {!abierto ? (
        <button
          onClick={() => setAbierto(true)}
          className="text-[11px] text-ceniza flex items-center gap-1.5 hover:text-hueso transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5 M9 2h6" />
          </svg>
          Descanso {descansoSegundos}s
        </button>
      ) : (
        <div
          className={cn(
            "rounded-lg border p-3 transition-all",
            terminado ? "border-ember/60 ember-glow" : "border-hierro-border bg-hierro-soft"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r={R} fill="none" stroke="#23232C" strokeWidth="5" />
                <circle
                  cx="32" cy="32" r={R} fill="none"
                  stroke={terminado ? "#FF4D00" : activo ? "#FF7A1F" : "#75757F"}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - progreso)}
                  className="transition-all duration-1000 ease-linear"
                  style={terminado ? { filter: "drop-shadow(0 0 6px rgba(255,77,0,0.8))" } : undefined}
                />
              </svg>
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center font-display-expanded text-lg",
                  terminado ? "text-ember-soft animate-pop" : "text-hueso"
                )}
              >
                {activo || terminado ? `${mm}:${String(ss).padStart(2, "0")}` : `${descansoSegundos}s`}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className={cn("text-[13px] font-bold mb-1.5", terminado && "text-ember-soft")}>
                {terminado ? "¡Dale, toca seguir!" : activo ? "Descanso" : "Tiempo de descanso"}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => arrancar(p)}
                    className={cn(
                      "text-[11px] px-2.5 py-1 rounded-full border transition-all active:scale-95",
                      activo && restante === p
                        ? "bg-ember/15 border-ember/40 text-ember-soft"
                        : "border-hierro-border text-ceniza hover:text-hueso"
                    )}
                  >
                    {p}s
                  </button>
                ))}
                {activo && (
                  <button
                    onClick={detener}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-hierro text-ceniza hover:text-hueso"
                  >
                    Cortar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 
