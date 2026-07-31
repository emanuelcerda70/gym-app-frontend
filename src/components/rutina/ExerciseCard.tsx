"use client"

import { useState } from "react"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
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

export default function ExerciseCard({ ejercicio, index, hecho, onToggleHecho }: Props) {
  const { findByName } = useEjercicioCatalog()
  const queryClient = useQueryClient()
  const [peso, setPeso] = useState("")
  const [series, setSeries] = useState(0)
  const [spark, setSpark] = useState<number | null>(null)
  const [guardando, setGuardando] = useState(false)

  const match = findByName(ejercicio.nombre)
  const matchId = match?.id

  const { data: historial } = useQuery({
    queryKey: ["progreso", matchId],
    queryFn: () => api.progreso.getByEjercicio(matchId!),
    enabled: !!matchId,
  })

  const registrarSerie = async () => {
    if (!match || guardando) return
    const pesoKg = peso ? Number(peso) : historial?.marca_maxima_kg || 20
    setGuardando(true)
    try {
      await api.progreso.registrar({
        ejercicio_id: matchId!,
        peso_kg: pesoKg,
        repeticiones: parseReps(ejercicio.repeticiones),
        series: 1,
      })
      setSeries((s) => s + 1)
      setSpark(Date.now())
      setPeso(pesoKg > 0 && peso === "" ? "" : peso)
      queryClient.invalidateQueries({ queryKey: ["progreso", match.id] })
      queryClient.invalidateQueries({ queryKey: ["checkin"] })
    } finally {
      setGuardando(false)
    }
  }

  const marca = historial?.marca_maxima_kg

  return (
    <Card
      className={cn(
        "!p-0 overflow-hidden transition-all",
        hecho && "border-ember/40"
      )}
    >
      {ejercicio.gif_url && (
        <div className="w-full bg-carbon flex items-center justify-center border-b border-hierro-border" style={{ minHeight: 110 }}>
          <img src={ejercicio.gif_url} alt={ejercicio.nombre} className="w-full max-h-44 object-contain" loading="lazy" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-base font-bold capitalize leading-tight pr-2">
            <span className="text-ceniza-dim font-semibold text-sm mr-1.5">{String(index + 1).padStart(2, "0")}</span>
            {ejercicio.nombre}
          </h3>
          <Badge className="shrink-0">
            {ejercicio.series} × {ejercicio.repeticiones}
          </Badge>
        </div>

        <RestTimer descansoSegundos={ejercicio.descanso} />

        {/* Carga rápida */}
        <div className="mt-3 bg-carbon/60 border border-hierro-border rounded-md px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xs text-ceniza shrink-0">Peso</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder={marca ? String(marca) : "20"}
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="w-16 bg-hierro-soft border border-hierro-border rounded text-ember-soft text-center text-sm font-bold py-1.5 outline-none focus:border-ember/60 focus:ring-2 focus:ring-ember/20"
              />
              <span className="text-[11px] text-ceniza-dim">kg</span>
              {series > 0 && (
                <span className="flex items-center gap-0.5 ml-auto">
                  {Array.from({ length: Math.min(series, 6) }, (_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-ember animate-pop" style={{ animationDelay: `${i * 60}ms` }} />
                  ))}
                  <span className="text-[11px] font-bold text-ember-soft ml-1">{series}</span>
                </span>
              )}
            </div>

            <button
              onClick={registrarSerie}
              disabled={!match || guardando}
              className={cn(
                "relative shrink-0 text-xs font-bold px-3.5 py-2 rounded-md transition-all active:scale-95",
                match
                  ? "ember-btn"
                  : "bg-hierro-soft border border-hierro-border text-ceniza-dim cursor-not-allowed"
              )}
            >
              +1 serie
              {spark && (
                <>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brasa animate-spark" style={{ ["--sx" as string]: "6px", ["--sy" as string]: "-10px" }} />
                  <span className="absolute -top-2 right-2 w-1.5 h-1.5 rounded-full bg-ember animate-spark" style={{ ["--sx" as string]: "-8px", ["--sy" as string]: "-12px", animationDelay: "0.1s" }} />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-hierro-border/60">
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
            <label className="flex items-center gap-1.5 text-xs text-ceniza cursor-pointer select-none">
              Hecho
              <input
                type="checkbox"
                checked={hecho}
                onChange={onToggleHecho}
                className="appearance-none w-5 h-5 border-2 border-ceniza-dim rounded-md checked:bg-ember checked:border-ember relative cursor-pointer transition-colors
                  checked:after:content-['✓'] checked:after:absolute checked:after:text-carbon checked:after:font-black checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-xs"
              />
            </label>
          </div>
        </div>
      </div>
    </Card>
  )
}
