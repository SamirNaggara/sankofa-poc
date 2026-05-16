import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'

function getCountdownLabel(controlData) {
  if (!controlData?.departureDate) return null
  const today = new Date()
  const departure = new Date(controlData.departureDate)

  if (controlData.status === 'en-cours') {
    const daysPassed = Math.floor((today - departure) / (1000 * 60 * 60 * 24)) + 1
    const totalDays = controlData.duration || 7
    return { label: `Jour ${Math.min(daysPassed, totalDays)}/${totalDays}`, type: 'en-cours' }
  }

  const daysUntil = Math.ceil((departure - today) / (1000 * 60 * 60 * 24))
  if (daysUntil < 0) return null
  return { label: `J-${daysUntil}`, type: 'selling' }
}

export default function VoyageHeader({ trip, controlData, navigate }) {
  const countdown = getCountdownLabel(controlData)

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => navigate('mes-voyages')}
            className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} />
            Mes voyages
          </motion.button>

          {countdown && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                countdown.type === 'en-cours'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              <Calendar size={12} />
              {countdown.label}
            </motion.span>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-charcoal font-display leading-tight">
            {trip.title}
          </h1>
        </div>
      </div>
    </motion.header>
  )
}
