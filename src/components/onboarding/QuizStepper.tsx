"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePerfil } from "@/hooks/usePerfil"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type Option = { label: string; value: string }

const pasos = [
  {
    titulo: "¿Cuál es tu objetivo?",
    key: "objetivo" as const,
    options: [
      { label: "Ganar Músculo", value: "ganar_musculo_fuerza" },
      { label: "Bajar de Peso", value: "perder_peso" },
      { label: "Resistencia", value: "resistencia_condicion" },
      { label: "Salud General", value: "salud_bienestar" },
    ],
  },
  {
    titulo: "¿Tu nivel de experiencia?",
    key: "nivel" as const,
    options: [
      { label: "Principiante", value: "principiante" },
      { label: "Intermedio", value: "intermedio" },
      { label: "Avanzado", value: "avanzado" },
    ],
  },
  {
    titulo: "¿Cuántos días podés entrenar?",
    key: "dias_disponibles" as const,
    options: [
      { label: "2 días", value: "2" },
      { label: "3 días", value: "3" },
      { label: "4 días", value: "4" },
      { label: "5+ días", value: "5" },
    ],
  },
]

export default function QuizStepper() {
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [cargando, setCargando] = useState(false)
  const router = useRouter()
  const { actualizar } = usePerfil()

  const seleccionar = (key: string, value: string) => {
    setRespuestas((prev) => ({ ...prev, [key]: value }))
    if (paso < pasos.length - 1) {
      setPaso(paso + 1)
    }
  }

  const finalizar = async () => {
    setCargando(true)
    await actualizar({
      objetivo: respuestas.objetivo || null,
      nivel: respuestas.nivel || null,
      dias_disponibles: respuestas.dias_disponibles ? Number(respuestas.dias_disponibles) : null,
    })
    router.push("/home")
  }

  const current = pasos[paso]
  const esUltimo = paso === pasos.length - 1
  const selected = respuestas[current.key]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 animate-fade-in">
      <div className="flex gap-1.5 mb-8">
        {pasos.map((_, i) => (
          <div key={i} className={cn("h-1.5 w-8 rounded-full transition-colors", i <= paso ? "bg-emerald-500" : "bg-white/20")} />
        ))}
      </div>

      <h2 className="text-xl font-bold text-center mb-6">{current.titulo}</h2>

      <div className="w-full max-w-xs space-y-3">
        {current.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => seleccionar(current.key, opt.value)}
            className={cn(
              "w-full text-left px-4 py-3.5 rounded-md border transition-all font-medium text-sm",
              selected === opt.value
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                : "border-white/10 bg-white/5 text-muted hover:bg-white/10"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {esUltimo && selected && (
        <Button className="mt-8 !py-3 !px-10" onClick={finalizar} disabled={cargando}>
          {cargando ? "Armando tu plan..." : "¡Empecemos!"}
        </Button>
      )}

      {!esUltimo && selected && (
        <p className="text-xs text-muted mt-6">Seleccioná una opción para continuar</p>
      )}
    </div>
  )
}
