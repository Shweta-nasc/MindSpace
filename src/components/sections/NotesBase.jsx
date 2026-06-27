import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Pin, Hash, ChevronDown } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import FilterPills from '../ui/FilterPills'
import { notes, noteTags } from '../../data/content'
import { ease } from '../../lib/motion'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function NoteCard({ note, expanded, onToggle }) {
  return (
    <motion.div
      layout
      className="card-surface overflow-hidden"
      transition={{ layout: { duration: 0.35, ease } }}
    >
      <button onClick={onToggle} className="flex w-full items-start gap-4 p-5 text-left">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {note.pinned && <Pin size={13} className="text-gold-glow" fill="currentColor" />}
            <h3 className="font-display text-xl text-ivory">{note.title}</h3>
          </div>
          <p className="mt-1 text-sm text-ivory-muted">{note.excerpt}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {note.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] px-2 py-0.5 text-[0.68rem] text-ivory-faint"
              >
                <Hash size={9} />
                {t}
              </span>
            ))}
            <span className="ml-1 text-[0.68rem] text-ivory-faint/70">{formatDate(note.date)}</span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 text-ivory-faint"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="px-5 pb-6">
              <div className="hairline mb-4" />
              <p className="leading-relaxed text-ivory-soft">{note.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function NotesBase() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const options = useMemo(
    () =>
      noteTags.map((t) => ({
        value: t,
        label: t,
        count: t === 'All' ? notes.length : notes.filter((n) => n.tags.includes(t)).length,
      })),
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return notes.filter((n) => {
      const matchTag = tag === 'All' || n.tags.includes(tag)
      const matchQuery =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.tags.some((t) => t.includes(q))
      return matchTag && matchQuery
    })
  }, [query, tag])

  const pinned = filtered.filter((n) => n.pinned)
  const rest = filtered.filter((n) => !n.pinned)

  return (
    <Page>
      <SectionHeader
        eyebrow="Notes & Knowledge"
        title="Things worth"
        accent="remembering"
        lede="A reading-friendly base of notes, recipes, and decisions. Search the full text, filter by tag, expand to read."
      />

      {/* Search + filters */}
      <div className="mt-8 space-y-5">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 focus-within:border-white/20">
          <Search size={18} className="text-ivory-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes…"
            className="w-full bg-transparent py-3.5 text-ivory placeholder:text-ivory-faint/60 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-ivory-faint hover:text-ivory">
              clear
            </button>
          )}
        </div>
        <FilterPills options={options} value={tag} onChange={setTag} layoutId="note-pill" />
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div className="mt-10">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <Pin size={12} className="text-gold-glow" /> Pinned
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pinned.map((n) => (
              <NoteCard
                key={n.id}
                note={n}
                expanded={expanded === n.id}
                onToggle={() => setExpanded(expanded === n.id ? null : n.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All / filtered */}
      <div className="mt-10">
        {rest.length > 0 && <p className="eyebrow mb-4">All notes</p>}
        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatePresence>
            {rest.map((n) => (
              <NoteCard
                key={n.id}
                note={n}
                expanded={expanded === n.id}
                onToggle={() => setExpanded(expanded === n.id ? null : n.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-ivory-muted">
          Nothing matches <span className="text-ivory">“{query}”</span>. Try another word.
        </p>
      )}
    </Page>
  )
}
