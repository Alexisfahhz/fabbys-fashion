import { useEffect, useRef } from 'react'
import { useBag } from '../lib/bagContext'
import CurrencySelector from './CurrencySelector'

export default function BagSheet() {
  const { items, count, subtotal, open, setQty, removeItem, closeBag, formatPrice, getWhatsAppOrderUrl, currency } = useBag()
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
        type="button"
        aria-label="Close bag"
        tabIndex={-1}
        onClick={closeBag}
        className={`fixed inset-0 cursor-default transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{ background: 'rgba(26,23,20,0.5)', backdropFilter: 'blur(4px)', zIndex: 75 }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label="Your luxury bag"
        id={sheetId}
        tabIndex={-1}
        className={`bag-sheet ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 pt-7 pb-5 md:px-8" style={{ borderColor: 'var(--color-line)' }}>
            <div className="flex items-center gap-3">
              <span className="bag-eyebrow block font-medium">YOUR BAG</span>
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold" style={{ background: 'rgba(26,23,20,0.08)', color: 'var(--color-ink)' }}>
                {count}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CurrencySelector />
              <button
                type="button"
                onClick={closeBag}
                aria-label="Close bag"
                className="group flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:rotate-90"
                style={{ border: '1px solid var(--color-line)', background: 'var(--color-porcelain)', color: 'var(--color-ink)' }}
              >
                <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[color:var(--color-claret)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="bag-body no-scrollbar flex-1 overflow-y-auto px-6 md:px-8">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'var(--color-porcelain-2)' }}>
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-taupe)' }}>
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <p className="m-0 text-xl font-normal" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>Your bag is empty</p>
                <p className="mt-2 mb-8 max-w-[24ch] text-xs leading-relaxed" style={{ color: 'var(--color-taupe)' }}>
                  Bespoke pieces and ready-to-wear designs you select will appear here.
                </p>
                <a
                  href="#ready"
                  onClick={closeBag}
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 no-underline transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: '0.82rem', letterSpacing: '0.12em' }}
                >
                  Browse Creations
                </a>
              </div>
            ) : (
              <ul className="m-0 list-none p-0 divide-y" style={{ borderColor: 'var(--color-line)' }}>
                {items.map((item) => {
                  const key = item.itemKey || `${item.id}-${item.size}`
                  return (
                    <li key={key} className="flex gap-4 py-5">
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-porcelain-2">
                        {item.image && <img className="h-full w-full object-cover" src={item.image} alt={item.title} />}
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-0.5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="m-0 text-base font-normal leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                              {item.title}
                            </p>
                            {item.size && (
                              <span className="mt-1 inline-block rounded bg-porcelain-2 px-2 py-0.5 text-[0.7rem] font-medium text-taupe">
                                Size: {item.size}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(key)}
                            aria-label={`Remove ${item.title}`}
                            className="text-xs transition-colors duration-300 hover:text-claret"
                            style={{ color: 'var(--color-taupe)' }}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="inline-flex items-center rounded-full" style={{ border: '1px solid var(--color-line)' }}>
                            <button
                              type="button"
                              onClick={() => setQty(key, item.qty - 1)}
                              aria-label={`Decrease quantity of ${item.title}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 hover:text-claret"
                              style={{ color: 'var(--color-ink-soft)' }}
                            >−</button>
                            <span className="w-6 text-center text-xs font-medium" style={{ color: 'var(--color-ink)' }}>{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(key, item.qty + 1)}
                              aria-label={`Increase quantity of ${item.title}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 hover:text-claret"
                              style={{ color: 'var(--color-ink-soft)' }}
                            >+</button>
                          </div>
                          <p className="m-0 text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                            {formatPrice(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer with Dual Checkout options */}
          {items.length > 0 && (
            <div className="border-t bg-porcelain/50 px-6 pt-5 pb-7 md:px-8" style={{ borderColor: 'var(--color-line)' }}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium" style={{ letterSpacing: '0.18em', color: 'var(--color-taupe)' }}>
                  SUBTOTAL ({currency})
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'calc(1.45rem + 2px)', fontWeight: 600, color: 'var(--color-ink)' }}>
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 mb-4 text-[0.72rem]" style={{ color: 'var(--color-taupe)' }}>
                Handcrafted in Lagos · DHL Worldwide Express delivery calculated at checkout.
              </p>

              <div className="space-y-2.5">
                {/* 1-Tap WhatsApp Checkout */}
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-medium tracking-widest uppercase transition-transform duration-300 hover:scale-[1.02] shadow-md"
                  style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', letterSpacing: '0.14em' }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Checkout on WhatsApp</span>
                </a>

                {/* Web Checkout CTA */}
                <button
                  type="button"
                  onClick={() => {
                    alert('Redirecting to Secure Atelier Checkout...')
                  }}
                  className="flex w-full items-center justify-center rounded-full py-3 text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:bg-porcelain-2"
                  style={{ border: '1px solid var(--color-line)', color: 'var(--color-ink)', letterSpacing: '0.12em' }}
                >
                  Pay via Card / Bank Transfer
                </button>
              </div>

              <button
                type="button"
                onClick={closeBag}
                className="mt-4 w-full text-center text-xs transition-colors duration-300 hover:text-claret"
                style={{ letterSpacing: '0.1em', color: 'var(--color-taupe)' }}
              >
                Continue Browsing
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
          width: min(440px, 92vw);
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
