import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function AdminDrawer({ open, onClose, title, children }) {
  // Scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal/5 bg-white/80 backdrop-blur-md shrink-0">
              <h2 className="text-base font-bold text-charcoal font-display">{title}</h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-charcoal/5 cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} className="text-charcoal/50" />
              </motion.button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
