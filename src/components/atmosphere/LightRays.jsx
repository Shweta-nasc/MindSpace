/**
 * Animated lighting: a slow-rotating conic sheen plus optional
 * cinema spotlight / vertical god-rays depending on the theme.
 */
export default function LightRays({ theme }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Rotating conic sheen */}
      <div
        className="atmo-ray gpu absolute left-1/2 top-[-20%] h-[150vmax] w-[150vmax] -translate-x-1/2"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${theme.rays.color}, transparent 28%)`,
        }}
      />

      {/* Cinema spotlight */}
      {theme.spotlight && (
        <div
          className="absolute left-1/2 top-[-30%] h-[120vh] w-[60vw] -translate-x-1/2"
          style={{
            background: `radial-gradient(ellipse at top, ${theme.rays.color}, transparent 60%)`,
            filter: 'blur(30px)',
          }}
        />
      )}

      {/* Soft top god-rays */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 opacity-60"
        style={{
          background: `linear-gradient(180deg, ${theme.rays.color}, transparent)`,
          maskImage: 'linear-gradient(180deg, #000, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, #000, transparent)',
        }}
      />
    </div>
  )
}
