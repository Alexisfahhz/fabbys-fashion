import { useEffect, useRef, useState } from 'react'
import { categories, bookCta, social } from '../data/content'

// The SHOP control and its menu are ONE element: the pill expands in place into
// the panel (absolute, so it never pushes content). Pure CSS transitions, no
// animation library. Section 5 of the brief.
export default function ShopMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const menuId = 'atelier-menu'

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab') {
        const f = panelRef.current?.querySelectorAll('a[href], button:not([disabled])')
        if (!f || f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (prev instanceof HTMLElement) prev.focus()
    }
  }, [open])

  return (
    <div className="relative" style={{ zIndex: 50 }}>
      <button
        aria-label="Close menu"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 cursor-default transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{ background: 'rgba(246,243,239,0.08)', zIndex: -1 }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label="Shop Fabbys Fashion"
        id={menuId}
        className={`shop-panel ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="px-8 pb-8 pt-[70px] text-center md:px-10">
          <span className="mb-6 block" style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}>THE COLLECTION</span>
          <ul className="m-0 list-none p-0">
            {categories.map((c, i) => (
              <li key={c.label} className="menu-item" style={{ transitionDelay: `${0.12 + i * 0.05}s` }}>
                <a href={c.href} onClick={() => setOpen(false)} className="menu-link block no-underline" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-menu)', fontWeight: 400, lineHeight: 1.14, color: 'var(--color-ink)' }} tabIndex={open ? 0 : -1}>
                  {c.label}
                </a>
              </li>
            ))}
            <li className="menu-item mt-6" style={{ transitionDelay: `${0.12 + categories.length * 0.05}s` }}>
              <a href={bookCta.href} onClick={() => setOpen(false)} className="inline-flex items-center rounded-full px-6 py-3 no-underline" style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em' }} tabIndex={open ? 0 : -1}>
                {bookCta.label}
              </a>
            </li>
          </ul>
          <div className="mt-8 mb-5 h-px w-full" style={{ background: 'var(--color-line)' }} />
          <div className="flex items-center justify-center gap-5">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={s.href.startsWith('#') ? () => setOpen(false) : undefined}
                aria-label={s.label}
                className="group/icon flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                style={{ 
                  border: '1px solid var(--color-line)', 
                  background: 'var(--color-porcelain)',
                  color: 'var(--color-ink-soft)' 
                }}
                tabIndex={open ? 0 : -1}
              >
                {s.icon === 'instagram' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 group-hover/icon:stroke-[color:var(--color-claret)]">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="transition-colors duration-300 group-hover/icon:text-[color:var(--color-claret)]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 rounded-full px-6 sm:px-7 h-14 md:h-11 md:px-7"
        style={{ zIndex: 2, background: open ? 'transparent' : 'var(--color-bone)', border: `1px solid ${open ? 'transparent' : 'var(--color-line)'}`, boxShadow: open ? 'none' : '0 10px 30px -18px rgba(26,23,20,0.4)', transition: 'background 0.3s, border-color 0.3s' }}
      >
        <span className={`shop-x relative flex h-6 w-6 md:h-4 md:w-4 items-center justify-center ${open ? 'is-open' : ''}`} aria-hidden>
          <span className="shop-x-bar" />
          <span className="shop-x-bar" />
        </span>
        <span className="shop-label transition-colors group-hover:text-[color:var(--color-claret)]" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--color-ink)' }}>
          {open ? 'CLOSE' : 'SHOP'}
        </span>
      </button>

      <style>{`
        .shop-panel {
          position: absolute; top: -13px; left: 50%;
          transform: translateX(-50%) scale(0.96);
          transform-origin: top center;
          width: 150px; max-height: 52px; opacity: 0;
          overflow: hidden; border-radius: 9999px;
          background: var(--color-bone); border: 1px solid var(--color-line);
          box-shadow: 0 40px 120px -40px rgba(26,23,20,0.4);
          pointer-events: none;
          transition: width 0.5s var(--ease-couture), max-height 0.55s var(--ease-couture),
                      border-radius 0.5s var(--ease-couture), opacity 0.3s ease, transform 0.5s var(--ease-couture);
        }
        .shop-panel.is-open {
          /* Hug the content: widest label "Ready-to-Wear" is 281px, plus the 40px
             padding each side = 361px, so the panel wraps the text with equal
             padding instead of leaving a wide empty right column. */
          width: min(364px, 92vw); max-height: 680px; opacity: 1; border-radius: 26px;
          transform: translateX(-50%) scale(1); pointer-events: auto;
        }
        .menu-item { opacity: 0; transform: translateY(16px); transition: opacity 0.5s var(--ease-couture), transform 0.5s var(--ease-couture); }
        .shop-panel.is-open .menu-item { opacity: 1; transform: translateY(0); }
        .menu-link { transition: color 0.3s var(--ease-couture), transform 0.4s var(--ease-couture); }
        .menu-link:hover { color: var(--color-claret); transform: scale(1.04); }
        .shop-x-bar { position: absolute; height: 1.5px; width: 16px; background: var(--color-ink); transition: transform 0.35s var(--ease-couture); }
        .shop-x-bar:nth-child(1) { transform: translateY(-3px); }
        .shop-x-bar:nth-child(2) { transform: translateY(3px); }
        .shop-x.is-open .shop-x-bar:nth-child(1) { transform: rotate(45deg); }
        .shop-x.is-open .shop-x-bar:nth-child(2) { transform: rotate(-45deg); }
        .shop-label { font-size: var(--text-nav); letter-spacing: 0.18em; }
        /* 1.5x SHOP pill + hamburger on mobile, matching the 1.5x nav bar */
        @media (max-width: 640px) {
          .shop-label { font-size: 1.2rem; letter-spacing: 0.15em; }
          .shop-x-bar { height: 2px; width: 24px; }
          .shop-x-bar:nth-child(1) { transform: translateY(-4px); }
          .shop-x-bar:nth-child(2) { transform: translateY(4px); }
        }
      `}</style>
    </div>
  )
}
