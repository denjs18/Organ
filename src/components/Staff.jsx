// Renders a single note on a treble or bass clef staff in SVG
// staffPos: position from bottom line (0 = line 1, 1 = space 1, 2 = line 2, ...)
//   Negative = below staff, >8 = above staff

const BOTTOM_Y = 88   // y of bottom staff line (line 1)
const STEP = 5        // px per diatonic step
const STAFF_LEFT = 58
const STAFF_RIGHT = 250
const NOTE_X = 168

function noteY(staffPos) {
  return BOTTOM_Y - staffPos * STEP
}

// Which even positions outside [0,8] need a ledger line
function getLedgerLines(staffPos) {
  const lines = []
  if (staffPos <= -2) {
    for (let p = -2; p >= staffPos; p -= 2) lines.push(p)
  }
  if (staffPos >= 10) {
    for (let p = 10; p <= staffPos; p += 2) lines.push(p)
  }
  return lines
}

export default function Staff({ clef = 'treble', staffPos, accidental = null, highlight = '#f0f0e8' }) {
  const linePositions = [0, 2, 4, 6, 8]
  const ledgerPositions = getLedgerLines(staffPos)
  const ny = noteY(staffPos)

  return (
    <svg viewBox="0 0 300 118" className="w-full max-w-sm mx-auto block">
      {/* Staff lines */}
      {linePositions.map(pos => (
        <line
          key={pos}
          x1={STAFF_LEFT} y1={noteY(pos)}
          x2={STAFF_RIGHT} y2={noteY(pos)}
          stroke="#777" strokeWidth="1.3"
        />
      ))}

      {/* Clef symbol */}
      {clef === 'treble' && (
        <text
          x="6" y="96"
          fontSize="72"
          fill="#d4a017"
          fontFamily="'Times New Roman', Georgia, serif"
          style={{ userSelect: 'none' }}
        >
          𝄞
        </text>
      )}
      {clef === 'bass' && (
        <text
          x="8" y="77"
          fontSize="50"
          fill="#d4a017"
          fontFamily="'Times New Roman', Georgia, serif"
          style={{ userSelect: 'none' }}
        >
          𝄢
        </text>
      )}

      {/* Ledger lines */}
      {ledgerPositions.map(pos => (
        <line
          key={pos}
          x1={NOTE_X - 16} y1={noteY(pos)}
          x2={NOTE_X + 16} y2={noteY(pos)}
          stroke="#888" strokeWidth="1.3"
        />
      ))}

      {/* Accidental */}
      {accidental === 'sharp' && (
        <text x={NOTE_X - 22} y={ny + 4} fontSize="16" fill="#e8e8f0" fontFamily="serif">♯</text>
      )}
      {accidental === 'flat' && (
        <text x={NOTE_X - 20} y={ny + 5} fontSize="18" fill="#e8e8f0" fontFamily="serif">♭</text>
      )}

      {/* Note head (whole note) */}
      <ellipse
        cx={NOTE_X} cy={ny}
        rx={8.5} ry={5.5}
        fill="none"
        stroke={highlight}
        strokeWidth="2.8"
      />
    </svg>
  )
}

// A static reference staff showing all notes labeled
export function StaffReference({ clef = 'treble' }) {
  const linePositions = [0, 2, 4, 6, 8]

  const trebleNotes = [
    { staffPos: -2, name: 'Do', sub: '(ledger)' },
    { staffPos: -1, name: 'Ré', sub: '' },
    { staffPos: 0,  name: 'Mi', sub: 'L1' },
    { staffPos: 1,  name: 'Fa', sub: 'E1' },
    { staffPos: 2,  name: 'Sol',sub: 'L2' },
    { staffPos: 3,  name: 'La', sub: 'E2' },
    { staffPos: 4,  name: 'Si', sub: 'L3' },
    { staffPos: 5,  name: 'Do', sub: 'E3' },
    { staffPos: 6,  name: 'Ré', sub: 'L4' },
    { staffPos: 7,  name: 'Mi', sub: 'E4' },
    { staffPos: 8,  name: 'Fa', sub: 'L5' },
  ]

  const bassNotes = [
    { staffPos: 0,  name: 'Sol', sub: 'L1' },
    { staffPos: 1,  name: 'La',  sub: 'E1' },
    { staffPos: 2,  name: 'Si',  sub: 'L2' },
    { staffPos: 3,  name: 'Do',  sub: 'E2' },
    { staffPos: 4,  name: 'Ré',  sub: 'L3' },
    { staffPos: 5,  name: 'Mi',  sub: 'E3' },
    { staffPos: 6,  name: 'Fa',  sub: 'L4' },
    { staffPos: 7,  name: 'Sol', sub: 'E4' },
    { staffPos: 8,  name: 'La',  sub: 'L5' },
    { staffPos: 9,  name: 'Si',  sub: '' },
    { staffPos: 10, name: 'Do',  sub: '(ledger)' },
  ]

  const notes = clef === 'treble' ? trebleNotes : bassNotes
  const LEFT = 52
  const RIGHT = 380
  const SPACING = 28

  return (
    <svg viewBox="0 0 400 120" className="w-full block">
      {/* Staff lines */}
      {linePositions.map(pos => (
        <line key={pos} x1={LEFT} y1={noteY(pos)} x2={RIGHT} y2={noteY(pos)} stroke="#666" strokeWidth="1.2" />
      ))}

      {/* Clef */}
      {clef === 'treble' && (
        <text x="4" y="96" fontSize="72" fill="#d4a017" fontFamily="'Times New Roman', Georgia, serif" style={{ userSelect: 'none' }}>𝄞</text>
      )}
      {clef === 'bass' && (
        <text x="6" y="77" fontSize="50" fill="#d4a017" fontFamily="'Times New Roman', Georgia, serif" style={{ userSelect: 'none' }}>𝄢</text>
      )}

      {/* Each note */}
      {notes.map((note, i) => {
        const x = LEFT + 16 + i * SPACING
        const y = noteY(note.staffPos)
        const isLine = note.staffPos % 2 === 0
        const isOutside = note.staffPos < 0 || note.staffPos > 8

        return (
          <g key={i}>
            {/* Ledger line if needed */}
            {isOutside && isLine && (
              <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke="#777" strokeWidth="1.2" />
            )}
            {/* Note dot */}
            <circle cx={x} cy={y} r={4} fill="#e8d080" />
            {/* Note name */}
            <text x={x} y={y - 10} textAnchor="middle" fontSize="8.5" fill="#d4a017" fontWeight="bold">
              {note.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
