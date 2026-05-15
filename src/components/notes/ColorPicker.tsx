import { NOTE_COLORS, type NoteColor } from '@/types'

interface ColorPickerProps {
  selected: string
  onSelect: (color: string) => void
}

export function ColorPicker({ selected, onSelect }: ColorPickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {(Object.entries(NOTE_COLORS) as [NoteColor, typeof NOTE_COLORS.default][]).map(([key, { bg, element }]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center text-sm border-2 transition-all ${
            selected === key ? 'border-klee-red scale-110 shadow-md' : 'border-transparent'
          }`}
          title={element}
        >
          {element}
        </button>
      ))}
    </div>
  )
}
