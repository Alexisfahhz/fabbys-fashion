import { useMotionValue } from 'framer-motion'
import { useState, useCallback } from 'react'
import MediaContainer from './MediaContainer'
import CursorLabel from './CursorLabel'
import { leftField, rightField } from '../data/media'

// The atelier field: 8 + 8 portrait cards drifting over the aurora, with a
// cursor-tethered couture label. On phones the count is cut hard (section 21):
// showing 16 cards on a 375px screen would be unusable, so each side keeps its
// three strongest slots and the rest are hidden.
export default function HeroMediaField() {
  const [label, setLabel] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const onMove = useCallback(
    (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    },
    [x, y],
  )

  const enter = useCallback((t) => setLabel(t), [])
  const leave = useCallback(() => setLabel(null), [])

  return (
    <>
      <div
        onMouseMove={onMove}
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
      >
        {/* RIGHT column */}
        <div className="field-edge field-edge--right pointer-events-auto absolute right-0 top-0 h-full w-[46vw] max-w-[720px] min-w-[300px]">
          {rightField.map((item, i) => (
            <div key={item.id} className={i >= 3 ? 'hidden md:block' : ''}>
              <MediaContainer item={item} index={i} onEnter={enter} onLeave={leave} />
            </div>
          ))}
        </div>
        {/* LEFT column, desktop only so it never crowds the hero text on small screens */}
        <div className="field-edge field-edge--left pointer-events-auto absolute left-0 top-0 hidden h-full w-[30vw] max-w-[460px] xl:block">
          {leftField.map((item, i) => (
            <MediaContainer key={item.id} item={item} index={i + 8} onEnter={enter} onLeave={leave} />
          ))}
        </div>
      </div>

      <CursorLabel x={x} y={y} label={label} />

      <style>{`
        /* Atmospheric edge fade (section 11): mask, not an opaque overlay. */
        .field-edge--right {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 22%, #000 82%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 22%, #000 82%, transparent);
        }
        .field-edge--left {
          -webkit-mask-image: linear-gradient(to left, transparent, #000 24%, #000 88%);
          mask-image: linear-gradient(to left, transparent, #000 24%, #000 88%);
        }
      `}</style>
    </>
  )
}
