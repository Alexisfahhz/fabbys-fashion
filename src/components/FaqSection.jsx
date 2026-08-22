import { useState } from 'react'
import { faqs } from '../data/content'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (idx) => {
    setOpenIndex((curr) => (curr === idx ? null : idx))
  }

  return (
    <section id="faq" className="relative px-6 py-20 md:px-12 md:py-32 bg-porcelain scroll-mt-24">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 text-center">
          <span className="block text-xs font-semibold tracking-[0.24em] uppercase text-taupe mb-2">
            ATELIER ANSWERS
          </span>
          <h2
            className="m-0 text-3xl md:text-5xl font-normal leading-tight text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Frequently Asked <span className="italic text-taupe">Questions</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Everything you need to know about bespoke lead times, diaspora shipping, and atelier fittings.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl bg-bone border border-line transition-all duration-300 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-porcelain-2/50"
                >
                  <span
                    className="text-base sm:text-lg font-medium text-ink pr-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-porcelain-2 text-ink text-sm font-light transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-claret' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-[var(--ease-couture)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm leading-relaxed text-ink-soft border-t border-line/60">
                      <p className="m-0">{faq.a}</p>
                    </div>
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
