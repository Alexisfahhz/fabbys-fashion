import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import ShopMenu from './ShopMenu'
import CurrencySelector from './CurrencySelector'
import { useBag } from '../lib/bagContext'

// The aurora lives here: a soft pearlescent band behind the nav row.
// When scrolled, a frosted glass backdrop smoothly engages so content glides underneath cleanly.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { count, open, openBag } = useBag()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 15)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled 
          ? 'bg-[#f6f3ef]/95 backdrop-blur-md border-b border-[#e3ddd4]/70 shadow-xs' 
          : 'bg-transparent'
      }`}
    >
      {/* Aurora: Hardware-composited ambient illumination (zero video decoding overhead) */}
      <div 
        className={`nav-aurora pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ${
          scrolled ? 'opacity-30' : 'opacity-75'
        }`} 
        aria-hidden
      />

      {/* grouped logo + shop + currency + bag, full width with 32px side padding.
          Mobile: minmax(0,1fr) side columns are always equal, so the SHOP pill
          stays dead-center of the viewport no matter how wide logo/bag render. */}
      <nav className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-6 py-4 md:grid-cols-[1fr_auto_1fr] md:h-[82px] md:px-10 md:py-0">
        <div className="flex w-full items-center justify-start"><BrandLogo /></div>
        <div className="justify-self-center"><ShopMenu /></div>
        <div className="justify-self-end flex items-center justify-end gap-2.5 sm:gap-3">
          <a
            href="https://wa.me/2347011934913?text=Hello%20Fabbys%20Fashion%20Concierge%2C%20I%20would%20like%20to%20make%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 h-11 text-[0.74rem] font-medium text-ink-soft bg-bone/80 backdrop-blur-md transition-colors hover:border-ink hover:text-ink no-underline tracking-wider uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
            <span>Concierge</span>
          </a>
          <div className="hidden lg:block">
            <CurrencySelector />
          </div>
          <button
            type="button"
            onClick={openBag}
            aria-expanded={open}
            aria-controls="bag-sheet"
            className={`bag-pill relative inline-flex items-center justify-center gap-2 no-underline rounded-full border px-4 sm:px-5 h-14 md:h-11 transition-colors hover:border-ink ${open ? 'bag-is-open' : ''}`}
            style={{
              fontSize: 'var(--text-nav)',
              letterSpacing: '0.12em',
              color: 'var(--color-ink)',
              background: open ? 'transparent' : 'rgba(255,255,255,0.8)',
              borderColor: open ? 'transparent' : 'var(--color-line)',
              backdropFilter: open ? 'none' : 'blur(12px)',
              transition: 'background 0.3s, border-color 0.3s, color 0.3s',
            }}
          >
            <span className="bag-icon relative flex h-6 w-6 md:h-4 md:w-4 items-center justify-center" aria-hidden>
              <svg className="bag-icon-glyph absolute inset-0 h-full w-full opacity-75 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="bag-x" aria-hidden>
                <span className="bag-x-bar" />
                <span className="bag-x-bar" />
              </span>
            </span>
            <span className="hidden sm:inline font-medium">{open ? 'CLOSE' : 'BAG'}</span>
            <span className="bag-count absolute -top-1.5 -right-1.5 z-10 inline-flex h-[25px] min-w-[25px] items-center justify-center rounded-full bg-ink-soft px-[5px] text-[0.8rem] font-semibold text-porcelain shadow-sm md:static md:z-auto md:h-5 md:min-w-5 md:px-1 md:text-[0.72rem] md:bg-[rgba(26,23,20,0.08)] md:text-ink transition-opacity duration-300">{count}</span>
          </button>
        </div>
      </nav>

      <style>{`
        .nav-aurora {
          background: radial-gradient(ellipse 70% 80% at 50% -20%, rgba(107, 58, 63, 0.14), transparent 75%);
          pointer-events: none;
        }

        .bag-x {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: scale(0.4) rotate(-90deg);
          transition: opacity 0.3s var(--ease-couture), transform 0.4s var(--ease-couture);
        }
        .bag-x-bar {
          position: absolute; height: 1.5px; width: 16px;
          background: var(--color-ink);
          transition: background 0.3s;
        }
        .bag-x-bar:nth-child(1) { transform: rotate(45deg); }
        .bag-x-bar:nth-child(2) { transform: rotate(-45deg); }
        .bag-is-open .bag-x { opacity: 1; transform: scale(1) rotate(0deg); }
        .bag-is-open .bag-icon-glyph { opacity: 0; transform: scale(0.6) rotate(20deg); }
        .bag-is-open .bag-count { opacity: 0; }
        @media (max-width: 640px) {
          .bag-x-bar { height: 2px; width: 24px; }
        }
        @keyframes navAurora {
          from { background-position: 42% 30%; background-size: 130% auto; }
          to   { background-position: 58% 34%; background-size: 140% auto; }
        }
        @media (prefers-reduced-motion: reduce) { .nav-aurora { animation: none; } }
      `}</style>
    </header>
  )
}
