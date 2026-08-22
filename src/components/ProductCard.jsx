import { useBag } from '../lib/bagContext'

export default function ProductCard({ product }) {
  const { addItem, formatPrice, setQuickViewProduct } = useBag()

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5" style={{
      background: 'var(--color-bone)',
      border: '1px solid var(--color-line)',
      boxShadow: '0 10px 30px -15px rgba(26,23,20,0.06)',
    }}>
      {/* Image Container with Hover zoom & Overlay */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-porcelain-2">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {product.tag && (
          <span
            className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[0.68rem] font-medium tracking-wider uppercase backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: 'var(--color-ink)',
              letterSpacing: '0.14em',
              border: '1px solid var(--color-line)',
            }}
          >
            {product.tag}
          </span>
        )}

        {/* Quick View Button (hover reveal on desktop, visible on mobile tap) */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:bottom-4">
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="w-full rounded-full py-2.5 text-xs font-medium tracking-widest uppercase transition-transform duration-200 active:scale-95 shadow-lg backdrop-blur-md"
            style={{
              background: 'rgba(26, 23, 20, 0.88)',
              color: 'var(--color-porcelain)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.14em',
            }}
          >
            Quick View & Fit Guide
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <p
            className="m-0 mb-1 text-[0.68rem] font-medium tracking-widest uppercase"
            style={{ color: 'var(--color-taupe)', letterSpacing: '0.16em' }}
          >
            {product.categoryLabel || product.category}
          </p>

          <h3
            className="m-0 text-base sm:text-lg font-medium leading-snug transition-colors duration-300 group-hover:text-claret"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            {product.title}
          </h3>

          <p
            className="mt-1.5 mb-0 line-clamp-2 text-xs leading-relaxed"
            style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-sans)' }}
          >
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-3.5" style={{ borderColor: 'var(--color-line)' }}>
          <span
            className="text-base sm:text-lg font-medium"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={() => addItem(product, 'UK 10')}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'var(--color-porcelain-2)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-line)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.08em',
            }}
            title="Add standard size (UK 10) to Bag. Use Quick View to select other sizes."
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  )
}
