"use client"

interface Props {
  onSelect: (text: string) => void
}

const chips = [
  { label: "Tren superior", text: "Armame una rutina de tren superior de hipertrofia" },
  { label: "Piernas", text: "Armame una rutina de piernas e isquios" },
  { label: "Post entreno", text: "¿Qué puedo comer post entrenamiento económico?" },
]

export default function QuickChips({ onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onSelect(chip.text)}
          className="shrink-0 text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap bg-hierro-soft border border-hierro-border text-ceniza hover:text-hueso hover:border-ember/40 transition-all"
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
