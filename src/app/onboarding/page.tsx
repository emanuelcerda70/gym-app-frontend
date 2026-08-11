"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/layout/AuthGuard"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

const PASO_FISICOS = 0
const PASO_ENTRENAMIENTO = 1
const PASO_NUTRICION = 2

const NIVELES = [
  { label: "Principiante", sub: "Arranco recién", value: "principiante" },
  { label: "Intermedio", sub: "Ya le vengo dando", value: "intermedio" },
  { label: "Avanzado", sub: "Soy un animal", value: "avanzado" },
]

const OBJETIVOS = [
  { label: "Ganar masa muscular", sub: "Hipertrofia", value: "ganar_musculo_fuerza" },
  { label: "Perder grasa corporal", sub: "Definición", value: "perder_peso" },
  { label: "Salud", sub: "Movimiento y bienestar", value: "salud_agilidad" },
]

const DIAS_OPCIONES = [1, 2, 3, 4, 5, 6, 7]

const PRESUPUESTOS = [
  { label: "Económico", sub: "Bolsillo cuidado", value: "bajo" },
  { label: "Práctico", sub: "Balance justo", value: "medio" },
  { label: "Elaborado", sub: "Sin filtro", value: "alto" },
]

export default function OnboardingPage() {
  const router = useRouter()

  const [paso, setPaso] = useState(0)
  const [cargando, setCargando] = useState(false)

  const [peso_kg, setPesoKg] = useState("")
  const [altura_cm, setAlturaCm] = useState("")
  const [edad, setEdad] = useState("")

  const [nivel, setNivel] = useState<"principiante" | "intermedio" | "avanzado" | "">("")
  const [objetivo, setObjetivo] = useState<string>("")
  const [dias_disponibles, setDiasDisponibles] = useState<number | null>(null)

  const [comidas_evitar, setComidasEvitar] = useState("")
  const [comidas_favoritas, setComidasFavoritas] = useState("")
  const [presupuesto_comida, setPresupuestoComida] = useState<string>("")

  const fisicosCompletos = peso_kg.trim() !== "" && altura_cm.trim() !== "" && edad.trim() !== ""
  const entrenamientoCompleto = nivel !== "" && objetivo !== "" && dias_disponibles !== null
  const nutricionCompleta = presupuesto_comida !== ""

  const puedeSiguiente =
    (paso === PASO_FISICOS && fisicosCompletos) ||
    (paso === PASO_ENTRENAMIENTO && entrenamientoCompleto) ||
    (paso === PASO_NUTRICION && nutricionCompleta)

  const siguiente = () => {
    if (!puedeSiguiente || cargando) return
    if (paso < PASO_NUTRICION) {
      setPaso(paso + 1)
      return
    }
    guardarPerfil()
  }

  const atras = () => {
    if (cargando) return
    if (paso > PASO_FISICOS) {
      setPaso(paso - 1)
      return
    }
    router.push("/dashboard")
  }

  const guardarPerfil = async () => {
    setCargando(true)
    try {
      await api.perfil.update({
        peso_kg: Number(peso_kg),
        altura_cm: Number(altura_cm),
        edad: Number(edad),
        nivel,
        objetivo,
        dias_disponibles,
        comidas_evitar: comidas_evitar.trim() || null,
        comidas_favoritas: comidas_favoritas.trim() || null,
        presupuesto_comida,
      })
      router.push("/dashboard")
    } catch {
      setCargando(false)
    }
  }

  const renderNumero = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string
  ) => (
    <div>
      <label className="font-sans text-xs font-semibold text-text-secondary block mb-1.5">
        {label}
      </label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-sm font-sans text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary/50 transition-colors"
      />
    </div>
  )

  const renderOpciones = (
    opciones: { label: string; sub: string; value: string }[],
    seleccionado: string,
    onSelect: (v: string) => void
  ) => (
    <div className="space-y-2.5">
      {opciones.map((opt) => {
        const selected = seleccionado === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "w-full text-left px-4 py-4 rounded-2xl border transition-all active:scale-[0.98]",
              selected
                ? "border-primary/60 bg-primary/10"
                : "bg-surface border-border hover:border-primary/40"
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn("font-sans text-sm font-bold", selected ? "text-text-primary" : "text-text-primary")}>
                {opt.label}
              </span>
              {selected && (
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary text-surface flex items-center justify-center text-[11px] font-black">
                  ✓
                </span>
              )}
            </div>
            <p className="font-sans text-xs mt-0.5 text-text-secondary">{opt.sub}</p>
          </button>
        )
      })}
    </div>
  )

  const renderDias = (seleccionado: number | null, onSelect: (v: number) => void) => (
    <div className="grid grid-cols-7 gap-1.5">
      {DIAS_OPCIONES.map((d) => {
        const selected = seleccionado === d
        return (
          <button
            key={d}
            type="button"
            onClick={() => onSelect(d)}
            className={cn(
              "h-12 rounded-2xl font-sans text-sm font-bold transition-all active:scale-[0.98]",
              selected
                ? "bg-gradient-to-r from-primary to-secondary text-surface"
                : "bg-surface border border-border text-text-secondary hover:border-primary/40"
            )}
          >
            {d}
          </button>
        )
      })}
    </div>
  )

  const renderTextoLargo = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string
  ) => (
    <div>
      <label className="font-sans text-xs font-semibold text-text-secondary block mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-sm font-sans text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary/50 transition-colors resize-none"
      />
    </div>
  )

  return (
    <AuthGuard>
      <div className="min-h-screen max-w-md mx-auto px-6 py-8 flex flex-col animate-fade-in">
        {/* -------- Indicador de progreso -------- */}
        <div className="flex gap-1.5 mb-8">
          {[PASO_FISICOS, PASO_ENTRENAMIENTO, PASO_NUTRICION].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= paso
                  ? "bg-gradient-to-r from-primary to-secondary"
                  : "bg-hierro-soft border border-hierro-border"
              )}
            />
          ))}
        </div>

        {/* -------- Paso 1: Fisionomía -------- */}
        {paso === PASO_FISICOS && (
          <>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-1">
              Tu fisionomía
            </h2>
            <p className="font-sans text-sm text-text-secondary mb-6">
              Así el plan te queda a medida.
            </p>

            <div className="bg-white/5 backdrop-blur-md border border-border rounded-3xl p-5 space-y-4">
              {renderNumero("Peso (kg)", peso_kg, setPesoKg, "Ej: 78")}
              {renderNumero("Altura (cm)", altura_cm, setAlturaCm, "Ej: 178")}
              {renderNumero("Edad", edad, setEdad, "Ej: 25")}
            </div>
          </>
        )}

        {/* -------- Paso 2: Entrenamiento -------- */}
        {paso === PASO_ENTRENAMIENTO && (
          <>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-1">
              Tu entrenamiento
            </h2>
            <p className="font-sans text-sm text-text-secondary mb-6">
              Contame tu experiencia y objetivos.
            </p>

            <div className="bg-white/5 backdrop-blur-md border border-border rounded-3xl p-5 space-y-6">
              <div>
                <p className="font-sans text-xs font-semibold text-text-secondary mb-2">
                  Nivel de experiencia
                </p>
                {renderOpciones(NIVELES, nivel, (v) => setNivel(v as typeof nivel))}
              </div>

              <div>
                <p className="font-sans text-xs font-semibold text-text-secondary mb-2">
                  Objetivo
                </p>
                {renderOpciones(OBJETIVOS, objetivo, setObjetivo)}
              </div>

              <div>
                <p className="font-sans text-xs font-semibold text-text-secondary mb-2">
                  Días disponibles por semana
                </p>
                {renderDias(dias_disponibles, setDiasDisponibles)}
              </div>
            </div>
          </>
        )}

        {/* -------- Paso 3: Nutrición -------- */}
        {paso === PASO_NUTRICION && (
          <>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-1">
              Tu nutrición
            </h2>
            <p className="font-sans text-sm text-text-secondary mb-6">
              Así armamos menús que se adapten a vos.
            </p>

            <div className="bg-white/5 backdrop-blur-md border border-border rounded-3xl p-5 space-y-5">
              {renderTextoLargo(
                "Restricciones / alergias",
                comidas_evitar,
                setComidasEvitar,
                "Ej: lácteos, gluten, no como cerdo..."
              )}
              {renderTextoLargo(
                "Comidas favoritas",
                comidas_favoritas,
                setComidasFavoritas,
                "Ej: pollo, arroz, frutas..."
              )}

              <div>
                <p className="font-sans text-xs font-semibold text-text-secondary mb-2">
                  Presupuesto
                </p>
                {renderOpciones(PRESUPUESTOS, presupuesto_comida, setPresupuestoComida)}
              </div>
            </div>
          </>
        )}

        {/* -------- Navegación -------- */}
        <div className="mt-auto pt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={atras}
            disabled={cargando}
            className="h-12 px-6 rounded-2xl bg-surface border border-border font-sans text-sm font-semibold text-text-secondary hover:border-primary/40 transition-colors active:scale-[0.98] disabled:opacity-60"
          >
            Atrás
          </button>
          <button
            type="button"
            onClick={siguiente}
            disabled={!puedeSiguiente || cargando}
            className={cn(
              "flex-1 h-12 rounded-2xl font-sans text-sm font-bold text-surface transition-all active:scale-[0.98]",
              "bg-gradient-to-r from-primary to-secondary",
              "disabled:opacity-40 disabled:active:scale-100"
            )}
          >
            {cargando ? "Guardando..." : paso === PASO_NUTRICION ? "¡Listo!" : "Siguiente"}
          </button>
        </div>
      </div>
    </AuthGuard>
  )
}