import { meshBackground } from '../../theme/themes'

/**
 * Animated mesh gradient: two layered radial-gradient planes that drift
 * slowly at different rates for a living, breathing backdrop.
 * Optional grid / paper / aurora overlays per theme.
 */
export default function MeshGradient({ theme }) {
  const mesh = meshBackground(theme)
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="atmo-mesh-a gpu absolute inset-[-10%]"
        style={{ backgroundImage: mesh }}
      />
      <div
        className="atmo-mesh-b gpu absolute inset-[-10%] opacity-70"
        style={{ backgroundImage: mesh, filter: 'hue-rotate(12deg)' }}
      />

      {/* Modern AI-lab / mission-control grid */}
      {theme.grid && (
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(circle at 50% 40%, #000 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 40%, #000 30%, transparent 80%)',
          }}
        />
      )}

      {/* Library paper warmth */}
      {theme.paper && (
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(210,190,150,0.5) 0px, rgba(210,190,150,0.5) 1px, transparent 1px, transparent 28px)',
          }}
        />
      )}

      {/* Travel aurora ribbon */}
      {theme.aurora && (
        <div
          className="atmo-mesh-b gpu absolute -top-1/4 left-0 right-0 h-2/3 opacity-50"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, transparent, rgba(120,200,210,0.18), rgba(140,120,200,0.16), transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      )}
    </div>
  )
}
