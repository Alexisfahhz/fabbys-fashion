import { useEffect, useRef, useState } from 'react'
import { useBag } from '../lib/bagContext'

export default function CurrencySelector({ isDark = false }) {
  const { currency, setCurrency, currencies } = useBag()
  const trackRef = useRef(null)
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const measure = () => {
      const active = track.querySelector(`[data-code="${currency}"]`)
      if (!active) return
      setThumb({ x: active.offsetLeft, w: active.offsetWidth })
    }
    measure()
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure)
      ro.observe(track)
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)
    return () => {
      if (ro) ro.disconnect()
    }
  }, [currency])

  return (
    <div ref={trackRef} className="relative inline-flex items-center rounded-full p-0.5" style={{
      background: isDark ? 'rgba(255,255,255,0.08)' : 'var(--color-porcelain-2)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'var(--color-line)'}`,
    }}>
      <span
        aria-hidden
        className="toggle-thumb absolute rounded-full"
        style={{
          top: 2,
          bottom: 2,
          left: 0,
          width: thumb ? thumb.w : 0,
          transform: `translateX(${thumb ? thumb.x : 0}px)`,
          background: isDark ? 'var(--color-porcelain)' : 'var(--color-ink)',
          boxShadow: activeShadow(isDark),
          transition: thumb ? 'transform 0.5s var(--ease-couture), width 0.5s var(--ease-couture)' : 'none',
        }}
      />
      {currencies.map((c) => {
        const active = currency === c.code
        return (
          <button
            key={c.code}
            type="button"
            data-code={c.code}
            onClick={() => setCurrency(c.code)}
            aria-pressed={active}
            className="relative z-10 rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.08em',
              color: active ? (isDark ? 'var(--color-ink)' : 'var(--color-porcelain)') : (isDark ? 'rgba(246,243,239,0.75)' : 'var(--color-taupe)'),
            }}
          >
            {c.code}
          </button>
        )
      })}
    </div>
  )
}

function activeShadow(isDark) {
  return isDark ? '0 2px 10px -2px rgba(0,0,0,0.45)' : '0 2px 8px -2px rgba(26,23,20,0.3)'
}
