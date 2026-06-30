import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cutoutImg } from '../../lib/images'
import { ease } from '../../lib/motion'

// Edge anchors that live in the margins / behind content, never over the
// primary centre column. `side` sets the enter direction.
const ANCHORS = [
  { style: { top: '14%', right: '2.5%' }, side: 1 },
  { style: { bottom: '12%', right: '4%' }, side: 1 },
  { style: { top: '11%', left: '27%' }, side: -1 },
  { style: { bottom: '9%', left: '30%' }, side: -1 },
]

const LIFETIME = 8000
const FIRST_DELAY = 3500
const rand = (min, max) => min + Math.random() * (max - min)

/**
 * Floating image cutouts. Spawns a keyword-matched photo every 20–40s,
 * max 2 at a time. Each enters from a side, floats and rotates gently,
 * lingers 8s, then fades. Sits behind content so it never blocks the UI.
 */
export default function FloatingCutouts({ theme }) {
  const [items, setItems] = useState([])
  const itemsRef = useRef([])
  const idRef = useRef(0)

  const setBoth = (updater) =>
    setItems((prev) => {
      const next = updater(prev)
      itemsRef.current = next
      return next
    })

  useEffect(() => {
    setBoth(() => [])
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set()
    const track = (t) => (timers.add(t), t)

    const spawn = () => {
      const prev = itemsRef.current
      if (prev.length < 2) {
        const free = ANCHORS.map((_, i) => i).filter(
          (i) => !prev.some((p) => p.anchorIndex === i)
        )
        if (free.length) {
          const anchorIndex = free[Math.floor(Math.random() * free.length)]
          const keyword = theme.cutouts[Math.floor(Math.random() * theme.cutouts.length)]
          const id = ++idRef.current
          const item = {
            id,
            keyword,
            lock: Math.floor(Math.random() * 9000),
            anchorIndex,
            side: ANCHORS[anchorIndex].side,
            tilt: rand(-5, 5),
          }
          setBoth((p) => [...p, item])
          track(setTimeout(() => setBoth((p) => p.filter((x) => x.id !== id)), LIFETIME))
        }
      }
      track(setTimeout(spawn, rand(20000, 40000)))
    }

    track(setTimeout(spawn, FIRST_DELAY))
    return () => {
      timers.forEach(clearTimeout)
      timers.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.id])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {items.map((it) => {
          const anchor = ANCHORS[it.anchorIndex]
          return (
            <motion.div
              key={it.id}
              className="absolute"
              style={anchor.style}
              initial={{ opacity: 0, x: it.side * 80, rotate: it.tilt * 2, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, rotate: it.tilt, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
              transition={{ duration: 1.1, ease }}
            >
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[140px] sm:w-[180px]"
                style={{ filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))' }}
              >
                {/* Editorial photo card */}
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-2 backdrop-blur-sm">
                  <CutoutImage keyword={it.keyword} lock={it.lock} onFail={() =>
                    setBoth((p) => p.filter((x) => x.id !== it.id))
                  } />
                  <p
                    className="px-1 pb-0.5 pt-2 text-center font-serif text-[0.72rem] italic tracking-wide"
                    style={{ color: theme.accent3 }}
                  >
                    {it.keyword.replace(/-/g, ' ')}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

function CutoutImage({ keyword, lock, onFail }) {
  return (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-ink-800">
      <img
        src={cutoutImg(keyword, lock)}
        alt=""
        loading="lazy"
        decoding="async"
        onError={onFail}
        className="h-full w-full object-cover opacity-90"
      />
    </div>
  )
}
