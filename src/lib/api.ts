import { useAuthStore } from "@/store/authStore"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://gym-app-backend-n7we.onrender.com"

class ApiError extends Error {
  status: number
  constructor(msg: string, status: number) {
    super(msg)
    this.status = status
  }
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
    delete: (id: number) =>
      request<{ mensaje: string }>(`/api/rutinas/${id}`, { method: "DELETE" }),
  },

  ejercicios: {
    list: (musculo?: string) => {
      const params = musculo ? `?musculo=${encodeURIComponent(musculo)}` : ""
      return request<import("@/types").Ejercicio[]>(`/api/ejercicios${params}`)
    },
    detalle: (id: number) =>
      request<import("@/types").Ejercicio>(`/api/ejercicios/${id}`),
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
      request<import("@/types").HistorialAsistencias>("/api/checkin/historial"),
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
}
