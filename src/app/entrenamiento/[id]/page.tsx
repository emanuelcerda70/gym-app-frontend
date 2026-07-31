"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Button from "@/components/ui/Button"
import Fueguito from "@/components/ui/Fueguito"
import { useRutinas } from "@/hooks/useRutinas"

export default function RutinaDetallePage() {
  const params = useParams()
  const router = useRouter()
  const { todas } = useRutinas()
  const rutinas = todas.data ?? []
  const rutina = rutinas.find((r) => String(r.id) === params.id)

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
        <button
          onClick={() => router.back()}
          className="text-sm text-ceniza flex items-center gap-1 mb-4"
        >
          ← Volver
        </button>

        {rutina ? (
          <div className="glass rounded-xl p-5">
            <p className="label-caps mb-1">Rutina</p>
            <h2 className="font-display text-xl font-bold leading-tight mb-1">{rutina.nombre}</h2>
            {rutina.descripcion && (
              <p className="text-sm text-ceniza mb-4">{rutina.descripcion}</p>
            )}
            <p className="text-xs text-ceniza mb-5">
              {Array.isArray(rutina.ejercicios)
                ? `${rutina.ejercicios.length} ejercicios`
                : rutina.ejercicios_count
                  ? `${rutina.ejercicios_count} ejercicios`
                  : "Rutina guardada"}
            </p>
            <Link href="/entrenamiento">
              <Button fullWidth className="!py-3">Ir a mi rutina activa</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-10">
            <Fueguito racha={0} size={56} className="mb-4" />
            <p className="text-sm text-ceniza">Rutina no encontrada</p>
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
