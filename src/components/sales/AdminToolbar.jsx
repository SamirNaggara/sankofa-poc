import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Pencil, BarChart3, Share2 } from 'lucide-react'

const buttons = [
  { id: 'back', icon: ArrowLeft, label: 'Retour', color: 'text-charcoal/60' },
  { id: 'edit', icon: Pencil, label: 'Modifier', color: 'text-rose-600' },
  { id: 'stats', icon: BarChart3, label: 'Statistiques', color: 'text-purple-600' },
  { id: 'share', icon: Share2, label: 'Partager', color: 'text-primary-500' },
]

export default function AdminToolbar({ activeDrawer, onAction }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, type: 'spring', damping: 20 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2"
    >
      {buttons.map((btn) => {
        const Icon = btn.icon
        const isActive = activeDrawer === btn.id
        return (
          <div key={btn.id} className="relative">
            <motion.button
              onClick={() => onAction(btn.id)}
              onMouseEnter={() => setHoveredId(btn.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer shadow-lg border transition-colors ${
                isActive
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'bg-white/95 backdrop-blur-sm border-charcoal/5 hover:border-charcoal/15'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <Icon size={17} className={isActive ? 'text-white' : btn.color} />
            </motion.button>

            {/* Tooltip */}
            {hoveredId === btn.id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-charcoal text-white text-xs font-medium whitespace-nowrap shadow-lg"
              >
                {btn.label}
              </motion.span>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}
