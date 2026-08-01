/* eslint-disable @next/next/no-img-element */
"use client"

import { useParams, useRouter } from "next/navigation"
import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import Link from "next/link"
import DiagramaMuscular from "@/components/ejercicios/DiagramaMuscular"
import { getDiagrama } from "@/lib/wger"

export default function EjercicioDetallePage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const { data: ej, isLoading, error } = useQuery({
    queryKey: ["ejercicio", id],
    queryFn: () => api.ejercicios.detalle(id),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
          <div className="bg-hierro-soft rounded-lg h-64 animate-pulse mb-4" />
          <div className="bg-hierro-soft rounded-lg h-8 animate-pulse w-2/3 mb-3" />
          <div className="bg-hierro-soft rounded-lg h-4 animate-pulse w-1/3 mb-6" />
          <div className="bg-hierro-soft rounded-lg h-32 animate-pulse" />
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  if (error || !ej) {
    return (
      <AuthGuard>
        <Header />
        <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
          <p className="text-sm text-ceniza text-center py-8">Ejercicio no encontrado</p>
          <Link href="/ejercicios" className="text-ember-soft text-sm text-center block underline underline-offset-2">Volver a ejercicios</Link>
        </main>
        <BottomNav />
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-28 animate-fade-in max-w-md mx-auto">
        <button
          onClick={() => {
            if (window.history.length > 1) router.back()
            else router.push("/ejercicios")
          }}
          className="text-sm text-ceniza flex items-center gap-1 mb-4"
        >
          ← Volver
        </button>

        {/* GIF */}
        {ej.gif_url ? (
          <div className="bg-carbon border border-hierro-border rounded-lg overflow-hidden mb-4 flex items-center justify-center" style={{ minHeight: 200 }}>
            <img src={ej.gif_url} alt={ej.nombre} className="w-full max-h-72 object-contain" />
          </div>
        ) : (
          <div className="bg-hierro-soft border border-hierro-border rounded-lg h-48 flex items-center justify-center text-5xl mb-4">
            🏋️
          </div>
        )}

        {/* Title and info */}
        <h1 className="font-display text-xl font-black capitalize mb-1">{ej.nombre}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {ej.musculo_objetivo && (
            <span className="text-xs bg-ember/15 text-ember-soft border border-ember/30 px-2.5 py-0.5 rounded-full font-semibold uppercase">
              {ej.musculo_objetivo}
            </span>
          )}
          {ej.equipo && (
            <span className="text-xs bg-brasa/10 text-brasa border border-brasa/30 px-2.5 py-0.5 rounded-full font-semibold uppercase">
              {ej.equipo}
            </span>
          )}
        </div>

        {/* Músculos trabajados */}
        {getDiagrama(ej.musculo_objetivo || "") && (
          <div className="glass rounded-md p-3 mb-4">
            <h3 className="label-caps mb-2">Músculos trabajados</h3>
            <div className="flex items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1 text-ceniza"><span className="w-3 h-3 rounded bg-ember inline-block" /> Principal</span>
              <span className="flex items-center gap-1 text-ceniza"><span className="w-3 h-3 rounded bg-brasa inline-block" /> Accesorio</span>
            </div>
            <DiagramaMuscular musculo={ej.musculo_objetivo || ""} />
          </div>
        )}

        {/* Instructions */}
        {ej.instrucciones && (
          <div className="glass rounded-md p-4">
            <h3 className="label-caps mb-2">Instrucciones</h3>
            <p className="text-sm text-hueso leading-relaxed whitespace-pre-line">{ej.instrucciones}</p>
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
 
