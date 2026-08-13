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
        style={{ background: 'rgba(246,243,239,0.6)', backdropFilter: 'blur(16px)', zIndex: -1 }}
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
          <div className="mt-9 mb-5 h-px w-full" style={{ background: 'var(--color-line)' }} />
          <div className="flex items-center justify-center gap-6">
            <span style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}>FOLLOW</span>
            {social.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined} onClick={s.href.startsWith('#') ? () => setOpen(false) : undefined} className="no-underline" style={{ fontSize: 'var(--text-nav)', color: 'var(--color-ink-soft)' }} tabIndex={open ? 0 : -1}>
                {s.label}
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
        className="group relative inline-flex items-center gap-3 rounded-full px-7 py-3"
        style={{ zIndex: 2, background: open ? 'transparent' : 'var(--color-bone)', border: `1px solid ${open ? 'transparent' : 'var(--color-line)'}`, boxShadow: open ? 'none' : '0 10px 30px -18px rgba(26,23,20,0.4)', transition: 'background 0.3s, border-color 0.3s' }}
      >
        <span className={`shop-x relative flex h-4 w-4 items-center justify-center ${open ? 'is-open' : ''}`} aria-hidden>
          <span className="shop-x-bar" />
          <span className="shop-x-bar" />
        </span>
        <span className="transition-colors group-hover:text-[color:var(--color-claret)]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-nav)', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--color-ink)' }}>
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
      `}</style>
    </div>
  )
}
