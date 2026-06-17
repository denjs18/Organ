import { useState, useMemo } from 'react'
import { NOTE_FR } from '../utils/music.js'
import { playChord } from '../utils/audio.js'

const TABS = [
  { id: 'formes',     label: 'Formes',      icon: '📐' },
  { id: 'modulation', label: 'Modulations', icon: '🔀' },
  { id: 'pedalier',   label: 'Pédalier',    icon: '🦶' },
  { id: 'generateur', label: 'Générateur',  icon: '⚡' },
  { id: 'methodes',   label: 'Méthodes',    icon: '🎓' },
]

// ─── Music helpers ─────────────────────────────────────────────────────────────

const MAJ_INTERVALS = [0, 2, 4, 5, 7, 9, 11]
const MAJ_TYPES     = ['M', 'm', 'm', 'M', 'M', 'm', 'dim']
const MAJ_DEGREES   = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII°']

const DEGREE_COLORS = {
  'I': '#d4a017', 'II': '#8a6dc8', 'III': '#4aab7a',
  'IV': '#6a9fd8', 'V': '#d4524a', 'VI': '#e87c3e', 'VII°': '#777',
}

function getDiatonicChords(root) {
  return MAJ_INTERVALS.map((iv, i) => ({
    root: (root + iv) % 12,
    type: MAJ_TYPES[i],
    degree: MAJ_DEGREES[i],
  }))
}

function findPivotChords(fromKey, toKey) {
  if (fromKey === toKey) return []
  const from = getDiatonicChords(fromKey)
  const to   = getDiatonicChords(toKey)
  const pivots = []
  from.forEach(cf => {
    to.forEach(ct => {
      if (cf.root === ct.root && cf.type === ct.type) {
        pivots.push({
          root: cf.root, type: cf.type,
          degreeFrom: cf.degree, degreeTo: ct.degree,
          name: NOTE_FR[cf.root] + (cf.type === 'm' ? ' m' : cf.type === 'dim' ? '°' : ''),
        })
      }
    })
  })
  return pivots
}

function chordMidi(root, type) {
  const ivs = { M: [0,4,7], m: [0,3,7], dim: [0,3,6] }
  const base = root <= 5 ? 60 + root : 48 + root
  return (ivs[type] || ivs.M).map(i => base + i)
}

const KN  = k => NOTE_FR[k] + ' majeur'
const REL = k => NOTE_FR[(k + 9) % 12] + ' mineur'
const DOM = k => NOTE_FR[(k + 7) % 12] + ' majeur'
const PAR = k => NOTE_FR[k] + ' mineur'
const MED = k => NOTE_FR[(k + 4) % 12] + ' majeur'

// Circle of fifths order for key selectors
const KEYS_ORDER = [0, 7, 2, 9, 4, 11, 6, 5, 10, 3, 8, 1]

// ─── FORMES data ───────────────────────────────────────────────────────────────

