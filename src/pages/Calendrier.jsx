import { useState } from 'react'
import { CANTIQUES, PERIODS } from '../data/cantiques.js'

// Approximate 2025-2026 liturgical calendar (Easter 2026 = April 5)
const LITURGICAL_YEAR = [
  {
    id: 'ordinaire-a',
    name: 'Temps ordinaire',
    start: '2025-06-09',
    end: '2025-11-29',
    period: 'ordinaire',
    shortDesc: 'La croissance quotidienne dans la foi',
  },
  {
    id: 'avent',
    name: 'Avent',
    start: '2025-11-30',
    end: '2025-12-24',
    period: 'avent',
    shortDesc: 'L\'attente et la préparation à Noël',
  },
  {
    id: 'noel',
    name: 'Temps de Noël',
    start: '2025-12-25',
    end: '2026-01-11',
    period: 'noel',
    shortDesc: 'La joie de la naissance du Christ',
  },
  {
    id: 'ordinaire-b',
    name: 'Temps ordinaire',
    start: '2026-01-12',
    end: '2026-02-17',
    period: 'ordinaire',
    shortDesc: 'La croissance quotidienne dans la foi',
  },
  {
    id: 'careme',
    name: 'Carême',
    start: '2026-02-18',
    end: '2026-04-04',
    period: 'careme',
    shortDesc: '40 jours de conversion et de pénitence',
  },
  {
    id: 'paques',
    name: 'Temps pascal',
    start: '2026-04-05',
    end: '2026-05-23',
    period: 'paques',
    shortDesc: '50 jours de joie pascale',
  },
  {
    id: 'pentecote',
    name: 'Pentecôte',
    start: '2026-05-24',
    end: '2026-05-24',
    period: 'pentecote',
    shortDesc: 'L\'effusion de l\'Esprit Saint',
  },
  {
    id: 'ordinaire-c',
    name: 'Temps ordinaire',
    start: '2026-05-25',
    end: '2026-11-28',
    period: 'ordinaire',
    shortDesc: 'La croissance quotidienne dans la foi',
  },
]

