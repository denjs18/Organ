import { useState } from 'react'

const OCCASIONS = [
  {
    id: 'messe-dominicale',
    name: 'Messe dominicale',
    icon: '⛪',
    moments: ['Prélude', 'Kyrie', 'Gloria', 'Offertoire', 'Sanctus', 'Communion', 'Postlude'],
  },
  {
    id: 'mariage',
    name: 'Mariage',
    icon: '💍',
    moments: [
      "Prélude (entrée des invités)",
      "Entrée de la mariée",
      "Psaume responsorial",
      "Méditation après communion",
      "Sortie des mariés",
    ],
  },
  {
    id: 'funerailles',
    name: 'Funérailles',
    icon: '🕊️',
    moments: ['Prélude (accueil)', 'Kyrie', 'Psaume', 'Offertoire', 'Communion', 'Absoute', 'Sortie'],
  },
  {
    id: 'bapteme',
    name: 'Baptême',
    icon: '💧',
    moments: ['Accueil', 'Liturgie de la Parole', 'Litanies', 'Après le baptême', 'Notre Père', 'Envoi'],
  },
  {
    id: 'profession-foi',
    name: 'Profession de foi',
    icon: '✝️',
    moments: [
      "Prélude festif",
      "Entrée",
      "Gloria",
      "Offertoire",
      "Communion",
      "Chant d'action de grâce",
      "Sortie festive",
    ],
  },
  {
    id: 'messe-scolaire',
    name: 'Messe scolaire',
    icon: '🏫',
    moments: ['Accueil', 'Pénitence', 'Offertoire', 'Communion', 'Envoi'],
  },
]

const PERIODES = [
  { id: 'avent',     name: 'Avent',                    color: '#6b21a8' },
  { id: 'noel',      name: 'Noël',                     color: '#d4a017' },
  { id: 'ordinaire', name: 'Temps ordinaire',           color: '#166534' },
  { id: 'careme',    name: 'Carême',                   color: '#7c2d12' },
  { id: 'paques',    name: 'Pâques / Temps pascal',    color: '#d4a017' },
  { id: 'fete',      name: 'Grande fête / Solennité',  color: '#d4a017' },
]

function computeEaster(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function detectPeriode() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const dayOfYear = Math.floor((now - new Date(year, 0, 1)) / 86400000) + 1

  if ((month === 12 && day >= 25) || (month === 1 && day <= 6)) return 'noel'
  if (month === 12 && day < 25) return 'avent'
  if (month === 11 && day >= 27) return 'avent'

  const easter = computeEaster(year)
  const easterDay = Math.floor((easter - new Date(year, 0, 1)) / 86400000) + 1
  const cendres = easterDay - 46
  if (dayOfYear >= cendres && dayOfYear < easterDay) return 'careme'
  const pentecote = easterDay + 49
  if (dayOfYear >= easterDay && dayOfYear <= pentecote) return 'paques'
  return 'ordinaire'
}

