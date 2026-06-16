import { useState, useRef } from 'react'
import Keyboard from '../components/Keyboard.jsx'
import { STYLE_PROGRESSIONS, KEYS, NOTE_FR, degreeToChord, SCALES } from '../utils/music.js'
import { playProgression, playChord } from '../utils/audio.js'

const MAJOR_KEYS = KEYS.filter(k => !k.minor).slice(0, 12)
const MINOR_KEYS = KEYS.filter(k => k.minor).slice(0, 12)

export default function Progressions() {
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PROGRESSIONS[0].id)
  const [rootClass, setRootClass] = useState(2) // D
  const [bpm, setBpm] = useState(72)
  const [playingIdx, setPlayingIdx] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const stopRef = useRef(null)

  const style = STYLE_PROGRESSIONS.find(s => s.id === selectedStyle)
  const needsMinor = style.progression.some(p => p.scale === 'minor')
  const displayKeys = needsMinor ? MINOR_KEYS : MAJOR_KEYS

  // Build resolved chords for current root
  const resolvedChords = style.progression.map(p => {
    const isMinor = p.scale === 'minor'
    const chord = degreeToChord(p.degree, rootClass, isMinor ? 'minor' : 'major')
    return { ...chord, bars: p.bars, label: p.label }
  })

  // For keyboard: highlight current playing chord
  const currentChord = playingIdx !== null ? resolvedChords[playingIdx] : null
  const noteColors = {}
  if (currentChord) {
    currentChord.noteClasses.forEach(nc => {
      noteColors[nc] = currentChord.color
    })
  }

  function handlePlay() {
    if (isPlaying) {
      if (stopRef.current) stopRef.current()
      setIsPlaying(false)
      setPlayingIdx(null)
      return
    }

    setIsPlaying(true)
    const stop = playProgression(resolvedChords, bpm, (idx) => {
      setPlayingIdx(idx)
    })
    stopRef.current = stop

    // Auto-stop after progression ends
    const totalDuration = resolvedChords.reduce((acc, c) => acc + (c.bars || 1), 0) * (60 / bpm) * 4 * 1000
    setTimeout(() => {
      setIsPlaying(false)
      setPlayingIdx(null)
    }, totalDuration + 500)
  }

  function handleChordClick(chord) {
    playChord(chord.midiNotes, 1.8)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Progressions harmoniques
        </h2>
        <p className="text-gray-400 text-sm">
          Enchaînements typiques par contexte liturgique. Choisis un style et joue-le dans ta tonalité.
        </p>
      </div>

      {/* Style selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {STYLE_PROGRESSIONS.map(s => (
          <button
            key={s.id}
            onClick={() => { setSelectedStyle(s.id); setPlayingIdx(null); setIsPlaying(false) }}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedStyle === s.id
                ? 'text-black font-medium'
                : 'bg-[#1a1a2e] border-[#2a2a4a] text-gray-300 hover:border-[#3a3a6a] hover:bg-[#1e1e35]'
            }`}
            style={selectedStyle === s.id ? { backgroundColor: s.color, borderColor: s.color } : {}}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="font-medium text-xs leading-tight">{s.name}</div>
          </button>
        ))}
      </div>

      {/* Selected style header */}
      <div
        className="rounded-xl p-5 mb-5"
        style={{ backgroundColor: `${style.color}20`, border: `1px solid ${style.color}40` }}
      >
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              <span>{style.icon}</span>
              {style.name}
            </h3>
            <p className="text-gray-300 text-sm mt-1">{style.description}</p>
          </div>
          <div className="text-right text-xs text-gray-400 space-y-1">
            <div>⏱️ {style.tempo}</div>
            <div>🎹 {style.registration}</div>
          </div>
        </div>

        {style.keyRecommendations && (
          <div className="mt-3">
            <span className="text-xs text-gray-500">Tonalités recommandées : </span>
            {style.keyRecommendations.map(k => (
              <span key={k} className="text-xs mr-2" style={{ color: style.color }}>{k}</span>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5 mb-5">
        <div className="flex flex-wrap items-end gap-4 mb-4">
          {/* Key selector */}
          <div className="flex-1 min-w-48">
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Tonalité
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {displayKeys.slice(0, 8).map(key => (
                <button
                  key={`${key.root}-${key.minor}`}
                  onClick={() => setRootClass(key.root)}
                  className={`py-1.5 rounded text-xs font-medium transition-colors ${
                    rootClass === key.root
                      ? 'text-black font-semibold'
                      : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
                  }`}
                  style={rootClass === key.root ? { backgroundColor: style.color } : {}}
                >
                  {key.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* BPM */}
          <div className="min-w-40">
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Tempo — {bpm} ♩/min
            </label>
            <input
              type="range"
              min="40"
              max="120"
              value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Lent (40)</span>
              <span>Vif (120)</span>
            </div>
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={handlePlay}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
            isPlaying
              ? 'bg-red-800 text-red-200 hover:bg-red-700'
              : 'text-black hover:scale-[1.01] hover:brightness-110'
          }`}
          style={!isPlaying ? { backgroundColor: style.color } : {}}
        >
          {isPlaying ? '⏹ Arrêter' : '▶ Jouer la progression'}
        </button>
      </div>

      {/* Chord cards sequence */}
      <div className="mb-5">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
          Séquence d'accords — {NOTE_FR[rootClass]}
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {resolvedChords.map((chord, idx) => (
            <button
              key={idx}
              onClick={() => handleChordClick(chord)}
              className={`flex-shrink-0 rounded-xl border p-3 text-center transition-all min-w-20 ${
                playingIdx === idx
                  ? 'scale-110'
                  : 'border-[#2a2a4a] hover:border-[#3a3a6a] bg-[#1a1a2e]'
              }`}
              style={playingIdx === idx
                ? { borderColor: chord.color, backgroundColor: `${chord.color}25`, boxShadow: `0 0 20px ${chord.color}50` }
                : {}
              }
            >
              <div
                className="w-8 h-8 rounded-lg mx-auto flex items-center justify-center font-bold text-sm text-black mb-1.5"
                style={{ backgroundColor: chord.color }}
              >
                {chord.degree}
              </div>
              <div className="text-white text-xs font-medium">{NOTE_FR[chord.rootClass]}</div>
              <div className="text-gray-500 text-xs">{chord.type === 'm' ? 'min' : chord.type === 'M' ? 'maj' : chord.type}</div>
              {chord.label && (
                <div className="text-xs mt-1 opacity-60" style={{ color: chord.color }}>{chord.label}</div>
              )}
            </button>
          ))}

          {/* Arrow showing return to I */}
          <div className="flex-shrink-0 flex items-center px-2 text-gray-600">
            → I
          </div>
        </div>
      </div>

      {/* Keyboard */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5 mb-5">
        <h3 className="text-white font-semibold mb-3 text-sm">
          {currentChord
            ? `Accord en cours : ${currentChord.degree} — ${currentChord.name}`
            : 'Clavier — accord actif en surbrillance pendant la lecture'}
        </h3>
        <Keyboard
          activeNotes={currentChord ? currentChord.noteClasses : []}
          noteColors={noteColors}
        />
      </div>

      {/* Tips */}
      <div
        className="rounded-xl p-5"
        style={{ backgroundColor: `${style.color}15`, border: `1px solid ${style.color}30` }}
      >
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
          <span>💡</span> Conseils pour ce style
        </h3>
        <ul className="space-y-2">
          {style.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
              <span style={{ color: style.color }} className="mt-0.5 flex-shrink-0">→</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
