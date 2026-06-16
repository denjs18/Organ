import { useState } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAMILLES = [
  {
    id: 'fonds-flutes',
    nom: 'Fonds et Flûtes',
    emoji: '🌊',
    caractere:
      "Rondes, douces, chaleureuses. Les tuyaux bouchés (Bourdon) produisent des sons riches en harmoniques impairs, créant cette rondeur typique. Les flûtes ouvertes sont plus brillantes.",
    quand:
      "Base de toute registration. Seules : recueillement, communion. En ensemble : fondation de l'orgue plein.",
    jeux: [
      { nom: "Bourdon 16'", desc: "Grave, solennel, fondation de la pédale. Rare au manuel seul." },
      { nom: "Bourdon 8'", desc: "Cœur chaud de l'orgue. La registration de base pour la plupart des offices." },
      { nom: "Flûte 8'", desc: "Plus ouverte que le Bourdon, légèrement plus brillante." },
      { nom: "Flûte harmonique 8'", desc: "Tuyaux double longueur — son flûté très pur, limpide. Idéal pour les solos." },
      { nom: "Prestant 4'", desc: "Octave du Bourdon 8'. Ajoute clarté sans alourdir." },
      { nom: "Flûte 4'", desc: "Renforce l'octave aiguë, texture plus légère que le Prestant." },
      { nom: "Doublette 2'", desc: "Piccolo. Ajoute brillance et projette le son dans la nef." },
    ],
    exemples: [
      { label: "Communion", reg: "Bourdon 8' seul ou + Flûte 8'" },
      { label: "Méditation", reg: "Flûte harmonique 8' au Récit" },
      { label: "Accompagnement de psaume", reg: "Bourdon 8' + Prestant 4'" },
    ],
    color: '#4aab7a',
  },
  {
    id: 'principaux',
    nom: 'Principaux',
    emoji: '🏛️',
    caractere:
      "Clairs, stables, « organistiques ». Ce sont les jeux typiques de l'orgue, ni flûtés ni cuivrés. La Mixture ajoute plusieurs rangs d'octaves et quintes, créant la plénitude sonore.",
    quand:
      "Chants liturgiques, entrées, sorties. Le « plein jeu » de Bach et Buxtehude.",
    jeux: [
      { nom: "Montre 16'", desc: "Grand principal de pédale ou manuel 16'. Majesté et gravité." },
      { nom: "Montre 8'", desc: "Le jeu « principal » par excellence. Orgue classique." },
      { nom: "Principal 8'", desc: "Similaire à la Montre, souvent plus brillant selon l'orgue." },
      { nom: "Octave 4'", desc: "Renforce la brillance. Presque toujours avec le Principal 8'." },
      { nom: "Quinte 2⅔'", desc: "Renforce le 3e harmonique naturel. Ajoute « corps » sans monter en pitch." },
      { nom: "Mixture / Fourniture / Cymbale", desc: "Plusieurs rangs, grandes fêtes et Gloria. Son « pleins jeux »." },
    ],
    exemples: [
      { label: "Entrée ordinaire", reg: "Montre 8' + Bourdon 8' + Octave 4'" },
      { label: "Plein jeu", reg: "+ Doublette 2' + Mixture" },
      { label: "Sortie festive", reg: "Grand-Orgue complet + Pédale forte" },
    ],
    color: '#d4a017',
  },
  {
    id: 'cordes',
    nom: 'Cordes',
    emoji: '🎻',
    caractere:
      "Légèrement nasales, vibrantes. Imitent les instruments à cordes. La Voix céleste est accordée légèrement désaccordée par rapport à la Gambe, créant un battement (vibrato naturel).",
    quand:
      "Accompagnement délicat, pièces romantiques, communion très douce.",
    jeux: [
      { nom: "Gambe 8'", desc: "Viole de gambe. Légèrement stridente, très expressive." },
      { nom: "Salicional 8'", desc: "Plus douce que la Gambe, plus ronde." },
      { nom: "Voix céleste 8'", desc: "Toujours avec la Gambe ou le Salicional. Le battement crée un effet céleste." },
      { nom: "Aeoline 8'", desc: "La plus douce de toutes. Presque inaudible seule." },
    ],
    exemples: [
      { label: "Communion silencieuse", reg: "Voix céleste + Gambe 8'" },
      { label: "Accompagnement romantique", reg: "Salicional 8' + Voix céleste" },
    ],
    color: '#6a9fd8',
  },
  {
    id: 'anches',
    nom: 'Anches',
    emoji: '🎺',
    caractere:
      "Puissantes, cuivrées, tranchantes. Une anche vibrante (anche battante) amplifie les harmoniques aigus. La Trompette est le « roi » de l'orgue en solo.",
    quand:
      "Sorties, acclamations, solos de fête. Avec discernement : une Trompette bien placée est bouleversante.",
    jeux: [
      { nom: "Bombarde 16'", desc: "Réservée aux grandes fêtes. Avec toute la pédale." },
      { nom: "Trompette 8'", desc: "Jeu phare de l'orgue français. Solo ou en ensemble." },
      { nom: "Clairon 4'", desc: "Trompette d'octave. Toujours avec la Trompette 8'." },
      { nom: "Cromorne 8'", desc: "Anche chamoisée, plus douce. Bonne pour les solos de récit." },
      { nom: "Basson-Hautbois 8'", desc: "Très expressif. Solo lyrique au Récit." },
    ],
    exemples: [
      { label: "Solo de fête", reg: "Récit : Flûte 8' + Hautbois 8'" },
      { label: "Sortie majestueuse", reg: "GO + Pédale + Trompette 8' + Clairon 4'" },
      { label: "Acclamation", reg: "Pleins jeux + Trompette" },
    ],
    color: '#d4524a',
  },
]

