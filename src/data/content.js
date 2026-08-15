// Editorial copy and navigation content. Kept as data so categories, tagline,
// and social can change without touching component code (sections 15, 16, 24).

// Primary positioning (section 16). Relatable African & Nigerian luxury fashion.
export const tagline = 'From breathtaking bridal to unforgettable owambe statements. Custom pieces tailored to turn heads.'

// Hero headline, two-tone (ink first line, taupe second). Communicates the
// custom-craft promise without a fashion cliche.
export const heroHeadline = { top: 'Made to your', bottom: 'measure.' }
export const heroEyebrow = 'Bespoke Tailoring · Bridal, Aso-Ebi, English & More'

// SHOP menu categories (section 15). Not final; ordered as a browsing path.
export const categories = [
  { label: 'Bridal', href: '#bridal' },
  { label: 'Occasion Wear', href: '#occasion' },
  { label: 'Lace & Ankara', href: '#lace-ankara' },
  { label: 'Ready-to-Wear', href: '#ready' },
  { label: 'Custom Pieces', href: '#custom' },
  { label: 'New Arrivals', href: '#new' },
]

// The "Book a demo" analog for a fashion house.
export const bookCta = { label: 'Book a fitting', href: '#fitting' }

export const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/fabbys_fashion', icon: 'instagram' },
  { label: 'WhatsApp', href: 'https://wa.me/2348000000000', icon: 'whatsapp' },
]

// 3 Core Pillars for the Hero Footer Dock
export const heroPillars = [
  {
    number: '01',
    eyebrow: 'CUSTOM TAILORING',
    title: 'Bespoke Couture',
    description: 'Bridal, aso-ebi, and one-of-a-kind statement pieces crafted from initial sketch to hand-finished perfection.',
    cta: 'Custom Inquiry',
    href: '#custom',
  },
  {
    number: '02',
    eyebrow: 'PRECISION FIT',
    title: 'Measurement & Fitting',
    description: 'In-person atelier fittings in Lagos or guided virtual measurement sessions for our global diaspora clients.',
    cta: 'Book Fitting',
    href: '#fitting',
  },
  {
    number: '03',
    eyebrow: 'INSTANT DISPATCH',
    title: 'Ready-to-Wear Drops',
    description: 'Curated luxury staples, sculpted corsetry, and ready-made occasion pieces made for your next grand entrance.',
    cta: 'Shop Ready-to-Wear',
    href: '#ready',
  },
]
