import { useState } from 'react'
import { STYLE_PROGRESSIONS, NOTE_FR, SCALES } from '../utils/music.js'

const STYLE_DETAILS = [
  {
    id: 'sortie-solennelle',
    icon: '🏛️',
    color: '#d4a017',
    name: 'Sortie solennelle',
    when: 'Fin de messe festive — Pâques, Noël, mariage, ordination',
    duration: '2 à 5 minutes',
    registration: [
      'Grand-orgue : Pleins jeux (Montres, Bourdons, Doublette, Fourniture)',
      'Pédale : Bombarde 16\', Pédale forte',
      'Optionnel : Trompette 8\' au Récit pour le brillant',
    ],
    bestKeys: ['Ré majeur (D)', 'Sol majeur (G)', 'Do majeur (C)', 'Si♭ majeur (Bb)'],
    progression: 'I — IV — V — I',
    structure: [
      { step: '1. Instaurer la tonique', desc: 'Commencez par 2–3 temps sur le I seul, tenu. Laissez l\'orgue remplir l\'église.' },
      { step: '2. Monter vers IV', desc: 'L\'accord IV apporte une élévation naturelle — comme une respiration profonde.' },
      { step: '3. Tension avec V (ou V7)', desc: 'Le V crée l\'attente. V7 est encore plus expressif — n\'ayez pas peur d\'y rester 2 temps.' },
      { step: '4. Résolution sur I', desc: 'Retour au I, puissant et conclusif. C\'est la ponctuation finale.' },
      { step: '5. Varier et répéter', desc: 'Répétez la progression 2–4 fois. À chaque fois : mêmes accords, mais plus d\'ampleur.' },
    ],
    tricks: [
      'Jouez des accords larges en position ouverte : basse au pédalier, accord à la main gauche, mélodie à la droite.',
      'Évitez les accords trop rapprochés — l\'orgue résonne, laissez sonner.',
      'Variez légèrement la mélodie à la main droite à chaque répétition.',
      'Finissez TOUJOURS sur I — longtemps, fort, puis laisser décroître dans le silence.',
    ],
  },
  {
    id: 'entree-procession',
    icon: '⛪',
    color: '#4aab7a',
    name: 'Entrée / Procession',
    when: 'Entrée du prêtre, procession d\'offrande, procession des Rameaux',
    duration: '1 à 3 minutes (selon longueur de la procession)',
    registration: [
      'Principal 8\' + Bourdon 8\' (son rond et posé)',
      'Octave 4\' pour la clarté',
      'Pas de Trompette — préférer un son qui "marche" plutôt que qui "crie"',
    ],
    bestKeys: ['Ré majeur', 'Sol majeur', 'Fa majeur', 'Do majeur'],
    progression: 'I — V — IV — V — I',
    structure: [
      { step: '1. Cadence d\'introduction', desc: 'Jouez quelques secondes d\'introduction (I) avant la procession — c\'est le signal.' },
      { step: '2. Motif rythmique régulier', desc: 'Adoptez un rythme régulier qui imite des pas : noires régulières ou motif pointé.' },
      { step: '3. Alternance I / V', desc: 'I et V alternent comme le balancement naturel de la marche.' },
      { step: '4. IV pour les moments solennels', desc: 'IV apporte une élévation : parfait quand on passe devant l\'autel.' },
      { step: '5. Conclusion flexible', desc: 'Anticipez visuellement la fin de la procession et concluez sur I.' },
    ],
    tricks: [
      'Regardez la procession ! Adaptez votre musique à son rythme naturel.',
      'Un motif répétitif est idéal — la stabilité guide les pas.',
      'Si la procession s\'arrête, passez sur un accord tenu doux puis reprenez.',
      'Mieux vaut une musique simple et régulière qu\'une brillante mais instable.',
    ],
  },
  {
    id: 'introduction-cantique',
    icon: '🎵',
    color: '#8a6dc8',
    name: 'Introduction de cantique',
    when: 'Avant chaque chant de l\'assemblée',
    duration: '4 à 16 mesures (selon le cantique)',
    registration: [
      'Flûte 8\' + Bourdon 8\' (son doux et clair)',
      'Prestant 4\' pour les cantiques dynamiques',
      'Voix humaine ou Gambe si disponible pour la chaleur',
    ],
    bestKeys: ['La tonalité du cantique (suivez la partition du cantique)'],
    progression: 'Mélodie du cantique + I — IV — V — I',
    structure: [
      { step: '1. Jouer la mélodie', desc: 'Jouez la mélodie du cantique seule, clairement, à la main droite, tempo précis.' },
      { step: '2. Harmonie simple', desc: 'Main gauche : accords I, IV, V uniquement. Pas de ii ou vi — restez simple.' },
      { step: '3. Cadence finale', desc: 'Finissez sur V — I avec 1–2 temps de silence. C\'est le top départ pour les chanteurs.' },
      { step: '4. Si inconnu : jouer 2 fois', desc: 'Si le cantique n\'est pas connu, jouez la mélodie entière deux fois avant le chant.' },
    ],
    tricks: [
      'Votre rôle principal : donner la note juste et le tempo exact. C\'est ça l\'introduction.',
      'Trop d\'ornements masquent la mélodie — gardez-la reconnaissable.',
      'Si vous ne connaissez pas le cantique, jouez sa gamme lentement (I puis gamme) pour donner le ton.',
      'Le silence final (1–2 temps) est CRUCIAL : c\'est lui qui donne l\'élan aux chanteurs.',
    ],
  },
  {
    id: 'communion-meditation',
    icon: '🕊️',
    color: '#6a9fd8',
    name: 'Communion / Méditation',
    when: 'Pendant la communion, après les lectures, moments contemplatifs',
    duration: '5 à 15 minutes (souvent)',
    registration: [
      'Flûte harmonique 8\' ou Flûte de cheminée 8\'',
      'Gambe 8\' + Voix céleste (ondulation douce)',
      'Très peu de jeux — favorisez la transparence au volume',
    ],
    bestKeys: ['La min (Am)', 'Ré min (Dm)', 'Mi min (Em)', 'Sol maj (Gm)', 'Ré maj doux'],
    progression: 'i — VII — VI — VII (mode dorien)',
    scaleHint: 'dorian',
    structure: [
      { step: '1. Installer la quiétude', desc: 'Commencez par quelques notes lentes, doucement. N\'entrez pas brusquement.' },
      { step: '2. Mode dorien recommandé', desc: 'La min dorien = La Si Do Ré Mi Fa♯ Sol La. Le Fa♯ donne cette couleur lumineuse et liturgique.' },
      { step: '3. Accords fluides', desc: 'Progressez lentement : i → VII → VI → VII. Restez 4–8 temps sur chaque accord.' },
      { step: '4. Mélodie intérieure', desc: 'Optionnel : jouez une mélodie simple et chantable à la main droite sur ce fond.' },
      { step: '5. Laisser des silences', desc: 'Ce n\'est pas grave de s\'arrêter 2–3 secondes. Le silence est aussi de la musique.' },
    ],
    tricks: [
      'Moins = plus. 4 accords très doux valent mieux que 20 accords pressés.',
      'Le mode dorien est votre meilleur ami ici — essayez-le systématiquement en communion.',
      'Pas d\'accords trop "parfaits" (I majeur fort) — préférez des couleurs ouvertes, modales.',
      'Si vous ne savez plus quoi jouer, tenez un accord de dominante (V) très doucement — l\'assemblée ne s\'en rendra pas compte.',
    ],
  },
  {
    id: 'acclamation',
    icon: '✨',
    color: '#e07a40',
    name: 'Acclamation / Alléluia',
    when: 'Avant l\'Évangile, moments de joie intense (Pâques, Noël)',
    duration: '30 secondes à 1 minute',
    registration: [
      'Pleins jeux Grand-orgue',
      'Trompette 8\' ou Cromorne',
      'Court et brillant — pas besoin de chercher un son subtil',
    ],
    bestKeys: ['Sol majeur', 'Ré majeur', 'La majeur', 'Do majeur'],
    progression: 'I — IV — I — V — I',
    structure: [
      { step: '1. Lancement énergique', desc: 'Entrez fort, sans introduction — une acclamation commence, pas se prépare.' },
      { step: '2. Alternance rapide I/IV/V', desc: 'Accords courts et nets. Évitez les accords trop longs — l\'énergie vient du rythme.' },
      { step: '3. Cadence finale marquée', desc: 'V7 — I final très affirmé, avec une petite pause avant le I conclusif.' },
    ],
    tricks: [
      'Moins de notes, plus d\'impact. Un accord court et net vaut mieux qu\'un remplissage confus.',
      'Un arpège ascendant rapide (basse→ténor→alto→soprano) avant le premier accord lance l\'élan.',
      'Terminez toujours très fort et nettement — l\'assemblée doit sentir la conclusion.',
      'Ne durez pas trop : une acclamation efficace est courte et brillante.',
    ],
  },
  {
    id: 'pont-conclusion',
    icon: '🎶',
    color: '#c0709a',
    name: 'Pont / Petite conclusion',
    when: 'Transition entre deux moments, conclusion légère d\'une partie',
    duration: '15 à 45 secondes',
    registration: [
      'Récit flûte solo, ou Hautbois si disponible',
      'Volume doux — fonction de transition, pas d\'affirmation',
    ],
    bestKeys: ['Toutes tonalités — adaptez à ce qui précède'],
    progression: 'I — vi — IV — V (ou I — V — I pour conclure)',
    structure: [
      { step: '1. Partir discrètement', desc: 'Entrez doucement, sans rupture. La transition doit être naturelle.' },
      { step: '2. I → vi → IV → V', desc: 'Cette progression douce et circulaire crée une atmosphère de calme apaisé.' },
      { step: '3. Conclure sur I ou V', desc: 'Sur I si on conclut. Sur V si on passe à autre chose (laisse la porte ouverte).' },
    ],
    tricks: [
      'Cette progression (I–vi–IV–V) est extrêmement polyvalente — apprenez-la bien.',
      'Elle peut se répéter en boucle discrètement pendant que le prêtre s\'installe.',
      'En mineur : i–VI–III–VII donne un équivalent doux et élégant.',
    ],
  },
]

