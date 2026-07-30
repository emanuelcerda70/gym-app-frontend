"use client"

import AuthGuard from "@/components/layout/AuthGuard"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useState } from "react"
import type { Ejercicio } from "@/types"

export default function BibliotecaPage() {
  const [musculo, setMusculo] = useState("")
  const { data: ejercicios, isLoading } = useQuery({
    queryKey: ["ejercicios", musculo],
    queryFn: () => api.ejercicios.list(musculo || undefined),
  })

  return (
    <AuthGuard>
      <Header />
      <main className="px-4 pt-4 pb-24 animate-fade-in">
        <h2 className="text-lg font-bold mb-4">Biblioteca de Ejercicios</h2>

        <input
          value={musculo}
          onChange={(e) => setMusculo(e.target.value)}
          placeholder="Filtrar por músculo..."
          className="w-full bg-white/10 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-muted-dim outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 mb-4"
        />

        {isLoading ? (
          <p className="text-sm text-muted text-center py-8">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ejercicios?.map((ej: Ejercicio, i: number) => (
              <Card key={ej.id ?? i}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-bold capitalize">{ej.nombre}</h3>
                  {ej.musculo_objetivo && (
                    <Badge variant="cyan">{ej.musculo_objetivo}</Badge>
                  )}
                </div>
                {ej.descripcion && (
                  <p className="text-xs text-muted">{ej.descripcion}</p>
                )}
              </Card>
            ))}
            {ejercicios?.length === 0 && (
              <p className="text-sm text-muted col-span-full text-center py-8">
                No se encontraron ejercicios
              </p>
            )}
          </div>
        )}
      </main>
      <BottomNav />
    </AuthGuard>
  )
}
