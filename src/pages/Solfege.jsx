import { useState, useCallback } from 'react'
import Staff, { StaffReference } from '../components/Staff.jsx'
import { NOTE_FR, CHORD_INTERVALS } from '../utils/music.js'
import { playNote, playChord } from '../utils/audio.js'

// ─── Note definitions ─────────────────────────────────────────────────────────

// Treble clef notes (clé de Sol) — staffPos relative to E4 (line 1 = pos 0)
const TREBLE_LINES = [
  { midi: 60, name: 'Do',  octave: 4, staffPos: -2, clef: 'treble', hint: 'Ligne supplémentaire sous la portée — le Do du milieu' },
  { midi: 64, name: 'Mi',  octave: 4, staffPos: 0,  clef: 'treble', hint: '1ère ligne (la plus basse)' },
  { midi: 67, name: 'Sol', octave: 4, staffPos: 2,  clef: 'treble', hint: '2e ligne — la clé de Sol "entoure" cette ligne' },
  { midi: 71, name: 'Si',  octave: 4, staffPos: 4,  clef: 'treble', hint: '3e ligne (celle du milieu)' },
  { midi: 74, name: 'Ré',  octave: 5, staffPos: 6,  clef: 'treble', hint: '4e ligne' },
  { midi: 77, name: 'Fa',  octave: 5, staffPos: 8,  clef: 'treble', hint: '5e ligne (la plus haute)' },
]

const TREBLE_ALL = [
  ...TREBLE_LINES,
  { midi: 62, name: 'Ré',  octave: 4, staffPos: -1, clef: 'treble', hint: 'Espace sous la 1ère ligne' },
  { midi: 65, name: 'Fa',  octave: 4, staffPos: 1,  clef: 'treble', hint: '1er espace' },
  { midi: 69, name: 'La',  octave: 4, staffPos: 3,  clef: 'treble', hint: '2e espace' },
  { midi: 72, name: 'Do',  octave: 5, staffPos: 5,  clef: 'treble', hint: '3e espace' },
  { midi: 76, name: 'Mi',  octave: 5, staffPos: 7,  clef: 'treble', hint: '4e espace' },
]

// Bass clef notes (clé de Fa) — staffPos relative to G2 (line 1 = pos 0)
const BASS_LINES = [
  { midi: 43, name: 'Sol', octave: 2, staffPos: 0,  clef: 'bass', hint: '1ère ligne (la plus basse)' },
  { midi: 47, name: 'Si',  octave: 2, staffPos: 2,  clef: 'bass', hint: '2e ligne' },
  { midi: 50, name: 'Ré',  octave: 3, staffPos: 4,  clef: 'bass', hint: '3e ligne (milieu) — le Ré' },
  { midi: 53, name: 'Fa',  octave: 3, staffPos: 6,  clef: 'bass', hint: '4e ligne — le Fa de la clé de Fa' },
  { midi: 57, name: 'La',  octave: 3, staffPos: 8,  clef: 'bass', hint: '5e ligne (la plus haute)' },
  { midi: 60, name: 'Do',  octave: 4, staffPos: 10, clef: 'bass', hint: 'Ligne supplémentaire au-dessus — le Do du milieu' },
]

const BASS_ALL = [
  ...BASS_LINES,
  { midi: 45, name: 'La',  octave: 2, staffPos: 1,  clef: 'bass', hint: '1er espace' },
  { midi: 48, name: 'Do',  octave: 3, staffPos: 3,  clef: 'bass', hint: '2e espace' },
  { midi: 52, name: 'Mi',  octave: 3, staffPos: 5,  clef: 'bass', hint: '3e espace' },
  { midi: 55, name: 'Sol', octave: 3, staffPos: 7,  clef: 'bass', hint: '4e espace' },
  { midi: 59, name: 'Si',  octave: 3, staffPos: 9,  clef: 'bass', hint: 'Espace au-dessus de la 5e ligne' },
]

const NOTE_NAMES_7 = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si']

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function pickDistractors(correct, count = 3) {
  const others = NOTE_NAMES_7.filter(n => n !== correct)
  return shuffle(others).slice(0, count)
}

function randomNote(noteSet) {
  return noteSet[Math.floor(Math.random() * noteSet.length)]
}

// ─── Exercise: Note Reading ────────────────────────────────────────────────────

