import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroText from './components/HeroText'
import HeroMediaField from './components/HeroMediaField'
import DesignSystem from './components/DesignSystem'

export default function App() {
  // The living design system lives at /#design-system (no router needed).
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '')
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#design-system') return <DesignSystem />

  return (
    <div id="top" className="relative min-h-screen">
      <Navbar />
      <main className="relative">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-16 md:pt-32">
          <HeroMediaField />
          <HeroText />
        </section>
      </main>
    </div>
  )
}
