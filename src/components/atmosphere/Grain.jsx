const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * Persistent moving film grain. Slightly oversized and animated with a
 * stepped jitter so it shimmers like real grain without re-rendering.
 */
export default function Grain({ opacity = 0.05 }) {
  return (
    <div
      className="atmo-grain-move gpu absolute inset-[-6%] mix-blend-overlay"
      style={{ backgroundImage: NOISE, opacity }}
      aria-hidden
    />
  )
}
