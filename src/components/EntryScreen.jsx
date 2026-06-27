import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { LockKeyhole, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { profile } from '../data/content'
import ParticleField from './ParticleField'
import { ease } from '../lib/motion'

export default function EntryScreen() {
  const { attempt } = useAuth()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const inputRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    if (unlocking) return
    const ok = attempt(value)
    if (ok) {
      setUnlocking(true)
      // brief beat so the success state is felt before the app mounts
      setTimeout(() => {}, 50)
    } else {
      setError(true)
      setValue('')
      inputRef.current?.focus()
      setTimeout(() => setError(false), 600)
    }
  }

  return (
    <motion.div
      className="relative min-h-[100dvh] w-full overflow-hidden bg-ink-950"
      initial={{ opacity: 1 }}
      animate={unlocking ? { opacity: 0, scale: 1.04, filter: 'blur(14px)' } : { opacity: 1 }}
      transition={{ duration: 0.8, ease }}
    >
      {/* Cinematic backdrop: layered gradients + drifting particles */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 20% 15%, rgba(57,189,172,0.18), transparent 55%),' +
              'radial-gradient(1100px 800px at 85% 25%, rgba(154,111,160,0.18), transparent 55%),' +
              'radial-gradient(900px 900px at 50% 110%, rgba(201,169,106,0.16), transparent 60%),' +
              '#070708',
          }}
        />
        <ParticleField />
        {/* slow rotating conic sheen */}
        <div
          className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-[0.07]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), transparent 30%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      </div>

      {/* Centered editorial card */}
      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="w-full max-w-md"
        >
          <motion.div
            animate={error ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-[1.75rem] glass-strong p-8 sm:p-10 shadow-lift"
          >
            {/* top hairline sheen */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="mb-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7, ease }}
                className="mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink-900/60"
              >
                <LockKeyhole className="text-gold-glow" size={26} strokeWidth={1.4} />
              </motion.div>

              <p className="eyebrow mb-3">Private · By invitation of self</p>
              <h1 className="font-display text-4xl sm:text-[2.75rem] leading-none text-ivory">
                Mind <span className="italic text-gradient-gold">Space</span>
              </h1>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-muted font-light">
                Enter your private mind-space — a quiet room for loud ideas.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div
                className={`group relative flex items-center rounded-2xl border bg-ink-900/50 transition-all duration-300 ${
                  error
                    ? 'border-red-400/60 shadow-[0_0_30px_-8px_rgba(248,113,113,0.5)]'
                    : 'border-white/10 focus-within:border-gold/50 focus-within:shadow-glow-gold'
                }`}
              >
                <input
                  ref={inputRef}
                  type={show ? 'text' : 'password'}
                  value={value}
                  autoFocus
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Passphrase"
                  aria-label="Passphrase"
                  className="w-full bg-transparent px-5 py-4 text-ivory placeholder:text-ivory-faint/60 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? 'Hide passphrase' : 'Show passphrase'}
                  className="px-3 text-ivory-faint transition-colors hover:text-ivory"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                className="sweep group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-glow via-gold-glow to-plum-glow px-6 py-4 font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99]"
              >
                Unlock
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-7 flex items-center justify-between text-xs text-ivory-faint">
              <span>{profile.location}</span>
              <span className="font-mono">hint: {profile.password}</span>
            </div>
          </motion.div>

          <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-ivory-faint/70">
            A soft gate, not a vault. Not for sensitive data —
            <br className="hidden sm:block" /> layer Netlify protection for real privacy.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
