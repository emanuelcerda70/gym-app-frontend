"use client"
import { useState, useEffect } from "react"

interface FrameAnimatorProps {
  baseUrl: string // URL base sin el -1.png (ej: https://.../press-banca)
}

export default function FrameAnimator({ baseUrl }: FrameAnimatorProps) {
  const [frame, setFrame] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev === 4 ? 1 : prev + 1))
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 bg-carbon-deep rounded-2xl overflow-hidden flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${baseUrl}-${frame}.png`}
        alt="Animación ASCEND"
        className="w-full h-full object-contain mix-blend-screen transition-opacity duration-150"
      />
    </div>
  )
}
