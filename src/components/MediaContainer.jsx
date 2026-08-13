import { motion } from 'framer-motion'

// One portrait lookbook card (section 9: portrait, never landscape). Springs in
// from its edge, then floats and rotates subtly forever. Supports image + video.
export default function MediaContainer({ item, index, onEnter, onLeave }) {
  const fromX = item.side === 'right' ? 260 : -260

  return (
    <motion.div
      className="absolute"
      style={{ top: `${item.top}%`, left: `${item.lx}%`, zIndex: 10 + item.slot }}
      initial={{ x: fromX, y: -50, opacity: 0, rotate: item.rot * 2.2 }}
      animate={{ x: 0, y: 0, opacity: 1, rotate: item.rot }}
      transition={{
        type: 'spring',
        stiffness: 60,
        damping: 18,
        mass: 1.1,
        delay: item.delay,
      }}
    >
      {/* inner wrapper carries the endless ambient float, so it composes with
          the spring entrance above without fighting for the same transform */}
      <motion.div
        animate={{ y: [0, -item.drift, 0], rotate: [0, item.rot > 0 ? -1.4 : 1.4, 0] }}
        transition={{
          duration: 9 + (index % 5),
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: item.delay,
        }}
        whileHover={{ scale: 1.06, zIndex: 40 }}
        onHoverStart={() => onEnter(item.title)}
        onHoverEnd={onLeave}
      >
        <div
          className="overflow-hidden bg-porcelain-2"
          style={{
            width: 'clamp(150px, 13.5vw, 234px)',
            aspectRatio: '3 / 4',
            borderRadius: '10px',
            boxShadow: '0 24px 60px -28px rgba(26,23,20,0.45), 0 2px 10px -4px rgba(26,23,20,0.2)',
          }}
        >
          {item.type === 'video' ? (
            <video
              className="h-full w-full object-cover"
              src={item.src}
              poster={item.poster}
              muted
              loop
              autoPlay
              playsInline
              preload="none"
            />
          ) : (
            <img
              className="h-full w-full object-cover"
              src={item.src}
              alt={item.title}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
