"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SetLoggerProps {
  setNumber: number
  previousWeight?: number | null
  previousReps?: number | null
  onSave: (peso: number, reps: number) => void
}

export default function SetLogger({
  setNumber,
  previousWeight,
  previousReps,
  onSave,
}: SetLoggerProps) {
  const [peso, setPeso] = useState("")
  const [reps, setReps] = useState("")
  const [guardado, setGuardado] = useState(false)

  const tieneAnterior = previousWeight != null || previousReps != null

  const handleSave = () => {
    const pesoNum = parseFloat(peso)
    const repsNum = parseInt(reps, 10)
    if (Number.isNaN(pesoNum) || Number.isNaN(repsNum) || guardado) return
    onSave(pesoNum, repsNum)
    setGuardado(true)
  }

  return (
    <div className="flex items-center gap-3 py-2">
      {/* Número de serie */}
      <span className="shrink-0 w-8 h-8 rounded-full bg-surface-elevated text-text-muted font-sans text-sm font-semibold flex items-center justify-center">
        {setNumber}
      </span>

      {/* Referencia histórica */}
      <div className="w-20 shrink-0">
        {tieneAnterior ? (
          <p className="font-sans text-sm text-text-muted">
            Ant: {previousWeight ?? "-"}kg x {previousReps ?? "-"}
          </p>
        ) : (
          <p className="font-sans text-sm text-text-muted/50">Sin historial</p>
        )}
      </div>

      {/* Input Peso */}
      <label className="relative flex-1 min-w-0">
        <input
          type="text"
          inputMode="decimal"
          placeholder="0"
          value={peso}
          onChange={(e) => {
            setPeso(e.target.value.replace(/[^0-9.,]/g, ""))
            setGuardado(false)
          }}
          disabled={guardado}
          className={cn(
            "w-full bg-surface border border-border rounded-xl px-3 py-2.5 pr-8 font-sans text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-primary/50 transition-colors",
            guardado && "opacity-60"
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-xs text-text-muted pointer-events-none">
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
          onChange={(e) => {
            setReps(e.target.value.replace(/[^0-9]/g, ""))
            setGuardado(false)
          }}
          disabled={guardado}
          className={cn(
            "w-full bg-surface border border-border rounded-xl px-3 py-2.5 pr-8 font-sans text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-primary/50 transition-colors",
            guardado && "opacity-60"
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-xs text-text-muted pointer-events-none">
          reps
        </span>
      </label>

      {/* Acción: guardar */}
      <button
        onClick={handleSave}
        aria-label={`Guardar serie ${setNumber}`}
        disabled={guardado}
        className={cn(
          "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95",
          guardado
            ? "bg-success/20 text-success"
            : "bg-surface-elevated text-text-muted hover:text-text-primary hover:bg-hierro"
        )}
      >
        <Check className="w-5 h-5" />
      </button>
    </div>
  )
}