const PERIOD_GUIDES = {
  avent: {
    musical: {
      character: 'Sobre, mystérieux, plein d\'attente. Pas de Gloria! L\'Alleluia subsiste.',
      allowed: ['Mode dorien', 'Mineur expressif', 'Fonds doux', 'Flûtes pp'],
      forbidden: ['Gloria (sauf fêtes propres)', 'Pleins jeux trop festifs', 'Trompettes débridées'],
      registration: 'Récit seul, flûtes 8\', Voix céleste possible. Crescendo progressif au fil des semaines.',
      keys: ['Mi mineur / dorien', 'Ré mineur', 'La mineur', 'Sol majeur (pour Peuple fidèle)'],
      technique: 'Privilégiez le mode dorien : sa 6e majeure dans un contexte mineur crée exactement cette attente lumineuse propre à l\'Avent. L\'Alléluia peut être sobrement harmonisé — une simple cadence v—i suffit.',
    },
    liturgical: 'Le violet traduit l\'attente pénitentielle. 4 dimanches, chaque semaine gagne légèrement en intensité lumineuse.',
    specialEvents: [
      { name: '1er dimanche', note: 'Établir la sobriété du ton' },
      { name: '3e dimanche (Gaudete)', note: 'Rose — légèrement plus joyeux, rose en vestimentaire' },
      { name: '4e dimanche', note: 'Proximité de Noël — on peut commencer à pointer vers la lumière' },
    ],
  },
  noel: {
    musical: {
      character: 'Triomphant, lumineux, festif. Gloria revient! Alleluia festif.',
      allowed: ['Pleins jeux', 'Trompettes', 'Grand-orgue complet', 'Majeur brillant'],
      forbidden: ['Rien n\'est vraiment interdit — c\'est la fête !'],
      registration: 'Grand-orgue pleins jeux le jour de Noël. Possibilité de sortir la Trompette. Variez au fil des jours.',
      keys: ['Ré majeur', 'Sol majeur', 'Do majeur', 'Si♭ majeur (Douce Nuit)'],
      technique: 'Les cantiques de Noël sont souvent en majeur simple. L\'art est dans la registration et l\'interprétation : un Ré majeur avec Pleins jeux et Pédale Bombarde sonne incomparablement plus festif qu\'un Do majeur aux flûtes.',
    },
    liturgical: 'Blanc et or. Commence le 25 décembre, se termine avec la fête du Baptême du Seigneur (mi-janvier).',
    specialEvents: [
      { name: 'Nuit de Noël', note: 'La grande sortie de l\'année — préparez 3-4 pièces' },
      { name: 'Jour de Noël', note: 'Messe du jour, pleins jeux' },
      { name: 'Épiphanie', note: 'Les Rois Mages — caractère royal, majestueux' },
    ],
  },
  careme: {
    musical: {
      character: 'Pénitentiel, intérieur, grave. PAS d\'Alleluia! PAS de Gloria!',
      allowed: ['Mineur expressif', 'Mode dorien ou phrygien', 'Fonds pp', 'Silence musical'],
      forbidden: ['Alleluia (absolument interdit!)', 'Gloria', 'Trompettes festives', 'Pièces trop joyeuses'],
      registration: 'Fonds uniquement, Récit doux. Éviter Anches et Pleins jeux sauf 4e dimanche (Laetare).',
      keys: ['Ré mineur', 'La mineur', 'Mi mineur', 'Si mineur (tons sombres)'],
      technique: 'Le Carême est le temps de la sobriété sonore. Un accord tenu, une mélodie simple, des silences plus longs qu\'habituellement — tout cela parle liturgiquement. L\'orgue ne "décore" pas ici : il prie.',
    },
    liturgical: 'Violet. 40 jours du Mercredi des Cendres au Jeudi Saint. Exception : 4e dim. (Laetare) en rose, légèrement plus festif.',
    specialEvents: [
      { name: 'Mercredi des Cendres', note: 'Très sobre — fonds pp, pénitentiel' },
      { name: '4e dim. Laetare', note: 'Un peu plus joyeux — rose liturgique. On peut "alléger"' },
      { name: 'Semaine Sainte', note: 'Voir guide spécial : du Dimanche des Rameaux au Samedi Saint' },
      { name: 'Vendredi Saint', note: 'PAS de musique d\'orgue pour la grande célébration — silence liturgique' },
    ],
  },
  paques: {
    musical: {
      character: 'Joie absolue, triomphe, Alleluia partout! Le plus festif de l\'année.',
      allowed: ['Tout !', 'Pleins jeux systématiques', 'Alléluia répété', 'Ré majeur recommandé'],
      forbidden: ['La tristesse n\'a pas sa place — même les funérailles de Pâques sont empreintes d\'espérance'],
      registration: 'Grand-Orgue + Récit + Pédale, pleins jeux. Trompette horizontale si disponible. C\'est le moment.',
      keys: ['Ré majeur (le plus "pascal")', 'Sol majeur', 'La majeur', 'Do majeur'],
      technique: 'Les 50 jours de Pâques sont une seule grande fête. L\'Alléluia pascal en Ré majeur (I-IV-V-I, forte) est la formule de base. Le secret : sortez TOUT l\'orgue le jour de Pâques, gardez un crescendo pour les dimanches suivants.',
    },
    liturgical: 'Blanc et or. 50 jours de Pâques à Pentecôte. Dimanche de l\'Ascension (39e jour) inclus.',
    specialEvents: [
      { name: 'Vigile Pascale', note: 'Transition obscurité→lumière : commencer dans le silence absolu, finir en pleine gloire' },
      { name: 'Jour de Pâques', note: 'La grande sortie de l\'année — Pleins jeux + Trompette' },
      { name: 'Ascension', note: 'Majestueux — le Christ monte : ascension musicale recommandée' },
    ],
  },
  pentecote: {
    musical: {
      character: 'Feu, Esprit, force. Rouge liturgique. Festif mais avec une dimension de puissance.',
      allowed: ['Anches', 'Trompette', 'Énergie rythmique', 'Pleins jeux'],
      forbidden: ['Rien de particulier'],
      registration: 'Anches + fonds. Trompette appropriée. Plus "puissant" que "brillant".',
      keys: ['Ré majeur', 'Sol majeur', 'Modes avec tension (mixolydien)'],
      technique: 'Pentecôte en mixolydien peut être très efficace : le bVII (accord sur la 7e mineure) donne une impression de souffle et d\'ouverture soudaine. Essayez Sol mixolydien : Sol La Si Do Ré Mi Fa Sol — l\'accord de Fa majeur dans ce contexte sonne "nouveau".',
    },
    liturgical: 'Rouge. Un seul dimanche (50e jour de Pâques). Puis retour au vert (temps ordinaire).',
    specialEvents: [
      { name: 'Dimanche de Pentecôte', note: 'Grande fête — prévoir une sortie forte' },
    ],
  },
  ordinaire: {
    musical: {
      character: 'Varié selon les fêtes du calendrier. Vert = croissance. Pas d\'excès dans un sens ou l\'autre.',
      allowed: ['Tout le spectre des styles', 'Adaptation aux fêtes du calendrier', 'Grande liberté'],
      forbidden: ['La routine — c\'est le piège du temps ordinaire'],
      registration: 'Variable selon le degré de fête. Fonds simples pour les dimanches ordinaires, plus festif pour les grandes fêtes.',
      keys: ['Toutes les tonalités — varier au fil des semaines'],
      technique: 'Le temps ordinaire est votre laboratoire. Explorez des modes différents, essayez des registrations nouvelles, testez des progressions que vous ne sortez pas en grande fête. La progression I-vi-IV-V en sol majeur, par exemple, convient parfaitement à un dimanche ordinaire.',
    },
    liturgical: 'Vert (croissance). De la Pentecôte à l\'Avent, et de l\'Épiphanie au Carême. C\'est le temps le plus long de l\'année liturgique.',
    specialEvents: [
      { name: 'Toussaint (1er nov.)', note: 'Blanc — festif et solennel' },
      { name: 'Fête-Dieu', note: 'Blanc/or — Eucharistie : motifs du Pain de vie' },
      { name: 'Christ-Roi', note: 'Dernier dimanche — majeur royal, pleins jeux' },
    ],
  },
}

