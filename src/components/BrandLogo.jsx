import { BASE } from '../lib/base'

// FF monogram mark paired with the wordmark set in the display serif.
export default function BrandLogo({ compact = false }) {
  return (
    <a href="#top" className="flex items-center gap-3 no-underline" aria-label="Fabbys Fashion, home">
      <img
        src={`${BASE}brand/ff-mark.svg`}
        alt=""
        aria-hidden
        className="h-8 w-auto md:h-9"
        style={{ display: 'block' }}
      />
      {!compact && (
        <span
          className="hidden leading-none sm:inline-block"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: '1.35rem',
            letterSpacing: '0.02em',
            color: 'var(--color-ink)',
          }}
        >
          Fabbys Fashion
        </span>
      )}
    </a>
  )
}
