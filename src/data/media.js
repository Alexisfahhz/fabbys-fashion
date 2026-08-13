// Data-driven media field for the hero. The architecture is intentionally not
// hard-coded to a fixed count: add or remove entries and the field re-balances.
// `src` files live in /public/media. Real Instagram/brand media replaces the
// placeholders here later; the shape stays identical.
//
// side:   'left' or 'right', which edge the container enters from
// slot:   vertical order within its column (0 at top)
// lx:     horizontal position within the field (%)
// rot:    resting rotation in degrees (follows the arc tangent)
// delay:  entrance stagger (s)

const img = (f) => `${import.meta.env.BASE_URL}media/${f}`

// 10 real garment photos, cycled across the 16 slots. One slot is overridden
// below to the transcoded lookbook clip (web-safe H.264).
const assets = [
  { type: 'image', src: img('IMG_2265.jpeg') },
  { type: 'image', src: img('IMG_2403.jpeg') },
  { type: 'image', src: img('IMG_2708.jpeg') },
  { type: 'image', src: img('IMG_3021.jpeg') },
  { type: 'image', src: img('IMG_5149.jpeg') },
  { type: 'image', src: img('IMG_6826.jpeg') },
  { type: 'image', src: img('IMG_8406.jpeg') },
  { type: 'image', src: img('IMG_9482.jpeg') },
  { type: 'image', src: img('62f87ad5-8fb6-4f31-ad58-c9472f244a71.jpg') },
  { type: 'image', src: img('e1025860-2fa0-4911-a46c-a7f298297a6a.jpg') },
]

const video = { type: 'video', src: img('lookbook.mp4'), poster: img('lookbook-poster.jpg') }

// Couture placeholder names, one per container (section 10 of the brief).
const names = [
  'The Slanting Elegance', 'Midnight Lace', 'The Lagos Muse', 'Azure Statement',
  'Ankara Reverie', 'Ivory Occasion', 'The Sculpted Gown', 'Golden Hour',
  'The Marina Gown', 'Coral Ceremony', 'The Yaba Muse', 'Obsidian Drape',
  'Harmattan Silk', 'The Island Bride', 'Terra Reverie', 'The Lagerre Cut',
]

// 8 left + 8 right on an inverted (concave) semicircular arc, compressed ~25%
// in height: top/bottom cards push OUT toward the edge, the middle pulls IN
// toward the hero, so each side cradles the text sitting in the curve.
// Columns: side, slot, top%, lx%, rot, delay
const layout = [
  ['right', 0, 16, 60, -13, 0.05], ['right', 1, 24, 42, -9, 0.13],
  ['right', 2, 32, 28, -6, 0.21], ['right', 3, 40, 20, -2, 0.29],
  ['right', 4, 50, 20, 2, 0.35], ['right', 5, 58, 28, 6, 0.42],
  ['right', 6, 66, 42, 9, 0.48], ['right', 7, 74, 60, 13, 0.55],
  ['left', 0, 16, 9, 13, 0.09], ['left', 1, 24, 26, 9, 0.17],
  ['left', 2, 32, 40, 6, 0.25], ['left', 3, 40, 48, 2, 0.33],
  ['left', 4, 50, 48, -2, 0.39], ['left', 5, 58, 40, -6, 0.46],
  ['left', 6, 66, 26, -9, 0.52], ['left', 7, 74, 9, -13, 0.6],
]

export const mediaField = layout.map((l, i) => {
  const [side, slot, top, lx, rot, delay] = l
  const a = assets[i % assets.length]
  return { id: `m${i}`, ...a, title: names[i], side, slot, top, lx, rot, delay }
})

// One prominent upper-right card plays the lookbook clip (kept to a single video
// for performance).
mediaField[2] = { ...mediaField[2], ...video }

export const leftField = mediaField.filter((m) => m.side === 'left')
export const rightField = mediaField.filter((m) => m.side === 'right')
