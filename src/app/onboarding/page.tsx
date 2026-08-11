"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/layout/AuthGuard"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

const PASO_FISICOS = 0
const PASO_ENTRENAMIENTO = 1
const PASO_NUTRICION = 2

const STORAGE_KEY = "ascend_onboarding_estado_v1"

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

const FAVORITAS_OPCIONES = ["Pollo", "Carne", "Pescado", "Huevos", "Lácteos", "Legumbres", "Pasta", "Arroz", "Verduras", "Frutas"]

const RESTRICCIONES_OPCIONES = ["Lácteos", "Gluten", "Cerdo", "Mariscos", "Frutos secos", "Huevo", "Soja"]

export default function OnboardingPage() {
  const router = useRouter()

  const [paso, setPaso] = useState(0)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const [terminado, setTerminado] = useState(false)

  const [peso_kg, setPesoKg] = useState("")
  const [altura_cm, setAlturaCm] = useState("")
  const [edad, setEdad] = useState("")

  const [nivel, setNivel] = useState<"principiante" | "intermedio" | "avanzado" | "">("")
  const [objetivo, setObjetivo] = useState<string>("")
  const [dias_disponibles, setDiasDisponibles] = useState<number | null>(null)

  const [presupuesto_comida, setPresupuestoComida] = useState<string>("")
  const [favChips, setFavChips] = useState<string[]>([])
  const [favOtros, setFavOtros] = useState("")
  const [favOtrosActivo, setFavOtrosActivo] = useState(false)
  const [evChips, setEvChips] = useState<string[]>([])
  const [evOtros, setEvOtros] = useState("")
  const [evOtrosActivo, setEvOtrosActivo] = useState(false)

  // Restaurar progreso guardado en localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const s = JSON.parse(raw)
      if (typeof s.paso === "number") setPaso(s.paso)
      if (typeof s.peso_kg === "string") setPesoKg(s.peso_kg)
      if (typeof s.altura_cm === "string") setAlturaCm(s.altura_cm)
      if (typeof s.edad === "string") setEdad(s.edad)
      if (typeof s.nivel === "string") setNivel(s.nivel)
      if (typeof s.objetivo === "string") setObjetivo(s.objetivo)
      if (typeof s.dias_disponibles === "number") setDiasDisponibles(s.dias_disponibles)
      if (typeof s.presupuesto_comida === "string") setPresupuestoComida(s.presupuesto_comida)
      if (Array.isArray(s.favChips)) setFavChips(s.favChips)
      if (typeof s.favOtros === "string") setFavOtros(s.favOtros)
      if (typeof s.favOtrosActivo === "boolean") setFavOtrosActivo(s.favOtrosActivo)
      if (Array.isArray(s.evChips)) setEvChips(s.evChips)
      if (typeof s.evOtros === "string") setEvOtros(s.evOtros)
      if (typeof s.evOtrosActivo === "boolean") setEvOtrosActivo(s.evOtrosActivo)
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autoguardado ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          paso,
          peso_kg,
          altura_cm,
          edad,
          nivel,
          objetivo,
          dias_disponibles,
          presupuesto_comida,
          favChips,
          favOtros,
          favOtrosActivo,
          evChips,
          evOtros,
          evOtrosActivo,
        })
      )
    } catch {}
  }, [paso, peso_kg, altura_cm, edad, nivel, objetivo, dias_disponibles, presupuesto_comida, favChips, favOtros, favOtrosActivo, evChips, evOtros, evOtrosActivo])

  const pesoNum = Number(peso_kg)
  const alturaNum = Number(altura_cm)
  const edadNum = Number(edad)
  const fisicosCompletos =
    peso_kg.trim() !== "" &&
    altura_cm.trim() !== "" &&
    edad.trim() !== "" &&
    pesoNum >= 20 &&
    pesoNum <= 200 &&
    alturaNum >= 100 &&
    alturaNum <= 250 &&
    edadNum >= 10 &&
    edadNum <= 100
  const entrenamientoCompleto = nivel !== "" && objetivo !== "" && dias_disponibles !== null
  const nutricionCompleta = presupuesto_comida !== ""

  const puedeSiguiente =
    (paso === PASO_FISICOS && fisicosCompletos) ||
    (paso === PASO_ENTRENAMIENTO && entrenamientoCompleto) ||
    (paso === PASO_NUTRICION && nutricionCompleta)

  const armarTexto = (chips: string[], otros: string) => {
    const partes = [...chips]
    if (otros.trim()) partes.push(`Otros: ${otros.trim()}`)
    return partes.length > 0 ? partes.join(", ") : null
  }

  const guardarPaso = async (parcial: Parameters<typeof api.perfil.update>[0]) => {
    try {
      await api.perfil.update(parcial)
    } catch {}
  }

  const siguiente = () => {
    if (!puedeSiguiente || cargando) return
    setError("")
    if (paso === PASO_FISICOS) {
      guardarPaso({ peso_kg: Number(peso_kg), altura_cm: Number(altura_cm), edad: Number(edad) })
      setPaso(paso + 1)
      return
    }
    if (paso === PASO_ENTRENAMIENTO) {
      setPaso(paso + 1)
      return
    }
    guardarPerfil()
  }

  const atras = () => {
    if (cargando) return
    setError("")
    setPaso(paso - 1)
  }

  const guardarPerfil = async () => {
    setCargando(true)
    setError("")
    try {
      await api.perfil.update({
        peso_kg: Number(peso_kg),
        altura_cm: Number(altura_cm),
        edad: Number(edad),
        nivel,
        objetivo,
        dias_disponibles,
        presupuesto_comida,
        comidas_favoritas: armarTexto(favChips, favOtros),
        comidas_evitar: armarTexto(evChips, evOtros),
      })
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {}
      setTerminado(true)
    } catch {
      setCargando(false)
      setError("No se pudo guardar tu perfil. Revisá la conexión e intentá de nuevo.")
    }
  }

  const renderNumero = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    min: number,
    max: number,
    hint: string
  ) => (
    <div>
      <label className="font-sans text-xs font-semibold text-text-secondary block mb-1.5">
        {label}
      </label>
      <input
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step="0.1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-2xl px-4 py-3.5 text-sm font-sans text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary/50 transition-colors"
      />
      <p className="font-sans text-[11px] text-text-secondary/60 mt-1">{hint}</p>
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

  const renderChips = (
    opciones: string[],
    seleccionadas: string[],
    onToggle: (v: string) => void,
    otrosTexto: string,
    onOtrosTexto: (v: string) => void,
    otrosActivo: boolean,
    setOtrosActivo: (v: boolean) => void,
    placeholderOtros: string
  ) => (
    <div>
      <div className="flex flex-wrap gap-2">
        {opciones.map((opt) => {
          const selected = seleccionadas.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={cn(
                "px-3.5 py-2 rounded-full border font-sans text-xs font-bold transition-all active:scale-[0.98]",
                selected
                  ? "bg-gradient-to-r from-primary to-secondary text-surface border-transparent"
                  : "bg-surface border-border text-text-secondary hover:border-primary/40"
              )}
            >
              {opt}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setOtrosActivo(!otrosActivo)}
          className={cn(
            "px-3.5 py-2 rounded-full border font-sans text-xs font-bold transition-all active:scale-[0.98]",
            otrosActivo
              ? "bg-gradient-to-r from-primary to-secondary text-surface border-transparent"
              : "bg-surface border-border text-text-secondary hover:border-primary/40"
          )}
        >
          Otros…
        </button>
      </div>
      {otrosActivo && (
        <input
          type="text"
          value={otrosTexto}
          onChange={(e) => onOtrosTexto(e.target.value)}
          placeholder={placeholderOtros}
          className="w-full mt-2.5 bg-surface border border-border rounded-2xl px-4 py-3 text-sm font-sans text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary/50 transition-colors"
        />
      )}
    </div>
  )

  if (terminado) {
    return (
      <AuthGuard>
        <div className="min-h-screen max-w-md mx-auto px-6 py-8 flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary text-surface flex items-center justify-center text-3xl font-black mb-6">
            ✓
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
            ¡Perfil listo!
          </h2>
          <p className="font-sans text-sm text-text-secondary mb-8">
            Tu plan quedó armado a tu medida. Ya podés entrenar y chatear con tu bot.
          </p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full h-12 rounded-2xl font-sans text-sm font-bold text-surface bg-gradient-to-r from-primary to-secondary transition-all active:scale-[0.98]"
          >
            Ir al dashboard
          </button>
        </div>
      </AuthGuard>
    )
  }

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
              {renderNumero("Peso", peso_kg, setPesoKg, "Ej: 78", 20, 200, "Máximo 200 kg")}
              {renderNumero("Altura", altura_cm, setAlturaCm, "Ej: 178", 100, 250, "En centímetros (100–250)")}
              {renderNumero("Edad", edad, setEdad, "Ej: 25", 10, 100, "Entre 10 y 100 años")}
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

            <div className="bg-white/5 backdrop-blur-md border border-border rounded-3xl p-5 space-y-6">
              <div>
                <p className="font-sans text-xs font-semibold text-text-secondary mb-2">
                  Presupuesto
                </p>
                {renderOpciones(PRESUPUESTOS, presupuesto_comida, setPresupuestoComida)}
              </div>

              <div>
                <p className="font-sans text-xs font-semibold text-text-secondary mb-2">
                  Comidas favoritas <span className="font-normal text-text-secondary/60">(opcional, podés tildar varias)</span>
                </p>
                {renderChips(
                  FAVORITAS_OPCIONES,
                  favChips,
                  (v) => setFavChips(favChips.includes(v) ? favChips.filter((x) => x !== v) : [...favChips, v]),
                  favOtros,
                  setFavOtros,
                  favOtrosActivo,
                  setFavOtrosActivo,
                  "Ej: lasaña, pizza, helado..."
                )}
              </div>

              <div>
                <p className="font-sans text-xs font-semibold text-text-secondary mb-2">
                  Restricciones o alergias <span className="font-normal text-text-secondary/60">(opcional)</span>
                </p>
                {renderChips(
                  RESTRICCIONES_OPCIONES,
                  evChips,
                  (v) => setEvChips(evChips.includes(v) ? evChips.filter((x) => x !== v) : [...evChips, v]),
                  evOtros,
                  setEvOtros,
                  evOtrosActivo,
                  setEvOtrosActivo,
                  "Ej: no como pescado de río..."
                )}
              </div>
            </div>
          </>
        )}

        {/* -------- Error -------- */}
        {error && (
          <div className="mt-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/40 font-sans text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        {/* -------- Navegación -------- */}
        <div className="mt-auto pt-8 flex items-center gap-3">
          {paso > PASO_FISICOS && (
            <button
              type="button"
              onClick={atras}
              disabled={cargando}
              className="h-12 px-6 rounded-2xl bg-surface border border-border font-sans text-sm font-semibold text-text-secondary hover:border-primary/40 transition-colors active:scale-[0.98] disabled:opacity-60"
            >
              Atrás
            </button>
          )}
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