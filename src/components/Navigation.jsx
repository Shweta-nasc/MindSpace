import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, Moon, Sparkles } from 'lucide-react'
import { SECTIONS, accentHex } from '../lib/sections'
import { profile } from '../data/content'
import { ease } from '../lib/motion'

function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="group flex items-center gap-3 text-left">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-ink-900/70">
        <span className="block h-3.5 w-3.5 rounded-full bg-gradient-to-br from-teal-glow via-gold-glow to-plum-glow transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="font-display text-lg tracking-tight text-ivory">
        Mind <span className="italic text-gradient-gold">Space</span>
      </span>
    </button>
  )
}

export default function Navigation({ active, onNavigate, onLock, ambient, onToggleAmbient }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = (id) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  return (
    <>
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] flex-col border-r border-white/[0.06] bg-ink-900/40 backdrop-blur-xl lg:flex">
        <div className="px-6 pb-6 pt-7">
          <Logo onClick={() => go('home')} />
        </div>
        <div className="px-6">
          <div className="hairline" />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-1">
            {SECTIONS.map((s) => {
              const Icon = s.icon
              const isActive = active === s.id
              return (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-300 ${
                      isActive ? 'text-ivory' : 'text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.04]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className="relative z-10 grid h-7 w-7 place-items-center rounded-lg transition-colors"
                      style={isActive ? { color: accentHex[s.accent] } : undefined}
                    >
                      <Icon size={17} strokeWidth={1.6} />
                    </span>
                    <span className="relative z-10 truncate">{s.label}</span>
                    {isActive && (
                      <span
                        className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full"
                        style={{ background: accentHex[s.accent] }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-auto px-4 pb-6">
          <div className="mb-3 px-2">
            <div className="hairline" />
          </div>
          <button
            onClick={onToggleAmbient}
            className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              ambient ? 'text-teal-glow' : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg">
              {ambient ? <Sparkles size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
            </span>
            Ambient mode
            <span
              className={`ml-auto h-4 w-7 rounded-full p-0.5 transition-colors ${
                ambient ? 'bg-teal/60' : 'bg-white/10'
              }`}
            >
              <span
                className={`block h-3 w-3 rounded-full bg-ivory transition-transform ${
                  ambient ? 'translate-x-3' : ''
                }`}
              />
            </span>
          </button>
          <button
            onClick={onLock}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ivory-muted transition-colors hover:text-ivory"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg">
              <LogOut size={17} strokeWidth={1.6} />
            </span>
            Lock space
          </button>
        </div>
      </aside>

      {/* ---------- Mobile top bar ---------- */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/[0.06] bg-ink-950/70 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Logo onClick={() => go('home')} />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-ivory"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ---------- Mobile overlay menu ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/85 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-white/10 bg-ink-900/80 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <Logo onClick={() => go('home')} />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-ivory"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-2">
                <ul className="space-y-1">
                  {SECTIONS.map((s) => {
                    const Icon = s.icon
                    const isActive = active === s.id
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => go(s.id)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem] transition-colors ${
                            isActive ? 'bg-white/[0.05] text-ivory' : 'text-ivory-muted'
                          }`}
                        >
                          <span
                            className="grid h-8 w-8 place-items-center rounded-lg"
                            style={isActive ? { color: accentHex[s.accent] } : undefined}
                          >
                            <Icon size={18} strokeWidth={1.6} />
                          </span>
                          {s.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="space-y-1 px-4 pb-8">
                <button
                  onClick={onToggleAmbient}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem] ${
                    ambient ? 'text-teal-glow' : 'text-ivory-muted'
                  }`}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg">
                    {ambient ? <Sparkles size={18} /> : <Moon size={18} />}
                  </span>
                  Ambient mode
                </button>
                <button
                  onClick={onLock}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem] text-ivory-muted"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg">
                    <LogOut size={18} />
                  </span>
                  Lock space
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
