import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import ShopMenu from './ShopMenu'
import { BASE } from '../lib/base'

// The aurora lives here: a soft pearlescent band behind the nav row.
// When scrolled, a frosted glass backdrop smoothly engages so content glides underneath cleanly.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
          <a
            href="#bag"
            className="inline-flex items-center justify-center gap-2 no-underline rounded-full border bg-white/80 backdrop-blur-md px-4 sm:px-5 h-14 md:h-11 transition-colors hover:border-ink"
            style={{ fontSize: 'var(--text-nav)', letterSpacing: '0.12em', color: 'var(--color-ink)', borderColor: 'var(--color-line)' }}
          >
            <svg className="h-6 w-6 md:h-4 md:w-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="hidden sm:inline font-medium">BAG</span>
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-sm md:h-5 md:min-w-5 md:px-1 md:text-[0.72rem] font-semibold" style={{ background: 'rgba(26,23,20,0.08)' }}>0</span>
          </a>
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
        @keyframes navAurora {
          from { background-position: 42% 30%; background-size: 130% auto; }
          to   { background-position: 58% 34%; background-size: 140% auto; }
        }
        @media (prefers-reduced-motion: reduce) { .nav-aurora { animation: none; } }
      `}</style>
    </header>
  )
}
