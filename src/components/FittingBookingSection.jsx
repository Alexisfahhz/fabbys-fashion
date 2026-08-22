import { useState } from 'react'
import DatePicker from './DatePicker'

export default function FittingBookingSection() {
  const [fittingType, setFittingType] = useState('in-person') // 'in-person' | 'virtual'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    timeSlot: '11:00 AM – 12:30 PM',
    timezone: 'WAT (West Africa Time)',
    clientLocation: 'Lagos, Nigeria',
    notes: '',
  })
  const [booked, setBooked] = useState(false)

  const handleBooking = (e) => {
    e.preventDefault()
    setBooked(true)
    const typeLabel = fittingType === 'in-person' ? 'In-Person Studio Fitting (Lagos Atelier)' : 'Virtual Diaspora Video Fitting'
    const text = `*New Fitting Appointment Booking*\n\n*Type:* ${typeLabel}\n*Name:* ${formData.name}\n*Phone/WhatsApp:* ${formData.phone}\n*Email:* ${formData.email}\n*Preferred Date:* ${formData.preferredDate}\n*Time Slot:* ${formData.timeSlot}\n*Location/Timezone:* ${formData.clientLocation} (${formData.timezone})\n*Notes:* ${formData.notes || 'None'}`
    
    setTimeout(() => {
      window.open(`https://wa.me/2348000000000?text=${encodeURIComponent(text)}`, '_blank')
    }, 800)
  }

  return (
    <section id="fitting" className="relative px-6 py-20 md:px-12 md:py-32 bg-porcelain-2/40 border-y border-line scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <span className="block text-xs font-semibold tracking-[0.24em] uppercase text-taupe mb-2">
            PRECISION FIT STUDIO
          </span>
          <h2
            className="m-0 text-3xl md:text-5xl font-normal leading-tight text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Book a Precision <span className="italic text-taupe">Fitting</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Whether visiting our private atelier in Surulere, Lagos, or connecting from London, New York, or Toronto, our master fitters guarantee an impeccable silhouette.
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div className="mx-auto mb-12 flex max-w-md justify-center rounded-full bg-bone p-1.5 border border-line shadow-sm">
          <button
            type="button"
            onClick={() => setFittingType('in-person')}
            className={`flex-1 rounded-full py-3 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              fittingType === 'in-person'
                ? 'bg-ink text-porcelain shadow-md'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            In-Person Atelier (Lagos)
          </button>
          <button
            type="button"
            onClick={() => setFittingType('virtual')}
            className={`flex-1 rounded-full py-3 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              fittingType === 'virtual'
                ? 'bg-ink text-porcelain shadow-md'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Virtual Diaspora (Global)
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Info & Protocol Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-bone p-8 border border-line shadow-sm">
              <h3 className="m-0 text-2xl font-normal text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                {fittingType === 'in-person' ? 'Private Studio Fitting Experience' : 'Guided Diaspora Video Protocol'}
              </h3>
              
              <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                {fittingType === 'in-person'
                  ? 'Enjoy dedicated access to our master cutter and stylist. Experience raw fabric drapes, silhouette testing, and custom toile adjustments over complimentary refreshments.'
                  : 'Tailored for clients in the UK, USA, Canada, Europe, and UAE. A master stylist connects via 1-on-1 Zoom/WhatsApp video to direct your exact 28-point body measurements.'}
              </p>

              <div className="mt-6 space-y-3.5 border-t pt-5" style={{ borderColor: 'var(--color-line)' }}>
                <div className="flex items-start gap-3 text-xs text-ink-soft">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-porcelain-2 text-claret font-bold">✓</span>
                  <span>{fittingType === 'in-person' ? 'Complimentary 45-minute private studio session' : 'Live step-by-step video measurement direction'}</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-ink-soft">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-porcelain-2 text-claret font-bold">✓</span>
                  <span>{fittingType === 'in-person' ? 'Touch & feel hundreds of lace and silk swatches' : 'Digital PDF Measurement Guide provided in advance'}</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-ink-soft">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-porcelain-2 text-claret font-bold">✓</span>
                  <span>100% Zero-Risk Alteration Guarantee on final delivery</span>
                </div>
              </div>

              {fittingType === 'in-person' && (
                <div className="mt-6 rounded-2xl bg-porcelain p-4 text-xs text-ink-soft">
                  <p className="m-0 font-medium text-ink">📍 Atelier Studio Location</p>
                  <p className="m-0 mt-1 text-taupe">No. 53 Randle Avenue, Surulere Lagos.</p>
                  <p className="m-0 mt-0.5 text-taupe">Private fitting suites & dedicated stylist consultation.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="lg:col-span-7 rounded-3xl bg-bone p-8 sm:p-10 border border-line shadow-xl">
            {booked ? (
              <div className="text-center py-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-claret text-porcelain">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="m-0 text-2xl font-normal text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                  Fitting Reserved
                </h4>
                <p className="mt-2 text-xs text-ink-soft max-w-sm mx-auto leading-relaxed">
                  We've reserved your slot for {formData.preferredDate || 'your selected date'}. Our concierge has initiated your WhatsApp fitting confirmation.
                </p>
                <button
                  type="button"
                  onClick={() => setBooked(false)}
                  className="mt-6 rounded-full bg-ink px-6 py-2.5 text-xs text-porcelain tracking-wider uppercase"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-5 text-left">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full rounded-xl bg-porcelain px-4 py-3 text-sm text-ink border border-line focus:border-claret focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 or country code"
                      className="w-full rounded-xl bg-porcelain px-4 py-3 text-sm text-ink border border-line focus:border-claret focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                      Preferred Date *
                    </label>
                    <DatePicker
                      value={formData.preferredDate}
                      onChange={(date) => setFormData({ ...formData, preferredDate: date })}
                      placeholder="Select fitting date"
                      required={true}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full appearance-none rounded-xl bg-porcelain pl-4 pr-11 py-3 text-sm text-ink border border-line focus:border-claret focus:outline-none cursor-pointer transition-colors"
                      >
                        <option>10:00 AM – 11:30 AM (WAT)</option>
                        <option>11:30 AM – 1:00 PM (WAT)</option>
                        <option>2:00 PM – 3:30 PM (WAT)</option>
                        <option>3:30 PM – 5:00 PM (WAT)</option>
                        <option>Evening Diaspora Slot (7:00 PM WAT / 2:00 PM EST)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-taupe">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {fittingType === 'virtual' && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                        Your City & Country
                      </label>
                      <input
                        type="text"
                        value={formData.clientLocation}
                        onChange={(e) => setFormData({ ...formData, clientLocation: e.target.value })}
                        placeholder="e.g. London, UK or Atlanta, USA"
                        className="w-full rounded-xl bg-porcelain px-4 py-3 text-sm text-ink border border-line focus:border-claret focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                        Your Timezone
                      </label>
                      <div className="relative">
                        <select
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                          className="w-full appearance-none rounded-xl bg-porcelain pl-4 pr-11 py-3 text-sm text-ink border border-line focus:border-claret focus:outline-none cursor-pointer transition-colors"
                        >
                          <option>GMT / BST (United Kingdom)</option>
                          <option>EST (US Eastern / New York)</option>
                          <option>CST (US Central / Houston)</option>
                          <option>PST (US Pacific / California)</option>
                          <option>WAT (West Africa Time)</option>
                          <option>Other International Timezone</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-taupe">
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-taupe mb-2">
                    Garment or Event Context
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="E.g. Bridal fitting, milestone birthday owambe, or altering an existing piece..."
                    className="w-full rounded-xl bg-porcelain px-4 py-3 text-sm text-ink border border-line focus:border-claret focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:scale-[1.01] shadow-md"
                  style={{
                    background: 'var(--color-ink)',
                    color: 'var(--color-porcelain)',
                    letterSpacing: '0.14em',
                  }}
                >
                  <span>Confirm Fitting Reservation</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
