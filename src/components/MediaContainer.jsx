// One portrait lookbook card (section 9: portrait, never landscape). It rides a
// CSS motion-path (`offset-path`) down its side's arc and loops, fading in at the
// top and out at the bottom. offset-rotate is 0 so the garment stays upright; a
// small static lean is applied on the inner element. No JS animation runs.
export default function MediaContainer({ item, path, index, count, duration, onEnter, onLeave }) {
  const delay = -((index / count) * duration).toFixed(2)

  return (
    <div
      className="arc-card pointer-events-auto absolute left-0 top-0"
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: '0deg',
        animation: `flowDown ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => onEnter(item.title)}
      onMouseLeave={onLeave}
    >
      <div className="arc-card-inner" style={{ transform: `rotate(${item.rot}deg)` }}>
        <div
          className="arc-card-frame overflow-hidden bg-porcelain-2"
          style={{
            width: 'clamp(120px, 9.5vw, 172px)',
            aspectRatio: '3 / 4',
            borderRadius: '10px',
            boxShadow: '0 24px 60px -28px rgba(26,23,20,0.45), 0 2px 10px -4px rgba(26,23,20,0.2)',
          }}
        >
          {item.type === 'video' ? (
            <video className="h-full w-full object-cover" src={item.src} poster={item.poster} muted loop autoPlay playsInline preload="auto" />
          ) : (
            <img className="h-full w-full object-cover" src={item.src} alt={item.title} loading="eager" decoding="async" />
          )}
        </div>
      </div>
    </div>
  )
}
