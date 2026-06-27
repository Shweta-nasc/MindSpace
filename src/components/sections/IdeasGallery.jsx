import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Maximize2, Tag } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import FilterPills from '../ui/FilterPills'
import SmartImage from '../ui/SmartImage'
import Modal from '../ui/Modal'
import { ideas, ideaCategories } from '../../data/content'
import { ease } from '../../lib/motion'

function IdeaCard({ idea, onOpen, index }) {
  const common =
    'sweep group relative w-full overflow-hidden rounded-2xl border border-white/[0.06] text-left'

  if (idea.type === 'quote') {
    return (
      <motion.button
        layout
        onClick={() => onOpen(idea)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: (index % 6) * 0.04 }}
        className={`${common} bg-gradient-to-br from-plum-deep/30 via-ink-850 to-ink-900 p-7`}
      >
        <Quote className="mb-4 text-gold-glow" size={22} />
        <p className="font-display text-xl leading-snug text-ivory">{idea.quote}</p>
        <p className="mt-4 text-sm text-ivory-faint">— {idea.author}</p>
      </motion.button>
    )
  }

  if (idea.type === 'text') {
    return (
      <motion.button
        layout
        onClick={() => onOpen(idea)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: (index % 6) * 0.04 }}
        className={`${common} bg-white/[0.03] p-6`}
      >
        <span className="eyebrow">{idea.category}</span>
        <h3 className="mt-3 font-display text-xl text-ivory">{idea.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ivory-muted">{idea.body}</p>
      </motion.button>
    )
  }

  return (
    <motion.button
      layout
      onClick={() => onOpen(idea)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: (index % 6) * 0.04 }}
      className={common}
    >
      <SmartImage
        src={idea.src}
        alt={idea.title}
        className="w-full"
        imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="eyebrow text-ivory-soft">{idea.category}</span>
        <h3 className="mt-1 font-display text-lg text-ivory">{idea.title}</h3>
      </div>
      <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink-950/50 text-ivory opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 size={14} />
      </span>
    </motion.button>
  )
}

export default function IdeasGallery() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  const options = useMemo(
    () =>
      ideaCategories.map((c) => ({
        value: c,
        label: c,
        count: c === 'All' ? ideas.length : ideas.filter((i) => i.category === c).length,
      })),
    []
  )

  const filtered = useMemo(
    () => (filter === 'All' ? ideas : ideas.filter((i) => i.category === filter)),
    [filter]
  )

  return (
    <Page wide>
      <SectionHeader
        eyebrow="Ideas & Inspiration"
        title="A gallery of"
        accent="sparks"
        lede="Images, quotes, and half-formed thoughts — the visual mulch ideas grow from. Filter by theme, open any piece to sit with it."
      />

      <div className="mt-8 mb-8">
        <FilterPills options={options} value={filter} onChange={setFilter} layoutId="idea-pill" />
      </div>

      <motion.div layout className="masonry columns-2 md:columns-3 xl:columns-4">
        <AnimatePresence>
          {filtered.map((idea, i) => (
            <IdeaCard key={idea.id} idea={idea} index={i} onOpen={setActive} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <Modal open={!!active} onClose={() => setActive(null)} maxWidth="max-w-4xl">
        {active && (
          <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
            {active.src ? (
              <SmartImage src={active.src} alt={active.title} className="min-h-[280px] md:min-h-[460px]" />
            ) : (
              <div className="grid min-h-[220px] place-items-center bg-gradient-to-br from-plum-deep/30 to-ink-900 p-8">
                {active.quote ? (
                  <p className="text-center font-display text-2xl leading-snug text-ivory">
                    “{active.quote}”
                  </p>
                ) : (
                  <p className="font-display text-2xl text-ivory">{active.title}</p>
                )}
              </div>
            )}
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-ivory-muted">
                <Tag size={12} /> {active.category}
              </span>
              <h3 className="mt-4 font-display text-2xl text-ivory">
                {active.title || 'A thought worth keeping'}
              </h3>
              <p className="mt-3 leading-relaxed text-ivory-muted">
                {active.note || active.body || `— ${active.author}`}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </Page>
  )
}
