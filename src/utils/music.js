// Note names (index 0 = C)
export const NOTE_FR = ['Do', 'Do♯', 'Ré', 'Ré♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si']
export const NOTE_EN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const NOTE_FR_FLAT = ['Do', 'Ré♭', 'Ré', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si']

// Scale intervals from root (in semitones)
export const SCALES = {
  major:      { intervals: [0, 2, 4, 5, 7, 9, 11], name: 'Majeur', color: '#d4a017', description: 'Lumineux, joyeux, festif' },
  minor:      { intervals: [0, 2, 3, 5, 7, 8, 10], name: 'Mineur naturel', color: '#6a9fd8', description: 'Mélancolique, intérieur, recueilli' },
  dorian:     { intervals: [0, 2, 3, 5, 7, 9, 10], name: 'Dorien', color: '#8a6dc8', description: 'Modal, mystérieux, médiéval — très liturgique' },
  mixolydian: { intervals: [0, 2, 4, 5, 7, 9, 10], name: 'Mixolydien', color: '#4aab7a', description: 'Majeur avec une couleur modale, populaire, chaleureux' },
  phrygian:   { intervals: [0, 1, 3, 5, 7, 8, 10], name: 'Phrygien', color: '#d4524a', description: 'Grave, solennel, oriental — idéal pour l\'Avent/Carême' },
}

// Chord intervals (semitones from root)
export const CHORD_INTERVALS = {
  M:   [0, 4, 7],      // Majeur
  m:   [0, 3, 7],      // Mineur
  dim: [0, 3, 6],      // Diminué
  '7': [0, 4, 7, 10],  // Dominante 7e
  'M7':[0, 4, 7, 11],  // Majeur 7e
  'm7':[0, 3, 7, 10],  // Mineur 7e
  sus4:[0, 5, 7],      // Sus4
  aug: [0, 4, 8],      // Augmenté
}

export const CHORD_TYPE_NAMES = {
  M: 'majeur', m: 'mineur', dim: 'dim.', '7': 'dom. 7e',
  'M7': 'maj. 7e', 'm7': 'min. 7e', sus4: 'sus4', aug: 'aug.'
}

// Diatonic chords in major key
export const DIATONIC_MAJOR = [
  { degree: 'I',    offset: 0,  type: 'M',   color: '#d4a017', usage: 'Tonique — point de départ et d\'arrivée' },
  { degree: 'ii',   offset: 2,  type: 'm',   color: '#6a9fd8', usage: 'Sous-dominante — tension douce, vers IV ou V' },
  { degree: 'iii',  offset: 4,  type: 'm',   color: '#4aab7a', usage: 'Médiane — couleur, substitut de I ou V' },
  { degree: 'IV',   offset: 5,  type: 'M',   color: '#8a6dc8', usage: 'Sous-dominante — élévation, avant V ou I' },
  { degree: 'V',    offset: 7,  type: 'M',   color: '#d4524a', usage: 'Dominante — tension maximale, appelle I' },
  { degree: 'vi',   offset: 9,  type: 'm',   color: '#e07a40', usage: 'Tonique relative — plus douce que I' },
  { degree: 'vii°', offset: 11, type: 'dim', color: '#7a8a9a', usage: 'Sensible — instable, remplace V' },
]

// Diatonic chords in minor key
export const DIATONIC_MINOR = [
  { degree: 'i',   offset: 0,  type: 'm',   color: '#6a9fd8', usage: 'Tonique mineure — atmosphère sombre, intérieure' },
  { degree: 'ii°', offset: 2,  type: 'dim', color: '#7a8a9a', usage: 'Diminué — tension, instable' },
  { degree: 'III', offset: 3,  type: 'M',   color: '#d4a017', usage: 'Médiante majeure — luminosité relative' },
  { degree: 'iv',  offset: 5,  type: 'm',   color: '#8a6dc8', usage: 'Sous-dominante mineure — douceur sombre' },
  { degree: 'V',   offset: 7,  type: 'M',   color: '#d4524a', usage: 'Dominante (harmonique) — résolution vers i' },
  { degree: 'VI',  offset: 8,  type: 'M',   color: '#4aab7a', usage: 'Sus-médiante — couleur majeure dans le mineur' },
  { degree: 'VII', offset: 10, type: 'M',   color: '#c0709a', usage: 'Sous-tonique — transition douce' },
]

// Returns note classes (0-11) in the scale
export function getScaleNotes(rootClass, scaleType) {
  return SCALES[scaleType].intervals.map(i => (rootClass + i) % 12)
}

// Returns chord note classes (0-11)
export function getChordNoteClasses(rootClass, chordType) {
  return CHORD_INTERVALS[chordType].map(i => (rootClass + i) % 12)
}

// Returns MIDI note numbers for a chord, centered around C4 area
export function getChordMidi(rootClass, chordType, octaveAdjust = 0) {
  // Place root in octave 4 (C4=60) or 3, keeping notes in a playable range
  const base = rootClass > 5
    ? 48 + rootClass  // octave 3 for higher note classes
    : 60 + rootClass  // octave 4 for lower ones
  return CHORD_INTERVALS[chordType].map(i => base + i + octaveAdjust * 12)
}

// Returns chord name in French
export function chordName(rootClass, chordType) {
  const root = NOTE_FR[rootClass]
  const type = CHORD_TYPE_NAMES[chordType] || chordType
  if (chordType === 'M') return `${root} majeur`
  return `${root} ${type}`
}

// Get diatonic chord data for a key
export function getDiatonicChords(rootClass, isMinor = false) {
  const template = isMinor ? DIATONIC_MINOR : DIATONIC_MAJOR
  return template.map(({ degree, offset, type, color, usage }) => {
    const chordRoot = (rootClass + offset) % 12
    return {
      degree,
      type,
      color,
      usage,
      rootClass: chordRoot,
      name: chordName(chordRoot, type),
      noteClasses: getChordNoteClasses(chordRoot, type),
      midiNotes: getChordMidi(chordRoot, type),
    }
  })
}

// Common keys to display
export const KEYS = [
  { root: 0,  label: 'Do (C)',     minor: false },
  { root: 7,  label: 'Sol (G)',    minor: false },
  { root: 2,  label: 'Ré (D)',     minor: false },
  { root: 9,  label: 'La (A)',     minor: false },
  { root: 4,  label: 'Mi (E)',     minor: false },
  { root: 11, label: 'Si (B)',     minor: false },
  { root: 6,  label: 'Fa♯ (F#)',   minor: false },
  { root: 5,  label: 'Fa (F)',     minor: false },
  { root: 10, label: 'Si♭ (Bb)',   minor: false },
  { root: 3,  label: 'Mi♭ (Eb)',   minor: false },
  { root: 8,  label: 'La♭ (Ab)',   minor: false },
  { root: 1,  label: 'Ré♭ (Db)',   minor: false },
  // Minor keys
  { root: 9,  label: 'La min (Am)', minor: true },
  { root: 4,  label: 'Mi min (Em)', minor: true },
  { root: 11, label: 'Si min (Bm)', minor: true },
  { root: 6,  label: 'Fa♯ min',    minor: true },
  { root: 1,  label: 'Ré♭ min',    minor: true },
  { root: 8,  label: 'La♭ min',    minor: true },
  { root: 2,  label: 'Ré min (Dm)', minor: true },
  { root: 7,  label: 'Sol min (Gm)',minor: true },
  { root: 0,  label: 'Do min (Cm)', minor: true },
  { root: 5,  label: 'Fa min (Fm)', minor: true },
  { root: 10, label: 'Si♭ min',    minor: true },
  { root: 3,  label: 'Mi♭ min',    minor: true },
]

// Style-based progressions content
export const STYLE_PROGRESSIONS = [
  {
    id: 'sortie-solennelle',
    icon: '🏛️',
    name: 'Sortie solennelle',
    subtitle: 'Fin de célébration festive',
    description: 'Une sortie noble et éclatante pour conclure une grande messe, Pâques, Noël, un mariage...',
    progression: [
      { degree: 'I',  scale: 'major', bars: 2, label: 'Tonique' },
      { degree: 'IV', scale: 'major', bars: 1, label: 'Élévation' },
      { degree: 'V',  scale: 'major', bars: 1, label: 'Tension' },
      { degree: 'I',  scale: 'major', bars: 2, label: 'Résolution' },
    ],
    keyRecommendations: ['Ré (D)', 'Sol (G)', 'Do (C)', 'Si♭ (Bb)'],
    registration: 'Grand-orgue pleins jeux + Pédale forte',
    tempo: 'Moderato noble  ♩= 72–84',
    color: '#d4a017',
    tips: [
      'Commencez sur l\'accord de tonique (I) tenu 2–3 temps, bien sonore',
      'Montez vers IV avec un léger crescendo d\'énergie',
      'Le V doit sonner comme une grande anticipation — faites-le V7 si possible',
      'Revenez sur I avec force : c\'est la conclusion, ne la précipitez pas',
      'Répétez l\'enchaînement 2–3 fois en variant légèrement le registre',
    ],
  },
  {
    id: 'entree-procession',
    icon: '⛪',
    name: 'Entrée / Procession',
    subtitle: 'Entrée du prêtre ou procession',
    description: 'Un accompagnement rythmique et soutenu qui guide la marche, noble sans être précipité.',
    progression: [
      { degree: 'I',  scale: 'major', bars: 1 },
      { degree: 'V',  scale: 'major', bars: 1 },
      { degree: 'IV', scale: 'major', bars: 1 },
      { degree: 'V',  scale: 'major', bars: 1 },
      { degree: 'I',  scale: 'major', bars: 2 },
    ],
    keyRecommendations: ['Ré (D)', 'Sol (G)', 'Fa (F)', 'Do (C)'],
    registration: 'Principal 8\', Bourdon 8\', Octave 4\'',
    tempo: 'Pas processionnaire  ♩= 76–88',
    color: '#4aab7a',
    tips: [
      'Maintenez un rythme régulier — comme des pas',
      'Alternez des motifs rythmiques simples (croches ou noires)',
      'Ajoutez une mélodie noble à la main droite sur un fond d\'accords à gauche',
      'Anticipez la fin de la procession : ralentissez légèrement pour conclure',
    ],
  },
  {
    id: 'introduction-cantique',
    icon: '🎵',
    name: 'Introduction de cantique',
    subtitle: 'Avant le chant de l\'assemblée',
    description: 'Préparer la communauté à chanter : donner la note, le tempo, l\'ambiance.',
    progression: [
      { degree: 'I',  scale: 'major', bars: 1, label: 'Installer la tonique' },
      { degree: 'V',  scale: 'major', bars: 1, label: 'Tension' },
      { degree: 'IV', scale: 'major', bars: 1, label: 'Sous-dominante' },
      { degree: 'V',  scale: 'major', bars: 1, label: 'Appel' },
      { degree: 'I',  scale: 'major', bars: 1, label: 'Fin claire' },
    ],
    keyRecommendations: ['La tonalité du cantique'],
    registration: 'Flûtes 8\', Prestant 4\'',
    tempo: 'Exactement le tempo du chant',
    color: '#8a6dc8',
    tips: [
      'Jouez la mélodie du cantique à la main droite, nettement',
      'Harmonisez simplement à la main gauche (I, IV, V seulement)',
      'Finissez sur I en laissant 1–2 temps de silence avant que les chanteurs entrent',
      'Si le cantique est inconnu de l\'assemblée, jouez la mélodie deux fois',
    ],
  },
  {
    id: 'communion-meditation',
    icon: '🕊️',
    name: 'Communion / Méditation',
    subtitle: 'Moment de recueillement intérieur',
    description: 'Un accompagnement doux, modal, qui invite à l\'intériorité. Laissez des silences.',
    progression: [
      { degree: 'i',   scale: 'minor', bars: 2, label: 'Repos sombre' },
      { degree: 'VII', scale: 'minor', bars: 2, label: 'Couleur modale' },
      { degree: 'VI',  scale: 'minor', bars: 2, label: 'Douceur' },
      { degree: 'VII', scale: 'minor', bars: 1, label: 'Suspension' },
      { degree: 'i',   scale: 'minor', bars: 1, label: 'Retour' },
    ],
    keyRecommendations: ['La min (Am)', 'Ré min (Dm)', 'Mi min (Em)'],
    registration: 'Flûte 8\', Gambe 8\', Voix céleste',
    tempo: 'Lent et libre  ♩= 50–65',
    color: '#6a9fd8',
    scaleHint: 'dorian',
    tips: [
      'Essayez le mode dorien : il donne une couleur modale très belle en contexte liturgique',
      'Jouez doucement, avec peu de notes — la qualité prime sur la quantité',
      'Laissez des silences : le silence est aussi de la musique',
      'Un solo de flûte à la main droite sur un bourdon à la gauche est très efficace',
    ],
  },
  {
    id: 'acclamation',
    icon: '✨',
    name: 'Acclamation / Alléluia',
    subtitle: 'Moment de joie et de louange',
    description: 'Court, énergique, joyeux. Prépare ou soutient un moment d\'acclamation liturgique.',
    progression: [
      { degree: 'I',  scale: 'major', bars: 1 },
      { degree: 'IV', scale: 'major', bars: 1 },
      { degree: 'I',  scale: 'major', bars: 1 },
      { degree: 'V',  scale: 'major', bars: 1 },
      { degree: 'I',  scale: 'major', bars: 1 },
    ],
    keyRecommendations: ['Sol (G)', 'Ré (D)', 'La (A)', 'Do (C)'],
    registration: 'Pleins jeux, Trompette',
    tempo: 'Vif et joyeux  ♩= 100–120',
    color: '#e07a40',
    tips: [
      'Accords courts et nets — pas de notes trop longues',
      'Un arpège ascendant rapide avant le premier accord donne de l\'élan',
      'La cadence V–I finale doit être nette et conclusive',
      'Moins de notes = plus d\'impact ! Préférez la clarté à la densité',
    ],
  },
  {
    id: 'pont-conclusion',
    icon: '🎶',
    name: 'Pont / Petite conclusion',
    subtitle: 'Transition ou conclusion légère',
    description: 'Une progression douce et universelle pour passer d\'un moment à un autre.',
    progression: [
      { degree: 'I',  scale: 'major', bars: 1 },
      { degree: 'vi', scale: 'major', bars: 1 },
      { degree: 'IV', scale: 'major', bars: 1 },
      { degree: 'V',  scale: 'major', bars: 1 },
    ],
    keyRecommendations: ['Toutes tonalités'],
    registration: 'Récit solo, Flûte harmonique 8\'',
    tempo: 'Libre (rubato)',
    color: '#c0709a',
    tips: [
      'Cette progression I–vi–IV–V est très universelle et agréable',
      'Elle peut s\'enchaîner en boucle ou conclure sur I',
      'Ralentissez vers la fin si vous voulez conclure (ritardando)',
      'En mineur : i–VI–III–VII est l\'équivalent doux',
    ],
  },
]

// Convert degree string + root + scale to chord info
export function degreeToChord(degree, rootClass, scaleType = 'major') {
  const template = scaleType === 'minor' ? DIATONIC_MINOR : DIATONIC_MAJOR
  const found = template.find(d => d.degree === degree)
  if (!found) return null
  const chordRoot = (rootClass + found.offset) % 12
  return {
    ...found,
    rootClass: chordRoot,
    name: chordName(chordRoot, found.type),
    noteClasses: getChordNoteClasses(chordRoot, found.type),
    midiNotes: getChordMidi(chordRoot, found.type),
  }
}

// Practice session contexts
export const PRACTICE_OCCASIONS = [
  { name: 'Sortie de messe dominicale', style: 'sortie-solennelle', mood: 'festif' },
  { name: 'Sortie d\'un mariage', style: 'sortie-solennelle', mood: 'très festif' },
  { name: 'Sortie de Noël', style: 'sortie-solennelle', mood: 'lumineux et festif' },
  { name: 'Entrée d\'une procession', style: 'entree-procession', mood: 'noble et posé' },
  { name: 'Introduction avant un cantique marial', style: 'introduction-cantique', mood: 'doux et dévot' },
  { name: 'Introduction avant un cantique de Pâques', style: 'introduction-cantique', mood: 'joyeux' },
  { name: 'Communion dominicale', style: 'communion-meditation', mood: 'recueilli, intérieur' },
  { name: 'Méditation de l\'Avent', style: 'communion-meditation', mood: 'attendrissant, mystérieux' },
  { name: 'Acclamation de l\'Alléluia pascal', style: 'acclamation', mood: 'triomphant' },
  { name: 'Transition entre deux lectures', style: 'pont-conclusion', mood: 'serein et simple' },
]

export const PRACTICE_KEYS = [
  { root: 0,  label: 'Do (C)', minor: false },
  { root: 7,  label: 'Sol (G)', minor: false },
  { root: 2,  label: 'Ré (D)', minor: false },
  { root: 5,  label: 'Fa (F)', minor: false },
  { root: 9,  label: 'La min (Am)', minor: true },
  { root: 2,  label: 'Ré min (Dm)', minor: true },
  { root: 4,  label: 'Mi min (Em)', minor: true },
  { root: 7,  label: 'Sol min (Gm)', minor: true },
]

export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12)
}
