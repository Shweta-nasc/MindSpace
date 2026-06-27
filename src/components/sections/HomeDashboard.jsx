import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, ListChecks, Plane } from 'lucide-react'
import Page from '../ui/Page'
import { fadeUp, stagger, ease } from '../../lib/motion'
import { SECTIONS, accentHex } from '../../lib/sections'
import { profile, dashboardStats, ideas, taskGroups, travel } from '../../data/content'

function StatChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div className="font-display text-2xl text-ivory">{value}</div>
      <div className="mt-0.5 text-[0.7rem] uppercase tracking-wide2 text-ivory-faint">{label}</div>
    </div>
  )
}

export default function HomeDashboard({ onNavigate }) {
  const hour = new Date().getHours()
  const partOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'
  const activeTasks = taskGroups.flatMap((g) => g.tasks).filter((t) => !t.done).slice(0, 4)
  const featuredIdeas = ideas.filter((i) => i.type === 'image').slice(0, 3)
  const quickLinks = SECTIONS.filter((s) => s.id !== 'home')

  return (
    <Page wide>
      {/* ---------- Hero ---------- */}
      <motion.section
        variants={stagger(0.12)}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] p-7 sm:p-12 lg:p-16"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(900px 500px at 10% 0%, rgba(201,169,106,0.16), transparent 55%),' +
              'radial-gradient(800px 600px at 100% 20%, rgba(57,189,172,0.14), transparent 55%),' +
              'linear-gradient(180deg,#15151a,#0d0d10)',
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle,#9a6fa0,transparent 70%)' }}
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.p variants={fadeUp} className="eyebrow mb-5">
          {profile.greeting} · Good {partOfDay}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="max-w-4xl font-display text-5xl leading-[0.98] text-ivory sm:text-6xl lg:text-7xl"
        >
          Hello, <span className="italic text-gradient-gold">{profile.name}</span>.
          <br />
          Your mind-space is open.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg font-light leading-relaxed text-ivory-muted"
        >
          {profile.manifesto}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 grid grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-4">
          {dashboardStats.map((s) => (
            <StatChip key={s.id} {...s} />
          ))}
        </motion.div>
      </motion.section>

      {/* ---------- Bento grid ---------- */}
      <motion.section
        variants={stagger(0.06)}
        initial="hidden"
        animate="show"
        className="mt-6 grid auto-rows-[minmax(0,auto)] grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
      >
        {/* Featured ideas — large tile */}
        <motion.button
          variants={fadeUp}
          onClick={() => onNavigate('ideas')}
          className="sweep group relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] border border-white/[0.07] text-left"
        >
          <img
            src={featuredIdeas[0]?.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
          <div className="relative flex h-full min-h-[260px] flex-col justify-end p-6 sm:min-h-[340px]">
            <Sparkles className="mb-3 text-teal-glow" size={20} />
            <p className="eyebrow mb-2">Recent inspiration</p>
            <h3 className="font-display text-2xl text-ivory sm:text-3xl">
              {featuredIdeas[0]?.title}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-ivory-muted">{featuredIdeas[0]?.note}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-ivory-muted transition-colors group-hover:text-ivory">
              Open gallery <ArrowUpRight size={15} />
            </span>
          </div>
        </motion.button>

        {/* Active tasks tile */}
        <motion.button
          variants={fadeUp}
          onClick={() => onNavigate('tasks')}
          className="group col-span-2 flex flex-col rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-6 text-left transition-colors hover:bg-white/[0.04]"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm text-ivory">
              <ListChecks size={17} className="text-gold-glow" /> Active tasks
            </span>
            <ArrowUpRight size={16} className="text-ivory-faint transition-colors group-hover:text-ivory" />
          </div>
          <ul className="space-y-2.5">
            {activeTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-3 text-sm text-ivory-muted">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    background:
                      t.priority === 'high'
                        ? '#e07a7a'
                        : t.priority === 'medium'
                        ? accentHex.gold
                        : accentHex.teal,
                  }}
                />
                <span className="truncate">{t.text}</span>
              </li>
            ))}
          </ul>
        </motion.button>

        {/* Two small tiles */}
        <motion.button
          variants={fadeUp}
          onClick={() => onNavigate('travel')}
          className="sweep group relative overflow-hidden rounded-[1.5rem] border border-white/[0.07]"
        >
          <img
            src={travel[0]?.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[1.4s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
          <div className="relative flex h-full min-h-[150px] flex-col justify-end p-5">
            <Plane size={18} className="mb-2 text-gold-glow" />
            <p className="font-display text-lg text-ivory">{travel[0]?.place}</p>
            <p className="text-xs text-ivory-muted">{travel[0]?.country}</p>
          </div>
        </motion.button>

        <motion.button
          variants={fadeUp}
          onClick={() => onNavigate('journey')}
          className="group flex flex-col justify-between rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-br from-plum-deep/30 to-ink-850 p-5 text-left transition-colors hover:from-plum-deep/40"
        >
          <span className="font-display text-4xl text-gradient">63</span>
          <div>
            <p className="text-sm text-ivory">day streak</p>
            <p className="text-xs text-ivory-muted">writing, unbroken</p>
          </div>
        </motion.button>
      </motion.section>

      {/* ---------- Quick links ---------- */}
      <section className="mt-12">
        <p className="eyebrow mb-5">Jump to</p>
        <motion.div
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {quickLinks.map((s) => {
            const Icon = s.icon
            return (
              <motion.button
                key={s.id}
                variants={fadeUp}
                onClick={() => onNavigate(s.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease }}
                className="sweep group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 text-left transition-colors hover:border-white/15"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-900/50 transition-colors"
                  style={{ color: accentHex[s.accent] }}
                >
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-ivory">{s.short}</span>
                  <span className="block truncate text-xs text-ivory-faint">{s.label}</span>
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      </section>
    </Page>
  )
}
