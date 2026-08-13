import { useEffect, useRef, useState } from 'react'
import MediaContainer from './MediaContainer'
import { leftField, rightField } from '../data/media'

// Two arcs living in the side margins, clear of the centred hero text. Cards ride
// a CSS motion-path down each semicircle: enter top, travel the curve, exit
// bottom, loop. Pure CSS + composited transforms, no animation library. The
// couture label softly trails the cursor while a card is hovered. Desktop only.
const DURATION = 34

// Local path coords in a 300 x 660 box that starts below the nav band. Right arc
// bulges left (cradles the centre); left arc mirrors it. offset-anchor centres
// each card on the path. The 8% opacity ramp at the top keeps cards from
// appearing behind the nav.
const RIGHT_PATH = 'M 250 30 C 66 220, 66 460, 250 640'
const LEFT_PATH = 'M 50 30 C 234 220, 234 460, 50 640'

export default function HeroMediaField() {
  const [label, setLabel] = useState(null)
  const labelRef = useRef(null)

  // Six per arc (not the full eight) so the cards sit spaced along the curve
  // rather than clumped.
  const right = rightField.slice(0, 6)
  const left = leftField.slice(0, 6)

  useEffect(() => {
    const move = (e) => {
      const el = labelRef.current
      if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="arc-wrap arc-wrap--right">
          {right.map((item, i) => (
            <MediaContainer key={item.id} item={item} path={RIGHT_PATH} index={i} count={right.length} duration={DURATION} onEnter={setLabel} onLeave={() => setLabel(null)} />
          ))}
        </div>
        <div className="arc-wrap arc-wrap--left hidden xl:block">
          {left.map((item, i) => (
            <MediaContainer key={item.id} item={item} path={LEFT_PATH} index={i} count={left.length} duration={DURATION} onEnter={setLabel} onLeave={() => setLabel(null)} />
          ))}
        </div>
      </div>

      {/* cursor-trailing couture label */}
      <div ref={labelRef} className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block" style={{ transition: 'transform 0.18s ease-out' }} aria-hidden>
        <span
          className={`block -translate-x-1/2 -translate-y-[150%] whitespace-nowrap rounded-full px-4 py-1.5 italic transition-opacity duration-300 ${label ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'var(--color-ink)', color: 'var(--color-porcelain)', fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}
        >
          {label || ' '}
        </span>
      </div>

      <style>{`
        .arc-wrap {
          position: absolute;
          top: 132px;            /* clears the nav band so cards never sit under it */
          height: 660px;
          width: 300px;
          transform-origin: top center;
        }
        .arc-wrap--right { right: 1vw; }
        .arc-wrap--left { left: 1vw; }
        @media (max-height: 860px) { .arc-wrap { transform: scale(0.86); } }
        @media (max-width: 1400px) { .arc-wrap { transform: scale(0.8); } }
        .arc-card { will-change: offset-distance; }
        .arc-card-inner { will-change: transform; transition: transform 0.4s var(--ease-couture); }
        .arc-card:hover { z-index: 60; }
        .arc-card:hover .arc-card-inner { transform: scale(1.06) rotate(0deg) !important; }
      `}</style>
    </>
  )
}
