import { heroPillars } from '../data/content'

export default function HeroPillars({ isMobileSection = false }) {
  return (
    <div className={`relative z-20 w-full max-w-[1240px] mx-auto px-5 sm:px-8 ${isMobileSection ? 'pt-4 pb-16 block md:hidden' : 'mt-auto pt-6 hidden md:block'}`}>
      {/* Top Hairline Divider */}
      <div 
        className="mb-6 h-[1px] w-full" 
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-line) 15%, var(--color-line) 85%, transparent)' }} 
      />

      {isMobileSection && (
        <div className="mb-6 text-center">
          <p 
            className="font-medium tracking-[0.2em] text-taupe uppercase mb-1"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: 'var(--color-taupe)' }}
          >
            ATELIER EXPERTISE
          </p>
          <h2 
            className="m-0 text-2xl font-normal"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Bespoke Services
          </h2>
        </div>
      )}

      {/* 3 Pillars: Stacked cleanly on mobile section, 3-column grid on desktop */}
      <div className={`grid gap-4 sm:gap-5 ${isMobileSection ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
        {heroPillars.map((pillar, idx) => (
          <a
            key={pillar.number}
            href={pillar.href}
            className={`pillar-card pillar-card-${idx + 1} group relative block overflow-hidden rounded-xl p-5 sm:p-6 text-left no-underline transition-all duration-300`}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--color-line)',
              boxShadow: '0 10px 30px -15px rgba(26, 23, 20, 0.05)',
            }}
          >
            {/* Header: Eyebrow & Number */}
            <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
              <span 
                className="font-medium" 
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '0.68rem', 
                  letterSpacing: '0.18em', 
                  color: 'var(--color-taupe)' 
                }}
              >
                {pillar.eyebrow}
              </span>
              <span 
                className="text-xs font-semibold"
                style={{ color: 'var(--color-claret)', letterSpacing: '0.08em' }}
              >
                {pillar.number}
              </span>
            </div>

            {/* Title */}
            <h3 
              className="m-0 mb-1.5 sm:mb-2 transition-colors duration-300 group-hover:text-claret" 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.38rem', 
                lineHeight: 1.15, 
                fontWeight: 500,
                color: 'var(--color-ink)' 
              }}
            >
              {pillar.title}
            </h3>

            {/* Description */}
            <p 
              className="m-0 mb-3.5 sm:mb-4" 
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.86rem', 
                lineHeight: 1.6, 
                color: 'var(--color-ink-soft)' 
              }}
            >
              {pillar.description}
            </p>

            {/* Action link with hover arrow */}
            <div 
              className="inline-flex items-center gap-1.5 font-medium transition-all duration-300"
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.76rem', 
                letterSpacing: '0.12em', 
                color: 'var(--color-ink)' 
              }}
            >
              <span className="uppercase">{pillar.cta}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--color-claret)' }}>
                →
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Pure CSS Animations & Hover Styling */}
      <style>{`
        .pillar-card {
          will-change: transform, border-color, box-shadow;
          transition: transform 0.4s var(--ease-couture), border-color 0.4s var(--ease-couture), box-shadow 0.4s var(--ease-couture), background 0.4s var(--ease-couture);
        }
        .pillar-card:hover {
          transform: translateY(-3px);
          border-color: rgba(107, 58, 63, 0.35);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 16px 36px -12px rgba(26, 23, 20, 0.1), 0 0 0 1px rgba(107, 58, 63, 0.15);
        }
        .pillar-card-1 { animation: rise 0.8s var(--ease-couture) 0.5s backwards; }
        .pillar-card-2 { animation: rise 0.8s var(--ease-couture) 0.6s backwards; }
        .pillar-card-3 { animation: rise 0.8s var(--ease-couture) 0.7s backwards; }
      `}</style>
    </div>
  )
}
