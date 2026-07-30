"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useCheckin() {
  const queryClient = useQueryClient()

  const historial = useQuery({
    queryKey: ["checkin"],
    queryFn: api.checkin.historial,
  })

  const registrar = useMutation({
    mutationFn: () => api.checkin.registrar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkin"] })
      queryClient.invalidateQueries({ queryKey: ["perfil"] })
    },
  })

  return { historial, registrar }
}
