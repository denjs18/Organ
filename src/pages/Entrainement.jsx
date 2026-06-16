import { useState, useEffect, useRef } from 'react'
import { PRACTICE_OCCASIONS, PRACTICE_KEYS, STYLE_PROGRESSIONS, NOTE_FR, SCALES } from '../utils/music.js'

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatTime(sec) {
  return `${pad(Math.floor(sec / 60))}:${pad(sec % 60)}`
}

const DURATIONS = [
  { label: '1 min', seconds: 60 },
  { label: '2 min', seconds: 120 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
]

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateContext() {
  const occasion = randomFrom(PRACTICE_OCCASIONS)
  const key = randomFrom(PRACTICE_KEYS)
  const style = STYLE_PROGRESSIONS.find(s => s.id === occasion.style) || STYLE_PROGRESSIONS[0]
  const scaleType = occasion.style === 'communion-meditation' ? 'dorian' : key.minor ? 'minor' : 'major'
  const scale = SCALES[scaleType]

  return {
    occasion,
    key,
    style,
    scaleType,
    scale,
    mood: occasion.mood,
    progression: style.progression,
    registration: style.registration,
    tip: randomFrom(style.tips),
  }
}

export default function Entrainement() {
  const [context, setContext] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | ready | playing | done
  const [duration, setDuration] = useState(120)
  const [remaining, setRemaining] = useState(120)
  const [notes, setNotes] = useState('')
  const [sessions, setSessions] = useState([])
  const intervalRef = useRef(null)

  function newContext() {
    setContext(generateContext())
    setPhase('ready')
    setNotes('')
    setRemaining(duration)
  }

  function startSession() {
    setPhase('playing')
    setRemaining(duration)
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setPhase('done')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function stopEarly() {
    clearInterval(intervalRef.current)
    setPhase('done')
  }

  function saveAndNew() {
    if (context) {
      setSessions(prev => [{
        ...context,
        notes,
        date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      }, ...prev].slice(0, 5))
    }
    newContext()
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  const progress = duration > 0 ? ((duration - remaining) / duration) * 100 : 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Entraînement
        </h2>
        <p className="text-gray-400 text-sm">
          Tirage aléatoire d'un contexte d'improvisation. Joue, puis réfléchis.
        </p>
      </div>

      {phase === 'idle' && (
        <div className="text-center py-12">
          <div className="text-6xl mb-5">🎹</div>
          <h3 className="text-white text-xl font-semibold mb-2">Prêt à improviser ?</h3>
          <p className="text-gray-400 mb-6 text-sm max-w-xs mx-auto">
            Un contexte aléatoire te sera donné. Tu improviseras pendant la durée choisie,
            puis tu noteras ce qui a marché.
          </p>

          {/* Duration selector */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Durée de la session</p>
            <div className="flex gap-2 justify-center">
              {DURATIONS.map(d => (
                <button
                  key={d.seconds}
                  onClick={() => { setDuration(d.seconds); setRemaining(d.seconds) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    duration === d.seconds
                      ? 'bg-[#d4a017] text-black'
                      : 'bg-[#1a1a2e] border border-[#2a2a4a] text-gray-300 hover:border-[#3a3a6a]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={newContext}
            className="bg-[#d4a017] text-black px-8 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all hover:scale-105"
          >
            🎲 Tirer un contexte
          </button>
        </div>
      )}

      {(phase === 'ready' || phase === 'playing' || phase === 'done') && context && (
        <div className="space-y-4">
          {/* Context card */}
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: `${context.style.color}20`,
              border: `2px solid ${context.style.color}60`
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs uppercase tracking-wide mb-1" style={{ color: context.style.color }}>
                  Contexte d'improvisation
                </div>
                <h3 className="text-white font-bold text-xl">{context.occasion.name}</h3>
              </div>
              <span className="text-3xl">{context.style.icon}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Tonalité</div>
                <div className="text-white font-semibold">
                  {context.key.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: context.scale.color }}>
                  {context.scale.name}
                </div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Ambiance</div>
                <div className="text-white font-semibold capitalize">{context.mood}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Progression suggérée</div>
                <div className="text-white font-mono text-sm">{context.progression}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Registration</div>
                <div className="text-white text-xs leading-relaxed">
                  {context.registration.split('+')[0].trim()}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 text-sm">
              <span style={{ color: context.style.color }}>💡</span>
              <span className="text-gray-200 italic">{context.tip}</span>
            </div>
          </div>

          {/* Timer */}
          {phase === 'ready' && (
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">
                Prends quelques secondes pour lire le contexte, puis lance le minuteur.
              </p>
              <button
                onClick={startSession}
                className="bg-[#d4a017] text-black px-8 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all hover:scale-105"
              >
                ▶ Commencer — {formatTime(duration)}
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-6 text-center">
              <div className="font-mono text-5xl font-bold mb-4" style={{
                color: remaining < 30 ? '#d4524a' : remaining < 60 ? '#e07a40' : '#d4a017'
              }}>
                {formatTime(remaining)}
              </div>

              {/* Progress bar */}
              <div className="bg-[#0f0f1a] rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: remaining < 30 ? '#d4524a' : '#d4a017'
                  }}
                />
              </div>

              <p className="text-gray-400 text-sm mb-4">
                {remaining > duration / 2
                  ? 'Installe la tonalité — joue les accords principaux doucement d\'abord.'
                  : remaining > 30
                  ? 'Développe ton improvisation — varie, explore !'
                  : 'Prépare ta conclusion — reviens vers I.'}
              </p>

              <button
                onClick={stopEarly}
                className="px-6 py-2 rounded-lg border border-red-800 text-red-400 text-sm hover:bg-red-900/30 transition-colors"
              >
                ⏹ Arrêter
              </button>
            </div>
          )}

          {phase === 'done' && (
            <div className="space-y-4">
              <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
                <h3 className="text-white font-semibold mb-1">🎯 Session terminée !</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Prends un moment pour noter ce qui s'est passé. C'est en réfléchissant qu'on progresse.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">
                      Qu'est-ce qui a bien marché ?
                    </label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Ex: la progression I–IV–V sonnait bien, j'ai trouvé une mélodie..."
                      className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-[#d4a017]"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={saveAndNew}
                    className="flex-1 bg-[#d4a017] text-black py-3 rounded-xl font-semibold text-sm hover:brightness-110 transition-all"
                  >
                    🎲 Nouveau contexte
                  </button>
                  <button
                    onClick={() => { setPhase('ready'); setRemaining(duration) }}
                    className="px-4 py-3 rounded-xl border border-[#2a2a4a] text-gray-300 text-sm hover:border-[#3a3a6a] transition-colors"
                  >
                    🔄 Rejouer ce contexte
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Change context link */}
          {phase !== 'playing' && (
            <div className="text-center">
              <button
                onClick={newContext}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                ↻ Tirer un autre contexte
              </button>
            </div>
          )}
        </div>
      )}

      {/* Session history */}
      {sessions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
            Sessions récentes ({sessions.length})
          </h3>
          <div className="space-y-2">
            {sessions.map((s, i) => (
              <div key={i} className="bg-[#1a1a2e] rounded-lg border border-[#2a2a4a] p-3 flex items-start gap-3">
                <span className="text-lg">{s.style.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">{s.occasion.name}</div>
                  <div className="text-xs text-gray-500">{s.key.label} · {s.date}</div>
                  {s.notes && (
                    <div className="text-xs text-gray-400 mt-1 italic truncate">{s.notes}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips section */}
      <div className="mt-8 bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
        <h3 className="text-white font-semibold mb-3 text-sm">
          📌 Comment utiliser l'entraînement efficacement
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start gap-2">
            <span className="text-[#d4a017]">1.</span>
            <p>Fais <strong className="text-white">5–10 minutes</strong> d'entraînement par session d'orgue, avant de jouer des partitions.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#d4a017]">2.</span>
            <p>Ne t'arrête jamais en cours de session — même si tu te perds, <strong className="text-white">continue à jouer</strong>. Le fait de ne pas s'arrêter est une compétence à développer.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#d4a017]">3.</span>
            <p>Commence par les tonalités faciles (Do, Sol, Ré, Fa) avant de varier.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#d4a017]">4.</span>
            <p>Note tes réflexions — c'est elles qui ancrent les progrès dans la durée.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