function detectCurrentPeriod() {
  const today = new Date().toISOString().split('T')[0]
  const found = LITURGICAL_YEAR.find(p => p.start <= today && today <= p.end)
  return found?.period || 'ordinaire'
}

export default function Calendrier() {
  const [selectedPeriod, setSelectedPeriod] = useState(() => detectCurrentPeriod())
  const currentPeriod = detectCurrentPeriod()

  const guide = PERIOD_GUIDES[selectedPeriod]
  const period = PERIODS[selectedPeriod]
  const cantiquesForPeriod = CANTIQUES.filter(c => c.period.includes(selectedPeriod))

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Calendrier liturgique
        </h2>
        <p className="text-gray-400 text-sm">
          Ce qui est permis, recommandé et interdit pour chaque temps de l'année.
        </p>
      </div>

      {/* Current period indicator */}
      <div
        className="rounded-xl p-3 mb-5 flex items-center gap-3 text-sm"
        style={{ backgroundColor: `${PERIODS[currentPeriod]?.color}20`, border: `1px solid ${PERIODS[currentPeriod]?.color}40` }}
      >
        <span className="text-xl">{PERIODS[currentPeriod]?.icon}</span>
        <span className="text-gray-300">
          Nous sommes actuellement en <strong className="text-white">{PERIODS[currentPeriod]?.name}</strong>
        </span>
      </div>

      {/* Period selector */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
        {Object.entries(PERIODS).filter(([id]) => PERIOD_GUIDES[id]).map(([id, p]) => (
          <button
            key={id}
            onClick={() => setSelectedPeriod(id)}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedPeriod === id ? 'text-black' : 'bg-[#1a1a2e] border-[#2a2a4a] text-gray-400 hover:border-[#3a3a6a]'
            }`}
            style={selectedPeriod === id ? { backgroundColor: p.color, borderColor: p.color } : {}}
          >
            <div className="text-2xl">{p.icon}</div>
            <div className="text-xs mt-1 font-medium leading-tight">{p.name.split(' ')[0]}</div>
            {id === currentPeriod && (
              <div className="text-xs mt-0.5 opacity-70">← maintenant</div>
            )}
          </button>
        ))}
      </div>

      {guide && (
        <div className="space-y-4 fade-in-up" key={selectedPeriod}>
          {/* Character */}
          <div
            className="rounded-xl p-5 border"
            style={{ backgroundColor: `${period?.color}15`, borderColor: `${period?.color}40` }}
          >
            <h3 className="text-white font-semibold text-lg mb-1">{period?.icon} {period?.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{guide.liturgical}</p>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Caractère musical</p>
              <p className="text-white text-sm font-medium">{guide.musical.character}</p>
            </div>
          </div>

          {/* Musical guidance grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Allowed */}
            <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
              <h4 className="text-green-400 font-semibold text-sm mb-3">✓ Ce qu'on joue</h4>
              <ul className="space-y-1.5">
                {guide.musical.allowed.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Forbidden */}
            <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
              <h4 className="text-red-400 font-semibold text-sm mb-3">✗ Ce qu'on évite</h4>
              <ul className="space-y-1.5">
                {guide.musical.forbidden.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-red-500 flex-shrink-0 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Keys + Registration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
              <h4 className="text-white font-semibold text-sm mb-3">🎵 Tonalités recommandées</h4>
              <div className="flex flex-wrap gap-2">
                {guide.musical.keys.map(k => (
                  <span key={k} className="text-sm px-2.5 py-1 rounded-lg text-black font-medium"
                    style={{ backgroundColor: period?.color }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
              <h4 className="text-white font-semibold text-sm mb-3">🎛️ Registration typique</h4>
              <p className="text-sm text-gray-300">{guide.musical.registration}</p>
            </div>
          </div>

          {/* Technical insight */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
              <span>🎓</span> Technique propre à ce temps
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">{guide.musical.technique}</p>
          </div>

          {/* Special events */}
          {guide.specialEvents?.length > 0 && (
            <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
              <h4 className="text-white font-semibold mb-3 text-sm">📅 Moments clés</h4>
              <div className="space-y-2">
                {guide.specialEvents.map((ev, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5"
                      style={{ backgroundColor: period?.color }}
                    />
                    <div>
                      <span className="text-white font-medium text-sm">{ev.name} : </span>
                      <span className="text-gray-400 text-sm">{ev.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cantiques for this period */}
          {cantiquesForPeriod.length > 0 && (
            <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
              <h4 className="text-white font-semibold mb-3 text-sm">
                🎵 Cantiques pour ce temps ({cantiquesForPeriod.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cantiquesForPeriod.map(c => (
                  <div
                    key={c.id}
                    className="bg-[#0f0f1a] rounded-lg p-2.5 text-xs"
                  >
                    <div className="text-white font-medium leading-tight">{c.name}</div>
                    <div className="text-gray-500 mt-0.5">{c.keyFr} {c.isMinor ? 'min.' : 'maj.'}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">
                → Retrouve-les tous dans la section Cantiques avec leur analyse complète.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
