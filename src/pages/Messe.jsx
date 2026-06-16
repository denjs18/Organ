import { useState } from 'react'
import { MASS_PARTS, MASS_PHASES } from '../data/messe.js'

const LITURGICAL_PERIODS = [
  { id: 'ordinaire', name: 'Temps ordinaire' },
  { id: 'avent', name: 'Avent' },
  { id: 'noel', name: 'Noël' },
  { id: 'careme', name: 'Carême' },
  { id: 'paques', name: 'Pâques' },
]

const PHASE_COLORS = {
  'rite-entree': '#d4a017',
  'liturgie-parole': '#6a9fd8',
  'liturgie-eucharistique': '#d4524a',
  'rite-communion': '#4aab7a',
  'rite-envoi': '#8a6dc8',
}

export default function Messe() {
  const [selectedPhase, setSelectedPhase] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [period, setPeriod] = useState('ordinaire')

  const filtered = selectedPhase
    ? MASS_PARTS.filter(p => p.phase === selectedPhase)
    : MASS_PARTS

  function toggle(id) {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Déroulement de la messe
        </h2>
        <p className="text-gray-400 text-sm">
          Chaque moment liturgique — ce que tu joues, pourquoi, comment.
        </p>
      </div>

      {/* Period selector */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-4 mb-5">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Adapter les conseils à la période</p>
        <div className="flex flex-wrap gap-2">
          {LITURGICAL_PERIODS.map(lp => (
            <button
              key={lp.id}
              onClick={() => setPeriod(lp.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === lp.id
                  ? 'bg-[#d4a017] text-black'
                  : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
              }`}
            >
              {lp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Phase filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setSelectedPhase(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !selectedPhase ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Tout afficher
        </button>
        {Object.entries(MASS_PHASES).map(([id, phase]) => (
          <button
            key={id}
            onClick={() => setSelectedPhase(selectedPhase === id ? null : id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              selectedPhase === id ? 'text-black' : 'border-[#2a2a4a] text-gray-400 hover:border-[#3a3a6a]'
            }`}
            style={selectedPhase === id ? { backgroundColor: phase.color, borderColor: phase.color } : {}}
          >
            {phase.name}
          </button>
        ))}
      </div>

      {/* Mass parts timeline */}
      <div className="space-y-2">
        {filtered.map((part, idx) => {
          const phaseColor = PHASE_COLORS[part.phase] || '#666'
          const isExpanded = expandedId === part.id
          const periodAdvice = part.periods?.[period]

          return (
            <div
              key={part.id}
              className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] overflow-hidden transition-all"
            >
              {/* Header */}
              <button
                className="w-full text-left px-4 py-4 flex items-center gap-3 hover:bg-[#1e1e35] transition-colors"
                onClick={() => toggle(part.id)}
              >
                {/* Number badge */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold"
                  style={{ backgroundColor: phaseColor }}
                >
                  {part.order + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-medium">{part.name}</span>
                    {part.optional && (
                      <span className="text-xs text-gray-500 italic">(selon période)</span>
                    )}
                    {part.isWarning && (
                      <span className="text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded">⚠️ Attention</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-500">{part.duration}</span>
                    <span className="text-xs" style={{ color: phaseColor }}>
                      {MASS_PHASES[part.phase]?.name}
                    </span>
                  </div>
                </div>

                <div className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  ▾
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-5 border-t border-[#242442]" style={{ borderTopColor: `${phaseColor}30` }}>
                  {/* Period-specific advice */}
                  {periodAdvice && (
                    <div
                      className="my-3 px-3 py-2 rounded-lg text-sm"
                      style={{ backgroundColor: `${phaseColor}15`, borderLeft: `3px solid ${phaseColor}` }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: phaseColor }}>
                        {period.charAt(0).toUpperCase() + period.slice(1)} :
                      </span>
                      <span className="text-gray-200 ml-2">{periodAdvice}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    {/* Role */}
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Rôle liturgique</h4>
                      <p className="text-sm text-gray-300">{part.liturgicalRole}</p>
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Ce que tu joues</h4>
                      <p className="text-sm text-gray-300">{part.organistRole}</p>
                    </div>
                  </div>

                  {/* Technique lesson */}
                  {part.technique && (
                    <div className="mt-4 bg-[#0f0f1a] rounded-xl p-4">
                      <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                        <span>🎓</span> {part.technique.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{part.technique.content}</p>
                    </div>
                  )}

                  {/* Registration + Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {part.registration && (
                      <div className="bg-[#242442] rounded-lg p-3">
                        <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">🎛️ Registration</h4>
                        <p className="text-sm text-gray-200">{part.registration}</p>
                      </div>
                    )}
                    {part.tips?.length > 0 && (
                      <div>
                        <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">💡 Conseils</h4>
                        <ul className="space-y-1.5">
                          {part.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span style={{ color: phaseColor }} className="mt-0.5 flex-shrink-0">→</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Mistakes to avoid */}
                  {part.mistakes?.length > 0 && (
                    <div className="mt-4 bg-red-950/20 border border-red-900/30 rounded-lg p-3">
                      <h4 className="text-xs text-red-400 uppercase tracking-wide mb-2">❌ Erreurs fréquentes</h4>
                      <ul className="space-y-1">
                        {part.mistakes.map((m, i) => (
                          <li key={i} className="text-sm text-red-300/80 flex items-start gap-2">
                            <span className="flex-shrink-0 mt-0.5">✗</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary tip */}
      <div className="mt-6 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3 text-sm">📌 Vue d'ensemble — ce que préparer avant chaque messe</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
          <div>
            <p className="font-medium text-white mb-1">Avant la messe (15 min avant) :</p>
            <ul className="space-y-1 text-gray-400 text-xs">
              <li>→ Vérifier les cantiques du jour</li>
              <li>→ Choisir les tonalités (en rapport avec les voix)</li>
              <li>→ Planifier prélude + introduction + sortie</li>
              <li>→ Préparer les registrations de base</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-white mb-1">Pendant la messe :</p>
            <ul className="space-y-1 text-gray-400 text-xs">
              <li>→ Suivre la liturgie visuellement</li>
              <li>→ Anticiper chaque moment de 8-10 secondes</li>
              <li>→ S'adapter au rythme de la célébration</li>
              <li>→ En doute : jouer simplement et juste</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
