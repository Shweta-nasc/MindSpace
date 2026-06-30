// Deterministic, deploy-safe sample imagery.
// Uses picsum.photos seeded URLs so every card has a stable, cohesive photo
// without bundling large binary assets into the repo.

export const img = (seed, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

// Grayscale variant for moodier, editorial compositions.
export const imgMono = (seed, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}?grayscale`

// A tiny blurred placeholder (low-res) for blur-up loading.
export const imgBlur = (seed) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/20/25`

// Topical imagery for the floating cutout system. LoremFlickr returns a
// keyword-matched photo; `lock` keeps a given cutout stable across renders.
// Falls back gracefully (the cutout simply fades away) if it fails to load.
export const cutoutImg = (keyword, lock, w = 420, h = 520) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(keyword)}?lock=${lock}`