function getMomentAdvice(moment, occasionId, periodeId) {
  const m = moment.toLowerCase()
  const isFestif = ['noel', 'paques', 'fete'].includes(periodeId)
  const isCareme = periodeId === 'careme'

  if (m.includes('communion') || m.includes('méditation après')) {
    if (occasionId === 'funerailles') return {
      style: "Très doux, recueilli. Accompagnement délicat ou silence partiel.",
      registration: "Flûte 8' seule ou Bourdon 8' + Voix céleste (récit, boîte fermée)",
      duree: "5–10 min",
    }
    return {
      style: "Recueillement et intériorité. Jouez peu, laissez résonner les silences.",
      registration: "Voix céleste + Gambe 8' (Récit, boîte fermée) ou Flûte harmonique 8'",
      duree: "5–8 min",
    }
  }

  if (m.includes('absoute')) return {
    style: "Très doux, méditatif. Moment de recueillement final autour du cercueil.",
    registration: "Bourdon 8' seul",
    duree: "3–5 min",
  }

  if (m.includes('prélude') || m.includes('prelude')) {
    if (occasionId === 'funerailles') return {
      style: "Accueil doux et bienveillant. Pas de fanfare — accompagner le deuil avec tendresse.",
      registration: "Flûte 8' + Bourdon 8' ou Gambe 8'",
      duree: "5–10 min",
    }
    if (isFestif || occasionId === 'mariage' || occasionId === 'profession-foi') return {
      style: "Festif et lumineux. Créez une atmosphère de joie et d'attente heureuse.",
      registration: "Montre 8' + Bourdon 8' + Prestant 4' ou + Doublette 2'",
      duree: "5–10 min",
    }
    if (isCareme) return {
      style: "Méditatif et intérieur. L'Avent et le Carême appellent le recueillement, pas la fanfare.",
      registration: "Flûte 8' seule ou Bourdon 8' + Gambe 8'",
      duree: "3–5 min",
    }
    return {
      style: "Posé et serein. Installer la tonalité et l'atmosphère de la célébration.",
      registration: "Flûte 8' + Bourdon 8' ou + Prestant 4' selon l'envie",
      duree: "3–5 min",
    }
  }

  if (m.includes('entrée') || m.includes('entree')) {
    if (occasionId === 'mariage') return {
      style: "Majestueux et solennel. L'entrée de la mariée est un grand moment — prenez votre temps.",
      registration: "Pleins jeux ou Montre 8' + Bourdon 8' + Prestant 4' + Doublette 2'",
      duree: "2–4 min selon la longueur de la nef",
    }
    if (isFestif) return {
      style: "Festif et processionnel. Rythme régulier comme des pas, majestueux.",
      registration: "Montre 8' + Bourdon 8' + Octave 4' + Doublette 2'",
      duree: "3–5 min",
    }
    return {
      style: "Noble et processionnel. Rythme régulier pour accompagner la marche.",
      registration: "Principal 8' + Bourdon 8' + Octave 4'",
      duree: "3–4 min",
    }
  }

  if (m.includes('kyrie') || m.includes('pénitence')) {
    if (occasionId === 'funerailles') return {
      style: "Très doux, suppliant. Le Kyrie aux funérailles est une prière humble.",
      registration: "Bourdon 8' + Gambe 8' (doux)",
      duree: "2–4 min",
    }
    return {
      style: "Doux et recueilli. Le Kyrie est une prière de pénitence — pas un moment de fanfare.",
      registration: "Flûte 8' ou Bourdon 8' + Flûte 8' (doux)",
      duree: "2–3 min",
    }
  }

  if (m.includes('gloria')) return {
    style: isFestif
      ? "Festif et éclatant ! Le Gloria aux grandes fêtes mérite les Pleins jeux."
      : "Joyeux et lumineux. Le Gloria est un cri de joie.",
    registration: isFestif
      ? "Pleins jeux + Trompette 8' (ou au moins Doublette 2' + Mixture)"
      : "Montre 8' + Bourdon 8' + Octave 4' + Doublette 2'",
    duree: "2–4 min",
  }

  if (m.includes('sanctus')) return {
    style: "Majestueux et solennel. Le Sanctus est l'hymne des anges — grandeur et recueillement.",
    registration: isFestif
      ? "Pleins jeux ou Montre 8' + Bourdon 8' + Octave 4' + Mixture"
      : "Montre 8' + Bourdon 8' + Octave 4'",
    duree: "2–3 min",
  }

  if (m.includes('offertoire')) {
    if (occasionId === 'funerailles') return {
      style: "Méditatif et doux. Accompagner le geste d'offrande avec recueillement.",
      registration: "Flûte 8' + Bourdon 8' ou solo Flûte harmonique 8'",
      duree: "3–5 min",
    }
    return {
      style: isFestif
        ? "Festif ou lyriquement expressif. Moment plus long — développez une improvisation."
        : "Calme et méditative. Moment de transition vers la consécration.",
      registration: isFestif
        ? "Montre 8' + Bourdon 8' + Octave 4' + (Trompette 8' en solo)"
        : "Flûte 8' + Gambe 8' ou Salicional 8'",
      duree: "3–6 min",
    }
  }

  if (m.includes('sortie') || m.includes('postlude') || m.includes('envoi')) {
    if (occasionId === 'funerailles') return {
      style: "Peut être d'espérance lumineuse — la mort chrétienne est une résurrection. Doux mais pas triste.",
      registration: "Flûte harmonique 8' ou Bourdon 8' + Prestant 4' (sobre)",
      duree: "2–4 min",
    }
    if (occasionId === 'messe-scolaire' || occasionId === 'bapteme') return {
      style: "Joyeux et accessible. Les enfants aiment sentir la joie dans la musique !",
      registration: "Montre 8' + Bourdon 8' + Prestant 4' + Doublette 2'",
      duree: "2–3 min",
    }
    if (isFestif || occasionId === 'mariage' || occasionId === 'profession-foi') return {
      style: "Grand et festif ! C'est le moment le plus attendu — donnez tout.",
      registration: "Pleins jeux + Trompette 8' + Clairon 4' (Grand-Orgue complet + Pédale forte)",
      duree: "3–5 min",
    }
    return {
      style: "Rassemblé et conclusif. Conclure sur une note de sérénité ou de légère joie.",
      registration: "Montre 8' + Bourdon 8' + Octave 4' ou + Doublette 2'",
      duree: "2–4 min",
    }
  }

  if (m.includes('psaume') || m.includes('liturgie de la parole')) return {
    style: "Léger et transparent. Ne pas couvrir les lectures ni le chantre.",
    registration: "Flûte 8' seule ou Bourdon 8' + Flûte 4'",
    duree: "1–3 min",
  }

  if (m.includes('litanies')) return {
    style: "Répétitif et priant. Les litanies sont une prière humble — restez simple.",
    registration: "Flûte 8' ou Bourdon 8' (doux)",
    duree: "2–4 min",
  }

  if (m.includes('après le baptême') || m.includes('notre père')) return {
    style: "Joyeux et tendre. Moment de grâce familiale.",
    registration: "Flûte harmonique 8' ou Bourdon 8' + Voix céleste",
    duree: "1–2 min",
  }

  if (m.includes("action de grâce")) return {
    style: "Festif et exultant. L'action de grâce est une explosion de joie.",
    registration: "Pleins jeux ou Montre 8' + Bourdon 8' + Octave 4' + Doublette 2'",
    duree: "2–4 min",
  }

  if (m.includes('accueil')) {
    if (occasionId === 'messe-scolaire') return {
      style: "Chaleureux et accessible. Créer une atmosphère de bienvenue pour les enfants.",
      registration: "Flûte 8' + Bourdon 8' (doux et rond)",
      duree: "2–3 min",
    }
    return {
      style: "Chaleureux et bienveillant. Installer une atmosphère de recueillement et de bienvenue.",
      registration: "Bourdon 8' + Flûte 8' ou Gambe 8'",
      duree: "2–4 min",
    }
  }

  return {
    style: "Adapté au moment liturgique. Jouez avec recueillement et sensibilité.",
    registration: "Bourdon 8' + Flûte 8' (ajustez selon l'atmosphère souhaitée)",
    duree: "2–4 min",
  }
}

