import { motion } from 'framer-motion'

/**
 * Horizontal filter pill row with an animated active indicator.
 */
export default function FilterPills({ options, value, onChange, layoutId = 'pill' }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`relative rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
              active ? 'text-ink-950' : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-glow via-gold-glow to-plum-glow"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap font-medium">
              {opt.label}
              {opt.count != null && (
                <span className={`ml-1.5 text-xs ${active ? 'text-ink-800' : 'text-ivory-faint'}`}>
                  {opt.count}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
