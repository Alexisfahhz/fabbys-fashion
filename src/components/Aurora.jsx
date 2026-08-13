import { BASE } from '../lib/base'

// Ambient pearlescent aurora. Two masked, slowly-drifting copies of the silk
// plate blended over porcelain, plus a faint iridescent wash beneath. Extremely
// subtle by intent (section 3 of the brief): it must never compete with type.
// Pure CSS keyframes (lighter than JS for an always-on ambient loop); reduced
// motion parks it via the global rule in index.css.
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* iridescent wash for faint colour beneath the silk */}
      <div className="aurora-wash absolute inset-0" />
      {/* silk plate, two layers for depth */}
      <div className="aurora-veil aurora-veil--a" />
      <div className="aurora-veil aurora-veil--b" />
      {/* porcelain floor gradient so the field reads on solid ground lower down */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-porcelain))' }}
      />
      <style>{`
        .aurora-wash {
          background:
            radial-gradient(120% 80% at 70% 0%, rgba(224,209,214,0.35), transparent 60%),
            radial-gradient(90% 70% at 20% 10%, rgba(206,214,224,0.30), transparent 55%),
            radial-gradient(100% 90% at 50% 0%, rgba(255,246,238,0.5), transparent 70%);
          filter: saturate(1.05);
          animation: auroraHue 34s ease-in-out infinite alternate;
        }
        .aurora-veil {
          position: absolute;
          top: -12vh; left: -10%;
          width: 120%; height: 78vh;
          background-image: url(${BASE}brand/aurora.png);
          background-size: 130% auto;
          background-repeat: no-repeat;
          background-position: center top;
          mix-blend-mode: screen;
          -webkit-mask-image: radial-gradient(120% 90% at 50% 25%, #000 35%, transparent 78%);
          mask-image: radial-gradient(120% 90% at 50% 25%, #000 35%, transparent 78%);
        }
        .aurora-veil--a { opacity: 0.92; filter: blur(1px); animation: auroraDriftA 42s ease-in-out infinite alternate; }
        .aurora-veil--b { opacity: 0.5; filter: blur(22px); transform: scaleX(-1); animation: auroraDriftB 64s ease-in-out infinite alternate; }
        @keyframes auroraDriftA {
          0%   { transform: translate3d(-2%, 0, 0) scale(1.02) rotate(-0.6deg); }
          100% { transform: translate3d(3%, -2%, 0) scale(1.08) rotate(0.8deg); }
        }
        @keyframes auroraDriftB {
          0%   { transform: scaleX(-1) translate3d(2%, 1%, 0) scale(1.05); }
          100% { transform: scaleX(-1) translate3d(-3%, -1%, 0) scale(1.12); }
        }
        @keyframes auroraHue { 0% { opacity: 0.9; } 100% { opacity: 1; } }
      `}</style>
    </div>
  )
}
