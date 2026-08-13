import { heroEyebrow, heroHeadline, tagline } from '../data/content'

// Centred editorial thesis. The most characteristic thing about a custom atelier
// is a garment made to one person, so the headline states exactly that.
export default function HeroText() {
  return (
    <div className="relative z-20 mx-auto max-w-[46rem] px-6 text-center">
      <p className="rise rise-1 mb-6" style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}>
        {heroEyebrow.toUpperCase()}
      </p>

      <h1 className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', lineHeight: 0.98, fontWeight: 400 }}>
        <span className="rise rise-2 block" style={{ color: 'var(--color-ink)' }}>{heroHeadline.top}</span>
        <span className="rise rise-3 block italic" style={{ color: 'var(--color-taupe)' }}>{heroHeadline.bottom}</span>
      </h1>

      <p className="rise rise-4 mx-auto mt-7 max-w-[30rem]" style={{ fontSize: 'var(--text-body)', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>
        {tagline}
      </p>

      <div className="rise rise-5 mt-9 flex flex-wrap items-center justify-center gap-3">
        <a href="#shop" className="cta-fill inline-flex items-center rounded-full px-7 py-3.5 no-underline" style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em' }}>
          Shop the collection
        </a>
        <a href="#fitting" className="cta-outline inline-flex items-center rounded-full px-7 py-3.5 no-underline" style={{ border: '1px solid var(--color-line)', color: 'var(--color-ink)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em', background: 'var(--color-bone)' }}>
          Book a fitting
        </a>
      </div>

      <style>{`
        .cta-fill, .cta-outline { transition: transform 0.4s var(--ease-couture), background 0.4s var(--ease-couture), border-color 0.4s var(--ease-couture); }
        .cta-fill:hover { background: var(--color-claret); transform: translateY(-2px); }
        .cta-outline:hover { border-color: var(--color-ink); transform: translateY(-2px); }
      `}</style>
    </div>
  )
}
