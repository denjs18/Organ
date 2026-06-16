import { playNote } from '../utils/audio.js'
import { midiToFreq } from '../utils/music.js'

// Physical layout for 2 octaves: C3 (MIDI 48) to B4 (MIDI 71)
// White key width = 36, height = 140, gap = 1 → step = 37
// Black key width = 22, height = 90

const WW = 36  // white key width
const WH = 140 // white key height
const WS = 37  // white key step (width + 1px gap)
const BW = 22  // black key width
const BH = 90  // black key height

// Build key definitions for 2 octaves
function buildKeys() {
  const whiteOrder = [0, 2, 4, 5, 7, 9, 11] // note classes in white-key order
  const keys = []

  for (let oct = 0; oct < 2; oct++) {
    const octaveOffset = oct * 7 * WS
    const midiOctaveBase = 48 + oct * 12 // C3=48, C4=60

    // White keys
    whiteOrder.forEach((noteClass, whiteIdx) => {
      keys.push({
        midi: midiOctaveBase + noteClass,
        noteClass,
        type: 'white',
        x: octaveOffset + whiteIdx * WS,
        y: 0,
        w: WW,
        h: WH,
        octave: oct + 3,
      })
    })

    // Black keys (C# D# F# G# A#)
    const blackKeys = [
      { noteClass: 1,  whiteLeft: 0 }, // C#
      { noteClass: 3,  whiteLeft: 1 }, // D#
      { noteClass: 6,  whiteLeft: 3 }, // F#
      { noteClass: 8,  whiteLeft: 4 }, // G#
      { noteClass: 10, whiteLeft: 5 }, // A#
    ]
    blackKeys.forEach(({ noteClass, whiteLeft }) => {
      keys.push({
        midi: midiOctaveBase + noteClass,
        noteClass,
        type: 'black',
        x: octaveOffset + whiteLeft * WS + WW - BW / 2,
        y: 0,
        w: BW,
        h: BH,
        octave: oct + 3,
      })
    })
  }

  // Sort: white keys first, then black keys (so black renders on top)
  keys.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'white' ? -1 : 1
    return a.midi - b.midi
  })

  return keys
}

const KEYS = buildKeys()
const TOTAL_WIDTH = 14 * WS - 1  // 14 white keys

export default function Keyboard({ activeNotes = [], noteColors = {}, onNoteClick }) {
  // activeNotes: array of note classes (0-11) to highlight
  // noteColors: { [noteClass]: '#hex' } — optional per-note colors
  // Single color fallback: if noteColors is empty, use gold for all active notes

  function getKeyFill(key) {
    const isActive = activeNotes.includes(key.noteClass)
    if (!isActive) {
      return key.type === 'white' ? '#f5f5ee' : '#1a1a1a'
    }
    return noteColors[key.noteClass] || '#d4a017'
  }

  function getStroke(key) {
    return key.type === 'white' ? '#aaa' : '#555'
  }

  function handleClick(key) {
    playNote(key.midi, 1.2)
    if (onNoteClick) onNoteClick(key.noteClass, key.midi)
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${TOTAL_WIDTH} ${WH + 4}`}
        className="w-full max-w-2xl mx-auto block"
        style={{ minWidth: '300px' }}
      >
        {/* Octave labels */}
        <text x={7 * WS / 2} y={WH - 8} textAnchor="middle" fontSize="10" fill="#999" style={{ userSelect: 'none' }}>
          3e octave
        </text>
        <text x={7 * WS + 7 * WS / 2} y={WH - 8} textAnchor="middle" fontSize="10" fill="#999" style={{ userSelect: 'none' }}>
          4e octave
        </text>

        {/* Separator line between octaves */}
        <line x1={7 * WS} y1={0} x2={7 * WS} y2={WH} stroke="#ccc" strokeWidth="1.5" strokeDasharray="4,3" />

        {KEYS.map(key => {
          const fill = getKeyFill(key)
          const isActive = activeNotes.includes(key.noteClass)
          return (
            <rect
              key={`${key.midi}`}
              x={key.x}
              y={key.y}
              width={key.w}
              height={key.h}
              rx={key.type === 'white' ? 3 : 2}
              fill={fill}
              stroke={getStroke(key)}
              strokeWidth={key.type === 'white' ? 1 : 0.5}
              style={{ cursor: 'pointer', transition: 'fill 0.15s' }}
              onClick={() => handleClick(key)}
              opacity={isActive ? 1 : key.type === 'white' ? 0.95 : 0.9}
            />
          )
        })}

        {/* Active note glow effect */}
        {KEYS.filter(k => activeNotes.includes(k.noteClass)).map(key => (
          <rect
            key={`glow-${key.midi}`}
            x={key.x - 1}
            y={key.y - 1}
            width={key.w + 2}
            height={key.h + 2}
            rx={key.type === 'white' ? 4 : 3}
            fill="none"
            stroke={noteColors[key.noteClass] || '#d4a017'}
            strokeWidth="2"
            opacity="0.7"
            style={{ pointerEvents: 'none' }}
          />
        ))}
      </svg>
      <p className="text-center text-xs text-gray-500 mt-1">
        Cliquez sur une touche pour l'entendre
      </p>
    </div>
  )
}
