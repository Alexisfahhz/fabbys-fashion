import MediaContainer from './MediaContainer'
import { leftField, rightField } from '../data/media'

// Two arcs living in the side margins, clear of the centred hero text. Cards ride
// a CSS motion-path down each semicircle: enter top, travel the curve, exit
// bottom, loop. Pure CSS + composited transforms, no animation library. The
// couture name reveals on each card on hover. Desktop only.
const DURATION = 34

// Local path coords in a 300 x 660 box that starts below the nav band. Traced
// from KingFizzy's own drawn guide (2026-08-14): the left arc enters near the
// top-left edge, swells to a full belly toward the centre in the upper-middle,
// then sweeps back down to the lower-left. The right arc is its exact mirror
// across the box (x' = 300 - x), so it bulges toward the centre from the right.
// offset-anchor centres each card on the path; the top opacity ramp keeps cards
// from appearing behind the nav.
const LEFT_PATH = 'M 30 20 C 265 60, 348 200, 320 305 C 288 405, 165 525, 40 645'
const RIGHT_PATH = 'M 270 20 C 35 60, -48 200, -20 305 C 12 405, 135 525, 260 645'

export default function HeroMediaField() {
  // Six per arc (not the full eight) so the cards sit spaced along the curve
  // rather than clumped.
  const right = rightField.slice(0, 6)
  const left = leftField.slice(0, 6)

  return (
    <>
      {/* Desktop: overflow-hidden to keep cards in bounds; Mobile: no clip so card edges don't get cut */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block overflow-hidden" aria-hidden>
        <div className="arc-wrap arc-wrap--left">
          {left.map((item, i) => (
            <MediaContainer key={item.id} item={item} path={LEFT_PATH} index={i} count={left.length} duration={DURATION} />
          ))}
        </div>
        <div className="arc-wrap arc-wrap--right">
          {right.map((item, i) => (
            <MediaContainer key={item.id} item={item} path={RIGHT_PATH} index={i} count={right.length} duration={DURATION} />
          ))}
        </div>
      </div>
      {/* Mobile: no overflow-hidden so card edges render fully without clipping */}
      <div className="pointer-events-none absolute inset-0 z-10 block md:hidden" aria-hidden>
        <div className="arc-wrap arc-wrap--left">
          {left.map((item, i) => (
            <MediaContainer key={item.id} item={item} path={LEFT_PATH} index={i} count={left.length} duration={DURATION} />
          ))}
        </div>
        <div className="arc-wrap arc-wrap--right">
          {right.map((item, i) => (
            <MediaContainer key={item.id} item={item} path={RIGHT_PATH} index={i} count={right.length} duration={DURATION} />
          ))}
        </div>
      </div>

      <style>{`
        .arc-wrap {
          position: absolute;
          top: 236px;            /* raised 8px from 244px baseline; keeps clearance from nav band */
          height: 660px;
          width: 300px;
        }
        .arc-wrap--right { 
          right: 1vw; 
          transform-origin: top right;
        }
        .arc-wrap--left { 
          left: 1vw; 
          transform-origin: top left;
        }

        /* Mobile dual arcs: contained within the viewport. No mask — the mask
           clipped every card to the 300x660 box (hard 90deg cuts at top + inner
           edge). Cards fade via the flowDown keyframes instead. */
        @media (max-width: 640px) {
          .arc-wrap--left {
            top: 124px;
            left: 16px;
            transform: scale(0.363);
            transform-origin: top left;
            opacity: 0.95;
          }
          .arc-wrap--right {
            top: 124px;
            right: 16px;
            transform: scale(0.363);
            transform-origin: top right;
            opacity: 0.95;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .arc-wrap--left {
            top: 110px;
            left: -20px;
            transform: scale(0.72);
            opacity: 0.92;
          }
          .arc-wrap--right {
            top: 110px;
            right: -20px;
            transform: scale(0.72);
            opacity: 0.92;
          }
        }
        @media (max-height: 860px) and (min-width: 1025px) { .arc-wrap { transform: scale(0.86); } }
        @media (max-width: 1400px) and (min-width: 1025px) { .arc-wrap { transform: scale(0.8); } }
        .arc-card { will-change: offset-distance; }
        .arc-card-inner { will-change: transform; transition: transform 0.4s var(--ease-couture); }
        .arc-card:hover { z-index: 60 !important; }
        .arc-card:hover .arc-card-inner { transform: scale(1.06) rotate(0deg) !important; animation-play-state: paused; }

        /* Couture name, revealed on the card itself. Ink scrim (not porcelain) so
           the rounded bottom corners stay visible against the page. */
        .arc-card-caption {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 2.5rem 0.9rem 0.7rem;
          border-radius: 0 0 var(--radius-card) var(--radius-card);
          background: linear-gradient(to top, rgba(26,23,20,0.72) 0%, rgba(26,23,20,0.3) 45%, rgba(26,23,20,0) 75%);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s var(--ease-couture), transform 0.35s var(--ease-couture);
          pointer-events: none;
        }
        .arc-card:hover .arc-card-caption { opacity: 1; transform: translateY(0); }
      `}</style>
    </>
  )
}
