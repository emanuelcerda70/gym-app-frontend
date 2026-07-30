"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Card from "@/components/ui/Card"
import { useCheckin } from "@/hooks/useCheckin"
import { usePerfil } from "@/hooks/usePerfil"

export default function ProgresoPage() {
  const { perfil } = usePerfil()
  const { historial } = useCheckin()

  const racha = perfil?.racha_actual_dias ?? 0
  const totalDias = historial.data?.total_dias ?? 0
  const fechas = historial.data?.rachas ?? []
  const nombre = perfil?.nombre

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-24 space-y-5 animate-fade-in">
        <h2 className="text-lg font-bold">Tu Progreso</h2>

        {/* Stats rápidas */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <div className="text-2xl font-black text-emerald-400 text-center">{racha}</div>
            <p className="text-xs text-muted text-center">Racha actual</p>
          </Card>
          <Card>
            <div className="text-2xl font-black text-cyan-400 text-center">{totalDias}</div>
            <p className="text-xs text-muted text-center">Total días</p>
          </Card>
          <Card>
            <div className="text-2xl font-black text-white text-center">
              {totalDias > 0 ? Math.round((racha / totalDias) * 100) : 0}%
            </div>
            <p className="text-xs text-muted text-center">Consistencia</p>
          </Card>
        </div>

        {/* Calendario / heatmap */}
        <Card>
          <h3 className="text-sm font-bold mb-3">📅 Calendario de constancia</h3>
          {fechas.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {fechas.map((f, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm bg-emerald-500/60"
                  title={f}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted">
              Todavía no registraste check-ins. ¡Empezá hoy!
            </p>
          )}
        </Card>

        {/* Perfil resumen */}
        <Card>
          <h3 className="text-sm font-bold mb-3">👤 Datos físicos</h3>
          {nombre && <p className="text-xs text-muted">Nombre: {nombre}</p>}
          {perfil?.peso_kg && <p className="text-xs text-muted">Peso: {perfil.peso_kg} kg</p>}
          {perfil?.altura_cm && <p className="text-xs text-muted">Altura: {perfil.altura_cm} cm</p>}
          {perfil?.objetivo && <p className="text-xs text-muted">Objetivo: {perfil.objetivo.replace(/_/g, " ")}</p>}
          {perfil?.nivel && <p className="text-xs text-muted">Nivel: {perfil.nivel}</p>}
        </Card>
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
