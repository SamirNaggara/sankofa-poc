import { motion } from 'framer-motion'
import { Megaphone, Pin } from 'lucide-react'

export default function AnnouncementBanner({ messages, onClick }) {
  const latest = messages.find((m) => m.epingle) || messages[0]
  if (!latest) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="px-4 sm:px-6 max-w-3xl mx-auto -mt-6"
    >
      <motion.button
        onClick={onClick}
        className="relative w-full text-left bg-gradient-to-r from-primary-400/10 via-primary-400/5 to-cream rounded-2xl border border-primary-400/15 overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Accent top line */}
        <div className="h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-400" />

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-400/15 flex items-center justify-center">
              <Megaphone size={18} className="text-primary-600" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-primary-600">Message d'Amina</span>
                {latest.epingle && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary-400/10 text-[10px] font-medium text-primary-600">
                    <Pin size={9} />
                    Épinglé
                  </span>
                )}
              </div>
              <p className="text-sm text-charcoal/80 leading-relaxed line-clamp-2">
                {latest.message}
              </p>
              <p className="text-[11px] text-charcoal/35 mt-1.5">
                {latest.date} à {latest.heure}
              </p>
            </div>

          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}
