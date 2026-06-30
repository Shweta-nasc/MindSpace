import { useEffect, useRef } from 'react'
import {
  StickyNote, NotebookPen, Star, Coffee, BookOpen, Sparkles,
  Lightbulb, PenTool, Palette, MessageCircle,
  Terminal, Braces, GitBranch, Cpu, Binary, Network,
  ListChecks, Target, LayoutGrid, CheckCheck, Milestone,
  FileText, Bookmark, Library,
  Camera, Headphones, Leaf, Gamepad2, Disc3,
  Plane, Map, MapPin, Mountain, Compass, Ticket,
  Orbit, Rocket, Telescope,
  Award, Medal, Trophy, TrendingUp,
  Music4, AudioLines, Radio, Mic2,
  Film, Clapperboard, Video, MonitorPlay, Aperture,
  Image as ImageIcon, Shapes, Frame,
} from 'lucide-react'

const ICONS = {
  StickyNote, NotebookPen, Star, Coffee, BookOpen, Sparkles,
  Lightbulb, PenTool, Palette, MessageCircle,
  Terminal, Braces, GitBranch, Cpu, Binary, Network,
  ListChecks, Target, LayoutGrid, CheckCheck, Milestone,
  FileText, Bookmark, Library,
  Camera, Headphones, Leaf, Gamepad2, Disc3,
  Plane, Map, MapPin, Mountain, Compass, Ticket,
  Orbit, Rocket, Telescope,
  Award, Medal, Trophy, TrendingUp,
  Music4, AudioLines, Radio, Mic2,
  Film, Clapperboard, Video, MonitorPlay, Aperture,
  Image: ImageIcon, Shapes, Frame,
}

// Scattered anchor slots. Tuned to sit in the margins / behind glass,
// away from the centre column where primary content lives.
const SLOTS = [
  { top: '12%', left: '6%', size: 70, depth: 2.4, rot: -10, dur: 13, delay: 0 },
  { top: '64%', left: '10%', size: 54, depth: 3.2, rot: 8, dur: 16, delay: 1.5 },
  { top: '22%', left: '86%', size: 64, depth: 2.0, rot: 12, dur: 14, delay: 0.8 },
  { top: '72%', left: '82%', size: 80, depth: 3.6, rot: -6, dur: 18, delay: 2.2 },
  { top: '44%', left: '50%', size: 48, depth: 1.6, rot: 4, dur: 15, delay: 1.1 },
  { top: '8%', left: '54%', size: 44, depth: 2.8, rot: -14, dur: 17, delay: 0.4 },
]

export default function Decorations({ theme }) {
  const ref = useRef(null)

  // Lightweight pointer parallax: one rAF loop lerps the container's
  // --mx / --my variables; each glyph multiplies them by its depth.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf

    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2 // -1..1
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.05
      cur.y += (target.y - cur.y) * 0.05
      el.style.setProperty('--mx', `${cur.x * 6}px`)
      el.style.setProperty('--my', `${cur.y * 6}px`)
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ '--mx': '0px', '--my': '0px' }}>
      {theme.decor.map((name, i) => {
        const Icon = ICONS[name] || Sparkles
        const s = SLOTS[i % SLOTS.length]
        return (
          <div
            key={`${theme.id}-${name}-${i}`}
            className="gpu absolute"
            style={{
              top: s.top,
              left: s.left,
              transform: `translate3d(calc(var(--mx) * ${s.depth}), calc(var(--my) * ${s.depth}), 0)`,
            }}
          >
            <div
              className="gpu"
              style={{
                '--decor-rot': `${s.rot}deg`,
                animation: `decor-float ${s.dur}s ease-in-out ${s.delay}s infinite`,
              }}
            >
              <Icon
                size={s.size}
                strokeWidth={1}
                style={{ color: theme.accent3, opacity: 0.1 }}
              />
            </div>
          </div>
        )
      })}

      {/* A couple of floating glass chips for depth */}
      <div
        className="gpu absolute hidden lg:block"
        style={{ top: '34%', left: '78%', transform: 'translate3d(calc(var(--mx) * 1.4), calc(var(--my) * 1.4), 0)' }}
      >
        <div
          className="glass rounded-2xl px-4 py-3"
          style={{ animation: 'decor-float 20s ease-in-out infinite', opacity: 0.5 }}
        >
          <span className="eyebrow" style={{ color: theme.accent3 }}>
            {theme.mood}
          </span>
        </div>
      </div>
    </div>
  )
}
