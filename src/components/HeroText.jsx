import { heroEyebrow, heroHeadline, tagline } from '../data/content'

export default function HeroText({ isDesktopOnly = false, isMobileOnly = false }) {
  // DESKTOP VIEW (md+): Exact 100% original pristine state (never affected by mobile changes)
  const renderDesktop = (
    <div className={`${isDesktopOnly ? 'block' : 'hidden md:block'} relative z-20 mx-auto max-w-[46rem] px-6 text-center my-auto`}>
      <p className="rise rise-1 mb-6 font-medium" style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}>
        {heroEyebrow.toUpperCase()}
      </p>

      <h1 className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', lineHeight: 0.98, fontWeight: 400 }}>
        <span className="rise rise-2 block" style={{ color: 'var(--color-ink)' }}>{heroHeadline.top}</span>
        <span className="rise rise-3 block italic" style={{ color: 'var(--color-taupe)' }}>{heroHeadline.bottom}</span>
      </h1>

      <p className="rise rise-4 mx-auto mt-7 max-w-[30rem]" style={{ fontSize: 'var(--text-body)', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>
        {tagline}
      </p>

      <div className="rise rise-5 mt-9 flex flex-wrap items-center justify-center gap-4">
        <a 
          href="#shop" 
          className="cta-fill inline-flex items-center rounded-full px-[36px] py-[18px] no-underline" 
          style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: '0.95rem', letterSpacing: '0.1em' }}
        >
          Shop the collection
        </a>
        <a 
          href="#fitting" 
          className="cta-outline inline-flex items-center rounded-full px-[36px] py-[18px] no-underline" 
          style={{ border: '1px solid var(--color-line)', color: 'var(--color-ink)', fontSize: '0.95rem', letterSpacing: '0.1em', background: 'var(--color-bone)' }}
        >
          Book a fitting
        </a>
      </div>
    </div>
  )

  // MOBILE VIEW (< md): Dual arcs top half, text block in lower half, CTAs at bottom
  const renderMobile = (
    <div className={`${isMobileOnly ? 'flex' : 'flex md:hidden'} relative z-20 flex-1 flex-col justify-end w-full pb-2`}>

      {/* Text block — sits directly above the CTAs, in the lower viewport */}
      <div className="w-full text-center px-2 mb-5">
        <p 
          className="rise rise-1 mb-2 font-medium leading-relaxed" 
          style={{ 
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem', 
            letterSpacing: '0.16em', 
            color: 'var(--color-taupe)'
          }}
        >
          {heroEyebrow.toUpperCase()}
        </p>

        <h1 className="m-0 mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.45rem, 9.5vw, 3rem)', lineHeight: 1.0, fontWeight: 400 }}>
          <span className="rise rise-2 block" style={{ color: 'var(--color-ink)' }}>{heroHeadline.top}</span>
          <span className="rise rise-3 block italic" style={{ color: 'var(--color-taupe)' }}>{heroHeadline.bottom}</span>
        </h1>

        <p 
          className="rise rise-4 mx-auto max-w-[21rem] m-0" 
          style={{ 
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem', 
            lineHeight: 1.58, 
            color: 'var(--color-ink-soft)' 
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Full-Width CTAs — tight gap below text, drops both together to bottom of viewport */}
      <div className="rise rise-5 flex flex-col items-stretch gap-3 w-full">
        <a 
          href="#shop" 
          className="cta-fill w-full inline-flex items-center justify-center rounded-full py-[19.2px] px-6 font-medium no-underline text-center" 
          style={{ 
            background: 'var(--color-ink)', 
            color: 'var(--color-porcelain)', 
            fontSize: '1.128rem', 
            letterSpacing: '0.08em' 
          }}
        >
          Shop the collection
        </a>
        <a 
          href="#fitting" 
          className="cta-outline w-full inline-flex items-center justify-center rounded-full py-[19.2px] px-6 font-medium no-underline text-center" 
          style={{ 
            border: '1.5px solid var(--color-line)', 
            color: 'var(--color-ink)', 
            fontSize: '1.128rem', 
            letterSpacing: '0.08em', 
            background: 'var(--color-bone)' 
          }}
        >
          Book a fitting
        </a>
      </div>
    </div>
  )

  return (
    <>
      {renderDesktop}
      {renderMobile}
      <style>{`
        .cta-fill, .cta-outline { transition: transform 0.4s var(--ease-couture), background 0.4s var(--ease-couture), border-color 0.4s var(--ease-couture); }
        .cta-fill:hover { background: var(--color-claret); transform: translateY(-2px); }
        .cta-outline:hover { border-color: var(--color-ink); transform: translateY(-2px); }
      `}</style>
    </>
  )
}
