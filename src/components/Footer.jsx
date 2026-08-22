import { useState } from 'react'
import BrandLogo from './BrandLogo'
import CurrencySelector from './CurrencySelector'
import { atelierDetails, social } from '../data/content'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <footer className="relative bg-ink text-porcelain pt-20 pb-12 px-6 md:px-12 border-t border-line/20">
      <div className="mx-auto max-w-7xl">
        {/* Top Newsletter & VIP Box — Balanced Centered Layout */}
        <div className="mx-auto mb-20 max-w-3xl rounded-3xl bg-porcelain/5 p-8 sm:p-12 border border-porcelain/10 text-center shadow-lg">
          <span className="text-[0.68rem] font-semibold tracking-[0.24em] uppercase text-taupe block mb-2">
            EXCLUSIVE ATELIER ACCESS
          </span>
          <h3 className="m-0 text-2xl sm:text-3xl lg:text-4xl font-normal text-porcelain" style={{ fontFamily: 'var(--font-display)' }}>
            Join the Fabbys VIP Private Circle
          </h3>
          <p className="mt-2.5 mb-6 text-xs sm:text-sm text-porcelain/70 leading-relaxed max-w-lg mx-auto">
            Receive private previews of limited ready-to-wear drops, bridal trunk show invitations, and private fitting slots.
          </p>

          <div className="max-w-md mx-auto">
            {subscribed ? (
              <div className="rounded-full bg-porcelain/10 px-6 py-3.5 text-xs text-porcelain text-center border border-porcelain/20 animate-in fade-in duration-300">
                ✓ You are now subscribed to the VIP Atelier Circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 rounded-full bg-porcelain/10 px-5 py-3.5 text-xs text-porcelain placeholder:text-porcelain/40 border border-porcelain/20 focus:border-porcelain focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-porcelain px-7 py-3.5 text-xs font-medium text-ink uppercase tracking-wider hover:bg-porcelain/90 transition-transform active:scale-95 shrink-0"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* DESKTOP LAYOUT (lg+): Symmetrical 4-Column Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-10 pb-16 border-b border-porcelain/10">
          {/* Col 1: Brand & Currency */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="invert">
                <BrandLogo />
              </div>
              <span className="font-medium tracking-widest text-sm text-porcelain uppercase">FABBYS FASHION</span>
            </div>
            <p className="text-xs leading-relaxed text-porcelain/70 pr-4">
              Contemporary African luxury womenswear. Bespoke bridal, owambe royalty, and sculpted ready-to-wear crafted in Lagos.
            </p>
            <div className="pt-2">
              <CurrencySelector isDark={true} />
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="text-left">
            <h4 className="text-[0.7rem] font-semibold tracking-widest uppercase text-taupe mb-4">
              COLLECTIONS
            </h4>
            <ul className="m-0 list-none p-0 space-y-2.5 text-xs text-porcelain/80">
              <li><a href="#bridal" className="hover:text-porcelain transition-colors no-underline text-inherit">Bridal & Reception</a></li>
              <li><a href="#occasion" className="hover:text-porcelain transition-colors no-underline text-inherit">Occasion & Owambe</a></li>
              <li><a href="#ready" className="hover:text-porcelain transition-colors no-underline text-inherit">Ready-to-Wear Drops</a></li>
              <li><a href="#lace-ankara" className="hover:text-porcelain transition-colors no-underline text-inherit">Lace & Ankara Luxe</a></li>
              <li><a href="#custom" className="hover:text-porcelain transition-colors no-underline text-inherit">Bespoke Custom Atelier</a></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="text-left">
            <h4 className="text-[0.7rem] font-semibold tracking-widest uppercase text-taupe mb-4">
              EXPERIENCES
            </h4>
            <ul className="m-0 list-none p-0 space-y-2.5 text-xs text-porcelain/80">
              <li><a href="#fitting" className="hover:text-porcelain transition-colors no-underline text-inherit">Book Fabbys Fitting</a></li>
              <li><a href="#fitting" className="hover:text-porcelain transition-colors no-underline text-inherit">Diaspora Video Fitting</a></li>
              <li><a href="#apprenticeship" className="hover:text-porcelain transition-colors no-underline text-inherit">Fabbys Fashion Institute</a></li>
              <li><a href="#reviews" className="hover:text-porcelain transition-colors no-underline text-inherit">Client Testimonials</a></li>
              <li><a href="#faq" className="hover:text-porcelain transition-colors no-underline text-inherit">Atelier FAQs</a></li>
              <li><a href="#design-system" className="hover:text-porcelain transition-colors no-underline text-inherit">Design System</a></li>
            </ul>
          </div>

          {/* Col 4: Fabbys Coordinates */}
          <div className="text-left space-y-3">
            <h4 className="text-[0.7rem] font-semibold tracking-widest uppercase text-taupe mb-4">
              FABBYS COORDINATES
            </h4>
            <p className="m-0 text-xs text-porcelain/80 font-medium">{atelierDetails.address}</p>
            <p className="m-0 text-xs text-porcelain/70">{atelierDetails.hours}</p>
            <p className="m-0 text-xs text-taupe">{atelierDetails.diasporaHours}</p>
            
            <div className="pt-2 flex flex-wrap gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-porcelain/10 px-3.5 py-1.5 text-[0.7rem] text-porcelain hover:bg-porcelain/20 transition-colors no-underline"
                >
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET LAYOUT (< lg): Side-by-side Collections & Experiences, Centralized Coordinates below */}
        <div className="block lg:hidden space-y-12 pb-16 border-b border-porcelain/10">
          {/* Brand & Currency */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="invert">
                <BrandLogo />
              </div>
              <span className="font-medium tracking-widest text-sm text-porcelain uppercase">FABBYS FASHION</span>
            </div>
            <p className="text-xs leading-relaxed text-porcelain/70 max-w-md mx-auto sm:mx-0">
              Contemporary African luxury womenswear. Bespoke bridal, owambe royalty, and sculpted ready-to-wear crafted in Lagos.
            </p>
            <div className="pt-1 flex justify-center sm:justify-start">
              <CurrencySelector isDark={true} />
            </div>
          </div>

          {/* Side-by-side: Collections opposite Experiences */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10 text-left pt-2">
            {/* Collections */}
            <div>
              <h4 className="text-[0.7rem] font-semibold tracking-widest uppercase text-taupe mb-3.5">
                COLLECTIONS
              </h4>
              <ul className="m-0 list-none p-0 space-y-2.5 text-xs text-porcelain/80">
                <li><a href="#bridal" className="hover:text-porcelain transition-colors no-underline text-inherit">Bridal & Reception</a></li>
                <li><a href="#occasion" className="hover:text-porcelain transition-colors no-underline text-inherit">Occasion & Owambe</a></li>
                <li><a href="#ready" className="hover:text-porcelain transition-colors no-underline text-inherit">Ready-to-Wear Drops</a></li>
                <li><a href="#lace-ankara" className="hover:text-porcelain transition-colors no-underline text-inherit">Lace & Ankara Luxe</a></li>
                <li><a href="#custom" className="hover:text-porcelain transition-colors no-underline text-inherit">Bespoke Custom Atelier</a></li>
              </ul>
            </div>

            {/* Experiences */}
            <div>
              <h4 className="text-[0.7rem] font-semibold tracking-widest uppercase text-taupe mb-3.5">
                EXPERIENCES
              </h4>
              <ul className="m-0 list-none p-0 space-y-2.5 text-xs text-porcelain/80">
                <li><a href="#fitting" className="hover:text-porcelain transition-colors no-underline text-inherit">Book Fabbys Fitting</a></li>
                <li><a href="#fitting" className="hover:text-porcelain transition-colors no-underline text-inherit">Diaspora Video Fitting</a></li>
                <li><a href="#apprenticeship" className="hover:text-porcelain transition-colors no-underline text-inherit">Fabbys Institute</a></li>
                <li><a href="#reviews" className="hover:text-porcelain transition-colors no-underline text-inherit">Client Testimonials</a></li>
                <li><a href="#faq" className="hover:text-porcelain transition-colors no-underline text-inherit">Atelier FAQs</a></li>
                <li><a href="#design-system" className="hover:text-porcelain transition-colors no-underline text-inherit">Design System</a></li>
              </ul>
            </div>
          </div>

          {/* Centralized Fabbys Coordinates */}
          <div className="rounded-2xl bg-porcelain/5 p-6 border border-porcelain/10 text-center space-y-2.5">
            <h4 className="text-[0.7rem] font-semibold tracking-widest uppercase text-taupe mb-2">
              FABBYS COORDINATES
            </h4>
            <p className="m-0 text-xs text-porcelain/90 font-medium">{atelierDetails.address}</p>
            <p className="m-0 text-xs text-porcelain/70">{atelierDetails.hours}</p>
            <p className="m-0 text-[0.72rem] text-taupe">{atelierDetails.diasporaHours}</p>
            
            <div className="pt-3 flex items-center justify-center gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-porcelain/10 px-4 py-2 text-xs text-porcelain hover:bg-porcelain/20 transition-colors no-underline"
                >
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credits — Balanced Symmetrical Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-porcelain/50 text-center sm:text-left">
          <p className="m-0">© {new Date().getFullYear()} Fabbys Fashion. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Worldwide DHL Express Shipping</span>
            <span>Plot Surulere Studio</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