const OCCASIONS_REG = [
  {
    id: 'communion-silencieuse',
    label: 'Communion silencieuse',
    emoji: '🕊️',
    reg: "Voix céleste + Gambe 8' (Récit, boîte fermée)",
    explication:
      "La Voix céleste désaccordée crée un léger battement qui imite une vibration douce et céleste. La boîte fermée atténue encore le volume. Effet de recueillement maximum.",
  },
  {
    id: 'psaume-meditatif',
    label: 'Psaume méditatif',
    emoji: '📖',
    reg: "Flûte 8' seule",
    explication:
      "La flûte seule produit un son pur et sans harmoniques agressifs. Idéale pour accompagner la voix humaine sans la couvrir.",
  },
  {
    id: 'intro-cantique',
    label: 'Introduction de cantique',
    emoji: '🎵',
    reg: "Flûte 8' + Prestant 4'",
    explication:
      "Le Prestant 4' renforce l'octave aiguë, donnant de la clarté à la mélodie sans l'écraser. L'assemblée entend bien la note à chanter.",
  },
  {
    id: 'entree-ordinaire',
    label: 'Entrée ordinaire',
    emoji: '⛪',
    reg: "Montre 8' + Bourdon 8' + Prestant 4'",
    explication:
      "Une registration classique, ni trop forte ni trop douce. La Montre donne le caractère « organistique », le Bourdon la chaleur, le Prestant la clarté.",
  },
  {
    id: 'entree-festive',
    label: 'Entrée festive',
    emoji: '🎉',
    reg: "+ Doublette 2' + Mixture + Trompette 8'",
    explication:
      "On ajoute la Doublette et la Mixture pour le plein jeu, puis la Trompette pour le caractère festif et sonore. Réservé aux grandes fêtes.",
  },
  {
    id: 'sortie-majestueuse',
    label: 'Sortie majestueuse',
    emoji: '🏛️',
    reg: "Grand-Orgue complet + Pédale forte + Trompette 8' + Clairon 4'",
    explication:
      "Toute la puissance de l'orgue. Les Anches (Trompette + Clairon) tranchent au-dessus du plein jeu. Ne pas abuser — réserver aux grandes fêtes.",
  },
  {
    id: 'acclamation',
    label: 'Acclamation',
    emoji: '✨',
    reg: "Pleins jeux + Trompette 8' + Clairon 4'",
    explication:
      "Similaire à la sortie majestueuse mais peut être plus court. Parfait pour l'Alléluia pascal ou les acclamations festives.",
  },
  {
    id: 'solo-meditation',
    label: 'Solo de méditation',
    emoji: '🎶',
    reg: "Récit : Hautbois 8' ou Flûte harmonique 8'",
    explication:
      "Le Récit avec boîte expressive permet de nuancer le volume. L'Hautbois ou la Flûte harmonique ont un timbre pur et expressif, parfait pour un solo lyrique.",
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function FamilleCard({ famille, isOpen, onToggle }) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1e1e35] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{famille.emoji}</span>
          <div>
            <h3 className="font-semibold text-white text-base">{famille.nom}</h3>
            <p className="text-xs mt-0.5" style={{ color: famille.color }}>
              {famille.jeux.length} jeux — {famille.quand.split('.')[0]}
            </p>
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
        <div className="border-t border-[#2a2a4a] px-5 pb-5 pt-4">
          {/* Character */}
          <div className="mb-4 p-4 bg-[#0f0f1a] rounded-xl border border-[#2a2a4a]">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Caractère sonore</p>
            <p className="text-gray-300 text-sm leading-relaxed">{famille.caractere}</p>
          </div>
          <div className="mb-4 p-4 bg-[#0f0f1a] rounded-xl border border-[#2a2a4a]">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Quand l'utiliser</p>
            <p className="text-gray-300 text-sm leading-relaxed">{famille.quand}</p>
          </div>

          {/* Stops list */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Jeux de cette famille</p>
            <div className="space-y-2">
              {famille.jeux.map((j) => (
                <div key={j.nom} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5"
                    style={{ backgroundColor: famille.color }}
                  />
                  <div>
                    <span className="text-white text-sm font-medium">{j.nom}</span>
                    <span className="text-gray-400 text-sm"> — {j.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example registrations */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Registrations types
            </p>
            <div className="space-y-2">
              {famille.exemples.map((ex) => (
                <div
                  key={ex.label}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: `${famille.color}10`, border: `1px solid ${famille.color}25` }}
                >
                  <span className="text-xs font-semibold text-gray-400 flex-shrink-0 pt-0.5 min-w-32">
                    {ex.label}
                  </span>
                  <span className="text-sm font-mono" style={{ color: famille.color }}>
                    {ex.reg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function OccasionCard({ occasion, isOpen, onToggle }) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#1e1e35] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{occasion.emoji}</span>
          <span className="text-gray-200 text-sm font-medium">{occasion.label}</span>
        </div>
        <span
          className="text-gray-500 text-sm transition-transform duration-300"
          style={{ display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-[#2a2a4a] px-4 pb-4 pt-3">
          <div className="mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Registration</p>
            <p className="text-[#d4a017] font-mono text-sm">{occasion.reg}</p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{occasion.explication}</p>
        </div>
      )}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Registrations() {
  const [openFamille, setOpenFamille] = useState(null)
  const [openOccasion, setOpenOccasion] = useState(null)

  function toggleFamille(id) {
    setOpenFamille(prev => (prev === id ? null : id))
  }
  function toggleOccasion(id) {
    setOpenOccasion(prev => (prev === id ? null : id))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-cinzel text-2xl text-[#d4a017] font-semibold mb-1">
          Guide de registration
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          La registration, c'est choisir sa couleur sonore avant de jouer. Avant de toucher le premier
          accord, l'organiste choisit ses jeux — ces tirettes ou pistons qui ouvrent les familles de
          tuyaux. Chaque famille a son caractère, sa place dans la liturgie.
        </p>
      </div>

      {/* ── Section 1 : Familles de jeux ── */}
      <section className="mb-8">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span>🎛️</span> Les quatre grandes familles
        </h3>
        <div className="space-y-3">
          {FAMILLES.map((f) => (
            <FamilleCard
              key={f.id}
              famille={f}
              isOpen={openFamille === f.id}
              onToggle={() => toggleFamille(f.id)}
            />
          ))}
        </div>
      </section>

      {/* ── Section 2 : Registrations par occasion ── */}
      <section className="mb-8">
        <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
          <span>📋</span> Registrations par occasion
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          Cliquez sur chaque occasion pour voir la registration suggérée et pourquoi elle fonctionne.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OCCASIONS_REG.map((o) => (
            <OccasionCard
              key={o.id}
              occasion={o}
              isOpen={openOccasion === o.id}
              onToggle={() => toggleOccasion(o.id)}
            />
          ))}
        </div>
      </section>

      {/* ── Section 3 : Acoustique ── */}
      <section className="mb-8">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span>🔬</span> Comprendre l'acoustique
        </h3>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 space-y-4">
          <div>
            <p className="text-gray-300 text-sm font-semibold mb-2">
              Pourquoi les jeux de 4', 2' et la Quinte rendent-ils le son plus brillant sans monter de registre ?
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Chaque jeu renforce un harmonique naturel déjà présent dans la note fondamentale. Ce phénomène
              s'appelle la série harmonique : tout tuyau produit non seulement sa note fondamentale, mais aussi
              des harmoniques plus aigus à des intervalles précis.
            </p>
          </div>

          <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#d4a017] mb-3">
              La série harmonique naturelle
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#2a2a4a]">
                    <th className="text-left text-gray-500 py-2 pr-4 font-medium">Jeu</th>
                    <th className="text-left text-gray-500 py-2 pr-4 font-medium">Harmonique renforcé</th>
                    <th className="text-left text-gray-500 py-2 font-medium">Effet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a4a]/50">
                  {[
                    { jeu: "Bourdon / Principal 8'", harm: "1er harmonique (fondamentale)", effet: "La note elle-même — base sonore" },
                    { jeu: "Prestant / Octave 4'", harm: "2e harmonique (octave +1)", effet: "Clarté, projection" },
                    { jeu: "Quinte 2⅔'", harm: "3e harmonique (quinte +1 oct)", effet: "Corps, profondeur sans alourdir" },
                    { jeu: "Doublette 2'", harm: "4e harmonique (octave +2)", effet: "Brillance, projection dans la nef" },
                    { jeu: "Mixture (plusieurs rangs)", harm: "5e, 6e, 7e harmoniques et plus", effet: "Plénitude totale — son d'orgue festif" },
                  ].map((row) => (
                    <tr key={row.jeu}>
                      <td className="py-2 pr-4 text-[#d4a017] font-mono">{row.jeu}</td>
                      <td className="py-2 pr-4 text-gray-300">{row.harm}</td>
                      <td className="py-2 text-gray-400">{row.effet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <p className="text-[#d4a017] font-semibold text-sm mb-2">Pourquoi les Pleins jeux sonnent festifs</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                La Mixture renforce simultanément beaucoup d'harmoniques. Le son devient riche, complexe,
                et remplit l'espace acoustique de la nef. C'est pourquoi on l'utilise pour le Gloria et les
                sorties triomphales.
              </p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <p className="text-[#6a9fd8] font-semibold text-sm mb-2">Pourquoi la Flûte seule sonne intime</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Le Bourdon 8' ou la Flûte seule produit peu d'harmoniques (tuyau bouché = harmoniques impairs
                seulement). Le son est simple, pur, personnel — parfait pour la communion et le recueillement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4 : Connaître son instrument ── */}
      <section>
        <div className="border-l-4 border-[#d4a017] bg-[#1a1a2e] rounded-r-xl p-5">
          <p className="text-[#d4a017] font-semibold text-sm mb-2 flex items-center gap-2">
            <span>⚠️</span> Connaître son instrument
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Chaque orgue est unique. Ces registrations sont des <em>principes</em>, pas des recettes.
            Les noms des jeux varient d'un instrument à l'autre, et un « Bourdon 8' » sur un orgue
            peut sonner très différemment d'un autre.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            <strong className="text-white">Avant chaque office</strong>, prenez 10–15 minutes pour
            explorer votre instrument : testez chaque jeu seul, notez les combinaisons qui fonctionnent
            bien dans l'acoustique de votre église. Créez votre propre « carnet de registrations ».
          </p>
        </div>
      </section>
    </div>
  )
}
