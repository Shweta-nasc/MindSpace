import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { ease } from '../../lib/motion'
import MeshGradient from './MeshGradient'
import Blobs from './Blobs'
import LightRays from './LightRays'
import Grain from './Grain'
import Particles from './Particles'
import Decorations from './Decorations'
import FloatingCutouts from './FloatingCutouts'

/**
 * The full per-section atmosphere. Sits fixed behind all content.
 *
 * Persistent layers (no remount): base wash, particles, grain — these
 * morph their colour smoothly. Themed layers (mesh, blobs, rays,
 * decorations) are keyed by section id and crossfaded over 800ms so the
 * whole environment "morphs" when you switch sections.
 */
export default function Atmosphere() {
  const { theme } = useTheme()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base wash — transitions colour over 800ms via CSS variable */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--atmo-base)', transition: 'background-color 800ms ease' }}
      />

      {/* Persistent particle field (colour lerps toward the active theme) */}
      <Particles particle={theme.particle} />

      {/* Crossfading themed environment */}
      <AnimatePresence>
        <motion.div
          key={theme.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <MeshGradient theme={theme} />
          <Blobs theme={theme} />
          <LightRays theme={theme} />
          <Decorations theme={theme} />
        </motion.div>
      </AnimatePresence>

      {/* Moving grain + floating photo cutouts */}
      <Grain opacity={0.05} />
      <FloatingCutouts theme={theme} />

      {/* Contrast guard — keeps text legible over richer backdrops */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 90% at 50% 0%, transparent 45%, rgba(4,4,6,0.42) 100%)',
        }}
      />
    </div>
  )
}