const FORMES = [
  {
    id: 'aba', name: 'Forme ABA', icon: '🔄', difficulty: 1, duration: '3–8 min',
    color: '#d4a017',
    description: "La forme la plus naturelle : idée (A), contraste (B), retour transformé (A'). Structure de toute respiration musicale.",
    keyFn: k => [KN(k), REL(k) + ' ou ' + DOM(k), KN(k)],
    proportions: [0.25, 0.5, 0.25],
    sections: [
      { label: "A — Exposition", registration: "Récit : Flûte 8'", action: "Établis ta mélodie principale (4–8 mesures). Joue pp à mp. Répète légèrement variée." },
      { label: "B — Contraste", registration: "Grand Orgue ou couleur différente", action: "Change de caractère, de mode, de registration. Développe un motif court." },
      { label: "A' — Retour", registration: "Comme A, enrichi", action: "Reprends A mais varié : voix ajoutée, ornements, basse différente. Conclus sur I." },
    ],
    tips: ["La transition A→B : utilise un accord pivot pour moduler naturellement", "B doit vraiment contraster : tempo, mode, registration différents", "A' est plus beau que A — transformé par ce qu'on a vécu en B"],
  },
  {
    id: 'passacaille', name: 'Passacaille', icon: '🔁', difficulty: 2, duration: '4–12 min',
    color: '#8a6dc8',
    description: "Basse qui se répète (ostinato) pendant que les voix supérieures varient librement. Bach, Buxtehude, Haendel en ont fait des chefs-d'œuvre.",
    keyFn: k => [KN(k), KN(k), KN(k), REL(k), KN(k), KN(k)],
    proportions: [0.08, 0.16, 0.16, 0.16, 0.28, 0.16],
    sections: [
      { label: "Basse seule (pédalier)", registration: "Pédale : Soubasse 16' seul", action: "Joue la basse ostinato (4 ou 8 mesures) seule, lente, régulière. Ex : I—VII—VI—V—i ou chromatique descendante." },
      { label: "Var. 1 — Mélodie simple", registration: "Récit : Flûte 8'", action: "MD : mélodie simple. MG : accords. 3 voix total." },
      { label: "Var. 2 — Harmonies riches", registration: "+ Bourdon 8'", action: "Enrichis les accords : 7e, 9e, suspensions. La basse est toujours là." },
      { label: "Var. 3 — Ornements", registration: "+ Prestant 4'", action: "Trilles, mordants, notes de passage. Module vers la relative." },
      { label: "Var. 4 — Sommet", registration: "Grand Orgue + Récit", action: "Texture pleine : mélodie soprano, contrepoint alto, basse MG + pédalier. Fortissimo." },
      { label: "Coda", registration: "Decrescendo progressif", action: "Ralentis (poco a poco). Simplifie la texture. Accord final pp tenu longtemps." },
    ],
    tips: ["La basse doit être mémorisée — elle tourne automatiquement au pédalier", "Chaque variation doit être plus dense que la précédente", "La magie : la basse ne change pas mais on ne l'entend plus pareil à la 4e variation"],
  },
  {
    id: 'toccata', name: 'Toccata libre', icon: '⚡', difficulty: 3, duration: '3–6 min',
    color: '#d4524a',
    description: "De l'italien 'toccare' (toucher). Passages rapides, accords plaqués, pédale tenue — tout le clavier exploré. Virtuosité et liberté.",
    keyFn: k => [KN(k), KN(k) + ' + modulations', DOM(k), KN(k)],
    proportions: [0.2, 0.45, 0.15, 0.2],
    sections: [
      { label: "Introduction — Fanfare", registration: "Grand Orgue + Pédale complets", action: "Accords plaqués fff sur I—V—I. Gammes rapides entre les accords. Pédalier : tonique et quinte alternées." },
      { label: "Développement — Courses", registration: "MD Grand Orgue, MG Récit", action: "Gammes, arpèges, motifs répétés en séquence. MG tient les harmonies, MD 'court'. Module vers la dominante puis reviens." },
      { label: "Pédale de dominante", registration: "Pédale fff : Soubasse + Flûte 16'", action: "Tiens la dominante à la pédale. Harmonies chromatiques instables au-dessus. Crescendo maximal. Point de tension suprême." },
      { label: "Coda — Résolution", registration: "Tutti complet", action: "Résolution fff sur I. Accords solennels. Accord final tenu 4–5 secondes. Arrêt net." },
    ],
    tips: ["La toccata a un côté 'impétueux' voulu — quelques imperfections font partie du style", "La pédale de dominante (dominante tenue) crée la tension maximale", "Ne pas commencer fff — garder une réserve dynamique pour le sommet"],
  },
  {
    id: 'variations', name: 'Thème et variations', icon: '🌀', difficulty: 2, duration: '4–10 min',
    color: '#4aab7a',
    description: "Un thème simple répété avec des transformations progressives. Bach, Mozart, Beethoven ont construit leurs plus grandes œuvres sur ce principe.",
    keyFn: k => [KN(k), KN(k), KN(k), PAR(k), KN(k)],
    proportions: [0.15, 0.2, 0.2, 0.2, 0.25],
    sections: [
      { label: "Thème", registration: "Récit : Flûte 8' mp", action: "Mélodie simple (8–16 mesures). Sans ornements. L'assemblée doit pouvoir mémoriser." },
      { label: "Var. 1 — Mélodique", registration: "Idem", action: "Même harmonie, mélodie ornée : appogiatures, trilles, notes de passage." },
      { label: "Var. 2 — Rythmique", registration: "Grand Orgue", action: "Mélodie passe à la basse (MG ou pédalier). MD : figurations rapides." },
      { label: "Var. 3 — Mode parallèle", registration: "Récit sombre : Gambe 8'", action: "Thème transposé au mode parallèle. L'effet mineur/majeur est toujours saisissant." },
      { label: "Var. 4 — Finale", registration: "Tutti progressif", action: "Retour au mode original, 4 voix, pédalier présent. Crescendo. Coda avec cadence solennelle." },
    ],
    tips: ["Choisir un thème avec une structure claire (deux phrases de 4 mesures)", "La variation au mode parallèle est un coup de théâtre — ne pas la négliger", "La dernière variation peut aller plus vite que le thème"],
  },
  {
    id: 'fantaisie', name: 'Fantaisie libre', icon: '🌊', difficulty: 3, duration: '5–15 min',
    color: '#6a9fd8',
    description: "La forme la plus libre : sections contrastantes enchaînées selon l'inspiration. Pas de structure imposée. Bach, Buxtehude, Mozart.",
    keyFn: k => [KN(k), KN(k), KN(k) + ' → ' + REL(k) + ' → ' + DOM(k), MED(k), KN(k)],
    proportions: [0.1, 0.2, 0.3, 0.2, 0.2],
    sections: [
      { label: "Ouverture mystérieuse", registration: "Récit seul pp", action: "Commence par quelque chose d'inattendu : accord suspendu, note tenue, mélodie fragmentée. Crée l'attente." },
      { label: "Affirmation", registration: "Grand Orgue mf", action: "Pose ta tonalité clairement : I—IV—V—I. Mélodie forte et directe." },
      { label: "Errance harmonique", registration: "Variable, changes fréquents", action: "Modulations rapides, chromatismes, harmonies instables. Ne jamais rester plus de 8 mesures dans la même tonalité." },
      { label: "Contemplation", registration: "Récit pp, couleur différente", action: "Moment calme inattendu. Mélodie simple pp dans une tonalité lointaine. Contraste total." },
      { label: "Retour et conclusion", registration: "Progression vers tutti", action: "Module vers le retour sur la tonalité principale. Conclusion solennelle ou en decrescendo." },
    ],
    tips: ["La fantaisie se construit sur les contrastes : tempo, mode, registration, texture", "Autorise-toi à l'inattendu — un accord 'faux' peut devenir le plus beau", "Écouter les Fantaisies de Bach (BWV 542, 903) pour comprendre la liberté"],
  },
]

