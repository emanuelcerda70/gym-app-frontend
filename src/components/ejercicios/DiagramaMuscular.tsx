import { getDiagrama } from "@/lib/wger"

export default function DiagramaMuscular({ musculo }: { musculo: string }) {
  const diagrama = getDiagrama(musculo)
  if (!diagrama) return null

  return (
    <div>
      <div className="relative flex justify-center py-2">
        <div className="relative">
          <img
            src={diagrama.main}
            alt={`Músculo ${diagrama.etiqueta} (principal)`}
            className="w-36 h-auto"
            loading="lazy"
          />
          {diagrama.secondary && (
            <img
              src={diagrama.secondary}
              alt={`Músculo ${diagrama.etiqueta} (accesorio)`}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          )}
        </div>
      </div>
      <p className="text-[10px] text-ceniza text-center">
        Diagramas musculares: wger.de (CC-BY-SA)
      </p>
    </div>
  )
}
 