function getSuggestedKey(periodeId) {
  const keys = {
    avent:     { keys: ['Ré mineur', 'Sol mineur'], comment: 'Tonalités pénitentielles et méditatives' },
    noel:      { keys: ['Sol majeur', 'Do majeur'], comment: 'Tonalités lumineuses et joyeuses' },
    careme:    { keys: ['Mi mineur', 'La mineur'], comment: 'Tonalités contemplatives et graves' },
    paques:    { keys: ['Do majeur', 'Mi majeur'], comment: 'Tonalités triomphantes et lumineuses' },
    ordinaire: { keys: ['Fa majeur', 'Sol majeur'], comment: 'Tonalités équilibrées et accessibles' },
    fete:      { keys: ['Ré majeur', 'Do majeur'], comment: 'Tonalités festives et éclatantes' },
  }
  return keys[periodeId] || keys.ordinaire
}

function formatDateFr(date) {
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  return `${jours[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()}`
}

function MomentCard({ moment, occasionId, periodeId, periodeColor, noteValue, onNoteChange }) {
  const advice = getMomentAdvice(moment, occasionId, periodeId)
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#2a2a4a]" style={{ borderLeftWidth: 4, borderLeftColor: periodeColor }}>
        <h4 className="text-[#d4a017] font-semibold text-sm">{moment}</h4>
        <p className="text-gray-500 text-xs mt-0.5">Durée suggérée : {advice.duree}</p>
      </div>
      <div className="px-4 py-3 space-y-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-0.5">Style</p>
          <p className="text-gray-300 text-sm leading-relaxed">{advice.style}</p>
        </div>
        <div className="bg-[#0f0f1a] rounded-lg p-3 border border-[#2a2a4a]">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-0.5">Registration</p>
          <p className="text-sm font-mono" style={{ color: periodeColor }}>{advice.registration}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">Notes personnelles</p>
          <textarea
            value={noteValue}
            onChange={e => onNoteChange(e.target.value)}
            placeholder="Cantique choisi, tonalité, remarques..."
            rows={2}
            className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 text-gray-300 text-sm placeholder-gray-700 resize-none focus:outline-none focus:border-[#d4a017]/50 transition-colors"
          />
        </div>
      </div>
    </div>
  )
}

