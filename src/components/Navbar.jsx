import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import ShopMenu from './ShopMenu'
import { useBag } from '../lib/bag'
import { BASE } from '../lib/base'

// The aurora lives here: a soft pearlescent band behind the nav row.
// When scrolled, a frosted glass backdrop smoothly engages so content glides underneath cleanly.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { count, open, openBag } = useBag()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#f6f3ef]/90 backdrop-blur-md border-b border-[#e3ddd4]/70 shadow-xs' 
          : 'bg-transparent'
      }`}
    >
      {/* aurora: fills the nav only (no bleed below) */}
      <div 
        className={`nav-aurora pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 ${
          scrolled ? 'opacity-50' : 'opacity-100'
        }`} 
        aria-hidden
      >
        <video
          className="h-full w-full object-cover"
          poster={`${BASE}brand/aurora.png`}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        >
          <source src={`${BASE}brand/aurora.mp4`} type="video/mp4" />
        </video>
      </div>

      {/* grouped logo + shop + bag, full width with 32px side padding */}
      <nav className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-8 py-5 md:h-[82px] md:px-10 md:py-0">
        <div className="justify-self-start flex items-center"><BrandLogo /></div>
        <div className="justify-self-center"><ShopMenu /></div>
        <div className="justify-self-end flex items-center">
          <button
            type="button"
            onClick={openBag}
            aria-expanded={open}
            aria-controls="bag-sheet"
            className={`bag-pill inline-flex items-center justify-center gap-2 no-underline rounded-full border px-4 sm:px-5 h-14 md:h-11 transition-colors hover:border-ink ${open ? 'bag-is-open' : ''}`}
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
            <span className="bag-count inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-sm md:h-5 md:min-w-5 md:px-1 md:text-[0.72rem] font-semibold transition-opacity duration-300" style={{ background: 'rgba(26,23,20,0.08)' }}>{count}</span>
          </button>
        </div>
      </nav>

      <style>{`
        .nav-aurora {
          -webkit-mask-image: linear-gradient(to bottom, #000 40%, transparent);
          mask-image: linear-gradient(to bottom, #000 40%, transparent);
          background-color: var(--color-porcelain);
          background-image: url(${BASE}brand/aurora.png);
          background-size: 130% auto;
          background-position: center 30%;
          background-repeat: no-repeat;
          animation: navAurora 40s ease-in-out infinite alternate;
        }
        /* the generated slow-loop video sits on top once brand/aurora.mp4 exists */
        .nav-aurora video { opacity: 0.9; }

        /* Bag pill morph, same language as the SHOP pill: transparent shell,
           icon crossfades into a close X, label swaps to CLOSE. */
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
