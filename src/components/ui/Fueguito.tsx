"use client"

import { cn } from "@/lib/utils"

interface FueguitoProps {
  racha: number
  size?: number
  flare?: boolean
  className?: string
}

// Cada segmento horizontal = un día de racha. Se prenden de abajo hacia arriba.
const SEGMENT_Y = [64, 57.5, 51, 44.5, 38, 31.5, 25]

function FlamePath(props: React.SVGProps<SVGPathElement>) {
  return (
    <path
      d="M32,5 C45,19 54,28 54,45 C54,57 44,67 32,67 C20,67 10,57 10,45 C10,32 19,23 28,17 C28,25 31,28 34,28 C31,22 31,14 32,5 Z"
      {...props}
    />
  )
}

export default function Fueguito({ racha, size = 56, flare = false, className }: FueguitoProps) {
  const lit = Math.min(Math.max(racha, 0), SEGMENT_Y.length)
  const hito = racha > 0 && racha % 7 === 0

  return (
    <div
      className={cn("relative shrink-0", flare && "animate-flare", className)}
      style={{ width: size, height: size }}
      aria-label={`${racha} días de racha`}
    >
      <svg viewBox="0 0 64 72" width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="fuegoGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF4D00" />
            <stop offset="70%" stopColor="#FF7A1F" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          <clipPath id="fuegoClip">
            <FlamePath />
          </clipPath>
        </defs>

        {/* Silueta apagada */}
        <FlamePath fill={lit > 0 ? "#0B0B0F" : "#17171E"} stroke={lit > 0 ? "#23232C" : "#23232C"} strokeWidth="1.5" />

        {/* Segmentos prendidos (un día cada uno) */}
        {lit > 0 && (
          <g clipPath="url(#fuegoClip)">
            {SEGMENT_Y.slice(-lit).map((y, i) => (
              <rect
                key={y}
                x={lit > 3 ? 18 : 20}
                y={y}
                width={lit > 3 ? 28 : 24}
                height={4.5}
                rx={2.25}
                fill="url(#fuegoGrad)"
                style={{ opacity: 0.55 + (i / lit) * 0.45 }}
              />
            ))}
          </g>
        )}

        {/* Resplandor */}
        {lit > 0 && (
          <FlamePath
            fill="none"
            stroke="rgba(255,77,0,0.4)"
            strokeWidth="3"
            style={{ filter: "blur(6px)" }}
          />
        )}

        {/* Chispas en hitos (7, 14, 30...) */}
        {hito && (
          <g>
            <circle cx="50" cy="14" r="2.2" fill="#FFB300" className="animate-spark" />
            <circle cx="44" cy="4" r="1.6" fill="#FF7A1F" className="animate-spark" style={{ animationDelay: "0.12s" }} />
            <circle cx="57" cy="5" r="1.4" fill="#FF4D00" className="animate-spark" style={{ animationDelay: "0.22s" }} />
          </g>
        )}
      </svg>

      {lit === 0 && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: "#5A5A64" }}
        >
          <svg viewBox="0 0 24 24" width={size * 0.3} height={size * 0.3} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3 L12 21 M12 3 C 8 6, 6 8, 6 11 a6 6 0 0 0 12 0 C 18 8, 16 6, 12 3 Z" />
          </svg>
        </div>
      )}
    </div>
  )
}
 
