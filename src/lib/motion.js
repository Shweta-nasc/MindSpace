// Shared Framer Motion variants and easing for a cohesive motion system.

export const ease = [0.22, 1, 0.36, 1]
export const easeSoft = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
}

// Stagger container — children should use `fadeUp` (or similar).
export const stagger = (staggerChildren = 0.07, delayChildren = 0.05) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// Page-level transition used between sections.
export const pageTransition = {
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(6px)',
    transition: { duration: 0.35, ease },
  },
}

// Default viewport config for scroll reveals.
export const inView = { once: true, margin: '-12% 0px -12% 0px' }
