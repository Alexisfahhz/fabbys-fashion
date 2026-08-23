import { useState, useMemo } from 'react'
import { products, PRODUCT_CATEGORIES } from '../data/products'
import ProductCard from './ProductCard'

export default function ReadyToWearSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section id="ready" className="relative px-6 py-20 md:px-12 md:py-32 bg-porcelain-2/40 border-y border-line scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-taupe mb-2">
              CURATED ATELIER DISPATCH
            </span>
            <h2
              className="m-0 text-3xl md:text-5xl font-normal leading-tight text-ink"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ready-to-Wear & <span className="italic text-taupe">Drops</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-ink-soft m-0">
            Handcrafted pieces tailored in limited editions. Select standard UK sizing for immediate dispatch or request custom body measurements at checkout.
          </p>
        </div>

        {/* Filter Pills (Horizontally scrollable on mobile) */}
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-4 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-ink text-porcelain shadow-md scale-105'
                    : 'bg-bone text-ink-soft border border-line hover:border-ink hover:text-ink'
                }`}
                style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Reassurance Banner — Redesigned luxury concierge banner */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-bone via-bone to-porcelain-2 p-8 sm:p-10 border border-line shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-porcelain-2 px-3 py-1 text-[0.68rem] font-semibold tracking-widest uppercase text-taupe border border-line">
                  <span className="h-1.5 w-1.5 rounded-full bg-claret animate-pulse" />
                  EXPEDITED CONCIERGE
                </span>
                <span className="text-[0.72rem] text-taupe font-medium">· Bespoke Deadlines & Group Orders</span>
              </div>

              <h4 className="m-0 text-xl sm:text-2xl lg:text-3xl font-normal text-ink leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                Have a specific event deadline or group <span className="italic text-taupe">aso-ebi</span> order?
              </h4>

              <p className="m-0 mt-2.5 text-xs sm:text-sm text-ink-soft leading-relaxed">
                Our bespoke concierge can expedite production lead times, coordinate matching colorways across bridesmaids and family, and arrange priority worldwide DHL Express dispatch.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-ink-soft">
                <span className="flex items-center gap-1.5">✓ 48-Hour Rush Slots</span>
                <span className="flex items-center gap-1.5">✓ Fabric Swatch Coordination</span>
                <span className="flex items-center gap-1.5">✓ International Tracking</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/2347011934913?text=Hello%20Fabbys%20Fashion%2C%20I%20have%20an%20urgent%20event%20deadline%20%2F%20group%20order%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-md no-underline text-center"
                style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', letterSpacing: '0.12em' }}
              >
                <svg className="h-4 w-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Chat with Concierge</span>
              </a>
              <a
                href="#fitting"
                className="text-[0.72rem] tracking-wider uppercase text-taupe hover:text-ink transition-colors underline sm:no-underline"
              >
                Or Book a Fitting Session →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
