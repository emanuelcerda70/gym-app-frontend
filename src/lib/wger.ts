export interface DiagramaMuscular {
  main: string
  secondary?: string
  etiqueta: string
}

const BASE = "https://wger.de/static/images/muscles"

export const DIAGRAMAS_WGER: Record<string, DiagramaMuscular> = {
  Pectorales: {
    main: `${BASE}/main/muscle-4.c9fa9a228bc8.svg`,
    etiqueta: "Pectorales",
  },
  Dorsales: {
    main: `${BASE}/main/muscle-12.6a5de7a0e373.svg`,
    etiqueta: "Dorsales",
  },
  Cuadriceps: {
    main: `${BASE}/main/muscle-10.b1445ea1acf6.svg`,
    etiqueta: "Cuádriceps",
  },
  Gluteos: {
    main: `${BASE}/main/muscle-8.fbdfb46f3bc0.svg`,
    etiqueta: "Glúteos",
  },
  Isquiotibiales: {
    main: `${BASE}/main/muscle-11.54ef31755917.svg`,
    etiqueta: "Isquiotibiales",
  },
  Triceps: {
    main: `${BASE}/main/muscle-5.8a2b934b5486.svg`,
    etiqueta: "Tríceps",
  },
  Biceps: {
    main: `${BASE}/main/muscle-1.8790f8a0b3b9.svg`,
    etiqueta: "Bíceps",
  },
  Gemelos: {
    main: `${BASE}/main/muscle-7.edbd8c381b0c.svg`,
    secondary: `${BASE}/secondary/muscle-15.9bdd8751b3e7.svg`,
    etiqueta: "Gemelos",
  },
  Hombros: {
    main: `${BASE}/main/muscle-2.e1e1205a3202.svg`,
    etiqueta: "Hombros",
  },
  Abdominales: {
    main: `${BASE}/main/muscle-6.592f938fa8c7.svg`,
    secondary: `${BASE}/secondary/muscle-14.afd582849ae9.svg`,
    etiqueta: "Abdominales",
  },
  Trapecios: {
    main: `${BASE}/main/muscle-9.b491050a7108.svg`,
    etiqueta: "Trapecios",
  },
}

const ALIASES: Record<string, string> = {
  pecho: "Pectorales",
  trapecio: "Trapecios",
}

function normalizar(musculo: string): string {
  return musculo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

export function getDiagrama(musculo: string): DiagramaMuscular | null {
  if (!musculo) return null
  const clave = normalizar(musculo)
  const nombre = ALIASES[clave] || clave.charAt(0).toUpperCase() + clave.slice(1)
  return DIAGRAMAS_WGER[nombre] || null
}
