import { useState } from 'react'
import DatePicker from './DatePicker'

export default function CustomCoutureSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Bridal Wedding Gown',
    eventDate: '',
    silhouette: 'Corseted Mermaid & Train',
    budgetRange: '₦300,000 – ₦600,000 ($200 – $400)',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const steps = [
    {
      num: '01',
      title: 'The Vision & Sketch',
      desc: 'We start with a 1-on-1 design consultation to understand your event theme, silhouette preferences, and style references.',
    },
    {
      num: '02',
      title: 'Fabric Sourcing & Beadwork',
      desc: 'Hand-selecting raw silks, French corded laces, structured mikados, and custom crystal embellishments tailored to your palette.',
    },
    {
      num: '03',
      title: 'Precision Toile Fitting',
      desc: 'In-person studio fitting in Lagos or guided digital video measurements with our Diaspora measurement protocol.',
    },
    {
      num: '04',
      title: 'Couture Hand-Finish & Dispatch',
      desc: 'Final hand-sewn finishings, quality audit, and express worldwide delivery via DHL Express with our perfect-fit guarantee.',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const text = `*New Bespoke Tailoring Inquiry*\n\n*Name:* ${formData.name}\n*Phone/WhatsApp:* ${formData.phone}\n*Email:* ${formData.email}\n*Event Type:* ${formData.eventType}\n*Target Date:* ${formData.eventDate || 'Not specified'}\n*Silhouette Preference:* ${formData.silhouette}\n*Budget Range:* ${formData.budgetRange}\n*Notes:* ${formData.notes || 'None'}`
    
    // Auto-open WhatsApp after 1 second
    setTimeout(() => {
      window.open(`https://wa.me/2347011934913?text=${encodeURIComponent(text)}`, '_blank')
    }, 800)
  }

  return (
    <section id="custom" className="relative px-6 py-20 md:px-12 md:py-32 bg-porcelain scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <span className="block text-xs font-semibold tracking-[0.24em] uppercase text-taupe mb-2">
            ONE-OF-A-KIND COUTURE
          </span>
          <h2
            className="m-0 text-3xl md:text-5xl font-normal leading-tight text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Bespoke Atelier <span className="italic text-taupe">Experience</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-soft max-w-2xl mx-auto">
            From initial sketch to hand-finished perfection. Every custom gown is cut specifically to your proportions, guaranteeing effortless poise and flawless posture.
          </p>
        </div>

        {/* 4-Step Process Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative flex flex-col justify-between rounded-2xl bg-bone p-7 border border-line shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                <span
                  className="block text-3xl font-light text-taupe mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.num}
                </span>
                <h3
                  className="m-0 text-lg font-medium text-ink mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.title}
                </h3>
                <p className="m-0 text-xs leading-relaxed text-ink-soft" style={{ fontFamily: 'var(--font-sans)' }}>
                  {step.desc}
                </p>
              </div>
              <div className="mt-6 h-0.5 w-8 bg-line" />
            </div>
          ))}
        </div>

        {/* Interactive Custom Inquiry Form */}
        <div className="mx-auto max-w-3xl rounded-3xl bg-bone p-8 sm:p-12 border border-line shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs font-medium tracking-widest uppercase text-taupe">START YOUR CREATION</span>
            <h3 className="m-0 mt-1 text-2xl sm:text-3xl font-normal text-ink" style={{ fontFamily: 'var(--font-display)' }}>
              Bespoke Tailoring Inquiry
            </h3>
            <p className="mt-2 text-xs text-ink-soft">
              Fill in your vision below. Our master stylist will review and contact you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-porcelain p-8 text-center animate-in fade-in duration-300">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-claret text-porcelain">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4 className="m-0 text-xl font-medium text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                Inquiry Received
              </h4>
              <p className="mt-2 text-xs text-ink-soft leading-relaxed max-w-md mx-auto">
                Thank you, {formData.name}. We have logged your bespoke inquiry and connected to WhatsApp Concierge for immediate review.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full bg-ink px-6 py-2.5 text-xs text-porcelain tracking-wider uppercase"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Folashade Adeleke"
                    className="w-full rounded-xl bg-porcelain px-4 py-3.5 text-sm text-ink border border-line focus:border-claret focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 or +44 / +1 number"
                    className="w-full rounded-xl bg-porcelain px-4 py-3.5 text-sm text-ink border border-line focus:border-claret focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                    Event Type
                  </label>
                  <div className="relative">
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full appearance-none rounded-xl bg-porcelain pl-4 pr-11 py-3.5 text-sm text-ink border border-line focus:border-claret focus:outline-none cursor-pointer transition-colors"
                    >
                      <option>Bridal Wedding Gown</option>
                      <option>Bridal Second Dress / Reception</option>
                      <option>Owambe / Aso-Ebi Royalty</option>
                      <option>Milestone Birthday / Gala Gown</option>
                      <option>Two-Piece / Jumpsuit Statement</option>
                      <option>Other Custom Request</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-taupe">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                    Target Event Date
                  </label>
                  <DatePicker
                    value={formData.eventDate}
                    onChange={(date) => setFormData({ ...formData, eventDate: date })}
                    placeholder="Select target event date"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                    Silhouette Style
                  </label>
                  <div className="relative">
                    <select
                      value={formData.silhouette}
                      onChange={(e) => setFormData({ ...formData, silhouette: e.target.value })}
                      className="w-full appearance-none rounded-xl bg-porcelain pl-4 pr-11 py-3.5 text-sm text-ink border border-line focus:border-claret focus:outline-none cursor-pointer transition-colors"
                    >
                      <option>Corseted Mermaid & Train</option>
                      <option>Ballgown & Detachable Overskirt</option>
                      <option>Architectural Column Gown</option>
                      <option>Asymmetric Peplum & Cigarette Trouser</option>
                      <option>Sheer Illusion Lace Drape</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-taupe">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                    Budget Range
                  </label>
                  <div className="relative">
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full appearance-none rounded-xl bg-porcelain pl-4 pr-11 py-3.5 text-sm text-ink border border-line focus:border-claret focus:outline-none cursor-pointer transition-colors"
                    >
                      <option>₦150,000 – ₦300,000 ($100 – $200)</option>
                      <option>₦300,000 – ₦600,000 ($200 – $400)</option>
                      <option>₦600,000 – ₦1,200,000 ($400 – $800)</option>
                      <option>₦1,200,000+ ($800+ Haute Couture)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-taupe">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                  Special Notes, Color Palette, or Reference Links
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details on your theme, preferred fabrics (lace, satin, velvet, ankara), or any specific fit considerations..."
                  className="w-full rounded-xl bg-porcelain px-4 py-3.5 text-sm text-ink border border-line focus:border-claret focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:scale-[1.01] shadow-lg"
                style={{
                  background: 'var(--color-ink)',
                  color: 'var(--color-porcelain)',
                  letterSpacing: '0.14em',
                }}
              >
                <span>Submit Bespoke Inquiry & Connect with Stylist</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
