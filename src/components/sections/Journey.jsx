import { motion } from 'framer-motion'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import { journey, achievements } from '../../data/content'
import { fadeUp, stagger, ease } from '../../lib/motion'

function Milestone({ item, index }) {
  const left = index % 2 === 0
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-10">
      {/* node */}
      <span className="absolute left-[11px] top-2 z-10 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-2 border-gold/60 bg-ink-950 md:left-1/2">
        <span className="h-2 w-2 rounded-full bg-gold-glow" />
      </span>

      {/* spacer for alternating layout on desktop */}
      {!left && <div className="hidden md:block" />}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, ease }}
        className={`ml-10 md:ml-0 ${left ? 'md:pr-4 md:text-right' : 'md:order-2 md:pl-4'}`}
      >
        <span className="eyebrow text-gold-glow">{item.year} · {item.kind}</span>
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <SmartImage src={item.media} alt={item.title} className="h-48 sm:h-56" />
          <div className="p-5">
            <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-ivory-muted">{item.body}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Journey() {
  return (
    <Page wide>
      <SectionHeader
        eyebrow="Journey & Achievements"
        title="How far"
        accent="I've come"
        lede="A vertical record of beginnings, turning points, and the small brave things. Scroll slowly — it is meant to be revisited."
      />

      {/* Achievement counters */}
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {achievements.map((a) => (
          <motion.div
            key={a.id}
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center"
          >
            <div className="font-display text-4xl text-gradient-gold">
              {a.value}
              {a.suffix && <span className="text-2xl text-ivory-faint">{a.suffix}</span>}
            </div>
            <p className="mt-1 text-xs uppercase tracking-wide2 text-ivory-faint">{a.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative mt-16">
        <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-gold-glow/50 via-white/10 to-transparent md:left-1/2" />
        <div className="space-y-14">
          {journey.map((item, i) => (
            <Milestone key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </Page>
  )
}
