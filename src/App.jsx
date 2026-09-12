import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroText from './components/HeroText'
import HeroMediaField from './components/HeroMediaField'
import HeroPillars from './components/HeroPillars'
import CollectionsSection from './components/CollectionsSection'
import ReadyToWearSection from './components/ReadyToWearSection'
import CustomCoutureSection from './components/CustomCoutureSection'
import FittingBookingSection from './components/FittingBookingSection'
import InstituteSection from './components/InstituteSection'
import ReviewsSection from './components/ReviewsSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import DesignSystem from './components/DesignSystem'
import BagSheet from './components/BagSheet'
import ProductQuickView from './components/ProductQuickView'
import { BagProvider } from './lib/bag'
import { useBag } from './lib/bagContext'

function FloatingMobileBar() {
  const { openBag, count } = useBag()

  return (
    <aside
      aria-label="Quick Concierge Navigation"
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-2 rounded-full p-1.5 shadow-2xl backdrop-blur-xl md:hidden animate-in slide-in-from-bottom-5 duration-500"
      style={{
        background: 'rgba(26, 23, 20, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      <a
        href="https://wa.me/2347011934913?text=Hello%20Fabbys%20Fashion%2C%20I%20would%20like%20to%20inquire%20about%20a%20custom%20piece."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-full bg-porcelain/15 px-3.5 py-2.5 text-[0.72rem] font-medium text-porcelain no-underline active:scale-95"
      >
        <svg className="h-3.5 w-3.5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>WhatsApp</span>
      </a>

      <div className="flex items-center gap-1.5">
        <a
          href="#fitting"
          className="rounded-full bg-porcelain px-3.5 py-2.5 text-[0.72rem] font-medium text-ink no-underline active:scale-95"
          style={{ letterSpacing: '0.04em' }}
        >
          Book Fitting
        </a>
        <button
          type="button"
          onClick={openBag}
          aria-label="Open Bag"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-porcelain text-ink text-xs font-semibold relative"
        >
          🛍️
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-claret text-[0.6rem] text-porcelain">
              {count}
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}

function MainSite() {
  return (
    <div id="top" className="relative min-h-screen bg-porcelain text-ink selection:bg-claret selection:text-porcelain">
      <Navbar />
      <main className="relative">
        {/* DESKTOP HERO VIEWPORT (md+): 100% Pristine original centered layout */}
        <section className="hidden md:flex relative min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-14 md:px-0">
          <HeroMediaField />
          <HeroText isDesktopOnly={true} />
          <HeroPillars isMobileSection={false} />
        </section>

        {/* MOBILE HERO VIEWPORT (< md): no clipping — cards render freely, flush to edge */}
        <section className="flex md:hidden relative flex-col pt-16 pb-4 px-5">
          <HeroMediaField isMobile={true} />
          <HeroText isMobileOnly={true} />
        </section>

        {/* MOBILE SCROLL SECTION (< md): Pillars cards revealed on mobile scroll */}
        <section className="block md:hidden relative z-20 px-5 py-10 bg-porcelain">
          <HeroPillars isMobileSection={true} />
        </section>

        {/* 1. Curated Collections: Bridal, Occasion, Lace & Ankara */}
        <CollectionsSection />

        {/* 2. Ready-to-Wear Drops & Commerce Grid */}
        <ReadyToWearSection />

        {/* 3. Bespoke Custom Couture Process & Inquiry Form */}
        <CustomCoutureSection />

        {/* 4. Precision Fitting Studio (Lagos & Diaspora Video) */}
        <FittingBookingSection />

        {/* 5. FabbysFashion Institute & Apprenticeship Academy */}
        <InstituteSection />

        {/* 6. Client Reviews & Owambe Spotlight */}
        <ReviewsSection />

        {/* 7. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <BagSheet />
      <ProductQuickView />

      {/* Mobile Sticky Quick Concierge Bar */}
      <FloatingMobileBar />
    </div>
  )
}

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
    <BagProvider>
      <MainSite />
    </BagProvider>
  )
}
