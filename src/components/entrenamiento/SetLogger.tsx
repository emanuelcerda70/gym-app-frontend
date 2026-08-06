"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Check, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { useRestTimerStore } from "@/store/restTimerStore"

interface SetLoggerProps {
  setNumber: number
  ejercicioId: number
  rutinaId?: number | null
  descansoDefault?: number
  previousWeight?: number | null
  previousReps?: number | null
}

type EstadoGuardado = "idle" | "guardando" | "guardado" | "error"

export default function SetLogger({
  setNumber,
  ejercicioId,
  rutinaId = null,
  descansoDefault = 90,
  previousWeight,
  previousReps,
}: SetLoggerProps) {
  const [peso, setPeso] = useState("")
  const [reps, setReps] = useState("")
  const [estado, setEstado] = useState<EstadoGuardado>("idle")
  const queryClient = useQueryClient()
  const ofrecerDescanso = useRestTimerStore((s) => s.ofrecer)

  const tieneAnterior = previousWeight != null || previousReps != null
  const esFinal = estado === "guardado" || estado === "guardando"

  const mutacion = useMutation({
    mutationFn: () =>
      api.historial.create({
        ejercicio_id: ejercicioId,
        peso: parseFloat(peso),
        repeticiones: parseInt(reps, 10),
        rutina_id: rutinaId,
      }),
    onSuccess: () => {
      setEstado("guardado")
      queryClient.invalidateQueries({ queryKey: ["ejercicio", "resumen"] })
      queryClient.invalidateQueries({ queryKey: ["progreso"] })
      ofrecerDescanso(setNumber, ejercicioId, descansoDefault)
    },
    onError: () => {
      setEstado("error")
    },
  })

  const handleSave = () => {
    const pesoNum = parseFloat(peso)
    const repsNum = parseInt(reps, 10)
    if (Number.isNaN(pesoNum) || Number.isNaN(repsNum) || esFinal) return
    setEstado("guardando")
    mutacion.mutate()
  }

  const handleChange = (tipo: "peso" | "reps", valor: string) => {
    if (tipo === "peso") setPeso(valor.replace(/[^0-9.,]/g, ""))
    else setReps(valor.replace(/[^0-9]/g, ""))
    setEstado("idle")
  }

  return (
    <div className="flex items-center gap-2 py-2">
      {/* Número de serie */}
      <span
        className={cn(
          "shrink-0 w-7 h-7 text-xs rounded-full flex items-center justify-center font-sans font-semibold",
          estado === "guardado"
            ? "bg-success/20 text-success"
            : "bg-surface-elevated text-text-muted"
        )}
      >
        {setNumber}
      </span>

      {/* Referencia histórica */}
      <div className="w-14 shrink-0">
        {tieneAnterior ? (
          <p className="font-sans text-[10px] leading-tight text-text-muted">
            Ant: {previousWeight ?? "-"}kg x {previousReps ?? "-"}
          </p>
        ) : (
          <p className="font-sans text-[10px] leading-tight text-text-muted/50">Sin hist.</p>
        )}
      </div>

      {/* Input Peso */}
      <label className="relative flex-1 min-w-0">
        <input
          type="text"
          inputMode="decimal"
          placeholder="0"
          value={peso}
          onChange={(e) => handleChange("peso", e.target.value)}
          disabled={esFinal}
          className={cn(
            "w-full bg-surface border border-border rounded-xl px-2 py-2 pr-6 font-sans text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-primary/50 transition-colors",
            esFinal && "opacity-60"
          )}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 font-sans text-[10px] text-text-muted pointer-events-none">
          kg
        </span>
      </label>

      {/* Input Reps */}
      <label className="relative flex-1 min-w-0">
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={reps}
          onChange={(e) => handleChange("reps", e.target.value)}
          disabled={esFinal}
          className={cn(
            "w-full bg-surface border border-border rounded-xl px-2 py-2 pr-6 font-sans text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-primary/50 transition-colors",
            esFinal && "opacity-60"
          )}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 font-sans text-[10px] text-text-muted pointer-events-none">
          reps
        </span>
      </label>

      {/* Acción: guardar */}
      <button
        onClick={handleSave}
        aria-label={`Guardar serie ${setNumber}`}
        disabled={esFinal}
        className={cn(
          "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-95",
          estado === "guardado" && "bg-success/20 text-success",
          estado === "guardando" && "bg-surface-elevated text-text-muted",
          estado === "error" && "bg-red-500/15 text-red-500",
          estado === "idle" &&
            "bg-surface-elevated text-text-muted hover:text-text-primary hover:bg-hierro"
        )}
      >
        {estado === "guardando" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : estado === "error" ? (
          <X className="w-4 h-4" />
        ) : (
          <Check className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
