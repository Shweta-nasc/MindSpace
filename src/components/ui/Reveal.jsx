import { motion } from 'framer-motion'
import { fadeUp, inView } from '../../lib/motion'

/**
 * Scroll-triggered reveal wrapper. Honors prefers-reduced-motion
 * automatically via Framer Motion's reduced-motion handling.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = '',
  as = 'div',
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
