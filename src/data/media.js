// Data-driven media field for the hero. The architecture is intentionally not
// hard-coded to a fixed count: add or remove entries and the field re-balances.
// `src` files live in /public/media. Real Instagram/brand media replaces the
// placeholders here later; the shape stays identical.
//
// side:   'left' or 'right', which edge the container enters from
// slot:   vertical order within its column (0 at top)
// rot:    resting rotation in degrees
// drift:  amplitude (px) of the slow ambient float, per card
// delay:  entrance stagger (s)

const img = (f) => `${import.meta.env.BASE_URL}media/${f}`

// Available real assets (10 photos + 1 video). Cycled across the 16 slots so
// the field is full without pretending we have 16 unique shots yet.
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
  { type: 'video', src: img('IMG_4069.mov'), poster: img('IMG_2265.jpeg') },
]

// Couture placeholder names, one per container (section 10 of the brief).
const names = [
  'The Slanting Elegance', 'Midnight Lace', 'The Lagos Muse', 'Azure Statement',
  'Ankara Reverie', 'Ivory Occasion', 'The Sculpted Gown', 'Golden Hour',
  'The Marina Gown', 'Coral Ceremony', 'The Yaba Muse', 'Obsidian Drape',
  'Harmattan Silk', 'The Island Bride', 'Terra Reverie', 'The Lagerre Cut',
]

// 8 left + 8 right laid on a convex semicircular arc (like the reference): top
// and bottom cards pull in, the middle bulges toward the edge, so each side
// curves around the hero text sitting in the bowl. lx follows sin(t*pi), and
// rotation follows the arc tangent so cards lean into the curve.
// Columns: side, slot, top%, lx% (horizontal within the field), rot, drift, delay
const layout = [
  ['right', 0, 6, 18, 13, 14, 0.05], ['right', 1, 17, 38, 9, 18, 0.13],
  ['right', 2, 28, 54, 6, 12, 0.21], ['right', 3, 39, 63, 2, 16, 0.29],
  ['right', 4, 51, 63, -2, 20, 0.35], ['right', 5, 62, 54, -6, 13, 0.42],
  ['right', 6, 73, 38, -9, 17, 0.48], ['right', 7, 84, 18, -13, 15, 0.55],
  ['left', 0, 6, 48, -13, 15, 0.09], ['left', 1, 17, 31, -9, 12, 0.17],
  ['left', 2, 28, 17, -6, 18, 0.25], ['left', 3, 39, 9, -2, 14, 0.33],
  ['left', 4, 51, 9, 2, 16, 0.39], ['left', 5, 62, 17, 6, 13, 0.46],
  ['left', 6, 73, 31, 9, 19, 0.52], ['left', 7, 84, 48, 13, 15, 0.6],
]

export const mediaField = layout.map((l, i) => {
  const [side, slot, top, lx, rot, drift, delay] = l
  const a = assets[i % assets.length]
  return {
    id: `m${i}`,
    ...a,
    title: names[i],
    side,
    slot,
    top,
    lx,
    rot,
    drift,
    delay,
  }
})

export const leftField = mediaField.filter((m) => m.side === 'left')
export const rightField = mediaField.filter((m) => m.side === 'right')
