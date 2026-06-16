const NAV_ITEMS = [
  { id: 'home',          label: 'Accueil',      icon: '🏠' },
  { id: 'solfege',       label: 'Solfège',       icon: '📝' },
  { id: 'gammes',        label: 'Gammes',        icon: '🎹' },
  { id: 'accords',       label: 'Accords',       icon: '🎵' },
  { id: 'progressions',  label: 'Progressions',  icon: '🎼' },
  { id: 'styles',        label: 'Styles',        icon: '📖' },
  { id: 'entrainement',  label: 'Entraînement',  icon: '⏱️' },
  { id: 'messe',         label: 'La Messe',      icon: '⛪' },
  { id: 'cantiques',     label: 'Cantiques',     icon: '🎵' },
  { id: 'calendrier',    label: 'Calendrier',    icon: '📅' },
  { id: 'techniques',    label: 'Techniques',    icon: '🎓' },
  { id: 'registrations', label: 'Jeux d\'orgue', icon: '🎛️' },
  { id: 'preparation',   label: 'Préparation',   icon: '📋' },
]

export default function Navigation({ current, onChange }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a14] border-b border-[#2a2a4a] shadow-lg">
      <div className="max-w-5xl mx-auto px-2">
        {/* Header */}
        <div className="flex items-center gap-3 py-3 px-2 border-b border-[#1a1a2e]">
          <span className="text-2xl">🎵</span>
          <div>
            <h1 className="font-cinzel text-[#d4a017] text-lg font-semibold leading-tight">
              OrganImpro
            </h1>
            <p className="text-xs text-gray-500 leading-tight">
              Guide d'improvisation à l'orgue
            </p>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex overflow-x-auto scrollbar-hide gap-0">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                current === item.id
                  ? 'border-[#d4a017] text-[#d4a017]'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
