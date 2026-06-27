import { useState } from 'react'
import { motion } from 'framer-motion'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import SmartImage from '../ui/SmartImage'
import Modal from '../ui/Modal'
import { moodBoard } from '../../data/content'
import { ease } from '../../lib/motion'

export default function MoodBoard() {
  const [active, setActive] = useState(null)

  return (
    <Page wide>
      <SectionHeader
        eyebrow="Mood Board"
        title="The feeling,"
        accent="before the words"
        lede="Texture, form, colour, light. A wordless collection that tunes the eye before any project begins."
      />

      <div className="masonry mt-10 columns-2 sm:columns-3 lg:columns-4">
        {moodBoard.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => setActive(m)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: (i % 8) * 0.04 }}
            className="sweep group relative block w-full overflow-hidden rounded-2xl border border-white/[0.06]"
          >
            <SmartImage
              src={m.src}
              alt={m.label}
              className="w-full"
              imgClassName="transition-transform duration-[1.6s] ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 translate-y-2 text-sm tracking-luxe text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {m.label}
            </span>
          </motion.button>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} maxWidth="max-w-2xl">
        {active && (
          <div>
            <SmartImage src={active.src.replace(/\/\d+\/\d+/, '/1000/1200')} alt={active.label} className="max-h-[70vh] w-full" />
            <div className="p-6 text-center">
              <span className="eyebrow">{active.label}</span>
            </div>
          </div>
        )}
      </Modal>
    </Page>
  )
}
