'use client';
import { useState, useEffect } from 'react';

interface FrameAnimatorProps {
  baseUrl: string;
}

export default function FrameAnimator({ baseUrl }: FrameAnimatorProps) {
  const [frame, setFrame] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setFrame((prev) => (prev === 4 ? 1 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Previene el error de hidratación en Next.js
  if (!isMounted) {
    return (
      <div className="relative w-full h-64 bg-carbon-deep rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="animate-pulse bg-carbon w-full h-full rounded-2xl"></div>
      </div>
    );
  }

  // Truco para bypassear el error 401 de Cloudinary inyectando la versión v1 si no la tiene
  const safeUrl = baseUrl.includes('/upload/v')
    ? baseUrl
    : baseUrl.replace('/upload/', '/upload/v1/');

  return (
    <div className="relative w-full h-64 bg-carbon-deep rounded-2xl overflow-hidden flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${safeUrl}-${frame}.png`}
        alt="Animación ASCEND"
        className="w-full h-full object-contain transition-opacity duration-150"
        suppressHydrationWarning
      />
    </div>
  );
}