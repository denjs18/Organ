import { useState } from 'react'
import Navigation from './components/Navigation.jsx'
import Home from './pages/Home.jsx'
import Gammes from './pages/Gammes.jsx'
import Accords from './pages/Accords.jsx'
import Progressions from './pages/Progressions.jsx'
import StylesPage from './pages/StylesPage.jsx'
import Entrainement from './pages/Entrainement.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  function renderPage() {
    switch (page) {
      case 'home':         return <Home onNavigate={setPage} />
      case 'gammes':       return <Gammes />
      case 'accords':      return <Accords />
      case 'progressions': return <Progressions />
      case 'styles':       return <StylesPage />
      case 'entrainement': return <Entrainement />
      default:             return <Home onNavigate={setPage} />
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
