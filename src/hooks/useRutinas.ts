"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useRutinas() {
  const queryClient = useQueryClient()

  const actual = useQuery({
    queryKey: ["rutina", "actual"],
    queryFn: api.rutinas.getActual,
  })

  const todas = useQuery({
    queryKey: ["rutinas", "todas"],
    queryFn: api.rutinas.getAll,
  })

  const eliminar = useMutation({
    mutationFn: (id: number) => api.rutinas.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutinas"] })
    },
  })

  return { rutinaActual: actual, todas, eliminar }
}
