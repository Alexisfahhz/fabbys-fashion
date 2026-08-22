import { reviews, trustMetrics } from '../data/reviews'

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative px-6 py-20 md:px-12 md:py-32 bg-porcelain-2/30 border-y border-line scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <span className="block text-xs font-semibold tracking-[0.24em] uppercase text-taupe mb-2">
            CLIENT PRAISE & SPOTLIGHT
          </span>
          <h2
            className="m-0 text-3xl md:text-5xl font-normal leading-tight text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Spotted in <span className="italic text-taupe">Fabbys</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            From Lagos society weddings to diaspora milestone galas in the UK and North America.
          </p>
        </div>

        {/* Trust Metrics Row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16">
          {trustMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between items-center rounded-2xl bg-bone p-5 sm:p-6 text-center border border-line shadow-sm min-h-[140px] sm:min-h-[155px]"
            >
              <div className="flex flex-1 items-center justify-center">
                <span
                  className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-ink leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {metric.value}
                </span>
              </div>
              <span className="mt-2 block text-[0.68rem] font-semibold uppercase tracking-wider text-taupe">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-3xl bg-bone p-7 border border-line shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 text-claret mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>

                <p className="text-xs font-medium italic text-taupe mb-3" style={{ fontFamily: 'var(--font-display-alt)' }}>
                  "{rev.highlight}"
                </p>

                <p className="text-xs leading-relaxed text-ink-soft" style={{ fontFamily: 'var(--font-sans)' }}>
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--color-line)' }}>
                <h4 className="m-0 text-sm font-medium text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                  {rev.author}
                </h4>
                <p className="m-0 mt-0.5 text-[0.68rem] text-taupe">
                  {rev.role} · {rev.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
