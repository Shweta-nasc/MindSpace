import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Flag } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { taskGroups as seed, projects } from '../../data/content'
import { accentHex } from '../../lib/sections'
import { ease, stagger, fadeUp } from '../../lib/motion'

const priorityColor = { high: '#e07a7a', medium: accentHex.gold, low: accentHex.teal }
const priorityLabel = { high: 'High', medium: 'Medium', low: 'Low' }

function Checkbox({ done, onToggle, accent }) {
  return (
    <button
      onClick={onToggle}
      aria-label={done ? 'Mark incomplete' : 'Mark complete'}
      className={`relative grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors duration-300 ${
        done ? 'border-transparent' : 'border-white/20 hover:border-white/40'
      }`}
      style={done ? { background: accentHex[accent] } : undefined}
    >
      <AnimatePresence>
        {done && (
          <motion.span
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            <Check size={14} className="text-ink-950" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function ProgressRing({ value, accent }) {
  const r = 18
  const c = 2 * Math.PI * r
  return (
    <div className="relative h-12 w-12">
      <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <motion.circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={accentHex[accent]}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (value / 100) * c }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[0.7rem] font-medium text-ivory">
        {value}%
      </span>
    </div>
  )
}

function TaskGroup({ group }) {
  const [tasks, setTasks] = useState(group.tasks)
  const done = tasks.filter((t) => t.done).length
  const pct = Math.round((done / tasks.length) * 100)

  const toggle = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  return (
    <Reveal className="flex flex-col rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl text-ivory">{group.label}</h3>
          <p className="mt-0.5 text-sm text-ivory-faint">
            {done} of {tasks.length} done
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: `${accentHex[group.accent]}22`, color: accentHex[group.accent] }}
        >
          {pct}%
        </span>
      </div>

      {/* progress bar */}
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accentHex[group.accent] }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease }}
        />
      </div>

      <ul className="space-y-1">
        {tasks.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => toggle(t.id)}
              className="group flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-white/[0.03]"
            >
              <Checkbox done={t.done} accent={group.accent} onToggle={() => toggle(t.id)} />
              <span
                className={`flex-1 text-[0.95rem] transition-all duration-300 ${
                  t.done ? 'text-ivory-faint line-through' : 'text-ivory-soft'
                }`}
              >
                {t.text}
              </span>
              <span
                className="flex items-center gap-1 text-[0.7rem]"
                style={{ color: priorityColor[t.priority] }}
                title={`${priorityLabel[t.priority]} priority`}
              >
                <Flag size={11} fill={priorityColor[t.priority]} strokeWidth={0} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function TasksTracker() {
  return (
    <Page wide>
      <SectionHeader
        eyebrow="Tasks & Projects"
        title="The shape of"
        accent="the day"
        lede="Daily, weekly, and long-horizon. Tap anything to complete it — watch it settle, and the bars catch up."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {seed.map((g) => (
          <TaskGroup key={g.id} group={g} />
        ))}
      </div>

      {/* Projects */}
      <div className="mt-14">
        <h3 className="mb-6 font-display text-2xl text-ivory">Projects in motion</h3>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.div
              variants={fadeUp}
              key={p.id}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <ProgressRing value={p.progress} accent={p.accent} />
              <div>
                <p className="font-display text-lg text-ivory">{p.name}</p>
                <p className="text-sm text-ivory-muted">{p.status}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Page>
  )
}