export default function StylesPage() {
  const [selectedId, setSelectedId] = useState(STYLE_DETAILS[0].id)
  const style = STYLE_DETAILS.find(s => s.id === selectedId)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Guide par Styles
        </h2>
        <p className="text-gray-400 text-sm">
          Tout ce dont tu as besoin pour improviser dans chaque contexte liturgique.
        </p>
      </div>

      {/* Style tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        {STYLE_DETAILS.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            className={`p-2 rounded-xl border text-center transition-all ${
              selectedId === s.id
                ? 'text-black font-medium'
                : 'bg-[#1a1a2e] border-[#2a2a4a] text-gray-400 hover:border-[#3a3a6a]'
            }`}
            style={selectedId === s.id ? { backgroundColor: s.color, borderColor: s.color } : {}}
          >
            <div className="text-2xl">{s.icon}</div>
            <div className="text-xs mt-1 leading-tight">{s.name.split('/')[0].trim()}</div>
          </button>
        ))}
      </div>

      {/* Style detail */}
      <div className="space-y-4 fade-in-up" key={selectedId}>
        {/* Header */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: `${style.color}20`, border: `1px solid ${style.color}50` }}
        >
          <h3 className="text-white font-semibold text-xl flex items-center gap-3 mb-2">
            <span>{style.icon}</span>
            {style.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Quand ? </span>
              <span className="text-gray-200">{style.when}</span>
            </div>
            <div>
              <span className="text-gray-500">Durée ? </span>
              <span className="text-gray-200">{style.duration}</span>
            </div>
          </div>
        </div>

        {/* Registration */}
        <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span>🎛️</span> Registration conseillée
          </h4>
          <ul className="space-y-2">
            {style.registration.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="mt-1 text-gray-600">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Keys + Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🎵</span> Tonalités recommandées
            </h4>
            <div className="flex flex-wrap gap-2">
              {style.bestKeys.map(k => (
                <span
                  key={k}
                  className="px-3 py-1 rounded-lg text-sm font-medium text-black"
                  style={{ backgroundColor: style.color }}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🎼</span> Progression type
            </h4>
            <div
              className="text-lg font-mono font-bold"
              style={{ color: style.color }}
            >
              {style.progression}
            </div>
            {style.scaleHint && (
              <p className="text-xs text-gray-500 mt-2">
                Mode recommandé : {SCALES[style.scaleHint]?.name}
              </p>
            )}
          </div>
        </div>

        {/* Step-by-step */}
        <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-5">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> Comment improviser — étape par étape
          </h4>
          <div className="space-y-4">
            {style.structure.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs"
                  style={{ backgroundColor: style.color }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{s.step}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tricks */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: `${style.color}12`, border: `1px solid ${style.color}25` }}
        >
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span>💡</span> Astuces pratiques
          </h4>
          <ul className="space-y-2">
            {style.tricks.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                <span style={{ color: style.color }} className="flex-shrink-0 mt-0.5">→</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
