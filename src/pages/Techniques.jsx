import { useState } from 'react'
import { playChord } from '../utils/audio.js'

const TECHNIQUES = [
  {
    id: 'basse-obstinee',
    title: 'Basse obstinée',
    subtitle: 'Ostinato bass',
    icon: '🔁',
    what: "Une basse obstinée est un motif de basse qui se répète indéfiniment, pendant que la mélodie évolue librement au-dessus. C'est l'un des outils les plus puissants de l'improvisateur.",
    why: "La basse obstinée libère votre esprit : une fois le motif automatisé à la main gauche, vous pouvez concentrer toute votre attention sur la mélodie de la main droite. Cela crée aussi une cohérence harmonique naturelle.",
    example: {
      title: 'Motif classique en Do : C – G – Am – F',
      desc: "Jouez ces quatre notes en boucle à la main gauche. La progression harmonique I–V–vi–IV est l'une des plus universelles de la musique occidentale.",
      notes: [
        { label: 'Do (C3)', midi: 48 },
        { label: 'Sol (G3)', midi: 55 },
        { label: 'La (A3)', midi: 57 },
        { label: 'Fa (F3)', midi: 53 },
      ],
    },
    tip: "Mémorisez d'abord le motif de basse seul, en boucle, pendant 2 minutes. Ensuite ajoutez des accords simples à la main droite. Enfin, ajoutez une mélodie. Construisez couche par couche.",
    exercice: "Jouez la basse C–G–Am–F en boucle pendant 2 minutes, puis ajoutez des accords à la main droite.",
  },
  {
    id: 'pedal-point',
    title: "Point d'orgue harmonique",
    subtitle: 'Pédale harmonique',
    icon: '📌',
    what: "La pédale harmonique consiste à tenir une note de basse fixe tandis que les harmonies changent librement au-dessus. Elle peut être tenue à la pédale d'orgue ou à la main gauche.",
    why: "La pédale de dominante (tenir le Sol pendant que les accords bougent) crée une tension immense qui prépare un climax magnifique. La pédale de tonique (tenir le Do) donne, elle, un sentiment de paix et de stabilité.",
    example: {
      title: "Pédale de dominante : tenir Sol grave pendant que les accords changent",
      desc: "Maintenez un Sol (G2, pédale ou main gauche) et faites défiler G–C–Dm–Em–F–G à la main droite. Entendez la tension qui monte vers la résolution finale.",
      notes: [{ label: 'Sol dom. 7e (G2–G3–B3–D4–F4)', midi: [43, 55, 59, 62, 65] }],
    },
    tip: "Commencez par la pédale de tonique (tenir la note Do pendant I–IV–I–V–I). C'est plus facile — tout semble serein. Essayez ensuite la pédale de dominante pour créer de la tension.",
    exercice: "Maintenez un Sol grave (pédale) pendant 8 temps, harmonisez avec G7–C–G7–C à la main droite.",
  },
  {
    id: 'ornements',
    title: 'Ornementation liturgique',
    subtitle: 'Ornements',
    icon: '❆',
    what: "Les ornements sont de petites figures mélodiques rapides qui embellissent les notes principales. À l'orgue, ils compensent l'absence de nuance dynamique par des figures rythmiques expressives.",
    why: "Sur un instrument sans expressivité de pression (contrairement au piano), les ornements sont un des rares moyens de créer de l'expression mélodique. Ils imitent la voix humaine et les instruments baroques.",
    ornements: [
      {
        nom: 'Trille (tr)',
        notation: 'tr~~~~',
        desc: "Alternance rapide entre la note et sa voisine supérieure. Noté « tr » au-dessus de la note.",
        fingering: "Utilisez les doigts 2–3 ou 3–4. Alternez rapidement en maintenant la position de la main.",
        usage: "Sur les notes longues ou avant une cadence. Le trille sur la sensible avant l'accord de tonique est très expressif.",
      },
      {
        nom: 'Mordant',
        notation: '⌒',
        desc: "Une seule alternance vers le bas puis retour : note–voisine inférieure–note. Très court, décoratif.",
        fingering: "Frappez la note, descendez d'un demi-ton, revenez. Trois notes très rapides.",
        usage: "Idéal pour les introductions, les premières notes d'un thème, pour donner de l'élan.",
      },
      {
        nom: "Appoggiature",
        notation: '♪→',
        desc: "Note d'appui non-accordique sur le temps fort, qui résout sur la note réelle. Crée une tension expressive.",
        fingering: "Appuyez sur une note légèrement dissonante (ex. Ré avant Do), puis résolvez sur la note de l'accord.",
        usage: "Pour les lignes mélodiques expressives, dans les pièces lentes, à la communion.",
      },
    ],
    tip: "Commencez toujours les ornements lentement, notes séparées. Ce n'est qu'une fois que vos doigts connaissent le chemin que vous accélérez progressivement.",
    exercice: "Pratiquez le trille sur Ré–Mi en alternant rapidement les doigts 3 et 4, d'abord lentement, puis de plus en plus vite.",
  },
  {
    id: 'contrepoint',
    title: 'Contrepoint à deux voix',
    subtitle: 'Deux voix indépendantes',
    icon: '↕',
    what: "Le contrepoint consiste à jouer deux lignes mélodiques indépendantes simultanément, chacune avec sa propre logique et son propre mouvement.",
    why: "Le contrepoint est le fondement de la polyphonie organique. C'est ce qui donne à Bach sa richesse inimitable. Même une forme simple à deux voix enrichit considérablement une improvisation.",
    rules: [
      { num: '1', text: "Mouvement contraire : quand une voix monte, l'autre descend (de préférence)." },
      { num: '2', text: "Évitez les quintes et octaves parallèles : ne bougez pas les deux voix du même intervalle en même temps." },
      { num: '3', text: "Rejoignez-vous sur les consonances (3ces, 6tes, octaves) sur les temps forts." },
    ],
    example: {
      title: 'Mouvement contraire simple',
      desc: 'Main droite : Do–Ré–Mi–Fa–Sol / Main gauche : Sol–Fa–Mi–Ré–Do. Les deux mains montent et descendent en même temps mais en sens opposé.',
      voices: ['MD : Do – Ré – Mi – Fa – Sol', 'MG : Sol – Fa – Mi – Ré – Do'],
      chords: [
        { label: 'Tierce (Do4–Mi4)', midi: [60, 64] },
        { label: 'Sixte (Do4–La4)', midi: [60, 69] },
      ],
    },
    tip: "Prenez une mélodie simple que vous connaissez (cantique, chant grégorien). Ajoutez en dessous une ligne de basse qui monte quand la mélodie descend, et descend quand elle monte. C'est déjà du contrepoint.",
    exercice: "Jouez Do–Ré–Mi–Fa–Sol à la main droite avec Sol–Fa–Mi–Ré–Do à la main gauche simultanément. Ensuite inventez votre propre mouvement contraire.",
  },
  {
    id: 'modulation',
    title: 'Modulation simple',
    subtitle: 'Changer de tonalité',
    icon: '🔀',
    what: "La modulation est le fait de glisser d'une tonalité à une autre au milieu d'une improvisation. Elle crée du renouveau, de l'intérêt et peut symboliser une progression dramatique.",
    why: "Sans modulation, une longue improvisation peut devenir monotone. Moduler vers la dominante (la quinte au-dessus) apporte de l'élan et de la lumière. Revenir à la tonique crée une satisfaction de retour.",
    modulations: [
      {
        type: 'Vers la dominante',
        exemple: "Do → Sol (monter d'une quinte)",
        pivot: "L'accord de Do majeur (IV de Sol) = pivot naturel. Jouez I–IV–V–I en Do, puis continuez en Sol.",
        effet: "Sensation d'élévation, d'énergie croissante.",
      },
      {
        type: 'Vers la sous-dominante',
        exemple: "Do → Fa (monter d'une quarte)",
        pivot: "Le Sol7 (V en Do) = IV de Fa. Utilisez-le comme pont de transition.",
        effet: "Atmosphère plus grave, plus recueillie.",
      },
      {
        type: 'Majeur ↔ Mineur (même tonique)',
        exemple: 'Do majeur → Do mineur',
        pivot: "Pas de pivot nécessaire : aplatissez simplement la 3e, 6e et 7e. Même basse, couleur radicalement différente.",
        effet: "Passage de la lumière à l'ombre, très expressif.",
      },
    ],
    example: {
      desc: "Entendez la différence de couleur entre Do majeur et Sol majeur :",
      chords: [
        { label: 'Do majeur (I)', midi: [60, 64, 67] },
        { label: 'Sol majeur (nouvelle tonique)', midi: [55, 59, 62, 67] },
      ],
    },
    tip: "La modulation vers la dominante est la plus naturelle et la plus facile. Apprenez-la d'abord : I–IV–V–I en Do, puis I–IV–V–I en Sol. Voilà votre première modulation.",
    exercice: "Commencez en Do majeur (I–IV–V–I), puis modulez vers Sol majeur en utilisant l'accord de Do comme pivot (il devient IV en Sol).",
  },
  {
    id: 'harmonisation',
    title: 'Harmonisation de mélodie',
    subtitle: 'Trouver les accords',
    icon: '🎯',
    what: "Harmoniser une mélodie, c'est choisir les accords qui « habillent » les notes de la ligne mélodique. Pour chaque note, plusieurs accords sont possibles.",
    why: "Savoir harmoniser libère l'improvisateur : vous pouvez jouer n'importe quelle mélodie connue (cantique, thème liturgique) et lui ajouter une harmonisation personnelle et expressive.",
    rules: [
      { num: '1', text: "Identifiez quels accords contiennent la note de mélodie : Do → I (Do–Mi–Sol), IV (Fa–La–Do), vi (La–Do–Mi)." },
      { num: '2', text: "Préférez I, IV, V sur les temps forts ; ii et vi pour les notes de passage." },
      { num: '3', text: "Les cadences sont les moments les plus importants : finissez sur V–I ou IV–I." },
      { num: '4', text: "Ne changez pas d'accord à chaque note — gardez le même accord 2 à 4 notes si possible." },
    ],
    walkthrough: [
      { note: 'Do', accord: 'I (Do–Mi–Sol)', raison: 'Note de tonique → accord de tonique' },
      { note: 'Mi', accord: 'I (Do–Mi–Sol)', raison: 'Contenu dans I, garder la continuité' },
      { note: 'Sol', accord: 'I ou V', raison: 'Sol appartient à I et V — choisir selon le contexte' },
      { note: 'La', accord: 'IV ou vi', raison: "La appartient à IV (Fa–La–Do) et vi (La–Do–Mi)" },
      { note: 'Sol', accord: 'V (Sol–Si–Ré)', raison: 'Préparer la cadence' },
      { note: 'Fa', accord: 'IV (Fa–La–Do)', raison: "Fa appartient à IV — moment de 'respiration'" },
      { note: 'Mi', accord: 'I ou iii', raison: 'Mi appartient à I et iii (Mi–Sol–Si)' },
      { note: 'Ré', accord: 'V7 (Sol–Si–Ré–Fa)', raison: 'Ré dans V7 — tension maximale avant résolution' },
      { note: 'Do', accord: 'I (Do–Mi–Sol)', raison: 'Résolution cadentielle — fin' },
    ],
    example: {
      desc: "Entendez la cadence V–I, moment le plus important de toute harmonisation :",
      chords: [
        { label: 'Sol majeur (V)', midi: [55, 59, 62, 67] },
        { label: 'Do majeur (I)', midi: [48, 60, 64, 67] },
      ],
    },
    tip: "Concentrez-vous d'abord sur les cadences : les 2–3 dernières notes de chaque phrase. Un V–I clair à chaque fin de phrase structure toute l'improvisation.",
    exercice: "Harmonisez la mélodie Do–Mi–Sol–La–Sol–Fa–Mi–Ré–Do en choisissant vos accords selon les règles ci-dessus.",
  },
  {
    id: 'ostinato-rythmique',
    title: 'Ostinato rythmique',
    subtitle: 'Variations de texture',
    icon: '🥁',
    what: "Le même accord peut prendre des caractères radicalement différents selon la façon dont vous le jouez rythmiquement. La « texture » change tout.",
    why: "Varier la texture d'un accord permet de maintenir l'intérêt tout au long d'une pièce, de graduer l'intensité, et d'adapter le style à chaque moment liturgique.",
    textures: [
      {
        nom: 'Accords plaqués',
        notation: '♩ ♩ ♩ ♩',
        desc: "Toutes les notes jouées ensemble sur chaque temps. Noble, direct, affirmé.",
        usage: "Entrées, acclamations, sorties festives.",
        midi: [60, 64, 67],
      },
      {
        nom: 'Arpège',
        notation: '♩↑ (bas → haut)',
        desc: "Les notes jouées l'une après l'autre de bas en haut. Coulant, expressif, lié.",
        usage: "Communion, méditation, accompagnement délicat.",
        midi: [60, 64, 67],
      },
      {
        nom: "Basse d'Albert",
        notation: 'bas–acc–bas–acc',
        desc: "Basse–accord–basse–accord alternés. Classique, énergique, régulier.",
        usage: "Introductions de cantiques, accompagnements de psaumes.",
        midi: [60, 64, 67],
      },
      {
        nom: 'Soutenu + mélodie',
        notation: 'MG tient / MD chante',
        desc: "La main gauche tient l'accord, la main droite joue une mélodie. Intime, chantant.",
        usage: "Duo, communion, solo expressif.",
        midi: [60, 64, 67],
      },
    ],
    tip: "Entraînez-vous à passer d'une texture à l'autre sur le même accord de Do majeur, sans interruption. C'est cet enchaînement fluide qui donne l'impression de virtuosité.",
    exercice: "Prenez l'accord de Do majeur et jouez-le dans les 4 textures différentes, 4 temps chacune, sans vous arrêter.",
  },
]

