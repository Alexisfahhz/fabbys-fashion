import { useBag } from '../lib/bagContext'

export default function CurrencySelector({ isDark = false }) {
  const { currency, setCurrency, currencies } = useBag()

  return (
    <div className="inline-flex items-center rounded-full p-0.5" style={{
      background: isDark ? 'rgba(255,255,255,0.08)' : 'var(--color-porcelain-2)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'var(--color-line)'}`,
    }}>
      {currencies.map((c) => {
        const active = currency === c.code
        return (
          <button
            key={c.code}
            type="button"
            onClick={() => setCurrency(c.code)}
            aria-pressed={active}
            className="rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200"
            style={{
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.08em',
              background: active ? (isDark ? 'var(--color-porcelain)' : 'var(--color-ink)') : 'transparent',
              color: active ? (isDark ? 'var(--color-ink)' : 'var(--color-porcelain)') : (isDark ? 'var(--color-porcelain)' : 'var(--color-taupe)'),
              boxShadow: active ? '0 2px 8px -2px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            {c.code}
          </button>
        )
      })}
    </div>
  )
}
