"use client"

interface Props {
  onSelect: (text: string) => void
}

const chips = [
  { label: "Tren Superior", text: "Armame una rutina de tren superior de hipertrofia" },
  { label: "Tren Inferior", text: "Armame una rutina de piernas e isquios" },
  { label: "Dieta Económica", text: "¿Qué puedo comer post entreno económico?" },
]

export default function QuickChips({ onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onSelect(chip.text)}
          className="shrink-0 bg-white/10 border border-emerald-500/25 text-white text-xs px-3.5 py-1.5 rounded-full hover:bg-emerald-500 hover:text-black transition-all whitespace-nowrap"
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
