import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { heroEyebrow, heroHeadline, tagline } from '../data/content'

gsap.registerPlugin(SplitText)

export default function HeroText({ isDesktopOnly = false, isMobileOnly = false }) {
  const wordEls = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const splits = []
    const timelines = []
    wordEls.current.forEach((el) => {
      if (!el) return
      const split = new SplitText(el, { type: 'chars' })
      splits.push(split)
      const tl = gsap.timeline({ delay: 1.2, repeat: -1, repeatDelay: 5.5 })
      tl.fromTo(
        split.chars,
        { yPercent: 0, opacity: 1 },
        { yPercent: -18, opacity: 0.82, duration: 0.55, ease: 'power2.out', stagger: 0.06 }
      ).to(
        split.chars,
        { yPercent: 0, opacity: 1, duration: 1.05, ease: 'power3.inOut', stagger: 0.06 }
      )
      timelines.push(tl)
    })
    return () => {
      timelines.forEach((tl) => tl.kill())
      splits.forEach((split) => split.revert())
    }
  }, [])

  // DESKTOP VIEW (md+): Exact 100% original pristine state (never affected by mobile changes)
  const renderDesktop = (
    <div className={`${isDesktopOnly ? 'block' : 'hidden md:block'} relative z-20 mx-auto max-w-[46rem] px-6 text-center my-auto`}>
      <p className="rise rise-1 mb-6 font-medium" style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: '0.35em', color: 'var(--color-taupe)' }}>
        {heroEyebrow.toUpperCase()}
      </p>

      <h1 className="m-0 mt-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', lineHeight: 0.784, fontWeight: 500 }}>
        <span className="rise rise-2 block" style={{ color: 'var(--color-ink)' }}>{heroHeadline.top}</span>
        <span ref={(el) => { wordEls.current[0] = el }} className="rise rise-3 block italic" style={{ color: 'var(--color-taupe)' }}>{heroHeadline.bottom}</span>
      </h1>

      <p className="rise rise-4 mx-auto mt-3 max-w-[30rem]" style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, color: 'var(--color-ink-soft)' }}>
        {tagline}
      </p>

      <div className="rise rise-5 mt-9 flex flex-wrap items-center justify-center gap-4">
        <a 
          href="#ready" 
          className="cta-fill inline-flex items-center rounded-full px-[36px] no-underline" 
          style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: 'var(--text-cta)', letterSpacing: '0.1em', height: 'var(--height-cta)' }}
        >
          Shop the collection
        </a>
        <a 
          href="#fitting" 
          className="cta-outline inline-flex items-center rounded-full px-[36px] no-underline" 
          style={{ border: '1px solid var(--color-line)', color: 'var(--color-ink)', fontSize: 'var(--text-cta)', letterSpacing: '0.1em', background: 'var(--color-bone)', height: 'var(--height-cta)' }}
        >
          Book a fitting
        </a>
      </div>
    </div>
  )

  // MOBILE VIEW (< md): Dual arcs top half, text block in lower half, CTAs at bottom
  const renderMobile = (
    <div className={`${isMobileOnly ? 'flex' : 'flex md:hidden'} relative z-20 flex-col w-full pt-[350px] pb-4`}>

      {/* Text block — sits directly above the CTAs, in the lower viewport */}
      <div className="w-full text-center px-2 mb-5">
        <p 
          className="rise rise-1 mb-1 font-medium leading-snug" 
          style={{ 
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem', 
            letterSpacing: '0.28em', 
            color: 'var(--color-taupe)'
          }}
        >
          {heroEyebrow.toUpperCase()}
        </p>

        <h1 className="m-0 mb-1.5 mt-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.45rem, 9.5vw, 3rem)', lineHeight: 0.8, fontWeight: 500 }}>
          <span className="rise rise-2 block" style={{ color: 'var(--color-ink)' }}>{heroHeadline.top}</span>
          <span ref={(el) => { wordEls.current[1] = el }} className="rise rise-3 block italic" style={{ color: 'var(--color-taupe)' }}>{heroHeadline.bottom}</span>
        </h1>

        <p 
          className="rise rise-4 mx-auto mt-2 max-w-[21rem] m-0" 
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
      <div className="rise rise-5 flex flex-col items-stretch gap-4 w-full">
        <a 
          href="#ready" 
          className="cta-fill w-full inline-flex items-center justify-center rounded-full px-6 font-medium no-underline text-center" 
          style={{ 
            background: 'var(--color-ink)', 
            color: 'var(--color-porcelain)', 
            fontSize: 'var(--text-cta-mobile)', 
            letterSpacing: '0.08em',
            height: 'var(--height-cta-mobile)',
          }}
        >
          Shop the collection
        </a>
        <a 
          href="#fitting" 
          className="cta-outline w-full inline-flex items-center justify-center rounded-full px-6 font-medium no-underline text-center" 
          style={{ 
            border: '1.5px solid var(--color-line)', 
            color: 'var(--color-ink)', 
            fontSize: 'var(--text-cta-mobile)', 
            letterSpacing: '0.08em', 
            background: 'var(--color-bone)',
            height: 'var(--height-cta-mobile)',
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
        .cta-fill, .cta-outline { transition: transform 0.4s var(--ease-couture), background 0.4s var(--ease-couture), border-color 0.4s var(--ease-couture), opacity 0.2s ease; }
        .cta-fill:hover { background: var(--color-claret); transform: translateY(-2px); }
        .cta-outline:hover { border-color: var(--color-ink); transform: translateY(-2px); }
        @media (max-width: 767px) {
          .cta-fill:active { transform: scale(0.96); opacity: 0.9; }
          .cta-outline:active { transform: scale(0.96); opacity: 0.9; }
        }
      `}</style>
    </>
  )
}
