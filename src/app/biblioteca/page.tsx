"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Badge from "@/components/ui/Badge"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useState, useMemo } from "react"
import type { Ejercicio } from "@/types"

export default function BibliotecaPage() {
  const [busqueda, setBusqueda] = useState("")
  const { data: ejercicios, isLoading } = useQuery({
    queryKey: ["ejercicios", busqueda],
    queryFn: () => api.ejercicios.list(busqueda || undefined),
  })

  const grupos = useMemo(() => {
    if (!ejercicios) return []
    const map = new Map<string, Ejercicio[]>()
    for (const ej of ejercicios) {
      const grupo = ej.musculo_objetivo || "Sin clasificar"
      if (!map.has(grupo)) map.set(grupo, [])
      map.get(grupo)!.push(ej)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [ejercicios])

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
        ) : grupos.length === 0 ? (
          <p className="text-sm text-muted text-center py-8">No se encontraron ejercicios</p>
        ) : (
          <div className="space-y-6">
            {grupos.map(([grupo, lista]) => (
              <section key={grupo}>
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 px-1">
                  {grupo}
                </h3>
                <div className="space-y-2">
                  {lista.map((ej: Ejercicio, i: number) => (
                    <div
                      key={ej.id ?? i}
                      className="bg-card-glass backdrop-blur-md border border-white/10 rounded-lg overflow-hidden flex"
                    >
                      {ej.gif_url && (
                        <div className="w-24 shrink-0 bg-black/40 flex items-center justify-center">
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
                          <h4 className="text-sm font-bold capitalize truncate">{ej.nombre}</h4>
                          {ej.equipo && (
                            <Badge variant="cyan" className="shrink-0">{ej.equipo}</Badge>
                          )}
                        </div>
                        {ej.instrucciones && (
                          <p className="text-xs text-muted line-clamp-2">{ej.instrucciones}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