// ─── PÉDALIER data ──────────────────────────────────────────────────────────────

const PEDALIER = [
  {
    id: 'pedale-tonique', name: 'Pédale de tonique', icon: '🔊', color: '#d4a017',
    description: "Note de tonique tenue indéfiniment à la basse pendant que les harmonies changent au-dessus. Crée une stabilité hypnotique et un effet de plénitude.",
    exercise: "Tiens Do à la pédale. Joue au-dessus : Do—Fa—Sol—La m—Fa—Sol—Do. La basse ne bouge pas. Remarque : Fa sur Do = quarte harmonique ; Sol sur Do = quinte ; La m sur Do = accord en 1ère inversion.",
    lesson: "La pédale de tonique est particulièrement belle pendant les cadences finales : tenir Do pendant que les mains jouent IV—II—V—I au-dessus. Sol7 sur pédale Do = tension extrême et magnifique.",
    difficulty: 1,
  },
  {
    id: 'pedale-dominante', name: 'Pédale de dominante', icon: '⚡', color: '#d4524a',
    description: "Note de dominante (5e degré) tenue à la basse pendant que les harmonies changent. Crée une tension maximale et une attente irrésistible de résolution.",
    exercise: "Tiens Sol à la pédale (dominante de Do). Joue au-dessus : Do—Fa—La m—Mi m—Fa—Sol7—Do. Le Sol tenu crée une tension avec presque tous les accords — la résolution sur Do est libératrice.",
    lesson: "C'est la technique du 'point d'orgue' classique. Bach l'utilise massivement dans ses Toccatas. Utilise la pédale de dominante sur les 8 dernières mesures d'une toccata pour créer l'élan vers la conclusion.",
    difficulty: 2,
  },
  {
    id: 'ostinato', name: 'Ostinato au pédalier', icon: '🔁', color: '#8a6dc8',
    description: "Motif court répété sans fin au pédalier pendant que les mains improvisent librement. Base de la passacaille et du ground bass.",
    exercise: "Pédalier : Do—Sol—Do—Sol (noires, tempo lent). Mains : improvise librement en Do majeur. Change les harmonies toutes les 4 mesures : I—IV—V—I, puis I—VI—II—V, puis I—III—IV—V...",
    lesson: "L'ostinato doit être si intégré dans les pieds qu'il devient automatique — alors les mains sont libres d'improviser vraiment. Commencer à travailler l'ostinato seul au pédalier pendant 5 minutes avant d'ajouter les mains.",
    difficulty: 2,
  },
  {
    id: 'basse-marchante', name: 'Basse marchante', icon: '🚶', color: '#4aab7a',
    description: "La basse au pédalier se déplace conjointement (par degrés adjacents). Crée un sentiment de progression et de mouvement continu.",
    exercise: "Pédalier : Do—Ré—Mi—Fa—Sol—Fa—Mi—Ré—Do (montée puis descente, liée). Mains : accords harmonisant chaque note (I—II—III—IV—V—IV—III—II—I). Très lentement d'abord.",
    lesson: "La basse chromatique descendante (Do—Si—Si♭—La—La♭—Sol) est le 'lamento' baroque. Elle convient particulièrement au Carême et aux méditations. Chaque demi-ton crée une harmonie différente et souvent surprenante.",
    difficulty: 2,
  },
  {
    id: 'independance', name: 'Indépendance des 3 membres', icon: '🤸', color: '#6a9fd8',
    description: "Jouer 3 parties simultanées indépendantes : main droite (soprano/alto), main gauche (ténor), pédalier (basse). La richesse unique de l'orgue.",
    exercise: "Exercice progressif : 1) Pédalier seul : Do—Sol—Do—Sol. 2) + MG : accord de Do à chaque mesure. 3) + MD : mélodie simple. Maîtriser chaque étape avant la suivante.",
    lesson: "Travailler MD + pédalier SANS la MG, puis MG + pédalier sans la MD. L'indépendance s'acquiert par l'isolation de chaque membre. 10 minutes par jour d'exercice pédalier seul change tout.",
    difficulty: 3,
  },
]

