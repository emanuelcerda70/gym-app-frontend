"use client"

import Link from "next/link"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { useCheckin } from "@/hooks/useCheckin"
import { usePerfil } from "@/hooks/usePerfil"
import { useRutinas } from "@/hooks/useRutinas"

export default function HomePage() {
  const { perfil } = usePerfil()
  const { historial, registrar } = useCheckin()
  const { rutinaActual } = useRutinas()

  const racha = perfil?.racha_actual_dias ?? 0
  const totalDias = historial.data?.total_dias ?? 0
  const tieneRutina = rutinaActual.data && !rutinaActual.isError

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-24 space-y-5 animate-fade-in">

        {/* Racha protagonista */}
        <Card>
          <div className="flex flex-col items-center py-4">
            <div className="text-6xl mb-2">🔥</div>
            <div className="text-4xl font-black text-emerald-400">{racha}</div>
            <div className="text-sm text-muted mt-1">días consecutivos</div>

            <Button
              className="mt-4 !py-2.5 !px-8"
              onClick={() => registrar.mutate()}
              disabled={registrar.isPending}
            >
              {registrar.isPending ? "..." : "✅ Check-in hoy"}
            </Button>

            <p className="text-xs text-muted-dim mt-2">
              {totalDias > 0 ? `${totalDias} días entrenados` : "Arrancá hoy 💪"}
            </p>
          </div>
        </Card>

        {/* Entrenamiento de hoy */}
        <Card>
          <h2 className="text-base font-bold mb-3">🏋️ Entrenamiento de hoy</h2>
          {tieneRutina ? (
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                {rutinaActual.data?.nombre_rutina}
              </p>
              <p className="text-xs text-muted mb-3">
                {rutinaActual.data?.ejercicios.length} ejercicios
              </p>
              <Link href="/entrenamiento">
                <Button fullWidth className="!py-2.5">Entrenar ahora</Button>
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted mb-3">
                Todavía no tenés rutina. Pedile una a tu coach.
              </p>
              <Link href="/chat">
                <Button variant="ghost" fullWidth className="!py-2.5">
                  Ir al chat
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Acceso rápido al chat */}
        <Link href="/chat" className="block">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-lg shrink-0">
                🤖
              </div>
              <div>
                <p className="text-sm font-bold">Súper Entrenador</p>
                <p className="text-xs text-muted">Consultá lo que quieras</p>
              </div>
              <span className="ml-auto text-muted">→</span>
            </div>
          </Card>
        </Link>

      </main>
      <BottomNav />
    </AuthGuard>
  )
}
