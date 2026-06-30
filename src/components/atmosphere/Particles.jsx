import { useEffect, useRef } from 'react'
import { PARTICLE_COUNT } from '../../theme/themes'

const parseRgb = (s) => s.split(',').map((n) => parseInt(n.trim(), 10))
const lerp = (a, b, t) => a + (b - a) * t

/**
 * Persistent, theme-aware particle field on a single canvas.
 * - One rAF loop, GPU-friendly (canvas compositing).
 * - Colour morphs smoothly toward the active theme's particle colour.
 * - Honours prefers-reduced-motion (renders a single calm frame).
 *
 * Particle "kinds": dust · node · streak · star · bokeh · confetti · wave
 */
export default function Particles({ particle }) {
  const canvasRef = useRef(null)
  const cfgRef = useRef(particle)
  cfgRef.current = particle

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let w = 0
    let h = 0
    let dpr = 1
    let parts = []
    let streaks = []
    const color = parseRgb(cfgRef.current.color) // current (animated) colour

    const targetCount = () => {
      const base = PARTICLE_COUNT[cfgRef.current.count] || PARTICLE_COUNT.med
      const scale = Math.min(1.6, Math.max(0.5, (w * h) / (1440 * 900)))
      return Math.round(base * scale)
    }

    const makeParticle = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.7 + 0.5,
      a: Math.random() * 0.5 + 0.25,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random(),
    })

    const sync = () => {
      const target = targetCount()
      while (parts.length < target) parts.push(makeParticle())
      if (parts.length > target) parts.length = target
      // streaks only relevant for code rain
      const sTarget = cfgRef.current.kind === 'streak' ? Math.round(target / 5) : 0
      while (streaks.length < sTarget)
        streaks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          len: Math.random() * 120 + 60,
          v: Math.random() * 1.2 + 0.6,
        })
      if (streaks.length > sTarget) streaks.length = sTarget
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sync()
    }

    const draw = (t) => {
      const cfg = cfgRef.current
      const [tr, tg, tb] = parseRgb(cfg.color)
      color[0] = lerp(color[0], tr, 0.02)
      color[1] = lerp(color[1], tg, 0.02)
      color[2] = lerp(color[2], tb, 0.02)
      const c = `${color[0] | 0},${color[1] | 0},${color[2] | 0}`

      sync()
      ctx.clearRect(0, 0, w, h)

      // code rain streaks (very low opacity)
      if (cfg.kind === 'streak') {
        for (const s of streaks) {
          s.y += s.v
          if (s.y - s.len > h) {
            s.y = -Math.random() * 80
            s.x = Math.random() * w
          }
          const grad = ctx.createLinearGradient(s.x, s.y - s.len, s.x, s.y)
          grad.addColorStop(0, `rgba(${c},0)`)
          grad.addColorStop(1, `rgba(${c},0.10)`)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(s.x, s.y - s.len)
          ctx.lineTo(s.x, s.y)
          ctx.stroke()
        }
      }

      const connect = cfg.connect
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        // motion
        if (cfg.kind === 'wave') {
          p.x += 0.25 + p.vx
          p.y += Math.sin((t / 1000 + p.phase) * 1.2) * 0.25
          if (p.x > w) p.x = 0
        } else {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }

        let alpha = p.a
        if (cfg.twinkle) alpha = p.a * (0.5 + 0.5 * Math.sin(t / 700 + p.phase))

        if (cfg.kind === 'bokeh') {
          const rad = p.r * 7
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad)
          g.addColorStop(0, `rgba(${c},${alpha * 0.5})`)
          g.addColorStop(1, `rgba(${c},0)`)
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
          ctx.fill()
        } else if (cfg.kind === 'confetti') {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.phase + t / 2000)
          ctx.fillStyle = `rgba(${c},${alpha})`
          ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2.6)
          ctx.restore()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${c},${alpha})`
          ctx.fill()
        }

        if (connect) {
          for (let j = i + 1; j < parts.length; j++) {
            const q = parts[j]
            const dx = p.x - q.x
            const dy = p.y - q.y
            const dist = Math.hypot(dx, dy)
            if (dist < 130) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(q.x, q.y)
              ctx.strokeStyle = `rgba(${c},${0.05 * (1 - dist / 130)})`
              ctx.lineWidth = 0.6
              ctx.stroke()
            }
          }
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduced) draw(0)
    else raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
}
