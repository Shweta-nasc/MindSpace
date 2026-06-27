import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Bookmark, Sun } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import SmartImage from '../ui/SmartImage'
import { travel as seed } from '../../data/content'
import { fadeUp, stagger, ease } from '../../lib/motion'

export default function Travel() {
  const [places, setPlaces] = useState(seed)
  const toggleSave = (id) =>
    setPlaces((p) => p.map((x) => (x.id === id ? { ...x, saved: !x.saved } : x)))

  return (
    <Page wide>
      <SectionHeader
        eyebrow="Travel Wishlist"
        title="Places I am"
        accent="saving for"
        lede="A standing invitation to leave. Each card a different season, a different version of myself to go meet."
      />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {places.map((t, i) => (
          <motion.article
            key={t.id}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease }}
            className={`sweep group relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] ${
              i === 0 ? 'sm:col-span-2 sm:row-span-1' : ''
            }`}
          >
            <SmartImage
              src={t.image}
              alt={t.place}
              className={i === 0 ? 'h-72 sm:h-[26rem]' : 'h-72'}
              imgClassName="transition-transform duration-[1.6s] ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

            <button
              onClick={() => toggleSave(t.id)}
              aria-label={t.saved ? 'Remove bookmark' : 'Save destination'}
              className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border backdrop-blur transition-colors ${
                t.saved
                  ? 'border-gold/50 bg-gold/20 text-gold-glow'
                  : 'border-white/15 bg-ink-950/40 text-ivory hover:border-white/40'
              }`}
            >
              <Bookmark size={16} fill={t.saved ? 'currentColor' : 'none'} />
            </button>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-2 flex items-center gap-3 text-xs text-ivory-soft/80">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} /> {t.country}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Sun size={12} /> {t.season}
                </span>
              </div>
              <h3 className="font-display text-3xl text-ivory">{t.place}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory-muted">{t.note}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Page>
  )
}
