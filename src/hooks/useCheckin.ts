"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Asistencia, HistorialCheckin } from "@/types"

function mapHistorial(data: Asistencia[]): HistorialCheckin {
  const fechas = (data ?? [])
    .filter((a) => a.completado)
    .map((a) => a.fecha)
    .sort()
  return { fechas, total_dias: fechas.length }
}

export function useCheckin() {
  const queryClient = useQueryClient()

  const historial = useQuery({
    queryKey: ["checkin"],
    queryFn: async () => mapHistorial(await api.checkin.historial()),
  })

  const registrar = useMutation({
    mutationFn: () => api.checkin.registrar(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["checkin"] })
      queryClient.invalidateQueries({ queryKey: ["perfil"] })
    },
  })

  return { historial, registrar }
}
 
