import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../../lib/motion'

/**
 * Editorial section header — eyebrow kicker, large serif title,
 * and an optional lede paragraph.
 */
export default function SectionHeader({ eyebrow, title, accent, lede, align = 'left' }) {
  return (
    <motion.header
      variants={stagger(0.12)}
      initial="hidden"
      animate="show"
      className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          <span className="text-gold">—</span>&nbsp;&nbsp;{eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] text-ivory"
      >
        {title} {accent && <span className="italic text-gradient-gold">{accent}</span>}
      </motion.h2>
      {lede && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-ivory-muted text-base sm:text-lg leading-relaxed font-light ${
            align === 'center' ? 'mx-auto' : ''
          } max-w-2xl`}
        >
          {lede}
        </motion.p>
      )}
    </motion.header>
  )
}
