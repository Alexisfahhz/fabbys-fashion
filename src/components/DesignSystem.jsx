// Living design system for Fabbys Fashion. It renders the ACTUAL tokens from
// src/index.css (@theme is the single source of truth) and real component
// instances, so it stays honest as the site grows: add a token there, add a
// component here. Reachable at /#design-system. Section 5c pattern (same as the
// LinqLabs app's /design-system): one CSS-variable source, one living page.

const COLORS = [
  ['--color-porcelain', 'Porcelain', 'Page ground, the brand surface tone'],
  ['--color-porcelain-2', 'Porcelain 2', 'Recessed surface, subtle depth'],
  ['--color-bone', 'Bone', 'Raised card / menu surface (pure white)'],
  ['--color-ink', 'Ink', 'Primary text, dark buttons'],
  ['--color-ink-soft', 'Ink soft', 'Secondary text'],
  ['--color-taupe', 'Taupe', 'Eyebrows, muted labels'],
  ['--color-line', 'Line', 'Hairlines, borders'],
  ['--color-claret', 'Claret', 'The single accent (hover, focus)'],
]

const TYPE = [
  ['Display H1', 'var(--font-display)', 'var(--text-h1)', 400, 'Made to your'],
  ['Display H1 (italic alt)', 'var(--font-display-alt)', 'var(--text-h1)', 400, 'measure.', true],
  ['Menu (serif)', 'var(--font-display)', 'var(--text-menu)', 400, 'Occasion Wear'],
  ['Body', 'var(--font-sans)', 'var(--text-body)', 400, 'Womenswear cut in Lagos, made to be remembered.'],
  ['Nav (caps)', 'var(--font-sans)', 'var(--text-nav)', 500, 'SHOP'],
  ['Eyebrow', 'var(--font-sans)', 'var(--text-eyebrow)', 400, 'THE COLLECTION'],
]

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: '4.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>{title}</h2>
      {children}
    </section>
  )
}

export default function DesignSystem() {
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '5rem 1.5rem 6rem' }}>
      <header style={{ marginBottom: '4rem' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-eyebrow)', letterSpacing: '0.22em', color: 'var(--color-taupe)' }}>FABBYS FASHION</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 500, lineHeight: 1.02, color: 'var(--color-ink)', margin: '0.5rem 0 0.75rem' }}>Design System</h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: 'var(--color-ink-soft)', maxWidth: 560, lineHeight: 1.6 }}>
          The living reference for the atelier site. Every value here is read from the single token
          source in <code>src/index.css</code>. To scale the site, extend the tokens there and add
          the new component instance to this page, so design and code never drift apart.
        </p>
      </header>

      <Section title="Colour">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {COLORS.map(([token, name, use]) => (
            <div key={token} style={{ border: '1px solid var(--color-line)', borderRadius: 12, overflow: 'hidden', background: 'var(--color-bone)' }}>
              <div style={{ height: 76, background: `var(${token})`, borderBottom: '1px solid var(--color-line)' }} />
              <div style={{ padding: '0.75rem 0.9rem' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-ink)' }}>{name}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--color-taupe)', marginTop: 2 }}>{token}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.74rem', color: 'var(--color-ink-soft)', marginTop: 6, lineHeight: 1.4 }}>{use}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {TYPE.map(([label, family, size, weight, sample, italic]) => (
            <div key={label} style={{ borderBottom: '1px solid var(--color-line)', paddingBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-taupe)', marginBottom: '0.6rem' }}>{label}</div>
              <div style={{ fontFamily: family, fontSize: size, fontWeight: weight, fontStyle: italic ? 'italic' : 'normal', color: italic ? 'var(--color-taupe)' : 'var(--color-ink)', lineHeight: 1.1, letterSpacing: label === 'Nav (caps)' || label === 'Eyebrow' ? '0.18em' : 'normal' }}>{sample}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Components">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
          {/* Primary CTA */}
          <a href="#book" onClick={(e) => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '0.75rem 1.5rem', background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em', textDecoration: 'none' }}>Book a fitting</a>
          {/* Secondary / outline */}
          <a href="#shop" onClick={(e) => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '0.75rem 1.5rem', background: 'var(--color-bone)', color: 'var(--color-ink)', border: '1px solid var(--color-line)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-nav)', letterSpacing: '0.1em', textDecoration: 'none' }}>Shop the collection</a>
          {/* SHOP pill */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', borderRadius: 9999, padding: '0.75rem 1.75rem', background: 'var(--color-bone)', border: '1px solid var(--color-line)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-nav)', letterSpacing: '0.18em', fontWeight: 500, color: 'var(--color-ink)' }}>SHOP</span>
          {/* Bag hint (desktop: pill) */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: 9999, border: '1px solid var(--color-line)', padding: '0.5rem 1rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-nav)', letterSpacing: '0.12em', color: 'var(--color-ink-soft)' }}>
            BAG <span style={{ display: 'inline-flex', height: 24, minWidth: 24, alignItems: 'center', justifyContent: 'center', borderRadius: 9999, border: '1px solid var(--color-line)', fontSize: '0.72rem', background: 'rgba(255,255,255,0.5)' }}>0</span>
          </span>
        </div>
        {/* Media card (the atelier field tile) — traced portrait, ~4:5 at 1440 */}
        <div style={{ marginTop: '1.75rem', width: 192, height: 239, borderRadius: 'var(--radius-card)', background: 'var(--color-porcelain-2)', border: '1px solid var(--color-line)', boxShadow: '0 24px 60px -28px rgba(26,23,20,0.45)', display: 'flex', alignItems: 'flex-end', padding: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--color-ink-soft)' }}>Media tile</span>
        </div>
      </Section>

      <Section title="Motion">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: 'var(--color-ink-soft)', lineHeight: 1.6 }}>
          <li><strong style={{ color: 'var(--color-ink)' }}>Ease (couture):</strong> <code>cubic-bezier(0.22, 1, 0.36, 1)</code> via <code>--ease-couture</code>. The one easing for every transition.</li>
          <li><strong style={{ color: 'var(--color-ink)' }}>Entrance:</strong> a quiet staggered <code>riseIn</code> (opacity + 26px lift), delays 0.15s to 0.63s.</li>
          <li><strong style={{ color: 'var(--color-ink)' }}>Atelier field:</strong> cards ride a CSS <code>offset-path</code> down each side arc, fading in and out, looping.</li>
          <li><strong style={{ color: 'var(--color-ink)' }}>Reduced motion:</strong> all of the above collapse to static under <code>prefers-reduced-motion</code>.</li>
        </ul>
      </Section>

      <Section title="Scaling this system">
        <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: 'var(--color-ink-soft)', lineHeight: 1.6 }}>
          <li>New colour, type size, or easing: add it to the <code>@theme</code> block in <code>src/index.css</code>. Never hardcode a hex or px that a token could hold.</li>
          <li>New component: build it from the tokens above, then drop a real instance into the Components section here so this page always mirrors the live site.</li>
          <li>Keep the rule of restraint: monochrome ink on porcelain, claret as the only accent, two display serifs (Cormorant + the Playfair italic accent line) and one UI sans (Jost).</li>
        </ol>
      </Section>
    </div>
  )
}
