export default function Home({ onNavigate }) {
  const features = [
    {
      id: 'gammes',
      icon: '🎹',
      title: 'Gammes & Modes',
      desc: 'Visualisez les notes disponibles sur un clavier interactif selon la tonalité et le mode choisis. Entendez la gamme.',
      color: '#d4a017',
    },
    {
      id: 'accords',
      icon: '🎵',
      title: 'Accords',
      desc: 'Découvrez les 7 accords naturels de votre tonalité, leur couleur musicale et comment les enchaîner.',
      color: '#6a9fd8',
    },
    {
      id: 'progressions',
      icon: '🎼',
      title: 'Progressions',
      desc: 'Enchaînements prêts à l\'emploi par contexte liturgique : sortie solennelle, introduction de cantique, communion...',
      color: '#8a6dc8',
    },
    {
      id: 'styles',
      icon: '📖',
      title: 'Guide par Styles',
      desc: 'Pour chaque occasion, les conseils pratiques : registration, tonalité recommandée, technique, astuces.',
      color: '#4aab7a',
    },
    {
      id: 'entrainement',
      icon: '⏱️',
      title: 'Entraînement',
      desc: 'Tirage aléatoire d\'un contexte (occasion + tonalité + ambiance). Minuteur, puis réflexion.',
      color: '#e07a40',
    },
  ]

  const tips = [
    'L\'improvisation, c\'est apprendre à habiter le présent musical. Un seul accord bien soutenu vaut mieux que dix accords précipités.',
    'Commencez toujours par établir la tonique (I). Revenez-y souvent — c\'est votre ancrage.',
    'En mineur, essayez le mode dorien : comme mineur mais avec une 6e montée qui donne une couleur lumineuse et très liturgique.',
    'Le silence fait partie de la musique. Ne remplissez pas tout — laissez les notes résonner.',
    'Pour une sortie, la progression I–IV–V–I suffit. Répétez-la 3 fois avec plus d\'intensité à chaque fois.',
    'En communion, jouez doucement. Moins de notes, plus de legato, plus de présence.',
    'Le V7 (dominante septième) crée une tension magnifique qui réclame le I : c\'est la cadence parfaite.',
  ]

  const tip = tips[Math.floor(Date.now() / 86400000) % tips.length]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in-up">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🎹</div>
        <h2 className="font-cinzel text-3xl text-[#d4a017] font-semibold mb-3">
          OrganImpro
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Ton guide personnel d'improvisation à l'orgue — visuel, pratique, et sans solfège complexe.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Conçu pour un organiste autodidacte qui veut improviser avec assurance dans tous les styles liturgiques.
        </p>
      </div>

      {/* Tip of the day */}
      <div className="bg-[#1a1a2e] border border-[#d4a017]/30 rounded-xl p-5 mb-8 pulse-gold">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-[#d4a017] text-xs font-semibold uppercase tracking-wide mb-1">
              Conseil du jour
            </p>
            <p className="text-gray-200 text-sm leading-relaxed">{tip}</p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {features.map(f => (
          <button
            key={f.id}
            onClick={() => onNavigate(f.id)}
            className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 text-left hover:border-[#3a3a6a] transition-all hover:scale-[1.02] hover:bg-[#1e1e35] group"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-white mb-2 group-hover:text-[#d4a017] transition-colors">
              {f.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            <div className="mt-3 text-xs font-medium" style={{ color: f.color }}>
              Explorer →
            </div>
          </button>
        ))}
      </div>

      {/* How to use */}
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span>🗺️</span> Comment utiliser cette application
        </h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <span className="text-[#d4a017] font-bold mt-0.5">1.</span>
            <p>Commence par <strong className="text-white">Gammes</strong> pour t'habituer à visualiser une tonalité sur le clavier.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#d4a017] font-bold mt-0.5">2.</span>
            <p>Explore <strong className="text-white">Accords</strong> pour voir et entendre les 7 accords disponibles dans ta tonalité.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#d4a017] font-bold mt-0.5">3.</span>
            <p>Apprends les <strong className="text-white">Progressions</strong> d'un style qui t'intéresse. Écoute-les, mémorise les couleurs.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#d4a017] font-bold mt-0.5">4.</span>
            <p>Consulte le <strong className="text-white">Guide par Styles</strong> pour les conseils pratiques de chaque occasion.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#d4a017] font-bold mt-0.5">5.</span>
            <p>Utilise <strong className="text-white">Entraînement</strong> chaque jour pour pratiquer l'improvisation en situation réelle.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
