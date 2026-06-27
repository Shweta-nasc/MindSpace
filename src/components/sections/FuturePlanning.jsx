import { motion } from 'framer-motion'
import { Compass, Star } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { futureRoadmap, aspirations } from '../../data/content'
import { accentHex } from '../../lib/sections'
import { fadeUp, stagger, ease } from '../../lib/motion'

export default function FuturePlanning() {
  return (
    <Page wide>
      <SectionHeader
        eyebrow="Future Planning"
        title="A roadmap, lightly"
        accent="held"
        lede="Direction without rigidity. Near horizons in focus, far ones still soft. Plans I am allowed to change."
      />

      {/* Roadmap timeline */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative">
          {/* vertical connector */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-glow/50 via-gold-glow/40 to-plum-glow/40" />
          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-7"
          >
            {futureRoadmap.map((r) => (
              <motion.li key={r.id} variants={fadeUp} className="relative pl-10">
                <span
                  className="absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full border-2 bg-ink-950"
                  style={{ borderColor: accentHex[r.accent] }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: accentHex[r.accent] }} />
                </span>
                <p className="eyebrow mb-1" style={{ color: accentHex[r.accent] }}>
                  {r.when}
                </p>
                <h3 className="font-display text-2xl text-ivory">{r.title}</h3>
                <p className="mt-1 text-ivory-muted">{r.detail}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Aspirations board */}
        <Reveal className="rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-br from-plum-deep/25 to-ink-900 p-7">
          <div className="mb-5 flex items-center gap-3">
            <Compass size={18} className="text-plum-glow" />
            <h3 className="font-display text-2xl text-ivory">Aspirations</h3>
          </div>
          <ul className="space-y-3">
            {aspirations.map((a, i) => (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
              >
                <Star size={15} className="mt-0.5 shrink-0 text-gold-glow" fill="currentColor" />
                <span className="text-ivory-soft">{a.text}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Page>
  )
}
