import { useEffect, useState } from 'react'
import { useBag } from '../lib/bagContext'

export default function ProductQuickView() {
  const { quickViewProduct, setQuickViewProduct, addItem, formatPrice } = useBag()
  const [selectedSize, setSelectedSize] = useState('UK 10')
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  useEffect(() => {
    if (quickViewProduct?.sizes?.length) {
      setSelectedSize(quickViewProduct.sizes[1] || quickViewProduct.sizes[0])
    }
    setActiveImageIdx(0)
  }, [quickViewProduct])

  useEffect(() => {
    if (!quickViewProduct) return
    const onKey = (e) => {
      if (e.key === 'Escape') setQuickViewProduct(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [quickViewProduct, setQuickViewProduct])

  if (!quickViewProduct) return null

  const images = quickViewProduct.gallery?.length ? quickViewProduct.gallery : [quickViewProduct.image]

  const whatsappDirectUrl = `https://wa.me/2347011934913?text=${encodeURIComponent(
    `Hello Fabbys Fashion! I'm interested in ordering the *${quickViewProduct.title}* in size *${selectedSize}* (${formatPrice(quickViewProduct.price)}). Can you confirm availability and lead time?`
  )}`

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-6 md:p-8" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl md:flex-row shadow-2xl animate-in zoom-in-95 duration-300"
        style={{ background: 'var(--color-bone)', border: '1px solid var(--color-line)' }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-porcelain/90 backdrop-blur-md text-ink transition-transform duration-300 hover:rotate-90"
          style={{ border: '1px solid var(--color-line)' }}
        >
          ✕
        </button>

        {/* Gallery Column */}
        <div className="relative flex flex-col justify-between bg-porcelain-2 md:w-1/2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={images[activeImageIdx]}
              alt={quickViewProduct.title}
              className="h-full w-full object-cover transition-all duration-500"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-porcelain/80 backdrop-blur-md overflow-x-auto justify-center">
              {images.map((imgSrc, idx) => (
                <button
                  key={imgSrc}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`h-14 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    activeImageIdx === idx ? 'border-claret scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgSrc} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & Actions Column */}
        <div className="no-scrollbar flex flex-1 flex-col justify-between overflow-y-auto p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[0.68rem] font-medium tracking-widest uppercase"
                style={{ color: 'var(--color-taupe)', letterSpacing: '0.2em' }}
              >
                {quickViewProduct.categoryLabel || quickViewProduct.category}
              </span>
              {quickViewProduct.tag && (
                <span className="rounded-full bg-porcelain-2 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wider text-ink">
                  {quickViewProduct.tag}
                </span>
              )}
            </div>

            <h2
              className="mt-2 mb-2 text-2xl sm:text-3xl font-normal leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              {quickViewProduct.title}
            </h2>

            <p
              className="text-[28px] sm:text-[30px] font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              {formatPrice(quickViewProduct.price)}
            </p>

            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-sans)' }}
            >
              {quickViewProduct.description}
            </p>

            {/* Fabric & Lead Time */}
            <div className="mt-5 space-y-2 rounded-xl bg-porcelain p-4 text-xs leading-normal">
              <p className="m-0 font-medium text-ink">
                <span className="text-taupe">Fabric & Craft:</span> {quickViewProduct.fabricDetails}
              </p>
              <p className="m-0 font-medium text-ink">
                <span className="text-taupe">Lead Time:</span> {quickViewProduct.leadTime}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium tracking-wider uppercase text-taupe">Select Size</span>
                <div className="flex items-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowSizeGuide(true)} 
                    className="text-[0.72rem] font-medium text-claret hover:underline flex items-center gap-1"
                  >
                    <span>📐</span>
                    <span>Size Guide</span>
                  </button>
                  <a href="#fitting" onClick={() => setQuickViewProduct(null)} className="text-[0.72rem] text-taupe hover:text-ink underline">
                    Custom fit?
                  </a>
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {quickViewProduct.sizes?.map((size) => {
                  const isSelected = selectedSize === size
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-ink text-porcelain shadow-md'
                          : 'bg-porcelain text-ink-soft border border-line hover:border-ink hover:text-ink'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 space-y-3 border-t pt-5" style={{ borderColor: 'var(--color-line)' }}>
            <button
              type="button"
              onClick={() => {
                addItem(quickViewProduct, selectedSize)
                setQuickViewProduct(null)
              }}
              className="flex w-full items-center justify-center rounded-full py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-md"
              style={{
                background: 'var(--color-ink)',
                color: 'var(--color-porcelain)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.14em',
              }}
            >
              Add to Bag — {selectedSize}
            </button>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:bg-porcelain-2"
              style={{
                border: '1px solid var(--color-line)',
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.1em',
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Instant Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sizing Chart Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-90 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close size guide backdrop"
            onClick={() => setShowSizeGuide(false)}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-bone p-6 sm:p-8 border border-line shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-start justify-between pb-3 border-b border-line">
              <div>
                <span className="text-[0.68rem] font-semibold tracking-widest uppercase text-taupe block">
                  ATELIER PROPORTIONS
                </span>
                <h3 className="m-0 mt-0.5 text-2xl font-normal text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                  Size & Fit Guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                aria-label="Close size guide"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-porcelain-2 text-ink hover:rotate-90 transition-transform"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 mb-5 text-xs leading-relaxed text-ink-soft">
              All garments are precision-cut in our Lagos atelier. If you fall between sizes or require bespoke corsetry boning, select <strong>Custom Measure</strong> during checkout.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-line bg-porcelain">
              <table className="w-full text-xs text-left">
                <thead className="bg-porcelain-2 text-taupe uppercase text-[0.65rem] font-semibold border-b border-line">
                  <tr>
                    <th className="px-3.5 py-2.5">UK</th>
                    <th className="px-3.5 py-2.5">US</th>
                    <th className="px-3.5 py-2.5">EU</th>
                    <th className="px-3.5 py-2.5">Bust</th>
                    <th className="px-3.5 py-2.5">Waist</th>
                    <th className="px-3.5 py-2.5">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60 text-ink">
                  <tr><td className="px-3.5 py-2 font-medium">UK 6</td><td className="px-3.5 py-2 text-taupe">US 2</td><td className="px-3.5 py-2 text-taupe">EU 34</td><td className="px-3.5 py-2">32"</td><td className="px-3.5 py-2">24"</td><td className="px-3.5 py-2">34"</td></tr>
                  <tr><td className="px-3.5 py-2 font-medium">UK 8</td><td className="px-3.5 py-2 text-taupe">US 4</td><td className="px-3.5 py-2 text-taupe">EU 36</td><td className="px-3.5 py-2">34"</td><td className="px-3.5 py-2">26"</td><td className="px-3.5 py-2">36"</td></tr>
                  <tr><td className="px-3.5 py-2 font-medium">UK 10</td><td className="px-3.5 py-2 text-taupe">US 6</td><td className="px-3.5 py-2 text-taupe">EU 38</td><td className="px-3.5 py-2">36"</td><td className="px-3.5 py-2">28"</td><td className="px-3.5 py-2">38"</td></tr>
                  <tr><td className="px-3.5 py-2 font-medium">UK 12</td><td className="px-3.5 py-2 text-taupe">US 8</td><td className="px-3.5 py-2 text-taupe">EU 40</td><td className="px-3.5 py-2">38"</td><td className="px-3.5 py-2">30"</td><td className="px-3.5 py-2">40"</td></tr>
                  <tr><td className="px-3.5 py-2 font-medium">UK 14</td><td className="px-3.5 py-2 text-taupe">US 10</td><td className="px-3.5 py-2 text-taupe">EU 42</td><td className="px-3.5 py-2">40"</td><td className="px-3.5 py-2">32"</td><td className="px-3.5 py-2">43"</td></tr>
                  <tr><td className="px-3.5 py-2 font-medium">UK 16</td><td className="px-3.5 py-2 text-taupe">US 12</td><td className="px-3.5 py-2 text-taupe">EU 44</td><td className="px-3.5 py-2">43"</td><td className="px-3.5 py-2">35"</td><td className="px-3.5 py-2">46"</td></tr>
                  <tr><td className="px-3.5 py-2 font-medium">UK 18</td><td className="px-3.5 py-2 text-taupe">US 14</td><td className="px-3.5 py-2 text-taupe">EU 46</td><td className="px-3.5 py-2">46"</td><td className="px-3.5 py-2">38"</td><td className="px-3.5 py-2">49"</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <a 
                href="#fitting" 
                onClick={() => {
                  setShowSizeGuide(false)
                  setQuickViewProduct(null)
                }}
                className="text-xs text-claret font-medium underline"
              >
                Book a Precision Video Measurement Session →
              </a>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="rounded-full bg-ink px-4 py-2 text-xs text-porcelain"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
