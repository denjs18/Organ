import { useState, useMemo } from 'react'
import { CANTIQUES, PERIODS } from '../data/cantiques.js'
import Keyboard from '../components/Keyboard.jsx'
import { getScaleNotes, SCALES, NOTE_FR } from '../utils/music.js'
import { playChord, playScale } from '../utils/audio.js'

const DIFFICULTY_LABEL = { 1: 'Facile', 2: 'Moyen', 3: 'Avancé' }
const DIFFICULTY_COLOR = { 1: '#4aab7a', 2: '#d4a017', 3: '#d4524a' }
const MODE_LABELS = { major: 'Majeur', minor: 'Mineur', dorian: 'Dorien', mixolydian: 'Mixolydien', modal: 'Modal' }

export default function Cantiques() {
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [selectedMode, setSelectedMode] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [sortBy, setSortBy] = useState('name')

  const filtered = useMemo(() => {
    return CANTIQUES
      .filter(c => !selectedPeriod || c.period.includes(selectedPeriod))
      .filter(c => !selectedMode || c.mode === selectedMode)
      .filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'difficulty') return a.difficulty - b.difficulty
        if (sortBy === 'key') return a.keyClass - b.keyClass
        return 0
      })
  }, [selectedPeriod, selectedMode, searchQuery, sortBy])

  const selected = CANTIQUES.find(c => c.id === selectedId)

  const scaleNotes = selected
    ? getScaleNotes(selected.keyClass, selected.mode === 'dorian' ? 'dorian'
        : selected.mode === 'mixolydian' ? 'mixolydian'
        : selected.isMinor ? 'minor' : 'major')
    : []

  const scaleColor = selected
    ? (SCALES[selected.isMinor ? 'minor' : selected.mode] || SCALES.major).color
    : '#d4a017'

  const noteColors = {}
  scaleNotes.forEach(n => { noteColors[n] = scaleColor })

  function handlePlayScale() {
    if (!selected) return
    const baseMidi = selected.keyClass <= 5 ? 60 + selected.keyClass : 48 + selected.keyClass
    const mode = selected.mode === 'dorian' ? 'dorian'
      : selected.mode === 'mixolydian' ? 'mixolydian'
      : selected.isMinor ? 'minor' : 'major'
    const midiNotes = SCALES[mode]?.intervals.map(i => baseMidi + i) || []
    playScale(midiNotes)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Bibliothèque de cantiques
        </h2>
        <p className="text-gray-400 text-sm">
          Harmonie, analyse musicale et conseils pour chaque cantique courant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-3">
          <input
            type="text"
            placeholder="Rechercher un cantique..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#d4a017]"
          />

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Période</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedPeriod(null)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${!selectedPeriod ? 'bg-[#d4a017] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'}`}
              >
                Tous
              </button>
              {Object.entries(PERIODS).map(([id, period]) => (
                <button
                  key={id}
                  onClick={() => setSelectedPeriod(selectedPeriod === id ? null : id)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${selectedPeriod === id ? 'text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'}`}
                  style={selectedPeriod === id ? { backgroundColor: period.color } : {}}
                >
                  {period.icon} {period.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Mode</p>
            <div className="flex flex-wrap gap-1.5">
              {['major','minor','dorian','mixolydian','modal'].map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMode(selectedMode === m ? null : m)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${selectedMode === m ? 'bg-[#d4a017] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'}`}
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center text-xs text-gray-500">
            <span>Trier :</span>
            {['name','difficulty','key'].map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-2 py-0.5 rounded transition-colors ${sortBy === s ? 'text-[#d4a017]' : 'hover:text-gray-300'}`}
              >
                {s === 'name' ? 'Nom' : s === 'difficulty' ? 'Difficulté' : 'Tonalité'}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 max-h-96 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">Aucun cantique trouvé</p>
            )}
            {filtered.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all border ${
                  selectedId === c.id
                    ? 'border-[#d4a017] bg-[#1e1a0a]'
                    : 'border-[#2a2a4a] bg-[#1a1a2e] hover:border-[#3a3a6a] hover:bg-[#1e1e35]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm text-white font-medium leading-tight">{c.name}</span>
                  <div className="flex gap-1 flex-shrink-0">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium text-black"
                      style={{ backgroundColor: DIFFICULTY_COLOR[c.difficulty] }}
                    >
                      {DIFFICULTY_LABEL[c.difficulty]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {c.period.slice(0, 2).map(p => (
                    <span
                      key={p}
                      className="text-xs px-1.5 py-0.5 rounded-full text-black"
                      style={{ backgroundColor: PERIODS[p]?.color || '#555' }}
                    >
                      {PERIODS[p]?.icon} {PERIODS[p]?.name}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500">{c.keyFr} {MODE_LABELS[c.mode]}</span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-600 text-center">{filtered.length} cantique{filtered.length > 1 ? 's' : ''}</p>
        </div>

        <div className="lg:col-span-2">
          {!selected ? (
            <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-5xl mb-4">🎵</div>
              <p className="text-gray-400">Sélectionne un cantique pour voir son analyse et ses conseils d'harmonisation.</p>
            </div>
          ) : (
            <div className="space-y-4 fade-in-up" key={selected.id}>
              <div
                className="rounded-xl p-5 border"
                style={{ backgroundColor: `${selected.color}15`, borderColor: `${selected.color}40` }}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-1">{selected.name}</h3>
                    <div className="flex items-center gap-3 flex-wrap text-sm">
                      <span className="text-gray-300">{selected.keyFr} {MODE_LABELS[selected.mode]}</span>
                      <span className="text-gray-500">{selected.timeSignature}</span>
                      <span className="text-gray-500">{selected.tempo}</span>
                      <span
                        className="px-2 py-0.5 rounded text-xs text-black font-medium"
                        style={{ backgroundColor: DIFFICULTY_COLOR[selected.difficulty] }}
                      >
                        {DIFFICULTY_LABEL[selected.difficulty]}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {selected.period.map(p => (
                      <span
                        key={p}
                        className="text-xs px-2 py-1 rounded-full text-black font-medium"
                        style={{ backgroundColor: PERIODS[p]?.color || '#555' }}
                      >
                        {PERIODS[p]?.icon} {PERIODS[p]?.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold text-sm">Tonalité et gamme</h4>
                  <button
                    onClick={handlePlayScale}
                    className="px-3 py-1.5 text-xs font-medium text-black rounded-lg transition-transform hover:scale-105"
                    style={{ backgroundColor: scaleColor }}
                  >
                    ▶ Entendre la gamme
                  </button>
                </div>
                <div className="mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono font-semibold"
                    style={{ backgroundColor: `${selected.color}25`, color: selected.color }}>
                    {selected.progression}
                  </div>
                </div>
                <Keyboard
                  activeNotes={scaleNotes}
                  noteColors={noteColors}
                />
              </div>

              <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                  <span>🔬</span> Analyse harmonique
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{selected.analysis}</p>
                {selected.whyItWorks && (
                  <div className="bg-[#0f0f1a] rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Pourquoi ça marche</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{selected.whyItWorks}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-4">
                  <h4 className="text-white font-semibold text-sm mb-3">💡 Comment jouer</h4>
                  <p className="text-xs text-gray-500 mb-1">Introduction :</p>
                  <p className="text-sm text-gray-300 mb-3">{selected.intro}</p>
                  <ul className="space-y-2">
                    {selected.tips?.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span style={{ color: selected.color }} className="flex-shrink-0 mt-0.5">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-4">
                  <h4 className="text-white font-semibold text-sm mb-3">🎛️ Registration</h4>
                  <p className="text-sm text-gray-300 mb-3">{selected.registration}</p>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Utiliser pour :</p>
                    <div className="flex flex-wrap gap-1">
                      {selected.occasions?.map(occ => (
                        <span key={occ} className="text-xs bg-[#242442] text-gray-300 px-2 py-0.5 rounded">
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
