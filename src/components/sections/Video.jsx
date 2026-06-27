import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import SmartImage from '../ui/SmartImage'
import Modal from '../ui/Modal'
import { videos } from '../../data/content'
import { fadeUp, stagger, ease } from '../../lib/motion'

export default function Video() {
  const [active, setActive] = useState(null)

  return (
    <Page wide>
      <SectionHeader
        eyebrow="Video Archive"
        title="Moments, kept"
        accent="in motion"
        lede="Short clips and time-lapses worth returning to. Posters load first; video only plays when you ask it to."
      />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {videos.map((v) => (
          <motion.button
            key={v.id}
            variants={fadeUp}
            onClick={() => setActive(v)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.35, ease }}
            className="sweep group relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] text-left"
          >
            <SmartImage
              src={v.poster}
              alt={v.title}
              className="h-56 sm:h-64"
              imgClassName="transition-transform duration-[1.4s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-ink-950/40 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-white/40">
                <Play size={22} className="ml-1 text-ivory" fill="currentColor" />
              </span>
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-xl text-ivory">{v.title}</h3>
              <p className="text-xs text-ivory-muted">{v.meta}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <Modal open={!!active} onClose={() => setActive(null)} maxWidth="max-w-4xl">
        {active && (
          <div>
            <video
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl text-ivory">{active.title}</h3>
              <p className="text-sm text-ivory-muted">{active.meta}</p>
            </div>
          </div>
        )}
      </Modal>

      <p className="mt-6 text-center text-xs text-ivory-faint/70">
        Sample clips are royalty-free. Replace <span className="font-mono">videos[].src</span> with your own, and keep hero
        clips short and compressed.
      </p>
    </Page>
  )
}
