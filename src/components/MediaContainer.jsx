// One portrait lookbook card (section 9: portrait, never landscape). It rides a
// CSS motion-path (`offset-path`) down its side's arc and loops, fading in at the
// top and out at the bottom. offset-rotate is 0 so the garment stays upright; a
// small static lean is applied on the inner element. No JS animation runs. On
// hover the couture name reveals on the card itself (caption overlay).
export default function MediaContainer({ item, path, index, count, duration }) {
  const flowDelay = -((index / count) * duration).toFixed(2)
  const springDelay = (0.08 + index * 0.08).toFixed(2)

  return (
    <div
      className="arc-card pointer-events-auto absolute left-0 top-0"
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: '0deg',
        animation: `flowDown ${duration}s linear infinite`,
        animationDelay: `${flowDelay}s`,
      }}
    >
      {/* 1. Silky smooth entrance: fast drop with continuous high-end exponential deceleration */}
      <div
        className="arc-card-spring"
        style={{
          animation: `smoothDropIn 1.45s cubic-bezier(0.12, 0.98, 0.24, 1) ${springDelay}s backwards`,
          willChange: 'transform, opacity',
        }}
      >
        {/* 2. Natural posture lean */}
        <div
          className="arc-card-inner"
          style={{
            transform: `rotate(${item.rot}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <div
            className="arc-card-frame overflow-hidden bg-porcelain-2"
            style={{
            width: 'clamp(192.4px, calc(67.6px + 8.6667vw), 234px)',
            height: 'clamp(239.2px, calc(20.8px + 15.1667vw), 312px)',
            borderRadius: 'var(--radius-card)',
              boxShadow: '0 24px 60px -28px rgba(26,23,20,0.45), 0 2px 10px -4px rgba(26,23,20,0.2)',
            }}
          >
            {item.type === 'video' ? (
              <video className="h-full w-full object-cover" src={item.src} poster={item.poster} muted loop autoPlay playsInline preload="auto" />
            ) : (
              <img className="h-full w-full object-cover" src={item.src} alt={item.title} loading="eager" decoding="async" />
            )}
          <div className="arc-card-caption" aria-hidden>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.02rem', color: 'var(--color-porcelain)', lineHeight: 1.25 }}>
              {item.title}
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
