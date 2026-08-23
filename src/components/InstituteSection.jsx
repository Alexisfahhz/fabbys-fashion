import { useState } from 'react'
import { instituteCourses, institutePerks } from '../data/institute'
import { useBag } from '../lib/bagContext'

export default function InstituteSection() {
  const { formatPrice } = useBag()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [appForm, setAppForm] = useState({
    name: '',
    phone: '',
    email: '',
    experienceLevel: 'Beginner (No prior sewing experience)',
    motivation: '',
  })
  const [appSubmitted, setAppSubmitted] = useState(false)

  const handleApply = (e) => {
    e.preventDefault()
    setAppSubmitted(true)
    const text = `*New FabbysFashion Institute Application*\n\n*Course:* ${selectedCourse?.title}\n*Applicant Name:* ${appForm.name}\n*WhatsApp/Phone:* ${appForm.phone}\n*Email:* ${appForm.email}\n*Experience Level:* ${appForm.experienceLevel}\n*Motivation:* ${appForm.motivation || 'None'}`
    
    setTimeout(() => {
      window.open(`https://wa.me/2347011934913?text=${encodeURIComponent(text)}`, '_blank')
    }, 800)
  }

  return (
    <section id="apprenticeship" className="relative px-6 py-20 md:px-12 md:py-32 bg-porcelain scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <span className="block text-xs font-semibold tracking-[0.24em] uppercase text-taupe mb-2">
            ACADEMY OF COUTURE CRAFT
          </span>
          <h2
            className="m-0 text-3xl md:text-5xl font-normal leading-tight text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The FabbysFashion <span className="italic text-taupe">Institute</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-soft max-w-2xl mx-auto">
            Passing down the revered art of African luxury couture. Rigorous apprenticeship programs for aspiring tailors, corsetiers, and fashion house founders.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-16">
          {institutePerks.map((perk, idx) => (
            <div key={idx} className="rounded-2xl bg-bone p-6 border border-line shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-porcelain-2 text-ink font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="m-0 text-base font-medium text-ink mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
                {perk.title}
              </h3>
              <p className="m-0 text-xs leading-relaxed text-ink-soft">
                {perk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Courses Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {instituteCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col justify-between rounded-3xl bg-bone p-7 sm:p-8 border border-line shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[0.68rem] font-semibold tracking-wider uppercase text-taupe">
                    {course.level}
                  </span>
                  {course.tag && (
                    <span className="rounded-full bg-porcelain-2 px-2.5 py-0.5 text-[0.65rem] font-medium text-ink">
                      {course.tag}
                    </span>
                  )}
                </div>

                <h3 className="m-0 text-xl sm:text-2xl font-normal leading-snug text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {course.title}
                </h3>

                <p className="text-xs leading-relaxed text-ink-soft mb-6">
                  {course.description}
                </p>

                <div className="space-y-3 border-t border-b py-4 mb-6" style={{ borderColor: 'var(--color-line)' }}>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-taupe">Duration</span>
                    <span className="text-xs font-medium text-ink">{course.duration}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-taupe">Schedule</span>
                    <span className="text-xs font-medium leading-relaxed text-ink">{course.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-taupe">Tuition</span>
                    <span className="font-bold text-base text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                      {formatPrice(course.tuitionNGN)}
                    </span>
                  </div>
                </div>

                {/* Modules list */}
                <div>
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-taupe mb-2.5">
                    Core Curriculum:
                  </span>
                  <ul className="m-0 list-none p-0 space-y-2">
                    {course.modules.map((mod, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-ink-soft">
                        <span className="text-claret font-bold">›</span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCourse(course)
                    setAppSubmitted(false)
                  }}
                  className="flex w-full items-center justify-center rounded-full py-3.5 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  style={{
                    background: 'var(--color-ink)',
                    color: 'var(--color-porcelain)',
                    letterSpacing: '0.12em',
                  }}
                >
                  Apply for Admission
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            <button
              type="button"
              aria-label="Close application modal"
              onClick={() => setSelectedCourse(null)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
            />

            <div className="relative z-10 w-full max-w-lg rounded-3xl bg-bone p-7 sm:p-9 shadow-2xl border border-line animate-in zoom-in-95">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-porcelain-2 text-ink hover:rotate-90 transition-transform"
              >
                ✕
              </button>

              <span className="text-[0.68rem] font-semibold tracking-widest uppercase text-taupe">
                ACADEMY ADMISSIONS
              </span>
              <h3 className="m-0 mt-1 text-2xl font-normal text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                {selectedCourse.title}
              </h3>
              <p className="mt-1 mb-6 text-xs text-taupe">
                Tuition: <span className="text-sm font-bold text-ink">{formatPrice(selectedCourse.tuitionNGN)}</span> · {selectedCourse.duration}
              </p>

              {appSubmitted ? (
                <div className="rounded-2xl bg-porcelain p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-claret text-porcelain">
                    ✓
                  </div>
                  <h4 className="m-0 text-lg font-medium text-ink">Application Submitted</h4>
                  <p className="mt-2 text-xs text-ink-soft">
                    Thank you {appForm.name}. Our admissions coordinator has received your details and initiated WhatsApp onboarding.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(null)}
                    className="mt-5 rounded-full bg-ink px-6 py-2 text-xs text-porcelain"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4 text-left">
                  <div>
                    <label className="block text-[0.7rem] font-medium uppercase tracking-wider text-taupe mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full rounded-xl bg-porcelain px-4 py-2.5 text-xs text-ink border border-line focus:border-claret focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.7rem] font-medium uppercase tracking-wider text-taupe mb-1.5">
                        WhatsApp Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={appForm.phone}
                        onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                        placeholder="+234..."
                        className="w-full rounded-xl bg-porcelain px-4 py-2.5 text-xs text-ink border border-line focus:border-claret focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.7rem] font-medium uppercase tracking-wider text-taupe mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        placeholder="you@email.com"
                        className="w-full rounded-xl bg-porcelain px-4 py-2.5 text-xs text-ink border border-line focus:border-claret focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-medium uppercase tracking-wider text-taupe mb-1.5">
                      Current Sewing / Tailoring Experience
                    </label>
                    <div className="relative">
                      <select
                        value={appForm.experienceLevel}
                        onChange={(e) => setAppForm({ ...appForm, experienceLevel: e.target.value })}
                        className="w-full appearance-none rounded-xl bg-porcelain pl-4 pr-11 py-2.5 text-xs text-ink border border-line focus:border-claret focus:outline-none cursor-pointer transition-colors"
                      >
                        <option>Beginner (No prior sewing experience)</option>
                        <option>Intermediate (Can sew basic garments, want couture polish)</option>
                        <option>Practicing Designer (Seeking advanced corsetry & bridal mastery)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-taupe">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-medium uppercase tracking-wider text-taupe mb-1.5">
                      Why do you want to join this program?
                    </label>
                    <textarea
                      rows={2}
                      value={appForm.motivation}
                      onChange={(e) => setAppForm({ ...appForm, motivation: e.target.value })}
                      placeholder="Share your goals and aspiration..."
                      className="w-full rounded-xl bg-porcelain px-4 py-2.5 text-xs text-ink border border-line focus:border-claret focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-full py-3.5 text-xs font-medium tracking-widest uppercase bg-ink text-porcelain hover:scale-[1.01] shadow-md"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
