"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/layout/AuthGuard"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Fueguito from "@/components/ui/Fueguito"
import { usePerfil } from "@/hooks/usePerfil"
import { cn } from "@/lib/utils"

type Option = { label: string; sub?: string; value: string }

const PASOS: {
  key: string
  titulo: string
  subtitulo: string
  options: Option[]
}[] = [
  {
    key: "objetivo",
    titulo: "¿Qué buscás?",
    subtitulo: "El plan se arma alrededor de tu objetivo.",
    options: [
      { label: "Ganar músculo y fuerza", sub: "Hipertrofia", value: "ganar_musculo_fuerza" },
      { label: "Bajar de peso", sub: "Definición", value: "perder_peso" },
      { label: "Salud y agilidad", sub: "Movimiento y bienestar", value: "salud_agilidad" },
    ],
  },
  {
    key: "nivel",
    titulo: "¿Cuánta cancha tenés?",
    subtitulo: "Nivel de experiencia, sin vueltas.",
    options: [
      { label: "Arranco recién", sub: "Principiante", value: "principiante" },
      { label: "Ya le vengo dando", sub: "Intermedio", value: "intermedio" },
      { label: "Soy un animal", sub: "Avanzado", value: "avanzado" },
    ],
  },
  {
    key: "dias_disponibles",
    titulo: "¿Cuántos días le podés meter?",
    subtitulo: "Menos humo, más constancia.",
    options: [
      { label: "2 días", sub: "Justo y necesario", value: "2" },
      { label: "3 días", sub: "El clásico", value: "3" },
      { label: "4 días", sub: "Ritmo serio", value: "4" },
      { label: "5+ días", sub: "Vivís en el gym", value: "5" },
    ],
  },
  {
    key: "presupuesto",
    titulo: "¿Cómo venís con la comida?",
    subtitulo: "Así el plan te arma menús que no rompan el bolsillo.",
    options: [
      { label: "Soy de ir a lo seguro", sub: "Económico", value: "bajo" },
      { label: "Tengo margen", sub: "Medio", value: "medio" },
      { label: "Dale sin filtro", sub: "Alto", value: "alto" },
      { label: "No me fijo", sub: "No tengo presupuesto", value: "ninguno" },
    ],
  },
]

const ETAPAS = 6 // bienvenida + 4 quiz + datos

export default function OnboardingPage() {
  const router = useRouter()
  const { actualizar } = usePerfil()

  const [etapa, setEtapa] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [fisicos, setFisicos] = useState({ edad: "", peso_kg: "", altura_cm: "" })
  const [cargando, setCargando] = useState(false)

  const quizIndex = etapa - 1
  const paso = PASOS[quizIndex]

  const seleccionar = (value: string) => {
    setRespuestas((prev) => ({ ...prev, [paso.key]: value }))
    if (etapa < 4) setEtapa(etapa + 1)
  }

  const puedeGuardar =
    fisicos.edad && fisicos.peso_kg && fisicos.altura_cm

  const finalizar = async () => {
    if (!puedeGuardar || cargando) return
    setCargando(true)
    setEtapa(6)
    try {
      await actualizar({
        objetivo: respuestas.objetivo,
        nivel: respuestas.nivel,
        dias_disponibles: Number(respuestas.dias_disponibles),
        presupuesto_comida: respuestas.presupuesto === "ninguno" ? null : respuestas.presupuesto || null,
        edad: Number(fisicos.edad),
        peso_kg: Number(fisicos.peso_kg),
        altura_cm: Number(fisicos.altura_cm),
      })
    } catch {
      setEtapa(5)
      setCargando(false)
      return
    }
    setTimeout(() => router.push("/home"), 2000)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen px-6 py-8 flex flex-col max-w-md mx-auto animate-fade-in">
        {/* Bienvenida */}
        {etapa === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <Fueguito racha={3} size={88} className="mb-6" />
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-display-expanded text-4xl tracking-tight">Gym App</span>
              <span className="w-2 h-2 rounded-full bg-ember inline-block" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Tu Súper Entrenador IA</h1>
            <p className="text-sm text-ceniza leading-relaxed mb-8">
              Te arma la rutina, te hace seguimiento de cargas y mantiene viva tu racha.
              Sin vueltas, sin planillas.
            </p>
            <Button className="!px-10 !py-3.5" onClick={() => setEtapa(1)}>
              Empecemos
            </Button>
          </div>
        )}

        {/* Quiz */}
        {etapa >= 1 && etapa <= 4 && (
          <>
            {/* Brazas de progreso */}
            <div className="flex gap-1.5 mb-8">
              {Array.from({ length: ETAPAS }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    i <= etapa ? "bg-gradient-to-r from-ember to-brasa" : "bg-hierro-soft border border-hierro-border"
                  )}
                />
              ))}
            </div>

            <h2 className="text-xl font-bold mb-1">{paso.titulo}</h2>
            <p className="text-sm text-ceniza mb-6">{paso.subtitulo}</p>

            <div className="space-y-3">
              {paso.options.map((opt) => {
                const selected = respuestas[paso.key] === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => seleccionar(opt.value)}
                    className={cn(
                      "w-full text-left px-4 py-4 rounded-md border transition-all active:scale-[0.98]",
                      selected
                        ? "border-ember/60 bg-ember/10"
                        : "border-hierro-border bg-hierro-soft hover:border-hierro"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn("text-sm font-bold", selected ? "text-hueso" : "text-ceniza")}>
                        {opt.label}
                      </span>
                      {selected && (
                        <span className="w-5 h-5 rounded-full bg-ember text-carbon flex items-center justify-center text-[11px] font-black">
                          ✓
                        </span>
                      )}
                    </div>
                    {opt.sub && (
                      <p className={cn("text-xs mt-0.5", selected ? "text-ember-soft" : "text-ceniza-dim")}>
                        {opt.sub}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* Datos físicos */}
        {etapa === 5 && (
          <>
            <div className="flex gap-1.5 mb-8">
              {Array.from({ length: ETAPAS }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    i <= etapa ? "bg-gradient-to-r from-ember to-brasa" : "bg-hierro-soft border border-hierro-border"
                  )}
                />
              ))}
            </div>

            <h2 className="text-xl font-bold mb-1">Tus datos físicos</h2>
            <p className="text-sm text-ceniza mb-6">Así el plan te queda a medida.</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-ceniza block mb-1.5">Edad</label>
                <Input type="number" inputMode="numeric" placeholder="Ej: 25" value={fisicos.edad} onChange={(e) => setFisicos({ ...fisicos, edad: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-ceniza block mb-1.5">Peso (kg)</label>
                  <Input type="number" inputMode="decimal" placeholder="Ej: 78" value={fisicos.peso_kg} onChange={(e) => setFisicos({ ...fisicos, peso_kg: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-ceniza block mb-1.5">Altura (cm)</label>
                  <Input type="number" inputMode="decimal" placeholder="Ej: 178" value={fisicos.altura_cm} onChange={(e) => setFisicos({ ...fisicos, altura_cm: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10">
              <Button fullWidth className="!py-3.5" disabled={!puedeGuardar} onClick={finalizar}>
                Armar mi plan
              </Button>
            </div>
          </>
        )}
        {/* Armando tu plan */}
        {etapa === 6 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Fueguito racha={3} size={80} flare className="mb-6" />
            <h2 className="text-xl font-bold mb-2">Armando tu plan...</h2>
            <p className="text-sm text-ceniza mb-8">El Súper Entrenador está preparando todo.</p>
            <div className="w-40 h-1.5 bg-hierro-soft rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-ember to-brasa rounded-full animate-shimmer" />
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
 