function NoteReadingExercise({ noteSet, title }) {
  const [current, setCurrent] = useState(() => randomNote(noteSet))
  const [choices, setChoices] = useState(() => shuffle([current.name, ...pickDistractors(current.name)]))
  const [answered, setAnswered] = useState(null) // null | 'correct' | 'wrong'
  const [wrongChoice, setWrongChoice] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)

  function nextNote() {
    const n = randomNote(noteSet)
    setCurrent(n)
    setChoices(shuffle([n.name, ...pickDistractors(n.name)]))
    setAnswered(null)
    setWrongChoice(null)
    setShowHint(false)
  }

  function handleAnswer(choice) {
    if (answered) return
    playNote(current.midi, 0.8)
    if (choice === current.name) {
      setAnswered('correct')
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }))
      setStreak(s => s + 1)
    } else {
      setAnswered('wrong')
      setWrongChoice(choice)
      setScore(s => ({ ...s, total: s.total + 1 }))
      setStreak(0)
    }
  }

  const pct = score.total > 0 ? Math.round(score.correct / score.total * 100) : 0

  return (
    <div>
      {/* Score bar */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="text-gray-400">
          Score : <span className="text-white font-semibold">{score.correct}/{score.total}</span>
          {score.total > 0 && (
            <span className={`ml-2 ${pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {pct}%
            </span>
          )}
        </div>
        {streak >= 3 && (
          <div className="text-yellow-400 text-xs font-medium">
            🔥 {streak} bonnes réponses d'affilée !
          </div>
        )}
      </div>

      {/* Staff display */}
      <div className="bg-[#0f0f1a] rounded-xl border border-[#2a2a4a] p-4 mb-4">
        <Staff
          clef={current.clef}
          staffPos={current.staffPos}
          highlight={answered === 'correct' ? '#4aab7a' : answered === 'wrong' ? '#d4524a' : '#f0f0e8'}
        />
      </div>

      {/* Question */}
      <p className="text-center text-gray-300 text-sm mb-4">
        Comment s'appelle cette note ?
        {answered === null && (
          <button
            onClick={() => { setShowHint(true); playNote(current.midi, 0.8) }}
            className="ml-3 text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            🔊 Écouter • 💡 Indice
          </button>
        )}
      </p>

      {showHint && answered === null && (
        <div className="text-center text-xs text-yellow-400 mb-3 italic">
          {current.hint}
        </div>
      )}

      {/* Choice buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {choices.map(choice => {
          let bg = 'bg-[#242442] border-[#2a2a4a] text-gray-200 hover:bg-[#2a2a55]'
          if (answered) {
            if (choice === current.name) {
              bg = 'bg-green-800 border-green-600 text-green-200'
            } else if (choice === wrongChoice) {
              bg = 'bg-red-900 border-red-700 text-red-200'
            } else {
              bg = 'bg-[#1a1a2e] border-[#2a2a4a] text-gray-500'
            }
          }
          return (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              disabled={!!answered}
              className={`border rounded-xl py-3 font-semibold text-sm transition-all ${bg} ${!answered ? 'hover:scale-105 active:scale-95' : ''}`}
            >
              {choice}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {answered === 'correct' && (
        <div className="text-center mb-4">
          <p className="text-green-400 font-semibold mb-1">✓ Correct ! C'est bien {current.name} ({current.octave}e octave)</p>
          <p className="text-xs text-gray-500">{current.hint}</p>
        </div>
      )}
      {answered === 'wrong' && (
        <div className="text-center mb-4">
          <p className="text-red-400 font-semibold mb-1">✗ Raté — c'était {current.name} ({current.octave}e octave)</p>
          <p className="text-xs text-gray-400">{current.hint}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={nextNote}
          className="w-full bg-[#d4a017] text-black py-3 rounded-xl font-semibold hover:brightness-110 transition-all"
        >
          Note suivante →
        </button>
      )}
    </div>
  )
}

// ─── Exercise: Major or Minor ─────────────────────────────────────────────────

function MajorMinorExercise() {
  const [playing, setPlaying] = useState(false)
  const [answered, setAnswered] = useState(null)
  const [correct, setCorrect] = useState(null)
  const [rootClass, setRootClass] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [streak, setStreak] = useState(0)

  function generateAndPlay() {
    const root = Math.floor(Math.random() * 12)
    const isMinor = Math.random() > 0.5
    const intervals = isMinor ? CHORD_INTERVALS.m : CHORD_INTERVALS.M
    const baseMidi = root + 60 // root in octave 4
    const notes = intervals.map(i => baseMidi + i)

    setRootClass(root)
    setCorrect(isMinor ? 'minor' : 'major')
    setAnswered(null)
    setPlaying(true)
    playChord(notes, 2.5)
    setTimeout(() => setPlaying(false), 500)
  }

  function handleAnswer(choice) {
    if (!correct || answered) return
    const isRight = choice === correct
    setAnswered(choice)
    if (isRight) {
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }))
      setStreak(s => s + 1)
    } else {
      setScore(s => ({ ...s, total: s.total + 1 }))
      setStreak(0)
    }
  }

  const pct = score.total > 0 ? Math.round(score.correct / score.total * 100) : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="text-gray-400">
          Score : <span className="text-white font-semibold">{score.correct}/{score.total}</span>
          {score.total > 0 && (
            <span className={`ml-2 ${pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {pct}%
            </span>
          )}
        </div>
        {streak >= 3 && <div className="text-yellow-400 text-xs">🔥 {streak} bonnes d'affilée !</div>}
      </div>

      {/* Play button */}
      <div className="text-center mb-6">
        <button
          onClick={generateAndPlay}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
            playing
              ? 'bg-[#d4a017]/50 text-black cursor-wait'
              : 'bg-[#d4a017] text-black hover:brightness-110 hover:scale-105'
          }`}
        >
          {playing ? '♪ En cours...' : correct ? '▶ Réécouter' : '▶ Écouter l\'accord'}
        </button>
        {correct && (
          <button
            onClick={generateAndPlay}
            className="ml-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Nouvel accord
          </button>
        )}
      </div>

      {correct && (
        <>
          <p className="text-center text-gray-300 text-sm mb-4">
            Cet accord est-il <strong className="text-white">majeur</strong> ou <strong className="text-white">mineur</strong> ?
          </p>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {[
              { value: 'major', label: '☀️ Majeur', color: '#d4a017', desc: 'Lumineux, joyeux' },
              { value: 'minor', label: '🌙 Mineur', color: '#6a9fd8', desc: 'Sombre, intérieur' },
            ].map(opt => {
              let bg = ''
              if (answered) {
                if (opt.value === correct) bg = 'border-green-500 bg-green-900/40 text-green-200'
                else if (opt.value === answered) bg = 'border-red-500 bg-red-900/40 text-red-300'
                else bg = 'border-[#2a2a4a] bg-[#1a1a2e] text-gray-500'
              } else {
                bg = 'border-[#2a2a4a] bg-[#1a1a2e] text-white hover:border-[#3a3a6a] hover:scale-[1.02]'
              }
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  disabled={!!answered}
                  className={`border-2 rounded-xl p-5 transition-all ${bg}`}
                >
                  <div className="text-2xl mb-1">{opt.label.split(' ')[0]}</div>
                  <div className="font-semibold">{opt.label.split(' ')[1]}</div>
                  <div className="text-xs opacity-70 mt-1">{opt.desc}</div>
                </button>
              )
            })}
          </div>

          {answered && (
            <div className={`rounded-xl p-4 text-center mb-4 ${
              answered === correct ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'
            }`}>
              {answered === correct ? (
                <p className="text-green-300 font-semibold">✓ Exact ! C'était bien {correct === 'major' ? 'majeur' : 'mineur'}.</p>
              ) : (
                <p className="text-red-300 font-semibold">✗ C'était {correct === 'major' ? 'majeur' : 'mineur'}.</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {correct === 'major'
                  ? 'Indice : le majeur a une tierce de 4 demi-tons (plus "ouverte")'
                  : 'Indice : le mineur a une tierce de 3 demi-tons (plus "serrée", plus grave dans la couleur)'}
              </p>
            </div>
          )}

          {answered && (
            <button
              onClick={generateAndPlay}
              className="w-full bg-[#d4a017] text-black py-3 rounded-xl font-semibold hover:brightness-110"
            >
              Accord suivant →
            </button>
          )}
        </>
      )}

      {/* Ear training tip */}
      <div className="mt-4 bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-4">
        <p className="text-sm text-gray-400 mb-2">
          <span className="text-white font-medium">💡 Comment reconnaître :</span>
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
          <div className="bg-yellow-900/20 border border-yellow-800/40 rounded-lg p-3">
            <div className="text-yellow-400 font-semibold mb-1">☀️ Majeur</div>
            <p>Son "ouvert", lumineux, joyeux. Tierce haute (4 demi-tons). Pense à "Jingle Bells".</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg p-3">
            <div className="text-blue-400 font-semibold mb-1">🌙 Mineur</div>
            <p>Son "resserré", sombre, expressif. Tierce basse (3 demi-tons). Pense à "Greensleeves".</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Reference guide ──────────────────────────────────────────────────────────

function ReferenceGuide() {
  const [clef, setClef] = useState('treble')

  const mnemonics = {
    treble: {
      lines: { notes: 'Mi — Sol — Si — Ré — Fa', phrase: '"Mon Sergent Si Réussi Faisait"' },
      spaces: { notes: 'Fa — La — Do — Mi', phrase: '"Fa La Do Mi" → FLDM → "Faudrait Le Dire Mieux"' },
    },
    bass: {
      lines: { notes: 'Sol — Si — Ré — Fa — La', phrase: '"Souvent Si Rude, Faut La Patience"' },
      spaces: { notes: 'La — Do — Mi — Sol', phrase: '"La Douce Musique Sol"' },
    },
  }

  const m = mnemonics[clef]

  return (
    <div className="space-y-5">
      {/* Clef toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setClef('treble')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            clef === 'treble' ? 'bg-[#d4a017] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
          }`}
        >
          🎼 Clé de Sol (main droite)
        </button>
        <button
          onClick={() => setClef('bass')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            clef === 'bass' ? 'bg-[#6a9fd8] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
          }`}
        >
          🎼 Clé de Fa (main gauche)
        </button>
      </div>

      {/* Staff with all notes labeled */}
      <div className="bg-[#0f0f1a] rounded-xl border border-[#2a2a4a] p-4">
        <p className="text-xs text-gray-500 mb-3 text-center">
          Toutes les notes — {clef === 'treble' ? 'Clé de Sol' : 'Clé de Fa'}
        </p>
        <StaffReference clef={clef} />
      </div>

      {/* Mnemonics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
          <h4 className="text-[#d4a017] font-semibold text-sm mb-2">Les 5 lignes</h4>
          <p className="text-white font-medium text-sm mb-2">{m.lines.notes}</p>
          <p className="text-gray-500 text-xs italic">{m.lines.phrase}</p>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
          <h4 className="text-[#6a9fd8] font-semibold text-sm mb-2">Les 4 espaces</h4>
          <p className="text-white font-medium text-sm mb-2">{m.spaces.notes}</p>
          <p className="text-gray-500 text-xs italic">{m.spaces.phrase}</p>
        </div>
      </div>

      {/* Intervals guide */}
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
        <h4 className="text-white font-semibold mb-4">Intervalles courants</h4>
        <div className="space-y-2 text-sm">
          {[
            { name: 'Seconde',  semitones: '1–2',  color: '#e07a40', desc: 'Deux notes adjacentes. Tension douce.',          example: 'Do→Ré' },
            { name: 'Tierce',   semitones: '3–4',  color: '#d4a017', desc: '3=mineure (sombre), 4=majeure (lumineuse).',      example: 'Do→Mi' },
            { name: 'Quarte',   semitones: '5',    color: '#4aab7a', desc: 'Stable et ouverte. Sonne "neutre".',              example: 'Do→Fa' },
            { name: 'Quinte',   semitones: '7',    color: '#6a9fd8', desc: 'Très stable, puissante. Base de l\'harmonie.',    example: 'Do→Sol' },
            { name: 'Sixte',    semitones: '8–9',  color: '#8a6dc8', desc: 'Douce et mélodique. 9=majeure (chaleureuse).',   example: 'Do→La' },
            { name: 'Septième', semitones: '10–11',color: '#d4524a', desc: 'Tendue, instable. Réclame une résolution.',       example: 'Do→Si' },
            { name: 'Octave',   semitones: '12',   color: '#ccc',    desc: 'Même note, registre supérieur. Très stable.',     example: 'Do→Do' },
          ].map(iv => (
            <div key={iv.name} className="flex items-start gap-3 py-2 border-b border-[#1e1e35] last:border-0">
              <div
                className="flex-shrink-0 w-20 text-center py-1 rounded text-xs font-bold text-black"
                style={{ backgroundColor: iv.color }}
              >
                {iv.name}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-300">{iv.desc}</span>
                  <span className="text-gray-600 text-xs flex-shrink-0">{iv.example}</span>
                </div>
              </div>
              <div className="flex-shrink-0 text-right text-xs text-gray-600">
                {iv.semitones} ½
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
        <h4 className="text-white font-semibold text-sm mb-3">💡 Stratégie pour apprendre à lire</h4>
        <ol className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2"><span className="text-[#d4a017]">1.</span>Commence par les 5 <strong className="text-white">lignes</strong> seulement (Mi Sol Si Ré Fa / Sol Si Ré Fa La).</li>
          <li className="flex gap-2"><span className="text-[#d4a017]">2.</span>Puis apprends les <strong className="text-white">espaces</strong> entre les lignes.</li>
          <li className="flex gap-2"><span className="text-[#d4a017]">3.</span>Reviens souvent à la portée visuelle ci-dessus — la répétition ancre les repères.</li>
          <li className="flex gap-2"><span className="text-[#d4a017]">4.</span>Relie chaque note à sa <strong className="text-white">touche sur le clavier</strong> — tu l'as déjà dans les doigts !</li>
          <li className="flex gap-2"><span className="text-[#d4a017]">5.</span>5 à 10 min de lecture quotidienne vaut mieux qu'1h intensive une fois par semaine.</li>
        </ol>
      </div>
    </div>
  )
}

// ─── Main Solfege page ────────────────────────────────────────────────────────

const MODES = [
  { id: 'lecture-sol',  label: 'Notes Clé de Sol', icon: '🎼', color: '#d4a017' },
  { id: 'lecture-fa',   label: 'Notes Clé de Fa',  icon: '🎼', color: '#6a9fd8' },
  { id: 'oreille',      label: 'Majeur / Mineur',  icon: '👂', color: '#4aab7a' },
  { id: 'reference',    label: 'Repères',           icon: '📌', color: '#c0709a' },
]

const LEVELS = [
  { id: 'lines', label: 'Lignes seulement' },
  { id: 'all',   label: 'Lignes + espaces' },
]

export default function Solfege() {
  const [mode, setMode] = useState('lecture-sol')
  const [level, setLevel] = useState('lines')

  const activeMode = MODES.find(m => m.id === mode)

  const noteSet = mode === 'lecture-sol'
    ? (level === 'lines' ? TREBLE_LINES : TREBLE_ALL)
    : (level === 'lines' ? BASS_LINES : BASS_ALL)

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Solfège
        </h2>
        <p className="text-gray-400 text-sm">
          Lecture de notes, oreille harmonique et repères visuels — progressivement, sans pression.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`p-3 rounded-xl border text-sm font-medium transition-all text-center ${
              mode === m.id
                ? 'text-black border-transparent'
                : 'bg-[#1a1a2e] border-[#2a2a4a] text-gray-400 hover:border-[#3a3a6a]'
            }`}
            style={mode === m.id ? { backgroundColor: m.color, borderColor: m.color } : {}}
          >
            <div className="text-xl mb-0.5">{m.icon}</div>
            <div className="leading-tight text-xs">{m.label}</div>
          </button>
        ))}
      </div>

      {/* Level selector for note reading modes */}
      {(mode === 'lecture-sol' || mode === 'lecture-fa') && (
        <div className="flex gap-2 mb-5">
          {LEVELS.map(l => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                level === l.id
                  ? 'text-black font-semibold'
                  : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
              }`}
              style={level === l.id ? { backgroundColor: activeMode.color } : {}}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div
        className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5"
        key={mode + level}
      >
        {mode === 'lecture-sol' && (
          <>
            <h3 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#d4a017' }} />
              Lecture — Clé de Sol (main droite)
            </h3>
            <NoteReadingExercise noteSet={noteSet} />
          </>
        )}
        {mode === 'lecture-fa' && (
          <>
            <h3 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6a9fd8' }} />
              Lecture — Clé de Fa (main gauche)
            </h3>
            <NoteReadingExercise noteSet={noteSet} />
          </>
        )}
        {mode === 'oreille' && <MajorMinorExercise />}
        {mode === 'reference' && <ReferenceGuide />}
      </div>

      {/* Progress reminder */}
      <div className="mt-4 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4 text-xs text-gray-500 text-center">
        Conseil : fais 10 notes par jour → en 2 semaines tu liras couramment les 5 lignes. Puis ajoute les espaces.
      </div>
    </div>
  )
}