// ─── MÉTHODES data ─────────────────────────────────────────────────────────────

const METHODES = [
  {
    id: 'modal-libre', name: 'Improvisation modale', icon: '🌙', color: '#8a6dc8',
    subtitle: "Se limiter à une gamme — pas d'accords imposés",
    principle: "Choisir un mode et improviser en utilisant uniquement ses notes. La contrainte de la gamme libère l'esprit des progressions imposées. Tout sonne 'juste' dans le mode.",
    steps: [
      "Choisis ton mode : Ré dorien pour méditation, Sol mixolydien pour luminosité, Mi phrygien pour mystère",
      "Joue la gamme entière de bas en haut plusieurs fois — l'intérioriser dans les doigts",
      "Commence avec 3–4 notes seulement (ex. Ré—Mi—Fa—Sol en dorien)",
      "Ajoute progressivement des sauts d'intervalle, puis des ornements",
      "La basse peut tenir la tonique en pédalier pendant tout l'exercice",
    ],
    example: "Ré dorien : Ré—Mi—Fa—Sol—La—Si—Do—Ré. Pédalier tient Ré. Mains : improvisation libre sur ces 8 notes uniquement.",
    difficulty: 1,
  },
  {
    id: 'cantus-firmus', name: 'Cantus Firmus', icon: '📜', color: '#d4a017',
    subtitle: "Mélodie lente tenue, harmonisation libre au-dessus",
    principle: "Le cantus firmus ('chant fixe') est une mélodie lente tenue dans une voix pendant que les autres improvisent librement. Base de la polyphonie médiévale et baroque.",
    steps: [
      "Choisis une mélodie simple (cantique ou mélodie improvisée) — 4 à 8 notes maximum",
      "Joue-la très lente au pédalier ou MG : une note toutes les 2–4 mesures",
      "Au-dessus, improvise librement : contre-chants, arabesques, harmonies changeantes",
      "La mélodie lente donne la structure — tu varies librement car l'armature est là",
      "Change de voix : passe la mélodie du pédalier à la MG, puis à la MD",
    ],
    example: "En Do majeur : pédalier joue Do (4 mes.) → Sol (4 mes.) → Fa (4 mes.) → Do (4 mes.). Mains harmonisent librement ces basses.",
    difficulty: 2,
  },
  {
    id: 'harmonisation', name: 'Harmonisation à vue', icon: '🎹', color: '#4aab7a',
    subtitle: "Donner des harmonies originales à une mélodie existante",
    principle: "Prendre une mélodie connue et improviser les harmonies sous elle. Les meilleurs organistes harmonisent n'importe quel cantique à vue avec des harmonies originales.",
    steps: [
      "Prends une mélodie très simple (début d'un cantique ou mélodie courte)",
      "Identifie les notes aux temps forts : ce sont elles qui dictent l'harmonie",
      "Pour chaque note, trouve l'accord dont elle est la 1ère, 3e ou 5e",
      "Commence par I, IV, V seulement — couvre 80% des harmonisations simples",
      "Progressivement : ajoute II, VI, et des accords de passage chromatiques",
    ],
    example: "Do—Do—Sol—Sol—La—La—Sol (Do maj) : I—I—V—V—VI—VI—V. Enrichi : Imaj7—I—V/V—V—VI—IV6—V7—I.",
    difficulty: 2,
  },
  {
    id: 'fugue-2-voix', name: 'Fugue à 2 voix', icon: '🔗', color: '#d4524a',
    subtitle: "Un sujet imité dans une deuxième voix",
    principle: "La fugue commence par un sujet (thème court) dans une voix, puis l'imite dans une autre voix pendant que la première continue. 2 voix bien conduites suffisent pour la beauté.",
    steps: [
      "Invente un sujet court (4–6 notes, 2–4 mesures) : ex. Do—Ré—Mi—Fa—Mi—Ré",
      "Voix 1 (MD) : joue le sujet complet",
      "Voix 2 (MG) : entre avec le même sujet transposé à la quinte (Sol—La—Si—Do—Si—La)",
      "Pendant que Voix 2 joue, Voix 1 improvise un contre-sujet différent",
      "Continue : les deux voix se passent le sujet en alternance. Le pédalier peut entrer comme 3e voix.",
    ],
    example: "Sujet en Do (4 mesures) → MG reprend en Sol 4 mesures plus tard → pédalier entre en Do après encore 4 mesures. Les voix se 'poursuivent'.",
    difficulty: 3,
  },
  {
    id: 'toccata-progressive', name: 'Toccata progressive', icon: '🚀', color: '#e87c3e',
    subtitle: "Construire la vitesse et l'intensité graduellement",
    principle: "Commencer très lentement et simplement, puis augmenter progressivement vitesse, texture et registration jusqu'au climax. Idéal pour les sorties de célébration.",
    steps: [
      "Phase 1 (30 sec) : Un accord tenu pp. Puis 4 notes lentes sur I—IV—V—I.",
      "Phase 2 (30 sec) : Même progression avec notes de passage entre les accords. Légèrement plus rapide.",
      "Phase 3 (30 sec) : Arpèges montants et descendants sur chaque accord. Ajout du pédalier.",
      "Phase 4 (30 sec) : Gammes rapides reliant les accords. Crescendo. Ajout de registration.",
      "Phase 5 (30 sec) : Tutti. Accords plaqués fff. Toccata pleine vitesse. Accord final tenu.",
    ],
    example: "En Do majeur — 2m30 total. Chaque phase 30 secondes. Le public entend la pièce 'se construire'. Très efficace pour sortie de messe.",
    difficulty: 2,
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function DifficultyBadge({ n }) {
  const labels = { 1: 'Facile', 2: 'Moyen', 3: 'Avancé' }
  const colors = { 1: '#4aab7a', 2: '#d4a017', 3: '#d4524a' }
  return (
    <span className="text-xs px-2 py-0.5 rounded font-medium text-black" style={{ backgroundColor: colors[n] }}>
      {labels[n]}
    </span>
  )
}

// ─── FORMES TAB ────────────────────────────────────────────────────────────────

function FormesTab() {
  const [openId, setOpenId] = useState('aba')

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-4">
        Une improvisation longue a besoin d'une <span className="text-white">forme</span> — une architecture qui lui donne début, développement et fin. Voici les 5 formes fondamentales.
      </p>
      {FORMES.map(f => {
        const isOpen = openId === f.id
        return (
          <div key={f.id} className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-[#1e1e35] transition-colors"
              onClick={() => setOpenId(isOpen ? null : f.id)}
            >
              <span className="text-2xl">{f.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-semibold">{f.name}</span>
                  <DifficultyBadge n={f.difficulty} />
                  <span className="text-xs text-gray-500">{f.duration}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{f.description}</p>
              </div>
              <span className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-[#242442]">
                {/* Structure */}
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mt-4 mb-3">Structure des sections</h4>
                <div className="space-y-2">
                  {f.sections.map((s, i) => (
                    <div key={i} className="flex gap-3 bg-[#0f0f1a] rounded-lg p-3">
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black"
                        style={{ backgroundColor: f.color }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-white font-medium">{s.label}</span>
                          <span className="text-xs text-gray-500 font-mono">
                            ~{Math.round(f.proportions[i] * 100)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">🎛️ {s.registration}</p>
                        <p className="text-xs text-gray-300">{s.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Tips */}
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mt-4 mb-2">Conseils</h4>
                <ul className="space-y-1.5">
                  {f.tips.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <span style={{ color: f.color }} className="flex-shrink-0 mt-0.5">→</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── MODULATION TAB ────────────────────────────────────────────────────────────

function ModulationTab() {
  const [fromKey, setFromKey] = useState(0)
  const [toKey, setToKey]     = useState(7)
  const [activeChord, setActiveChord] = useState(null)

  const pivots = useMemo(() => findPivotChords(fromKey, toKey), [fromKey, toKey])

  function handlePlayPivot(p) {
    setActiveChord(p.root)
    playChord(chordMidi(p.root, p.type), 1.5)
    setTimeout(() => setActiveChord(null), 1600)
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
        <p className="text-sm text-gray-300 mb-4">
          La <span className="text-[#d4a017] font-medium">modulation</span> permet de changer de tonalité en cours d'improvisation.
          Un <span className="text-white font-medium">accord pivot</span> appartient aux deux tonalités simultanément — il sert de pont naturel.
        </p>

        {/* Key selectors */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {[{ label: 'Tonalité de départ', val: fromKey, set: setFromKey },
            { label: 'Tonalité d\'arrivée', val: toKey, set: setToKey }].map(({ label, val, set }) => (
            <div key={label}>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{label}</p>
              <div className="flex flex-wrap gap-1.5">
                {KEYS_ORDER.map(k => (
                  <button
                    key={k}
                    onClick={() => set(k)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      val === k ? 'bg-[#d4a017] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
                    }`}
                  >
                    {NOTE_FR[k]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pivot chords */}
        {fromKey === toKey ? (
          <p className="text-gray-500 text-sm text-center py-4">Choisir deux tonalités différentes</p>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg font-semibold" style={{ color: '#d4a017' }}>{NOTE_FR[fromKey]} majeur</span>
              <span className="text-gray-500 text-xl">→</span>
              <span className="text-lg font-semibold text-white">{NOTE_FR[toKey]} majeur</span>
            </div>

            {pivots.length === 0 ? (
              <div className="bg-[#0f0f1a] rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">Pas d'accord pivot direct — modulation chromatique nécessaire.</p>
                <p className="text-xs text-gray-500">Technique : jouer V7 de la tonalité d'arrivée sans préparation (modulation directe ou enharmonique).</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Accords pivot disponibles — clique pour entendre :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pivots.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handlePlayPivot(p)}
                      className={`text-left bg-[#0f0f1a] rounded-xl p-4 border transition-all hover:scale-[1.02] ${
                        activeChord === p.root ? 'border-[#d4a017] shadow-lg' : 'border-[#2a2a4a] hover:border-[#3a3a6a]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-semibold text-lg">{p.name}</span>
                        <span className="text-xs bg-[#d4a017]/20 text-[#d4a017] px-2 py-0.5 rounded">▶</span>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <span>
                          <span className="text-gray-500 text-xs">En {NOTE_FR[fromKey]} : </span>
                          <span className="font-mono font-bold" style={{ color: DEGREE_COLORS[p.degreeFrom] || '#fff' }}>{p.degreeFrom}</span>
                        </span>
                        <span className="text-gray-600">→</span>
                        <span>
                          <span className="text-gray-500 text-xs">En {NOTE_FR[toKey]} : </span>
                          <span className="font-mono font-bold" style={{ color: DEGREE_COLORS[p.degreeTo] || '#fff' }}>{p.degreeTo}</span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Step by step */}
                <div className="bg-[#0f0f1a] rounded-xl p-4 mt-2">
                  <h4 className="text-white text-sm font-semibold mb-3">Comment utiliser le premier accord pivot :</h4>
                  {pivots[0] && (
                    <ol className="space-y-2 text-sm text-gray-300">
                      <li className="flex gap-2"><span className="text-[#d4a017] font-bold flex-shrink-0">1.</span>Improvise normalement en <strong>{NOTE_FR[fromKey]} majeur</strong></li>
                      <li className="flex gap-2"><span className="text-[#d4a017] font-bold flex-shrink-0">2.</span>Joue l'accord <strong>{pivots[0].name}</strong> — il est <span className="font-mono" style={{ color: DEGREE_COLORS[pivots[0].degreeFrom] }}>{pivots[0].degreeFrom}</span> de {NOTE_FR[fromKey]}, mais aussi <span className="font-mono" style={{ color: DEGREE_COLORS[pivots[0].degreeTo] }}>{pivots[0].degreeTo}</span> de {NOTE_FR[toKey]}</li>
                      <li className="flex gap-2"><span className="text-[#d4a017] font-bold flex-shrink-0">3.</span>Après cet accord, enchaîne avec <strong>V7 de {NOTE_FR[toKey]}</strong> ({NOTE_FR[(toKey + 7) % 12]} maj7)</li>
                      <li className="flex gap-2"><span className="text-[#d4a017] font-bold flex-shrink-0">4.</span>Résous sur <strong>I de {NOTE_FR[toKey]}</strong> — tu es arrivé !</li>
                    </ol>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Theory box */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
        <h4 className="text-white font-semibold text-sm mb-3">🎓 Pourquoi ça marche</h4>
        <p className="text-sm text-gray-300 leading-relaxed">
          Un accord pivot fonctionne parce que l'oreille est <em>ambiguë</em> : elle n'entend pas la fonction harmonique, elle entend les sons. L'accord de <strong>La mineur</strong> est VI en Do majeur et II en Sol majeur — exactement les mêmes 3 notes. En jouant cet accord, tu "switches" mentalement vers la nouvelle tonalité. L'auditeur n'entend pas la modulation — il la <em>ressent</em>, comme si le paysage avait changé sans qu'il ait bougé.
        </p>
      </div>
    </div>
  )
}

// ─── PÉDALIER TAB ──────────────────────────────────────────────────────────────

function PedalierTab() {
  const [openId, setOpenId] = useState('pedale-tonique')

  return (
    <div className="space-y-3">
      <div className="bg-[#1a1a2e] rounded-xl border border-[#d4a017]/30 p-4 mb-4">
        <p className="text-sm text-gray-300">
          <span className="text-[#d4a017] font-semibold">Le pédalier</span> est ce qui rend l'orgue unique. Maîtriser l'indépendance des pieds et des mains ouvre un univers sonore impossible sur tout autre instrument.
        </p>
      </div>
      {PEDALIER.map(p => {
        const isOpen = openId === p.id
        return (
          <div key={p.id} className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-[#1e1e35] transition-colors"
              onClick={() => setOpenId(isOpen ? null : p.id)}
            >
              <span className="text-2xl">{p.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{p.name}</span>
                  <DifficultyBadge n={p.difficulty} />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{p.description}</p>
              </div>
              <span className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-[#242442]">
                <div className="mt-4 bg-[#0f0f1a] rounded-xl p-4 mb-3">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">🎯 Exercice</h4>
                  <p className="text-sm text-gray-200 leading-relaxed">{p.exercise}</p>
                </div>
                <div className="bg-[#242442] rounded-xl p-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">🎓 Pourquoi ça marche</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{p.lesson}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── GÉNÉRATEUR TAB ────────────────────────────────────────────────────────────

function GenerateurTab() {
  const [form, setForm]       = useState('aba')
  const [keyClass, setKey]    = useState(0)
  const [duration, setDuration] = useState(6)
  const [plan, setPlan]       = useState(null)

  function generate() {
    const forme = FORMES.find(f => f.id === form)
    const keys = forme.keyFn(keyClass)
    const total = duration * 60 // seconds
    const sections = forme.sections.map((s, i) => ({
      ...s,
      keyLabel: keys[i] || KN(keyClass),
      durationSec: Math.round(forme.proportions[i] * total),
    }))
    setPlan({ forme, sections, keyClass, duration })
  }

  function fmt(sec) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return m > 0 ? (s > 0 ? `${m}min ${s}s` : `${m}min`) : `${s}s`
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
        <h4 className="text-white font-semibold text-sm mb-4">Paramètres de ton improvisation</h4>

        <div className="space-y-4">
          {/* Form */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Forme</p>
            <div className="flex flex-wrap gap-2">
              {FORMES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setForm(f.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    form === f.id ? 'text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
                  }`}
                  style={form === f.id ? { backgroundColor: f.color } : {}}
                >
                  {f.icon} {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Key */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tonalité de départ</p>
            <div className="flex flex-wrap gap-1.5">
              {KEYS_ORDER.map(k => (
                <button
                  key={k}
                  onClick={() => setKey(k)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    keyClass === k ? 'bg-[#d4a017] text-black' : 'bg-[#242442] text-gray-400 hover:bg-[#2a2a55]'
                  }`}
                >
                  {NOTE_FR[k]}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Durée cible : <span className="text-[#d4a017] font-semibold">{duration} minutes</span>
            </p>
            <input
              type="range" min={2} max={15} value={duration}
              onChange={e => setDuration(+e.target.value)}
              className="w-full accent-[#d4a017]"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>2 min</span><span>15 min</span>
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full py-3 bg-[#d4a017] text-black font-semibold rounded-xl hover:bg-[#c49010] transition-colors"
          >
            ⚡ Générer mon plan d'improvisation
          </button>
        </div>
      </div>

      {/* Generated plan */}
      {plan && (
        <div className="fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{plan.forme.icon}</span>
            <div>
              <h3 className="text-white font-semibold">{plan.forme.name} — {NOTE_FR[plan.keyClass]} majeur</h3>
              <p className="text-xs text-gray-500">Plan pour {plan.duration} minutes</p>
            </div>
          </div>

          <div className="space-y-3">
            {plan.sections.map((s, i) => {
              let elapsed = 0
              for (let j = 0; j < i; j++) elapsed += plan.sections[j].durationSec
              return (
                <div key={i} className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold"
                      style={{ backgroundColor: plan.forme.color }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white font-semibold text-sm">{s.label}</span>
                        <span className="text-xs text-gray-500 font-mono">{fmt(elapsed)} → {fmt(elapsed + s.durationSec)}</span>
                        <span className="text-xs bg-[#242442] text-[#d4a017] px-2 py-0.5 rounded font-mono">{fmt(s.durationSec)}</span>
                      </div>
                      <p className="text-xs text-[#6a9fd8] mb-1">🎵 {s.keyLabel}</p>
                      <p className="text-xs text-gray-500 mb-1">🎛️ {s.registration}</p>
                      <p className="text-sm text-gray-300">{s.action}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-4">
            <h4 className="text-white text-sm font-semibold mb-2">📌 Conseils pour cette forme</h4>
            <ul className="space-y-1.5">
              {plan.forme.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <span style={{ color: plan.forme.color }} className="flex-shrink-0">→</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MÉTHODES TAB ──────────────────────────────────────────────────────────────

function MethodesTab() {
  const [openId, setOpenId] = useState('modal-libre')

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-4">
        Une <span className="text-white">méthode</span> est une approche cognitive de l'improvisation — une façon de penser pendant qu'on joue.
      </p>
      {METHODES.map(m => {
        const isOpen = openId === m.id
        return (
          <div key={m.id} className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-[#1e1e35] transition-colors"
              onClick={() => setOpenId(isOpen ? null : m.id)}
            >
              <span className="text-2xl">{m.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-semibold">{m.name}</span>
                  <DifficultyBadge n={m.difficulty} />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{m.subtitle}</p>
              </div>
              <span className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-[#242442]">
                <div className="mt-4 bg-[#0f0f1a] rounded-xl p-4 mb-3">
                  <p className="text-sm text-gray-300 leading-relaxed italic">{m.principle}</p>
                </div>

                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Étapes</h4>
                <ol className="space-y-2 mb-4">
                  {m.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                      <span className="font-bold flex-shrink-0" style={{ color: m.color }}>{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>

                <div className="bg-[#242442] rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Exemple concret</p>
                  <p className="text-sm text-gray-200">{m.example}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Improvisation() {
  const [tab, setTab] = useState('formes')

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Improvisation libre
        </h2>
        <p className="text-gray-400 text-sm">
          Formes complètes, modulations, pédalier, générateur de plans et méthodes d'improvisation.
        </p>
      </div>

      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === t.id
                ? 'bg-[#d4a017] text-black'
                : 'bg-[#1a1a2e] text-gray-400 hover:text-gray-200 border border-[#2a2a4a]'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {tab === 'formes'     && <FormesTab />}
      {tab === 'modulation' && <ModulationTab />}
      {tab === 'pedalier'   && <PedalierTab />}
      {tab === 'generateur' && <GenerateurTab />}
      {tab === 'methodes'   && <MethodesTab />}
    </div>
  )
}
