"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Badge from "@/components/ui/Badge"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useState } from "react"
import type { Ejercicio } from "@/types"

export default function BibliotecaPage() {
  const [busqueda, setBusqueda] = useState("")
  const { data: ejercicios, isLoading } = useQuery({
    queryKey: ["ejercicios", busqueda],
    queryFn: () => api.ejercicios.list(busqueda || undefined),
  })

  return (
    <AuthGuard>
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-var(--nav-height)-100px)] px-4 pt-4 pb-28 animate-fade-in">
        <h2 className="text-lg font-bold mb-4">Biblioteca de Ejercicios</h2>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por músculo..."
          className="w-full bg-white/10 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-muted-dim outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 mb-4"
        />

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-lg h-28 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {ejercicios?.map((ej: Ejercicio, i: number) => (
              <div
                key={ej.id ?? i}
                className="bg-card-glass backdrop-blur-md border border-white/10 rounded-lg overflow-hidden flex"
              >
                {ej.gif_url && (
                  <div className="w-28 shrink-0 bg-black/40 flex items-center justify-center">
                    <img
                      src={ej.gif_url}
                      alt={ej.nombre}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold capitalize truncate">{ej.nombre}</h3>
                    {ej.musculo_objetivo && (
                      <Badge variant="cyan" className="shrink-0">{ej.musculo_objetivo}</Badge>
                    )}
                  </div>
                  {ej.equipo && (
                    <p className="text-xs text-muted-dim mb-1">Equipo: {ej.equipo}</p>
                  )}
                  {ej.instrucciones && (
                    <p className="text-xs text-muted line-clamp-2">{ej.instrucciones}</p>
                  )}
                </div>
              </div>
            ))}
            {ejercicios?.length === 0 && (
              <p className="text-sm text-muted text-center py-8">No se encontraron ejercicios</p>
            )}
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
