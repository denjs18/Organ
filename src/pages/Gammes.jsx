import { useState } from 'react'
import Keyboard from '../components/Keyboard.jsx'
import { NOTE_FR, SCALES, getScaleNotes, KEYS } from '../utils/music.js'
import { playScale, playNote } from '../utils/audio.js'

const MAJOR_KEYS = KEYS.filter(k => !k.minor).slice(0, 12)
const MINOR_KEYS = KEYS.filter(k => k.minor).slice(0, 12)

const SCALE_TYPES = Object.entries(SCALES).map(([key, val]) => ({ key, ...val }))

export default function Gammes() {
  const [rootClass, setRootClass] = useState(0) // C
  const [scaleType, setScaleType] = useState('major')
  const [isMinorKey, setIsMinorKey] = useState(false)

  const scaleNotes = getScaleNotes(rootClass, scaleType)
  const scale = SCALES[scaleType]

  // Build noteColors: every note in the scale gets the scale color
  const noteColors = {}
  scaleNotes.forEach(n => {
    noteColors[n] = scale.color
  })

  function handlePlayScale() {
    // Build MIDI scale notes starting at C4 area
    const baseMidi = rootClass <= 5 ? 60 + rootClass : 48 + rootClass
    const midiNotes = SCALES[scaleType].intervals.map(i => baseMidi + i)
    playScale(midiNotes)
  }

  function handleKeySelect(key) {
    setRootClass(key.root)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Gammes & Modes
        </h2>
        <p className="text-gray-400 text-sm">
          Choisis une tonalité et un mode — les touches s'illuminent sur le clavier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Key selection */}
        <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
            Tonalité
          </h3>

          {/* Major/Minor toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => { setIsMinorKey(false); setScaleType('major') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isMinorKey ? 'bg-[#d4a017] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
              }`}
            >
              Majeures
            </button>
            <button
              onClick={() => { setIsMinorKey(true); setScaleType('minor') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                isMinorKey ? 'bg-[#6a9fd8] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
              }`}
            >
              Mineures
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(isMinorKey ? MINOR_KEYS : MAJOR_KEYS).map(key => (
              <button
                key={`${key.root}-${key.minor}`}
                onClick={() => handleKeySelect(key)}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  rootClass === key.root
                    ? 'text-black font-semibold scale-105'
                    : 'bg-[#242442] text-gray-300 hover:bg-[#2a2a55]'
                }`}
                style={rootClass === key.root ? { backgroundColor: scale.color } : {}}
              >
                {key.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode selection */}
        <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
            Mode
          </h3>
          <div className="space-y-2">
            {SCALE_TYPES.map(s => (
              <button
                key={s.key}
                onClick={() => setScaleType(s.key)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  scaleType === s.key
                    ? 'text-black font-medium'
                    : 'bg-[#242442] text-gray-300 hover:bg-[#2a2a55]'
                }`}
                style={scaleType === s.key ? { backgroundColor: s.color } : {}}
              >
                <div className="font-medium text-sm">{s.name}</div>
                <div className={`text-xs mt-0.5 ${scaleType === s.key ? 'text-black/70' : 'text-gray-500'}`}>
                  {s.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current scale info */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">
              {NOTE_FR[rootClass]} <span style={{ color: scale.color }}>{scale.name}</span>
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">{scale.description}</p>
          </div>
          <button
            onClick={handlePlayScale}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-black text-sm transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: scale.color }}
          >
            ▶ Entendre la gamme
          </button>
        </div>

        {/* Notes display */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scaleNotes.map((noteClass, idx) => (
            <button
              key={idx}
              onClick={() => {
                const baseMidi = noteClass <= 5 ? 60 + noteClass : 48 + noteClass
                playNote(baseMidi + (idx > 3 ? 12 : 0), 0.8)
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-black transition-transform hover:scale-110"
              style={{ backgroundColor: scale.color }}
            >
              {NOTE_FR[noteClass]}
              <span className="ml-1 text-xs opacity-70">
                {idx === 0 ? '(I)' : idx === 2 ? '(III)' : idx === 4 ? '(V)' : ''}
              </span>
            </button>
          ))}
        </div>

        {/* Scale intervals explanation */}
        <div className="bg-[#0f0f1a] rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-2">Intervalles (tons/demi-tons) :</p>
          <div className="flex items-center gap-1 flex-wrap">
            {SCALES[scaleType].intervals.slice(1).map((interval, idx) => {
              const prev = SCALES[scaleType].intervals[idx]
              const diff = interval - prev
              return (
                <span key={idx} className={`text-xs px-2 py-0.5 rounded ${
                  diff === 1 ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'
                }`}>
                  {diff === 1 ? '½' : diff === 2 ? '1T' : '1½'}
                </span>
              )
            })}
          </div>
          <p className="text-xs text-gray-600 mt-2">½ = demi-ton (petite seconde)  •  1T = ton</p>
        </div>
      </div>

      {/* Keyboard */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
          Clavier — notes de la gamme en surbrillance
        </h3>
        <Keyboard
          activeNotes={scaleNotes}
          noteColors={noteColors}
        />
        <div className="mt-3 flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: scale.color }}
          />
          <span className="text-xs text-gray-400">
            = notes de {NOTE_FR[rootClass]} {scale.name}
          </span>
        </div>
      </div>
    </div>
  )
}
