"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Ejercicio } from "@/types"

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function useEjercicioCatalog() {
  const query = useQuery({
    queryKey: ["ejercicios", "catalogo"],
    queryFn: () => api.ejercicios.list(undefined, true),
    staleTime: 10 * 60_000,
  })

  const findByName = (nombre: string): Ejercicio | undefined => {
    const buscado = normalizar(nombre)
    return (query.data ?? []).find((e) => normalizar(e.nombre) === buscado)
  }

  return { catalogo: query.data ?? [], findByName, isLoading: query.isLoading }
}
 
