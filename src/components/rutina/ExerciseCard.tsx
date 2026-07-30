"use client"

import { useState } from "react"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import type { RutinaEjercicio } from "@/types"

interface Props {
  ejercicio: RutinaEjercicio
}

export default function ExerciseCard({ ejercicio }: Props) {
  const [hecho, setHecho] = useState(false)

  return (
    <Card>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-bold capitalize">{ejercicio.nombre}</h3>
        <Badge variant="green">
          {ejercicio.series} Series x {ejercicio.repeticiones}
        </Badge>
      </div>

      <p className="text-xs text-muted mb-3">Descanso: {ejercicio.descanso} seg</p>

      <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Peso (kg):</span>
          <input
            type="number"
            placeholder="0"
            className="w-14 bg-white/10 border border-white/10 rounded text-emerald-400 text-center text-sm font-bold px-1 py-1 outline-none"
          />
        </div>

        <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
          Hecho
          <input
            type="checkbox"
            checked={hecho}
            onChange={() => setHecho(!hecho)}
            className="appearance-none w-5 h-5 border-2 border-muted-dim rounded-md checked:bg-emerald-500 checked:border-emerald-500 relative cursor-pointer
              checked:after:content-['✓'] checked:after:absolute checked:after:text-black checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-xs"
          />
        </label>
      </div>
    </Card>
  )
}
