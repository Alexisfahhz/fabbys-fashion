import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { categories, bookCta, social } from '../data/content'

// The SHOP control and its menu are ONE element: the pill expands smoothly in
// place into the panel (SHOP becomes Close, the body grows downward from it),
// anchored to the pill, never a separate centered popup. Section 5 of the brief.
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
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (prev instanceof HTMLElement) prev.focus()
    }
  }, [open])

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.16 } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div className="relative" style={{ zIndex: 50 }}>
      {/* full-screen scrim behind the panel */}
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 cursor-default"
            style={{ background: 'rgba(246,243,239,0.6)', backdropFilter: 'blur(16px)', zIndex: -1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* the panel expands from the pill: same top-centre anchor, growing down */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shop Fabbys Fashion"
            id={menuId}
            className="absolute left-1/2 overflow-hidden"
            style={{
              top: -13,
              maxWidth: '92vw',
              transformOrigin: 'top center',
              background: 'var(--color-bone)',
              border: '1px solid var(--color-line)',
              boxShadow: '0 40px 120px -40px rgba(26,23,20,0.4)',
              x: '-50%',
            }}
            initial={{ width: 150, height: 52, borderRadius: 9999, opacity: 0.5 }}
            animate={{ width: 520, height: 'auto', borderRadius: 26, opacity: 1 }}
            exit={{ width: 150, height: 52, borderRadius: 9999, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30, opacity: { duration: 0.25 } }}
          >
            <div className="px-8 pb-8 pt-[70px] md:px-10">
              <span
                className="mb-6 block"
                style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}
              >
                THE COLLECTION
              </span>

              <motion.ul variants={stagger} initial="hidden" animate="show" className="m-0 list-none p-0">
                {categories.map((c) => (
                  <motion.li key={c.label} variants={item}>
                    <a
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="menu-link block no-underline"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-menu)', fontWeight: 400, lineHeight: 1.14, color: 'var(--color-ink)' }}
                    >
                      {c.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li variants={item} className="mt-6">
                  <a
                    href={bookCta.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center rounded-full px-6 py-3 no-underline"
                    style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em' }}
                  >
                    {bookCta.label}
                  </a>
                </motion.li>
              </motion.ul>

              <div className="mt-9 mb-5 h-px w-full" style={{ background: 'var(--color-line)' }} />
              <div className="flex items-center gap-6">
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}>FOLLOW</span>
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={s.href.startsWith('#') ? () => setOpen(false) : undefined}
                    className="no-underline"
                    style={{ fontSize: 'var(--text-nav)', color: 'var(--color-ink-soft)' }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the pill: the trigger, and the panel's Close control once open */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        className="group relative inline-flex items-center gap-3 rounded-full px-7 py-3"
        style={{
          zIndex: 2,
          background: open ? 'transparent' : 'var(--color-bone)',
          border: open ? '1px solid transparent' : '1px solid var(--color-line)',
          boxShadow: open ? 'none' : '0 10px 30px -18px rgba(26,23,20,0.4)',
        }}
        whileHover={{ y: open ? 0 : -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      >
        <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden>
          <motion.span className="absolute h-[1.5px] w-4" style={{ background: 'var(--color-ink)' }} animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
          <motion.span className="absolute h-[1.5px] w-4" style={{ background: 'var(--color-ink)' }} animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
        </span>
        <span
          className="transition-colors group-hover:text-[color:var(--color-claret)]"
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-nav)', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--color-ink)' }}
        >
          {open ? 'CLOSE' : 'SHOP'}
        </span>
      </motion.button>

      <style>{`
        .menu-link { transition: color 0.3s var(--ease-couture), transform 0.4s var(--ease-couture); transform-origin: left; }
        .menu-link:hover { color: var(--color-claret); transform: translateX(10px); }
      `}</style>
    </div>
  )
}
