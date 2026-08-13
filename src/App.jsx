import Aurora from './components/Aurora'
import Navbar from './components/Navbar'
import HeroText from './components/HeroText'
import HeroMediaField from './components/HeroMediaField'

export default function App() {
  return (
    <div id="top" className="relative min-h-screen">
      <Aurora />
      <Navbar />

      {/* Hero: editorial text over the drifting atelier field. */}
      <main className="relative">
        <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 md:pt-32">
          <HeroMediaField />
          <HeroText />
        </section>
      </main>
    </div>
  )
}