function PreparationForm({ onSubmit }) {
  const detectedPeriode = detectPeriode()
  const [occasionId, setOccasionId] = useState('messe-dominicale')
  const [periodeId, setPeriodeId] = useState(detectedPeriode)
  const [nbCantiques, setNbCantiques] = useState(3)

  function handleSubmit(e) {
    e.preventDefault()
    const occasion = OCCASIONS.find(o => o.id === occasionId)
    const periode = PERIODES.find(p => p.id === periodeId)
    onSubmit({ occasion, periode, nbCantiques })
  }

  const selectedOccasion = OCCASIONS.find(o => o.id === occasionId)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Type de célébration</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {OCCASIONS.map(o => (
            <button key={o.id} type="button" onClick={() => setOccasionId(o.id)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all text-sm ${
                occasionId === o.id
                  ? 'border-[#d4a017] bg-[#d4a017]/10 text-white'
                  : 'border-[#2a2a4a] bg-[#1a1a2e] text-gray-300 hover:border-[#3a3a6a] hover:bg-[#1e1e35]'
              }`}>
              <span className="text-lg flex-shrink-0">{o.icon}</span>
              <span className="font-medium text-xs leading-tight">{o.name}</span>
            </button>
          ))}
        </div>
        {selectedOccasion && (
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedOccasion.moments.map(m => (
              <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a4a] text-gray-500">{m}</span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Période liturgique
          {periodeId === detectedPeriode && <span className="ml-2 text-[#d4a017] normal-case font-normal">(détectée automatiquement)</span>}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PERIODES.map(p => (
            <button key={p.id} type="button" onClick={() => setPeriodeId(p.id)}
              className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                periodeId === p.id ? 'text-white' : 'bg-[#1a1a2e] border-[#2a2a4a] text-gray-300 hover:bg-[#1e1e35] hover:border-[#3a3a6a]'
              }`}
              style={periodeId === p.id ? { borderColor: p.color, backgroundColor: `${p.color}20`, color: p.color } : {}}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="nb-cantiques" className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Nombre de cantiques prévus : <span className="text-[#d4a017]">{nbCantiques}</span>
        </label>
        <input id="nb-cantiques" type="range" min={1} max={8} value={nbCantiques}
          onChange={e => setNbCantiques(Number(e.target.value))} className="w-full" />
        <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1</span><span>8</span></div>
      </div>

      <button type="submit"
        className="w-full py-3 rounded-xl font-semibold text-sm text-black transition-all hover:scale-[1.01] hover:brightness-110"
        style={{ backgroundColor: '#d4a017' }}>
        Générer le plan de célébration →
      </button>
    </form>
  )
}

function PlanView({ config, onReset }) {
  const { occasion, periode, nbCantiques } = config
  const [notes, setNotes] = useState({})

  function updateNote(idx, val) {
    setNotes(prev => ({ ...prev, [idx]: val }))
  }

  const suggestedKey = getSuggestedKey(periode.id)
  const dateFr = formatDateFr(new Date())

  return (
    <div>
      <div className="rounded-xl p-5 mb-6 border" style={{ borderColor: periode.color, backgroundColor: `${periode.color}10` }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{occasion.icon}</span>
              <h3 className="text-white font-cinzel font-semibold text-xl">{occasion.name}</h3>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: periode.color }}>{periode.name}</p>
            <p className="text-gray-400 text-sm">{dateFr}</p>
          </div>
          <div className="text-right text-sm text-gray-400 space-y-1">
            <div>
              <span className="text-gray-600 text-xs uppercase tracking-wide">Cantiques prévus</span>
              <p className="text-white font-semibold">{nbCantiques}</p>
            </div>
            <div>
              <span className="text-gray-600 text-xs uppercase tracking-wide">Tonalité suggérée</span>
              <p className="font-semibold" style={{ color: periode.color }}>{suggestedKey.keys.join(' / ')}</p>
              <p className="text-gray-500 text-xs">{suggestedKey.comment}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {occasion.moments.map((moment, idx) => (
          <MomentCard key={idx} moment={moment} occasionId={occasion.id} periodeId={periode.id}
            periodeColor={periode.color} noteValue={notes[idx] || ''} onNoteChange={val => updateNote(idx, val)} />
        ))}
      </div>

      {nbCantiques > 0 && (
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 mb-6">
          <p className="text-[#d4a017] font-semibold text-sm mb-2">
            🎵 {nbCantiques} cantique{nbCantiques > 1 ? 's' : ''} à préparer
          </p>
          <div className="space-y-2">
            {Array.from({ length: nbCantiques }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-gray-600 text-xs w-5">{i + 1}.</span>
                <input type="text" placeholder={`Cantique ${i + 1} — titre et tonalité`}
                  className="flex-1 bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-1.5 text-gray-300 text-sm placeholder-gray-700 focus:outline-none focus:border-[#d4a017]/50 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={() => window.print()}
          className="flex-1 py-3 rounded-xl font-semibold text-sm border border-[#d4a017]/40 text-[#d4a017] hover:bg-[#d4a017]/10 transition-all">
          🖨️ Imprimer
        </button>
        <button onClick={onReset}
          className="flex-1 py-3 rounded-xl font-semibold text-sm bg-[#1a1a2e] border border-[#2a2a4a] text-gray-300 hover:bg-[#1e1e35] hover:border-[#3a3a6a] transition-all">
          ← Nouveau plan
        </button>
      </div>
    </div>
  )
}

export default function Preparation() {
  const [plan, setPlan] = useState(null)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">Préparer une célébration</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Générez un plan de célébration personnalisé avec les conseils de style et de registration
          pour chaque moment liturgique, adapté à la période de l'année.
        </p>
      </div>
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
        {plan === null ? <PreparationForm onSubmit={setPlan} /> : <PlanView config={plan} onReset={() => setPlan(null)} />}
      </div>
    </div>
  )
}
