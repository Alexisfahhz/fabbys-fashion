import BrandLogo from './BrandLogo'
import ShopMenu from './ShopMenu'
import { BASE } from '../lib/base'

// The aurora lives here and nowhere else: a soft pearlescent band behind the nav
// row, fading into the plain porcelain page below it. Uses a slow-loop video when
// present (brand/aurora.mp4), falling back to the silk still. Centre: the SHOP
// control (expands in place). Right: a quiet bag hint, not an invented menu.
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      {/* aurora band, clipped to the nav and faded at its lower edge */}
      <div className="nav-aurora pointer-events-none absolute inset-x-0 top-0 -z-10" aria-hidden>
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

      <nav className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 py-[13px] md:px-10 md:py-[18px]">
        <div className="justify-self-start"><BrandLogo /></div>
        <div className="justify-self-center"><ShopMenu /></div>
        <div className="justify-self-end">
          <a href="#bag" className="inline-flex items-center gap-2 no-underline" style={{ fontSize: 'var(--text-nav)', letterSpacing: '0.12em', color: 'var(--color-ink-soft)' }}>
            <span className="hidden sm:inline">BAG</span>
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5" style={{ border: '1px solid var(--color-line)', fontSize: '0.72rem', background: 'rgba(255,255,255,0.5)' }}>0</span>
          </a>
        </div>
      </nav>

      <style>{`
        .nav-aurora {
          height: 98px;
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
