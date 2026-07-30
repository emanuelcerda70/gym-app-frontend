export interface RegisterRequest {
  nombre: string
  email: string
  password: string
  gimnasio_id?: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  usuario_id: number
  nombre: string
}

export interface Perfil {
  nombre: string
  email: string
  peso_kg: number | null
  altura_cm: number | null
  edad: number | null
  objetivo: string | null
  nivel: string | null
  dias_disponibles: number | null
  presupuesto_comida: string | null
  comidas_favoritas: string | null
  comidas_evitar: string | null
  racha_actual_dias: number
}

export interface PerfilUpdate {
  peso_kg?: number | null
  altura_cm?: number | null
  edad?: number | null
  objetivo?: string | null
  nivel?: string | null
  dias_disponibles?: number | null
  presupuesto_comida?: string | null
  comidas_favoritas?: string | null
  comidas_evitar?: string | null
}

export interface Ejercicio {
  id?: number
  nombre: string
  musculo_objetivo?: string
  descripcion?: string
  grupo_muscular?: string
}

export interface RutinaEjercicio {
  nombre: string
  series: number
  repeticiones: string
  descanso: number
}

export interface Rutina {
  nombre_rutina: string
  descripcion: string
  ejercicios: RutinaEjercicio[]
}

export interface RutinaResumen {
  id: number
  nombre: string
  descripcion: string
  ejercicios_count: number
}

export interface RegistroCarga {
  ejercicio_id: number
  peso_kg: number
  repeticiones: number
  series?: number
}

export interface HistorialEjercicio {
  marca_maxima_kg: number
  ultimos_registros: {
    fecha: string
    peso_kg: number
    repeticiones: number
  }[]
}

export interface HistorialAsistencias {
  rachas: string[]
  total_dias: number
  racha_actual: number
}

export interface CheckinResponse {
  mensaje: string
  racha_actual: number
}

export interface MensajeHistorial {
  role: "user" | "assistant"
  content: string
}

export interface ChatRequest {
  pregunta: string
  historial: MensajeHistorial[]
  imagen_base64?: string | null
}

export interface ChatResponse {
  usuario: string
  pregunta: string
  respuesta: string
}
