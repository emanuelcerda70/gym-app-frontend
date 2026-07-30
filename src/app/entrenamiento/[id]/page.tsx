"use client"

import { useParams } from "next/navigation"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import ExerciseCard from "@/components/rutina/ExerciseCard"
import { useRutinas } from "@/hooks/useRutinas"

export default function RutinaDetallePage() {
  const params = useParams()
  const { todas } = useRutinas()
  const rutinas = todas.data ?? []
  const rutina = rutinas.find((r) => String(r.id) === params.id)

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-24 animate-fade-in">
        {rutina ? (
          <>
            <h2 className="text-lg font-bold">{rutina.nombre}</h2>
            <p className="text-sm text-muted mb-4">{rutina.descripcion}</p>
            <p className="text-xs text-muted">{rutina.ejercicios_count} ejercicios</p>
          </>
        ) : (
          <p className="text-sm text-muted text-center py-8">Rutina no encontrada</p>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
