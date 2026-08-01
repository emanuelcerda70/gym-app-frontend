/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import Card from "@/components/ui/Card"
import RestTimer from "@/components/rutina/RestTimer"
import { useEjercicioCatalog } from "@/hooks/useEjercicios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { RutinaEjercicio } from "@/types"

interface Props {
  ejercicio: RutinaEjercicio
  index: number
  hecho: boolean
  onToggleHecho: () => void
}

function parseReps(repeticiones: string): number {
  const m = repeticiones?.match(/(\d+)/)
  if (!m) return 10
  const rango = repeticiones.split("-").map((s) => parseInt(s, 10))
  return rango.length > 1 && rango[1] ? rango[1] : rango[0]
}

interface FilaSerie {
  peso: string
  reps: string
  hecho: boolean
}

export default function ExerciseCard({ ejercicio, index, hecho, onToggleHecho }: Props) {
  const { findByName } = useEjercicioCatalog()
  const queryClient = useQueryClient()
  const [series, setSeries] = useState<FilaSerie[]>(() =>
    Array.from({ length: Math.max(ejercicio.series, 1) }, () => ({
      peso: "",
      reps: String(parseReps(ejercicio.repeticiones)),
      hecho: false,
    }))
  )
  const [spark, setSpark] = useState<number | null>(null)
  const [guardando, setGuardando] = useState<number | null>(null)

  const match = findByName(ejercicio.nombre)
  const matchId = match?.id

  const { data: historial } = useQuery({
    queryKey: ["progreso", matchId],
    queryFn: () => api.progreso.getByEjercicio(matchId!),
    enabled: !!matchId,
  })

  const marca = historial?.marca_maxima_kg

  const setFila = (i: number, patch: Partial<FilaSerie>) => {
    setSeries((prev) => prev.map((f, j) => (j === i ? { ...f, ...patch } : f)))
  }

  const registrarSerie = async (i: number) => {
    const fila = series[i]
    if (!match || guardando !== null || fila.hecho) return
    const pesoKg = Number(fila.peso) || marca || 20
    const repeticiones = Number(fila.reps) || parseReps(ejercicio.repeticiones)
    setGuardando(i)
    try {
      await api.progreso.registrar({
        ejercicio_id: matchId!,
        peso_kg: pesoKg,
        repeticiones,
        series: 1,
      })
      setFila(i, { hecho: true, peso: fila.peso || String(pesoKg) })
      setSpark(i)
      queryClient.invalidateQueries({ queryKey: ["progreso", match.id] })
      queryClient.invalidateQueries({ queryKey: ["checkin"] })
    } finally {
      setGuardando(null)
    }
  }

  const hechas = series.filter((f) => f.hecho).length

  return (
    <Card className="!p-0 overflow-hidden transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 px-4 pt-4 pb-1">
        <h3 className="text-[15px] font-bold capitalize leading-tight">
          <span className="text-ceniza-dim font-semibold text-xs mr-2 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          {ejercicio.nombre}
        </h3>
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[11px] font-semibold text-ceniza tabular-nums">
            {ejercicio.series} × {ejercicio.repeticiones}
          </span>
          <button
            onClick={onToggleHecho}
            title={hecho ? "Desmarcar ejercicio" : "Marcar ejercicio completo"}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all active:scale-90",
              hecho ? "bg-ember border-ember text-carbon" : "border-ceniza-dim/70 text-transparent hover:border-ember"
            )}
          >
            <span className="text-[11px] font-black leading-none">✓</span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-2">
        <RestTimer descansoSegundos={ejercicio.descanso} />
      </div>

      {/* Encabezados de columnas */}
      <div className="grid grid-cols-[28px_1fr_auto_1fr_auto] items-center gap-2 px-4 pb-1 text-[10px] uppercase tracking-wider text-ceniza-dim font-semibold">
        <span>Serie</span>
        <span className="text-right">kg</span>
        <span />
        <span className="text-right">Reps</span>
        <span />
      </div>

      {/* Filas de series */}
      <div className="px-2 pb-3 pt-0.5 space-y-1">
        {series.map((fila, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[28px_1fr_auto_1fr_auto] items-center gap-2 rounded-lg px-2 py-1.5 transition-colors",
              fila.hecho ? "bg-ember/5" : "bg-hierro-soft/50"
            )}
          >
            <span className={cn("text-xs font-bold text-center tabular-nums", fila.hecho ? "text-ember-soft" : "text-ceniza")}>
              {i + 1}
            </span>
            <input
              type="number"
              inputMode="decimal"
              disabled={fila.hecho || guardando === i}
              placeholder={marca ? String(marca) : "20"}
              value={fila.peso}
              onChange={(e) => setFila(i, { peso: e.target.value })}
              className="w-full min-w-0 bg-carbon border border-hierro-border rounded-md px-2 py-1.5 text-center text-sm font-bold text-hueso outline-none transition-all focus:border-ember/60 focus:ring-2 focus:ring-ember/20 disabled:opacity-40 [appearance:textfield]"
            />
            <span className="text-[11px] text-ceniza-dim font-semibold">kg</span>
            <input
              type="number"
              inputMode="numeric"
              disabled={fila.hecho || guardando === i}
              value={fila.reps}
              onChange={(e) => setFila(i, { reps: e.target.value })}
              className="w-full min-w-0 bg-carbon border border-hierro-border rounded-md px-2 py-1.5 text-center text-sm font-bold text-hueso outline-none transition-all focus:border-ember/60 focus:ring-2 focus:ring-ember/20 disabled:opacity-40 [appearance:textfield]"
            />
            <button
              onClick={() => registrarSerie(i)}
              disabled={!match || guardando !== null || fila.hecho}
              title={fila.hecho ? "Serie completada" : "Completar serie"}
              className={cn(
                "relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all active:scale-90",
                fila.hecho
                  ? "bg-ember border-ember text-carbon"
                  : "border-ceniza-dim/70 text-transparent hover:border-ember",
                !match && "opacity-40 cursor-not-allowed"
              )}
            >
              <span className="text-xs font-black leading-none">✓</span>
              {spark === i && (
                <>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brasa animate-spark" style={{ ["--sx" as string]: "6px", ["--sy" as string]: "-10px" }} />
                  <span className="absolute -top-2 right-2 w-1.5 h-1.5 rounded-full bg-ember animate-spark" style={{ ["--sx" as string]: "-8px", ["--sy" as string]: "-12px", animationDelay: "0.1s" }} />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-hierro-border/60">
        <span className="text-[11px] text-ceniza">
          {marca ? (
            <>
              Marca: <span className="text-ember-soft font-bold">{marca} kg</span>
            </>
          ) : match ? (
            "Sin registros todavía"
          ) : (
            "Registro no disponible"
          )}
        </span>
        <span className="text-[11px] font-bold text-ember-soft tabular-nums">
          {hechas}/{series.length}
        </span>
      </div>
    </Card>
  )
}