function AudioButton({ label, midi, duration = 2 }) {
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    if (playing) return
    try {
      const notes = Array.isArray(midi) ? midi : [midi]
      playChord(notes, duration)
      setPlaying(true)
      setTimeout(() => setPlaying(false), duration * 1000 + 200)
    } catch (e) {
      console.error('Audio error:', e)
      setPlaying(false)
    }
  }

  return (
    <button
      onClick={handlePlay}
      disabled={playing}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
        playing
          ? 'bg-[#d4a017]/30 border-[#d4a017]/60 text-[#d4a017] cursor-not-allowed'
          : 'bg-[#1a1a2e] border-[#2a2a4a] text-gray-300 hover:border-[#d4a017]/50 hover:text-[#d4a017]'
      }`}
    >
      <span>{playing ? '🔊' : '▶'}</span>
      <span>{label}</span>
    </button>
  )
}

function ExerciceBox({ text }) {
  return (
    <div className="mt-4 border-l-4 border-[#d4a017] bg-[#0f0f1a] rounded-r-xl p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#d4a017] mb-1">Exercice</p>
      <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

function TechniqueCard({ technique, isOpen, onToggle }) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1e1e35] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{technique.icon}</span>
          <div>
            <h3 className="text-[#d4a017] font-semibold text-base">{technique.title}</h3>
            <p className="text-gray-500 text-xs">{technique.subtitle}</p>
          </div>
        </div>
        <span
          className="text-gray-400 text-lg transition-transform duration-300"
          style={{ display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-[#2a2a4a]">
          <TechniqueContent technique={technique} />
        </div>
      )}
    </div>
  )
}

function TechniqueContent({ technique }) {
  switch (technique.id) {
    case 'basse-obstinee': return <BasseObstineeContent t={technique} />
    case 'pedal-point': return <PedalPointContent t={technique} />
    case 'ornements': return <OrnementContent t={technique} />
    case 'contrepoint': return <ContrepointContent t={technique} />
    case 'modulation': return <ModulationContent t={technique} />
    case 'harmonisation': return <HarmonisationContent t={technique} />
    case 'ostinato-rythmique': return <OstinatoRythmiqueContent t={technique} />
    default: return null
  }
}

function InfoBlocks({ what, why }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Ce que c'est</p>
        <p className="text-gray-300 text-sm leading-relaxed">{what}</p>
      </div>
      <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Pourquoi ça marche</p>
        <p className="text-gray-300 text-sm leading-relaxed">{why}</p>
      </div>
    </div>
  )
}

function TipBox({ tip }) {
  return (
    <div className="flex items-start gap-3 bg-[#1e1e35] rounded-xl p-4 border border-[#2a2a4a]">
      <span className="text-xl flex-shrink-0">💡</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Conseil pratique</p>
        <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
      </div>
    </div>
  )
}

function BasseObstineeContent({ t }) {
  return (
    <div className="pt-4 space-y-4">
      <InfoBlocks what={t.what} why={t.why} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Exemple pratique</p>
        <p className="text-gray-300 text-sm mb-3">{t.example.title}</p>
        <p className="text-gray-400 text-sm mb-3">{t.example.desc}</p>
        <div className="flex flex-wrap gap-2">
          {t.example.notes.map((n) => (
            <AudioButton key={n.midi} label={n.label} midi={n.midi} duration={1.5} />
          ))}
        </div>
      </div>
      <TipBox tip={t.tip} />
      <ExerciceBox text={t.exercice} />
    </div>
  )
}

function PedalPointContent({ t }) {
  return (
    <div className="pt-4 space-y-4">
      <InfoBlocks what={t.what} why={t.why} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Exemple — Pédale de dominante</p>
        <p className="text-gray-300 text-sm mb-3">{t.example.title}</p>
        <p className="text-gray-400 text-sm mb-3">{t.example.desc}</p>
        <div className="flex flex-wrap gap-2">
          {t.example.notes.map((n, i) => (
            <AudioButton key={i} label={n.label} midi={n.midi} duration={3} />
          ))}
        </div>
      </div>
      <TipBox tip={t.tip} />
      <ExerciceBox text={t.exercice} />
    </div>
  )
}

function OrnementContent({ t }) {
  return (
    <div className="pt-4 space-y-4">
      <InfoBlocks what={t.what} why={t.why} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Les trois ornements principaux</p>
        <div className="space-y-3">
          {t.ornements.map((o) => (
            <div key={o.nom} className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4a017] font-semibold text-sm">{o.nom}</span>
                <span className="text-gray-600 text-sm font-mono">{o.notation}</span>
              </div>
              <p className="text-gray-300 text-sm mb-1">{o.desc}</p>
              <p className="text-gray-400 text-xs mb-1"><span className="text-gray-500">Doité : </span>{o.fingering}</p>
              <p className="text-gray-400 text-xs"><span className="text-gray-500">Utilisation : </span>{o.usage}</p>
            </div>
          ))}
        </div>
      </div>
      <TipBox tip={t.tip} />
      <ExerciceBox text={t.exercice} />
    </div>
  )
}

function ContrepointContent({ t }) {
  return (
    <div className="pt-4 space-y-4">
      <InfoBlocks what={t.what} why={t.why} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Règles fondamentales</p>
        <div className="space-y-2">
          {t.rules.map((r) => (
            <div key={r.num} className="flex items-start gap-2 text-sm">
              <span className="text-[#d4a017] font-bold flex-shrink-0 w-4">{r.num}.</span>
              <span className="text-gray-300">{r.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Exemple — {t.example.title}</p>
        <p className="text-gray-400 text-sm mb-3">{t.example.desc}</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {t.example.voices.map((v) => (
            <div key={v} className="bg-[#0f0f1a] rounded-lg p-3 border border-[#2a2a4a] text-center">
              <p className="text-gray-300 text-xs font-mono">{v}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-xs mb-2">Entendez les consonances :</p>
        <div className="flex flex-wrap gap-2">
          {t.example.chords.map((c) => (
            <AudioButton key={c.label} label={c.label} midi={c.midi} duration={2} />
          ))}
        </div>
      </div>
      <TipBox tip={t.tip} />
      <ExerciceBox text={t.exercice} />
    </div>
  )
}

function ModulationContent({ t }) {
  return (
    <div className="pt-4 space-y-4">
      <InfoBlocks what={t.what} why={t.why} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Trois types de modulation</p>
        <div className="space-y-3">
          {t.modulations.map((m) => (
            <div key={m.type} className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <p className="text-[#d4a017] font-semibold text-sm mb-1">{m.type}</p>
              <p className="text-gray-300 text-xs mb-1"><span className="text-gray-500">Exemple : </span>{m.exemple}</p>
              <p className="text-gray-400 text-xs mb-1"><span className="text-gray-500">Pivot : </span>{m.pivot}</p>
              <p className="text-gray-400 text-xs"><span className="text-gray-500">Effet : </span>{m.effet}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-2">{t.example.desc}</p>
        <div className="flex flex-wrap gap-2">
          {t.example.chords.map((c) => (
            <AudioButton key={c.label} label={c.label} midi={c.midi} duration={2} />
          ))}
        </div>
      </div>
      <TipBox tip={t.tip} />
      <ExerciceBox text={t.exercice} />
    </div>
  )
}

function HarmonisationContent({ t }) {
  return (
    <div className="pt-4 space-y-4">
      <InfoBlocks what={t.what} why={t.why} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Règles d'harmonisation</p>
        <div className="space-y-2">
          {t.rules.map((r) => (
            <div key={r.num} className="flex items-start gap-2 text-sm">
              <span className="text-[#d4a017] font-bold flex-shrink-0 w-4">{r.num}.</span>
              <span className="text-gray-300">{r.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Harmonisation de Do–Mi–Sol–La–Sol–Fa–Mi–Ré–Do
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2a2a4a]">
                <th className="text-left text-gray-500 py-2 pr-3 font-medium">Note</th>
                <th className="text-left text-gray-500 py-2 pr-3 font-medium">Accord</th>
                <th className="text-left text-gray-500 py-2 font-medium">Raison</th>
              </tr>
            </thead>
            <tbody>
              {t.walkthrough.map((row, i) => (
                <tr key={i} className="border-b border-[#2a2a4a]/50">
                  <td className="py-1.5 pr-3 text-[#d4a017] font-semibold">{row.note}</td>
                  <td className="py-1.5 pr-3 text-white font-mono text-xs">{row.accord}</td>
                  <td className="py-1.5 text-gray-400">{row.raison}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-2">{t.example.desc}</p>
        <div className="flex flex-wrap gap-2">
          {t.example.chords.map((c) => (
            <AudioButton key={c.label} label={c.label} midi={c.midi} duration={2} />
          ))}
        </div>
      </div>
      <TipBox tip={t.tip} />
      <ExerciceBox text={t.exercice} />
    </div>
  )
}

function OstinatoRythmiqueContent({ t }) {
  return (
    <div className="pt-4 space-y-4">
      <InfoBlocks what={t.what} why={t.why} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Les 4 textures fondamentales</p>
        <div className="space-y-3">
          {t.textures.map((tx, i) => (
            <div key={tx.nom} className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#d4a017] font-semibold text-sm">{i + 1}. {tx.nom}</span>
                    <span className="text-gray-600 text-xs font-mono border border-[#2a2a4a] px-2 py-0.5 rounded">
                      {tx.notation}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{tx.desc}</p>
                  <p className="text-gray-500 text-xs">Idéal pour : {tx.usage}</p>
                </div>
                <AudioButton label="Écouter" midi={tx.midi} duration={2} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <TipBox tip={t.tip} />
      <ExerciceBox text={t.exercice} />
    </div>
  )
}

export default function Techniques() {
  const [openTechniques, setOpenTechniques] = useState(new Set())

  function toggleTechnique(idx) {
    setOpenTechniques(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Techniques avancées
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Ces techniques transforment une improvisation basique en une véritable expression musicale.
          Chacune est un outil que vous apprendrez à sortir au bon moment, selon la liturgie et l'émotion du moment.
        </p>
      </div>

      <div className="space-y-3">
        {TECHNIQUES.map((technique, idx) => (
          <TechniqueCard
            key={technique.id}
            technique={technique}
            isOpen={openTechniques.has(idx)}
            onToggle={() => toggleTechnique(idx)}
          />
        ))}
      </div>

      <div className="mt-6 text-center text-gray-600 text-xs">
        Cliquez sur un titre pour ouvrir la leçon. Plusieurs leçons peuvent être ouvertes simultanément.
      </div>
    </div>
  )
}
