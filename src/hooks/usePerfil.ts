"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/store/authStore"
import type { PerfilUpdate } from "@/types"

export function usePerfil() {
  const queryClient = useQueryClient()
  const token = useAuthStore((s) => s.token)

  const query = useQuery({
    queryKey: ["perfil", token ?? "sin-token"],
    queryFn: api.perfil.get,
    enabled: !!token,
  })

  const mutation = useMutation({
    mutationFn: (data: PerfilUpdate) => api.perfil.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfil"] })
    },
  })

  return { perfil: query.data, isLoading: query.isLoading, error: query.error, actualizar: mutation.mutateAsync }
}
 
