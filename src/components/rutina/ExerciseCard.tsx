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
    <Card className="!p-0 overflow-hidden">
      {ejercicio.gif_url && (
        <div className="w-full bg-black/40 flex items-center justify-center" style={{ minHeight: 120 }}>
          <img
            src={ejercicio.gif_url}
            alt={ejercicio.nombre}
            className="w-full max-h-48 object-contain"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-3.5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-bold capitalize">{ejercicio.nombre}</h3>
          <Badge variant="green">
            {ejercicio.series} × {ejercicio.repeticiones}
          </Badge>
        </div>

        <p className="text-xs text-muted mb-3">Descanso: {ejercicio.descanso}s</p>

        <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-2.5 min-h-[44px]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted shrink-0">Peso:</span>
            <input
              type="number"
              placeholder="0"
              className="w-16 bg-white/10 border border-white/10 rounded text-emerald-400 text-center text-sm font-bold py-1.5 outline-none focus:border-emerald-500"
            />
          </div>
          <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer min-h-[44px] select-none">
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
      </div>
    </Card>
  )
}
