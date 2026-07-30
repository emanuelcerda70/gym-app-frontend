"use client"

import { useState } from "react"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Badge from "@/components/ui/Badge"
import { usePerfil } from "@/hooks/usePerfil"

export default function PerfilPage() {
  const { perfil, isLoading, actualizar } = usePerfil()
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({
    peso_kg: "",
    altura_cm: "",
    edad: "",
    objetivo: "",
    nivel: "",
    dias_disponibles: "",
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
      objetivo: perfil.objetivo ?? "",
      nivel: perfil.nivel ?? "",
      dias_disponibles: perfil.dias_disponibles?.toString() ?? "",
      presupuesto_comida: perfil.presupuesto_comida ?? "",
      comidas_favoritas: perfil.comidas_favoritas ?? "",
      comidas_evitar: perfil.comidas_evitar ?? "",
    })
    setEditando(true)
  }

  const save = async () => {
    await actualizar({
      peso_kg: form.peso_kg ? Number(form.peso_kg) : null,
      altura_cm: form.altura_cm ? Number(form.altura_cm) : null,
      edad: form.edad ? Number(form.edad) : null,
      objetivo: form.objetivo || null,
      nivel: form.nivel || null,
      dias_disponibles: form.dias_disponibles ? Number(form.dias_disponibles) : null,
      presupuesto_comida: form.presupuesto_comida || null,
      comidas_favoritas: form.comidas_favoritas || null,
      comidas_evitar: form.comidas_evitar || null,
    })
    setEditando(false)
  }

  if (isLoading) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-24"><p className="text-sm text-muted text-center py-8">Cargando...</p></main>
        <BottomNav />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-24 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Mi Perfil</h2>
          {!editando && (
            <Button variant="ghost" className="!py-1.5 !px-4 text-xs" onClick={startEditing}>
              Editar
            </Button>
          )}
        </div>

        {editando ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Peso (kg)</label>
                <Input value={form.peso_kg} onChange={(e) => setForm({ ...form, peso_kg: e.target.value })} type="number" />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Altura (cm)</label>
                <Input value={form.altura_cm} onChange={(e) => setForm({ ...form, altura_cm: e.target.value })} type="number" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Edad</label>
              <Input value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} type="number" />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Objetivo</label>
              <Input value={form.objetivo} onChange={(e) => setForm({ ...form, objetivo: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Nivel</label>
              <Input value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Días disponibles</label>
              <Input value={form.dias_disponibles} onChange={(e) => setForm({ ...form, dias_disponibles: e.target.value })} type="number" />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Presupuesto comida</label>
              <Input value={form.presupuesto_comida} onChange={(e) => setForm({ ...form, presupuesto_comida: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Comidas favoritas</label>
              <Input value={form.comidas_favoritas} onChange={(e) => setForm({ ...form, comidas_favoritas: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Comidas a evitar</label>
              <Input value={form.comidas_evitar} onChange={(e) => setForm({ ...form, comidas_evitar: e.target.value })} />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={save} fullWidth>Guardar</Button>
              <Button variant="ghost" onClick={() => setEditando(false)} fullWidth>Cancelar</Button>
            </div>
          </div>
        ) : (
          <Card>
            <div className="space-y-2">
              <p className="text-sm"><span className="text-muted">Nombre:</span> {perfil?.nombre}</p>
              <p className="text-sm"><span className="text-muted">Email:</span> {perfil?.email}</p>
              {perfil?.peso_kg && <p className="text-sm"><span className="text-muted">Peso:</span> {perfil.peso_kg} kg</p>}
              {perfil?.altura_cm && <p className="text-sm"><span className="text-muted">Altura:</span> {perfil.altura_cm} cm</p>}
              {perfil?.edad && <p className="text-sm"><span className="text-muted">Edad:</span> {perfil.edad}</p>}
              {perfil?.objetivo && (
                <p className="text-sm">
                  <span className="text-muted">Objetivo:</span>{' '}
                  <Badge>{perfil.objetivo.replace(/_/g, " ")}</Badge>
                </p>
              )}
              {perfil?.nivel && <p className="text-sm"><span className="text-muted">Nivel:</span> {perfil.nivel}</p>}
              {perfil?.dias_disponibles && <p className="text-sm"><span className="text-muted">Días disponibles:</span> {perfil.dias_disponibles}</p>}
              {perfil?.presupuesto_comida && <p className="text-sm"><span className="text-muted">Presupuesto comida:</span> {perfil.presupuesto_comida}</p>}
              {perfil?.comidas_favoritas && <p className="text-sm"><span className="text-muted">Comidas favoritas:</span> {perfil.comidas_favoritas}</p>}
              {perfil?.comidas_evitar && <p className="text-sm"><span className="text-muted">Evita:</span> {perfil.comidas_evitar}</p>}
              {perfil?.racha_actual_dias !== undefined && (
                <p className="text-sm"><span className="text-muted">Racha:</span> 🔥 {perfil.racha_actual_dias} días</p>
              )}
            </div>
          </Card>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
