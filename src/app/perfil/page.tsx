"use client"

import { useState } from "react"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Fueguito from "@/components/ui/Fueguito"
import { usePerfil } from "@/hooks/usePerfil"
import { cn } from "@/lib/utils"

const OBJETIVOS = [
  { value: "ganar_musculo_fuerza", label: "Ganar músculo y fuerza" },
  { value: "perder_peso", label: "Bajar de peso" },
  { value: "salud_agilidad", label: "Salud y agilidad" },
]

const NIVELES = [
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
]

const PRESUPUESTOS = [
  { value: "bajo", label: "Económico" },
  { value: "medio", label: "Medio" },
  { value: "alto", label: "Alto" },
]

function labelDe(value: string | null, lista: { value: string; label: string }[]): string {
  return lista.find((o) => o.value === value)?.label ?? value ?? "—"
}

export default function PerfilPage() {
  const { perfil, isLoading, actualizar } = usePerfil()
  const [editando, setEditando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [listo, setListo] = useState(false)
  const [form, setForm] = useState({
    peso_kg: "",
    altura_cm: "",
    edad: "",
    objetivo: "salud_agilidad",
    nivel: "principiante",
    presupuesto_comida: "",
    comidas_favoritas: "",
    comidas_evitar: "",
  })

  const startEditing = () => {
    if (!perfil) return
    setForm({
      peso_kg: perfil.peso_kg?.toString() ?? "",
      altura_cm: perfil.altura_cm?.toString() ?? "",
      edad: perfil.edad?.toString() ?? "",
      objetivo: perfil.objetivo ?? "salud_agilidad",
      nivel: perfil.nivel ?? "principiante",
      presupuesto_comida: perfil.presupuesto_comida ?? "",
      comidas_favoritas: perfil.comidas_favoritas ?? "",
      comidas_evitar: perfil.comidas_evitar ?? "",
    })
    setEditando(true)
  }

  const save = async () => {
    setGuardando(true)
    try {
      await actualizar({
        peso_kg: form.peso_kg ? Number(form.peso_kg) : null,
        altura_cm: form.altura_cm ? Number(form.altura_cm) : null,
        edad: form.edad ? Number(form.edad) : null,
        objetivo: form.objetivo || null,
        nivel: form.nivel || null,
        presupuesto_comida: form.presupuesto_comida || null,
        comidas_favoritas: form.comidas_favoritas || null,
        comidas_evitar: form.comidas_evitar || null,
      })
      setEditando(false)
      setListo(true)
      setTimeout(() => setListo(false), 2200)
    } finally {
      setGuardando(false)
    }
  }

  if (isLoading) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-24"><p className="text-sm text-ceniza text-center py-8">Cargando...</p></main>
        <BottomNav />
      </AuthGuard>
    )
  }

  const selectCls =
    "w-full bg-hierro-soft border border-hierro-border rounded-sm px-3 py-2.5 text-sm text-hueso outline-none transition-all focus:border-ember/60 focus:ring-2 focus:ring-ember/20"

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-5 pb-28 space-y-4 animate-fade-in max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Mi perfil</h2>
          {!editando && (
            <Button variant="ghost" className="!py-1.5 !px-4 text-xs" onClick={startEditing}>
              Editar
            </Button>
          )}
        </div>

        {listo && (
          <div className="bg-ember/10 border border-ember/25 rounded-lg px-4 py-2.5 text-[13px] text-ember-soft font-medium animate-float-in">
            Guardado. ¡Dale!
          </div>
        )}

        {editando ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-ceniza block mb-1.5">Peso (kg)</label>
                <Input value={form.peso_kg} onChange={(e) => setForm({ ...form, peso_kg: e.target.value })} type="number" inputMode="decimal" />
              </div>
              <div>
                <label className="text-xs text-ceniza block mb-1.5">Altura (cm)</label>
                <Input value={form.altura_cm} onChange={(e) => setForm({ ...form, altura_cm: e.target.value })} type="number" inputMode="decimal" />
              </div>
              <div>
                <label className="text-xs text-ceniza block mb-1.5">Edad</label>
                <Input value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} type="number" inputMode="numeric" />
              </div>
            </div>

            <div>
              <label className="text-xs text-ceniza block mb-1.5">Objetivo</label>
              <select
                value={form.objetivo}
                onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                className={selectCls}
              >
                {OBJETIVOS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-hierro">{o.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-ceniza block mb-1.5">Nivel</label>
              <select
                value={form.nivel}
                onChange={(e) => setForm({ ...form, nivel: e.target.value })}
                className={selectCls}
              >
                {NIVELES.map((n) => (
                  <option key={n.value} value={n.value} className="bg-hierro">{n.label}</option>
                ))}
              </select>
            </div>

            <p className="label-caps pt-2">Preferencias alimenticias</p>

            <div>
              <label className="text-xs text-ceniza block mb-1.5">Presupuesto de comida</label>
              <select
                value={form.presupuesto_comida}
                onChange={(e) => setForm({ ...form, presupuesto_comida: e.target.value })}
                className={selectCls}
              >
                <option value="" className="bg-hierro">No me fijo</option>
                {PRESUPUESTOS.map((p) => (
                  <option key={p.value} value={p.value} className="bg-hierro">{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-ceniza block mb-1.5">Comidas favoritas</label>
              <Input
                value={form.comidas_favoritas}
                onChange={(e) => setForm({ ...form, comidas_favoritas: e.target.value })}
                placeholder="Ej: pollo, arroz, batata"
              />
            </div>

            <div>
              <label className="text-xs text-ceniza block mb-1.5">Comidas a evitar</label>
              <Input
                value={form.comidas_evitar}
                onChange={(e) => setForm({ ...form, comidas_evitar: e.target.value })}
                placeholder="Ej: lácteos, picante"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={save} fullWidth disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar"}
              </Button>
              <Button variant="ghost" onClick={() => setEditando(false)} fullWidth>
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <Fueguito racha={perfil?.racha_actual_dias ?? 0} size={48} />
              <div>
                <p className="font-display text-lg font-bold leading-tight">{perfil?.nombre}</p>
                <p className="text-xs text-ceniza">{perfil?.email}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="font-display-expanded text-3xl leading-none text-ember-glow">
                  {perfil?.racha_actual_dias ?? 0}
                </div>
                <p className="label-caps">días de racha</p>
              </div>
            </div>

            <Card>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">Peso</span>
                  <span className="text-sm font-semibold">{perfil?.peso_kg ? `${perfil.peso_kg} kg` : "—"}</span>
                </div>
                <div className="h-px bg-hierro-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">Altura</span>
                  <span className="text-sm font-semibold">{perfil?.altura_cm ? `${perfil.altura_cm} cm` : "—"}</span>
                </div>
                <div className="h-px bg-hierro-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">Edad</span>
                  <span className="text-sm font-semibold">{perfil?.edad ?? "—"}</span>
                </div>
                <div className="h-px bg-hierro-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">Objetivo</span>
                  <span className={cn("text-sm font-semibold capitalize", !perfil?.objetivo && "text-ceniza-dim")}>
                    {labelDe(perfil?.objetivo ?? null, OBJETIVOS)}
                  </span>
                </div>
                <div className="h-px bg-hierro-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">Nivel</span>
                  <span className={cn("text-sm font-semibold capitalize", !perfil?.nivel && "text-ceniza-dim")}>
                    {labelDe(perfil?.nivel ?? null, NIVELES)}
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <p className="label-caps mb-2.5">Preferencias alimenticias</p>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">Presupuesto</span>
                  <span className={cn("text-sm font-semibold capitalize", !perfil?.presupuesto_comida && "text-ceniza-dim")}>
                    {labelDe(perfil?.presupuesto_comida ?? null, PRESUPUESTOS) || "No me fijo"}
                  </span>
                </div>
                <div className="h-px bg-hierro-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">Favoritas</span>
                  <span className={cn("text-sm font-semibold", !perfil?.comidas_favoritas && "text-ceniza-dim")}>
                    {perfil?.comidas_favoritas || "—"}
                  </span>
                </div>
                <div className="h-px bg-hierro-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ceniza">A evitar</span>
                  <span className={cn("text-sm font-semibold", !perfil?.comidas_evitar && "text-ceniza-dim")}>
                    {perfil?.comidas_evitar || "—"}
                  </span>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
 
