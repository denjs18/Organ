import { useState } from 'react'
import Keyboard from '../components/Keyboard.jsx'
import { NOTE_FR, KEYS, getDiatonicChords, CHORD_TYPE_NAMES } from '../utils/music.js'
import { playChord } from '../utils/audio.js'

const MAJOR_KEYS = KEYS.filter(k => !k.minor).slice(0, 12)
const MINOR_KEYS = KEYS.filter(k => k.minor).slice(0, 12)

export default function Accords() {
  const [rootClass, setRootClass] = useState(0)
  const [isMinor, setIsMinor] = useState(false)
  const [activeChordIdx, setActiveChordIdx] = useState(null)

  const chords = getDiatonicChords(rootClass, isMinor)
  const activeChord = activeChordIdx !== null ? chords[activeChordIdx] : null

  function handleChordClick(idx) {
    const chord = chords[idx]
    setActiveChordIdx(idx)
    playChord(chord.midiNotes, 2.0)
  }

  const noteColors = {}
  if (activeChord) {
    activeChord.noteClasses.forEach(nc => {
      noteColors[nc] = activeChord.color
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Accords
        </h2>
        <p className="text-gray-400 text-sm">
          Clique sur un accord pour l'entendre et le voir sur le clavier.
        </p>
      </div>

      {/* Key selector */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5 mb-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setIsMinor(false); setActiveChordIdx(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              !isMinor ? 'bg-[#d4a017] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
            }`}
          >
            Majeur
          </button>
          <button
            onClick={() => { setIsMinor(true); setActiveChordIdx(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              isMinor ? 'bg-[#6a9fd8] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
            }`}
          >
            Mineur
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {(isMinor ? MINOR_KEYS : MAJOR_KEYS).map(key => (
            <button
              key={`${key.root}-${key.minor}`}
              onClick={() => { setRootClass(key.root); setActiveChordIdx(null) }}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                rootClass === key.root
                  ? 'bg-[#d4a017] text-black font-semibold'
                  : 'bg-[#242442] text-gray-300 hover:bg-[#2a2a55]'
              }`}
            >
              {key.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Chord grid */}
      <div className="mb-6">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3 px-1">
          Accords de {NOTE_FR[rootClass]} {isMinor ? 'mineur' : 'majeur'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {chords.map((chord, idx) => (
            <button
              key={idx}
              onClick={() => handleChordClick(idx)}
              className={`bg-[#1a1a2e] border rounded-xl p-4 text-left transition-all hover:scale-[1.02] ${
                activeChordIdx === idx
                  ? 'scale-[1.02]'
                  : 'border-[#2a2a4a] hover:border-[#3a3a6a]'
              }`}
              style={activeChordIdx === idx ? { borderColor: chord.color, boxShadow: `0 0 16px ${chord.color}40` } : {}}
            >
              {/* Degree badge */}
              <div
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm text-black mb-3"
                style={{ backgroundColor: chord.color }}
              >
                {chord.degree}
              </div>

              <div className="text-white font-medium text-sm leading-tight mb-1">
                {chord.name}
              </div>
              <div className="text-gray-500 text-xs">
                {CHORD_TYPE_NAMES[chord.type]}
              </div>

              {/* Notes preview */}
              <div className="flex gap-1 mt-2 flex-wrap">
                {chord.noteClasses.map((nc, i) => (
                  <span
                    key={i}
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      backgroundColor: `${chord.color}30`,
                      color: chord.color
                    }}
                  >
                    {NOTE_FR[nc]}
                  </span>
                ))}
              </div>

              {/* Play indicator */}
              <div
                className="mt-2 text-xs opacity-70"
                style={{ color: chord.color }}
              >
                {activeChordIdx === idx ? '♪ En cours...' : '▶ Jouer'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard + usage info */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
        {activeChord ? (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">
                  <span style={{ color: activeChord.color }}>{activeChord.degree}</span>
                  {' — '}
                  {activeChord.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{activeChord.usage}</p>
              </div>
              <button
                onClick={() => playChord(activeChord.midiNotes, 2)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-black"
                style={{ backgroundColor: activeChord.color }}
              >
                ▶ Rejouer
              </button>
            </div>
            <Keyboard
              activeNotes={activeChord.noteClasses}
              noteColors={noteColors}
            />
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-3">👆</div>
            <p>Clique sur un accord pour le voir sur le clavier</p>
          </div>
        )}
      </div>

      {/* Quick theory */}
      <div className="mt-4 bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
        <h3 className="text-white font-semibold mb-3 text-sm">
          📌 Les chiffres romains — à quoi ça sert ?
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>Les chiffres <strong className="text-white">I, IV, V</strong> désignent la position d'un accord dans la tonalité. Ainsi :</p>
          <ul className="space-y-1 ml-4">
            <li>• <strong className="text-[#d4a017]">I</strong> = accord de base (tonique) — point de départ et d'arrivée</li>
            <li>• <strong className="text-[#8a6dc8]">IV</strong> = accord d'élévation — donne de l'élan</li>
            <li>• <strong className="text-[#d4524a]">V</strong> = accord de tension — réclame le retour vers I</li>
          </ul>
          <p className="text-gray-400 mt-2">
            La progression <strong className="text-white">I → IV → V → I</strong> est la base de l'improvisation tonal.
            Elle fonctionne dans toutes les tonalités — les couleurs des accords restent identiques.
          </p>
        </div>
      </div>
    </div>
  )
}
