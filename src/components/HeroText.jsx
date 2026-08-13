import { motion } from 'framer-motion'
import { heroEyebrow, heroHeadline, tagline } from '../data/content'

// Left-aligned editorial thesis (frontend-design: the hero is a thesis). The
// most characteristic thing about a custom atelier is the promise of a garment
// made to one person, so the headline states exactly that.
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.12 },
  }),
}

export default function HeroText() {
  return (
    <div className="relative z-20 max-w-[42rem] pl-5 md:pl-10 xl:pl-[7vw]">
      <motion.p
        custom={0}
        variants={rise}
        initial="hidden"
        animate="show"
        className="mb-6"
        style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}
      >
        {heroEyebrow.toUpperCase()}
      </motion.p>

      <h1 className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', lineHeight: 0.98, fontWeight: 400 }}>
        <motion.span custom={1} variants={rise} initial="hidden" animate="show" className="block" style={{ color: 'var(--color-ink)' }}>
          {heroHeadline.top}
        </motion.span>
        <motion.span custom={2} variants={rise} initial="hidden" animate="show" className="block italic" style={{ color: 'var(--color-taupe)' }}>
          {heroHeadline.bottom}
        </motion.span>
      </h1>

      <motion.p
        custom={3}
        variants={rise}
        initial="hidden"
        animate="show"
        className="mt-7 max-w-[26rem]"
        style={{ fontSize: 'var(--text-body)', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}
      >
        {tagline}
      </motion.p>

      <motion.div custom={4} variants={rise} initial="hidden" animate="show" className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#shop"
          className="cta-fill inline-flex items-center rounded-full px-7 py-3.5 no-underline"
          style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em' }}
        >
          Shop the collection
        </a>
        <a
          href="#fitting"
          className="cta-outline inline-flex items-center rounded-full px-7 py-3.5 no-underline"
          style={{ border: '1px solid var(--color-line)', color: 'var(--color-ink)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em', background: 'var(--color-bone)' }}
        >
          Book a fitting
        </a>
      </motion.div>

      <style>{`
        .cta-fill, .cta-outline { transition: transform 0.4s var(--ease-couture), background 0.4s var(--ease-couture), color 0.4s var(--ease-couture); }
        .cta-fill:hover { background: var(--color-claret); transform: translateY(-2px); }
        .cta-outline:hover { border-color: var(--color-ink); transform: translateY(-2px); }
      `}</style>
    </div>
  )
}
