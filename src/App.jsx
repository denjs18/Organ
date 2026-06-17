import { useState } from 'react'
import Navigation from './components/Navigation.jsx'
import Home from './pages/Home.jsx'
import Solfege from './pages/Solfege.jsx'
import Gammes from './pages/Gammes.jsx'
import Accords from './pages/Accords.jsx'
import Progressions from './pages/Progressions.jsx'
import StylesPage from './pages/StylesPage.jsx'
import Entrainement from './pages/Entrainement.jsx'
import Improvisation from './pages/Improvisation.jsx'
import Messe from './pages/Messe.jsx'
import Cantiques from './pages/Cantiques.jsx'
import Calendrier from './pages/Calendrier.jsx'
import Techniques from './pages/Techniques.jsx'
import Registrations from './pages/Registrations.jsx'
import Preparation from './pages/Preparation.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  function renderPage() {
    switch (page) {
      case 'home':          return <Home onNavigate={setPage} />
      case 'solfege':       return <Solfege />
      case 'gammes':        return <Gammes />
      case 'accords':       return <Accords />
      case 'progressions':  return <Progressions />
      case 'styles':        return <StylesPage />
      case 'entrainement':  return <Entrainement />
      case 'improvisation': return <Improvisation />
      case 'messe':         return <Messe />
      case 'cantiques':     return <Cantiques />
      case 'calendrier':    return <Calendrier />
      case 'techniques':    return <Techniques />
      case 'registrations': return <Registrations />
      case 'preparation':   return <Preparation onNavigate={setPage} />
      default:              return <Home onNavigate={setPage} />
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Navigation current={page} onChange={setPage} />
      <main className="pb-12">
        {renderPage()}
      </main>
    </div>
  )
}
