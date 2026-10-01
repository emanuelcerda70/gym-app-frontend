import { useAuthStore } from "@/store/authStore"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://gym-app-backend-n7we.onrender.com"

class ApiError extends Error {
  status: number
  constructor(msg: string, status: number) {
    super(msg)
    this.status = status
  }
}

export interface HistorialSerieCreate {
  ejercicio_id: number
  peso: number
  repeticiones: number
  rpe?: number | null
  rutina_id?: number | null
}

export interface HistorialSerieResponse {
  id: number
  usuario_id: number
  ejercicio_id: number
  rutina_id?: number | null
  peso: number
  repeticiones: number
  rpe?: number | null
  fecha_registro: string
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (res.status === 401) {
    useAuthStore.getState().logout()
    if (typeof window !== "undefined") window.location.href = "/"
    throw new ApiError("No autorizado", 401)
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Error del servidor" }))
    throw new ApiError(body.detail || "Error del servidor", res.status)
  }
  return res.json()
}

export const api = {
  auth: {
    register: (data: { nombre: string; email: string; password: string }) =>
      request<{ access_token: string; usuario_id: number; nombre: string }>(
        "/api/auth/register",
        { method: "POST", body: JSON.stringify(data) }
      ),
    login: (data: { email: string; password: string }) =>
      request<{ access_token: string; usuario_id: number; nombre: string }>(
        "/api/auth/login",
        { method: "POST", body: JSON.stringify(data) }
      ),
    sync: async (email: string = "", nombre: string = "") => {
      // Priorizar el BFF seguro de Next.js que valida criptográficamente la sesión Clerk en el servidor
      try {
        const res = await fetch("/api/backend-sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
        if (res.ok) {
          return (await res.json()) as { access_token: string; usuario_id: number; nombre: string }
        }
      } catch {
        // Fallback en caso de entorno fuera del navegador
      }
      return request<{ access_token: string; usuario_id: number; nombre: string }>(
        "/api/auth/sync",
        { method: "POST", body: JSON.stringify({ email, nombre }) }
      )
    },
  },

  perfil: {
    get: () => request<import("@/types").Perfil>("/api/perfil"),
    update: (data: import("@/types").PerfilUpdate) =>
      request<{ mensaje: string }>("/api/perfil", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  rutinas: {
    getActual: () => request<import("@/types").Rutina>("/api/rutinas"),
    getAll: () => request<import("@/types").RutinaResumen[]>("/api/rutinas/todas"),
    getOne: (id: string) =>
      request<import("@/types").RutinaDetalle>(`/api/rutinas/${id}`),
    delete: (id: string) =>
      request<{ mensaje: string }>(`/api/rutinas/${id}`, { method: "DELETE" }),
  },

  ejercicios: {
    list: (musculo?: string, todos = false) => {
      const params = new URLSearchParams()
      if (musculo) params.set("musculo", musculo)
      if (todos) params.set("todos", "true")
      params.set("limit", "200")
      const qs = params.toString()
      return request<import("@/types").Ejercicio[]>(`/api/ejercicios${qs ? `?${qs}` : ""}`)
    },
    detalle: (id: number) =>
      request<import("@/types").Ejercicio>(`/api/ejercicios/${id}`),
    resumen: (id: number) =>
      request<import("@/types").ResumenEjercicio>(`/api/ejercicios/${id}/resumen`),
  },

  historial: {
    create: (datos: HistorialSerieCreate) =>
      request<HistorialSerieResponse>("/api/historial", {
        method: "POST",
        body: JSON.stringify(datos),
      }),
  },

  progreso: {
    getByEjercicio: (ejercicioId: number) =>
      request<import("@/types").HistorialEjercicio>(`/api/progreso/${ejercicioId}`),
    registrar: (data: import("@/types").RegistroCarga) =>
      request<{ mensaje: string }>("/api/progreso", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  checkin: {
    historial: () =>
      request<import("@/types").Asistencia[]>("/api/checkin/historial"),
    registrar: () =>
      request<import("@/types").CheckinResponse>("/api/checkin", { method: "POST" }),
  },

  chat: {
    enviar: (data: import("@/types").ChatRequest) =>
      request<import("@/types").ChatResponse>("/api/chat", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  admin: {
    metricas: () =>
      request<import("@/types").MetricasAdmin>("/api/admin/metricas"),
    usuarios: () =>
      request<import("@/types").UsuarioAdmin[]>("/api/admin/usuarios"),
    activar: (usuarioId: number, dias: number = 30) =>
      request<{ mensaje: string; estado_suscripcion: string; fecha_vencimiento: string }>(
        `/api/admin/usuarios/${usuarioId}/activar`,
        { method: "POST", body: JSON.stringify({ dias }) }
      ),
    suspender: (usuarioId: number) =>
      request<{ mensaje: string; estado_suscripcion: string }>(
        `/api/admin/usuarios/${usuarioId}/suspender`,
        { method: "POST" }
      ),
    eliminar: (usuarioId: number) =>
      request<{ mensaje: string }>(
        `/api/admin/usuarios/${usuarioId}`,
        { method: "DELETE" }
      ),
  },
}
