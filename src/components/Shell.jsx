import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import Atmosphere from './atmosphere/Atmosphere'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { pageTransition } from '../lib/motion'

import HomeDashboard from './sections/HomeDashboard'
import IdeasGallery from './sections/IdeasGallery'
import CodeHub from './sections/CodeHub'
import TasksTracker from './sections/TasksTracker'
import NotesBase from './sections/NotesBase'
import Hobbies from './sections/Hobbies'
import Travel from './sections/Travel'
import FuturePlanning from './sections/FuturePlanning'
import Journey from './sections/Journey'
import Music from './sections/Music'
import Video from './sections/Video'
import MoodBoard from './sections/MoodBoard'

const REGISTRY = {
  home: HomeDashboard,
  ideas: IdeasGallery,
  code: CodeHub,
  tasks: TasksTracker,
  notes: NotesBase,
  hobbies: Hobbies,
  travel: Travel,
  future: FuturePlanning,
  journey: Journey,
  music: Music,
  video: Video,
  mood: MoodBoard,
}

export default function Shell() {
  const { lock } = useAuth()
  const { sectionId: active, setSection } = useTheme()
  const [ambient, setAmbient] = useState(false)

  // Scroll to top on every section change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [active])

  const Section = REGISTRY[active] || HomeDashboard

  return (
    <div className="relative min-h-[100dvh]">
      {/* Per-section animated atmosphere (fixed, behind everything) */}
      <Atmosphere />

      <Navigation
        active={active}
        onNavigate={setSection}
        onLock={lock}
        ambient={ambient}
        onToggleAmbient={() => setAmbient((a) => !a)}
      />

      {/* Ambient mode atmosphere */}
      <AnimatePresence>
        {ambient && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-30"
          >
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background:
                  'radial-gradient(1000px 700px at 15% 100%, rgba(57,189,172,0.14), transparent 55%),' +
                  'radial-gradient(900px 700px at 90% 0%, rgba(154,111,160,0.14), transparent 55%)',
              }}
            />
            <div className="absolute inset-0 bg-ink-950/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 pt-16 lg:pl-[252px] lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Section onNavigate={setSection} />
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <footer className="lg:pl-0">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            <div className="hairline" />
            <div className="flex flex-col items-center justify-between gap-3 py-8 text-xs text-ivory-faint sm:flex-row">
              <span>Mind Space · a private sanctuary</span>
              <span className="font-mono">crafted with care · {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
