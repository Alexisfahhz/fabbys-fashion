import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroText from './components/HeroText'
import HeroMediaField from './components/HeroMediaField'
import HeroPillars from './components/HeroPillars'
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
    <div id="top" className="relative min-h-screen bg-porcelain">
      <Navbar />
      <main className="relative">
        {/* DESKTOP HERO VIEWPORT (md+): 100% Pristine original centered layout */}
        <section className="hidden md:flex relative min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12 md:px-0">
          <HeroMediaField />
          <HeroText isDesktopOnly={true} />
          <HeroPillars isMobileSection={false} />
        </section>

        {/* MOBILE HERO VIEWPORT (< md): no clipping — cards render freely, flush to edge */}
        <section className="flex md:hidden relative min-h-[100dvh] flex-col pt-36 pb-0 px-5">
          <HeroMediaField />
          <HeroText isMobileOnly={true} />
        </section>

        {/* MOBILE SCROLL SECTION (< md): Pillars cards revealed on mobile scroll */}
        <section className="block md:hidden relative z-20 px-5 py-10 bg-porcelain">
          <HeroPillars isMobileSection={true} />
        </section>
      </main>
    </div>
  )
}
