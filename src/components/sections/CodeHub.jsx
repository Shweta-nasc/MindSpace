import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ArrowUpRight } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import FilterPills from '../ui/FilterPills'
import CodeBlock from '../ui/CodeBlock'
import Reveal from '../ui/Reveal'
import { codeSnippets, codeLanguages, learningResources } from '../../data/content'
import { fadeUp, stagger, ease } from '../../lib/motion'

export default function CodeHub() {
  const [filter, setFilter] = useState('All')

  const options = useMemo(
    () =>
      codeLanguages.map((c) => ({
        value: c,
        label: c,
        count: c === 'All' ? codeSnippets.length : codeSnippets.filter((s) => s.category === c).length,
      })),
    []
  )

  const filtered = useMemo(
    () => (filter === 'All' ? codeSnippets : codeSnippets.filter((s) => s.category === filter)),
    [filter]
  )

  return (
    <Page wide>
      <SectionHeader
        eyebrow="Code & Learning"
        title="A working"
        accent="library"
        lede="Snippets I reach for, kept close and copy-ready. Plus the books and courses quietly shaping how I think."
      />

      <div className="mb-9 mt-8">
        <FilterPills options={options} value={filter} onChange={setFilter} layoutId="code-pill" />
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-5 lg:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((snip) => (
            <motion.div
              key={snip.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-col"
            >
              <div className="mb-3 px-1">
                <h3 className="font-display text-xl text-ivory">{snip.title}</h3>
                <p className="mt-1 text-sm text-ivory-muted">{snip.description}</p>
              </div>
              <CodeBlock code={snip.code} language={snip.language} title={`${snip.category.toLowerCase()}.snippet`} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Learning resources */}
      <div className="mt-16">
        <div className="mb-6 flex items-center gap-3">
          <BookOpen size={18} className="text-teal-glow" />
          <h3 className="font-display text-2xl text-ivory">Learning & references</h3>
        </div>
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {learningResources.map((r) => (
            <motion.a
              key={r.id}
              variants={fadeUp}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="sweep group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/15"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-ivory-faint">
                    {r.kind}
                  </span>
                  <span className="text-xs text-teal-glow">{r.tag}</span>
                </div>
                <p className="mt-2 font-display text-lg text-ivory">{r.title}</p>
                <p className="text-sm text-ivory-muted">{r.by}</p>
              </div>
              <ArrowUpRight size={18} className="text-ivory-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ivory" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Page>
  )
}
