# Fabbys Fashion, brand + design system

Premium contemporary African womenswear. Lagos origin, international ambition.
Custom and ready-to-wear: bridal, occasion, lace, Ankara, statement pieces.

## Positioning / tagline (brief §16)

**Primary:** From breathtaking bridal to unforgettable owambe statements — custom pieces tailored to turn heads.

Alternates:
- Made for the African woman who arrives with grace, commands the room, and leaves a statement.
- Luxury cuts, rich lace, and bespoke fits crafted for every milestone celebration.
- Perfect silhouettes and flawless fits tailored to celebrate your beauty.
- Stepping out in effortless royalty, from traditional grandeur to modern couture.

Rationale: Culturally resonant African and Nigerian luxury fashion positioning that speaks directly to bridal, aso-ebi, milestone celebrations, and turning heads.

## Palette (design tokens in `src/index.css` @theme)

Monochrome ink on warm porcelain, with a single reserved accent. The aurora
supplies all ambient colour, so restraint elsewhere reads as luxury.

| Token | Hex | Role |
|---|---|---|
| `--color-porcelain` | #f6f3ef | ground |
| `--color-porcelain-2` | #efeae3 | card placeholder ground |
| `--color-bone` | #ffffff | panels, SHOP pill |
| `--color-ink` | #1a1714 | primary type |
| `--color-ink-soft` | #4a443d | body, secondary |
| `--color-taupe` | #8b8178 | eyebrows, muted display |
| `--color-line` | #e3ddd4 | hairlines, borders |
| `--color-claret` | #6b3a3f | the one accent: live SHOP state + hover only |

## Type

- **Display:** Cormorant Garamond (high-contrast editorial serif, bridal/couture).
  Used for the hero headline and the large SHOP menu items.
- **Display (italic accent):** Playfair Display, italic. The taupe second line of
  the hero headline — a slightly wider counterpoint to Cormorant.
- **UI / body / eyebrows:** Jost (geometric grotesque, quietly fashion). Tracked
  caps for eyebrows and nav.

Scale lives in `@theme` (`--text-h1`, `--text-menu`, `--text-body`, `--text-nav`,
`--text-eyebrow`).

## Signature

A floating **atelier field**: 8 + 8 portrait lookbook cards laid on a convex
semicircular arc, drifting and slowly rotating over a living pearlescent aurora,
with each card's couture name revealed on the card itself on hover. One bold
element; everything else quiet.

## Motion

Framer Motion, chosen over GSAP because the motion is spring/gesture-driven, not
scroll-scrubbed. Spring entrances (cards arc in from their edge), ambient float
loops, SHOP menu spring reveal with staggered items, cursor label spring-follow.
`prefers-reduced-motion` parks all of it (global rule in `index.css`).

## Component architecture (brief §24)

`Navbar` (`BrandLogo`, `ShopButton`, `NavigationMenu`), `Aurora`,
`HeroText`, `HeroMediaField` (`MediaContainer`), `HeroPillars` (3-card footer dock). Content and media
are data-driven: `src/data/content.js`, `src/data/media.js`.

## Media (brief §12, §13, §25)

The field reads from `mediaField` in `src/data/media.js`: `{ id, type, src,
poster, title, side, slot, top, lx, rot, drift, delay }`. Not hard-coded to a
count. Current assets are the 10 real garment photos + 1 clip from the brand
folder, cycled across 16 slots. To enrich with the Instagram references
(@fabbys_fashion reels/posts in the brief), drop downloaded files into
`public/media/` and add rows to `assets`; the shape is identical, no component
changes. Instagram URLs are not used directly as `src` (brief §13).

## Scope (brief §29)

Built now: nav, aurora, SHOP CTA + open/close, responsive, menu active state,
motion system, tokens, type, colour, component + media architecture, hero field.
Not built: ecommerce, checkout, product pages, cart, account, Instagram API.

## Responsive strategy (brief §21)

The drifting 16-card field is desktop (md+). On phones it is intentionally
hidden rather than crammed; the aurora, editorial type, and the SHOP interaction
carry mobile. The left arc is xl+ so it never crowds the hero text.
