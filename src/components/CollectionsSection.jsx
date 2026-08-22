import { BASE } from '../lib/base'

export default function CollectionsSection() {
  const collections = [
    {
      id: 'bridal',
      eyebrow: 'THE BRIDAL SUITE',
      title: 'Bridal & Grand Receptions',
      subtitle: 'From breathtaking walk-down-the-aisle grandeur to sculpted second dress reception statements.',
      description: 'Crafted with imported duchess satin, crystal-embellished illusion mesh, and internal Victorian corsetry built to celebrate your silhouette.',
      image: `${BASE}media/bride-poster.jpg`,
      aspect: 'portrait',
      ctaText: 'Explore Bridal Inquiry',
      ctaHref: '#custom',
    },
    {
      id: 'occasion',
      eyebrow: 'OWAMBE COUTURE',
      title: 'Occasion & Aso-Ebi Royalty',
      subtitle: 'Unforgettable milestone celebration attire tailored to turn every head in the room.',
      description: 'Hand-beaded lace compositions, dramatic cape sleeves, and structured mermaid lines cut to perfection for the woman who commands attention.',
      image: `${BASE}media/IMG_2403.jpeg`,
      aspect: 'portrait',
      ctaText: 'Custom Aso-Ebi Inquiry',
      ctaHref: '#custom',
    },
    {
      id: 'lace-ankara',
      eyebrow: 'CONTEMPORARY HERITAGE',
      title: 'Lace & Ankara Luxe',
      subtitle: 'Authentic African prints fused with contemporary structural tailoring and mikado trims.',
      description: 'Bridging timeless cultural grandeur with sleek modern lines. Available in limited bespoke cuts and ready-to-wear drops.',
      image: `${BASE}media/IMG_5149.jpeg`,
      aspect: 'portrait',
      ctaText: 'Shop Heritage Drops',
      ctaHref: '#ready',
    },
  ]

  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32 bg-porcelain">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <p className="m-0 mb-3 text-xs font-medium tracking-[0.24em] uppercase text-taupe">
            ATELIER CURATIONS
          </p>
          <h2
            className="m-0 text-3xl md:text-5xl font-normal leading-tight text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Crafted for your most <span className="italic text-taupe">unforgettable</span> moments.
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-line" />
        </div>

        {/* Collection Showcases */}
        <div className="space-y-24 md:space-y-36">
          {collections.map((col, idx) => {
            const isReversed = idx % 2 !== 0
            return (
              <div
                key={col.id}
                id={col.id}
                className={`flex flex-col items-center gap-10 md:gap-16 lg:gap-24 scroll-mt-28 ${
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Visual Frame */}
                <div className="relative w-full md:w-1/2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-porcelain-2 shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
                    <img
                      src={col.image}
                      alt={col.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Editorial Copy */}
                <div className="w-full md:w-1/2 text-left">
                  <span
                    className="block text-xs font-semibold tracking-[0.2em] uppercase text-taupe mb-2"
                  >
                    {col.eyebrow}
                  </span>

                  <h3
                    className="m-0 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-ink"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {col.title}
                  </h3>

                  <p
                    className="mt-4 text-lg font-light italic leading-relaxed text-taupe"
                    style={{ fontFamily: 'var(--font-display-alt)' }}
                  >
                    "{col.subtitle}"
                  </p>

                  <p
                    className="mt-4 text-sm sm:text-base leading-relaxed text-ink-soft"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {col.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="mt-8 flex flex-wrap gap-4 text-xs font-medium text-ink-soft">
                    <span className="flex items-center gap-1.5 rounded-full bg-porcelain-2 px-3.5 py-1.5 border border-line">
                      <svg className="h-3.5 w-3.5 text-claret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Bespoke Sizing & Toile Fitting
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-porcelain-2 px-3.5 py-1.5 border border-line">
                      <svg className="h-3.5 w-3.5 text-claret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Worldwide Express Shipping
                    </span>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={col.ctaHref}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-8 py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-md no-underline"
                      style={{
                        background: 'var(--color-ink)',
                        color: 'var(--color-porcelain)',
                        letterSpacing: '0.14em',
                      }}
                    >
                      {col.ctaText}
                    </a>
                    <a
                      href="#fitting"
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-7 py-4 text-xs font-medium tracking-widest uppercase transition-colors duration-300 hover:bg-porcelain-2 no-underline"
                      style={{
                        border: '1px solid var(--color-line)',
                        color: 'var(--color-ink)',
                        letterSpacing: '0.12em',
                      }}
                    >
                      Book Fabbys Fitting
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
