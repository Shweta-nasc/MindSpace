import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from './context/AuthContext'
import EntryScreen from './components/EntryScreen'
import Shell from './components/Shell'
import { ease } from './lib/motion'

export default function App() {
  const { unlocked } = useAuth()

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <motion.div
          key="shell"
          initial={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <Shell />
        </motion.div>
      ) : (
        <motion.div key="entry" exit={{ opacity: 0 }}>
          <EntryScreen />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
