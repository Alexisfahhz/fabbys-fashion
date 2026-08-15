import { useEffect, useRef } from 'react'
import { useBag, formatPrice } from '../lib/bag'

// The bag drawer: slides in from the right, 70% of the viewport on phones,
// capped at 420px on desktop. Same motion language as the SHOP panel
// (var(--ease-couture), bone surface, hairline borders, ink CTAs).
export default function BagSheet() {
  const { items, count, subtotal, open, setQty, removeItem, closeBag } = useBag()
  const sheetId = 'bag-sheet'
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') closeBag()
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
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (prev instanceof HTMLElement) prev.focus()
    }
  }, [open, closeBag])

  return (
    <>
      <button
        aria-label="Close bag"
        tabIndex={-1}
        onClick={closeBag}
        className={`fixed inset-0 cursor-default transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{ background: 'rgba(246,243,239,0.08)', zIndex: 75 }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label="Your bag"
        id={sheetId}
        tabIndex={-1}
        className={`bag-sheet ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-7 pb-5 md:px-9">
            <div className="flex items-baseline gap-3">
              <span className="bag-eyebrow block">YOUR BAG</span>
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold" style={{ background: 'rgba(26,23,20,0.08)', color: 'var(--color-ink-soft)' }}>
                {count}
              </span>
            </div>
            <button
              type="button"
              onClick={closeBag}
              aria-label="Close bag"
              className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:rotate-90"
              style={{ border: '1px solid var(--color-line)', background: 'var(--color-porcelain)', color: 'var(--color-ink)' }}
            >
              <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[color:var(--color-claret)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="bag-body no-scrollbar flex-1 overflow-y-auto px-7 md:px-9">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'var(--color-porcelain-2)' }}>
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-taupe)' }}>
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <p className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-ink)' }}>Your bag is empty</p>
                <p className="mt-2 mb-8 max-w-[24ch]" style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, color: 'var(--color-taupe)' }}>
                  Bespoke pieces you select will appear here.
                </p>
                <button
                  type="button"
                  onClick={closeBag}
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 no-underline transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: 'var(--text-nav)', letterSpacing: '0.12em' }}
                >
                  Browse the Collection
                </button>
              </div>
            ) : (
              <ul className="m-0 list-none p-0">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 border-b py-5" style={{ borderColor: 'var(--color-line)' }}>
                    <div className="h-24 w-20 shrink-0 overflow-hidden" style={{ background: 'var(--color-porcelain-2)', borderRadius: 'var(--radius-card)' }}>
                      {item.image && <img className="h-full w-full object-cover" src={item.image} alt={item.title} />}
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', lineHeight: 1.2, color: 'var(--color-ink)' }}>{item.title}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.title}`}
                          className="text-sm transition-colors duration-300 hover:text-[color:var(--color-claret)]"
                          style={{ color: 'var(--color-taupe)' }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full" style={{ border: '1px solid var(--color-line)' }}>
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty - 1)}
                            aria-label={`Decrease quantity of ${item.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 hover:text-[color:var(--color-claret)]"
                            style={{ color: 'var(--color-ink-soft)' }}
                          >−</button>
                          <span className="w-7 text-center text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty + 1)}
                            aria-label={`Increase quantity of ${item.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 hover:text-[color:var(--color-claret)]"
                            style={{ color: 'var(--color-ink-soft)' }}
                          >+</button>
                        </div>
                        <p className="m-0 text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-7 pt-5 pb-7 md:px-9" style={{ borderTop: '1px solid var(--color-line)' }}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm" style={{ letterSpacing: '0.18em', color: 'var(--color-taupe)' }}>SUBTOTAL</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-ink)' }}>{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 mb-6 text-xs" style={{ color: 'var(--color-taupe)' }}>Delivery and fitting fees calculated at checkout.</p>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-full py-4 transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: 'var(--text-nav)', letterSpacing: '0.16em' }}
              >
                CHECKOUT
              </button>
              <button
                type="button"
                onClick={closeBag}
                className="mt-4 w-full text-center transition-colors duration-300 hover:text-[color:var(--color-claret)]"
                style={{ fontSize: 'var(--text-nav)', letterSpacing: '0.12em', color: 'var(--color-taupe)' }}
              >
                Continue browsing
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .bag-sheet {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          z-index: 80;
          width: min(420px, 70vw);
          background: var(--color-bone);
          border-left: 1px solid var(--color-line);
          border-radius: 26px 0 0 26px;
          box-shadow: 0 40px 120px -40px rgba(26,23,20,0.4);
          transform: translateX(105%);
          transition: transform 0.55s var(--ease-couture);
          outline: none;
        }
        .bag-sheet.is-open { transform: translateX(0); }
        .bag-eyebrow {
          font-size: var(--text-eyebrow);
          letter-spacing: 0.24em;
          color: var(--color-taupe);
        }
        @media (prefers-reduced-motion: reduce) {
          .bag-sheet { transition: none; }
        }
      `}</style>
    </>
  )
}
