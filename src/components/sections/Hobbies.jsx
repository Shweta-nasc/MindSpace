import { motion } from 'framer-motion'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import SmartImage from '../ui/SmartImage'
import { hobbies } from '../../data/content'
import { accentHex } from '../../lib/sections'
import { fadeUp, stagger, ease } from '../../lib/motion'

export default function Hobbies() {
  return (
    <Page wide>
      <SectionHeader
        eyebrow="Hobbies & Interests"
        title="Practiced with"
        accent="affection"
        lede="The things I do badly and joyfully, and a few I am genuinely getting good at. Progress is a feeling, not a finish line."
      />

      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {hobbies.map((h) => (
          <motion.article
            key={h.id}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease }}
            className="sweep group overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02]"
          >
            <div className="relative">
              <SmartImage
                src={h.image}
                alt={h.name}
                className="h-44"
                imgClassName="transition-transform duration-[1.4s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-[0.7rem] font-medium backdrop-blur"
                style={{ background: `${accentHex[h.accent]}26`, color: accentHex[h.accent] }}
              >
                {h.level}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl text-ivory">{h.name}</h3>
              <p className="mt-1 text-sm text-ivory-muted">{h.note}</p>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: accentHex[h.accent] }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${h.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease, delay: 0.1 }}
                  />
                </div>
                <span className="text-xs tabular-nums text-ivory-faint">{h.progress}%</span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Page>
  )
}
