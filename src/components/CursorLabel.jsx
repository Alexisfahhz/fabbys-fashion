import { motion, useSpring, AnimatePresence } from 'framer-motion'

// A couture label that trails the cursor with spring easing (never snapped),
// shown only while a card is hovered. Section 10 of the brief.
export default function CursorLabel({ x, y, label }) {
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 })

  return (
    <AnimatePresence>
      {label && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="block -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-full px-4 py-1.5 italic"
            style={{
              background: 'var(--color-ink)',
              color: 'var(--color-porcelain)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              letterSpacing: '0.01em',
            }}
          >
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
