import { motion } from 'framer-motion'
import { Sparkles, Clock } from 'lucide-react'

export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TripCard({ trip, index, onSelect, isHidden }) {
  return (
    <motion.div
      layoutId={`trip-card-${trip.id}`}
      variants={itemVariants}
      whileHover={!isHidden ? { scale: 1.02, y: -4 } : undefined}
      onClick={() => !isHidden && onSelect?.(trip)}
      className="group bg-white rounded-2xl shadow-md border border-charcoal/5 overflow-hidden cursor-pointer"
      style={isHidden ? { opacity: 0, pointerEvents: 'none' } : {}}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

        {/* Match badge */}
        <motion.div
          layoutId={`trip-badge-${trip.id}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 + index * 0.15 }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5"
        >
          <Sparkles size={14} className="text-primary-500" />
          <span className="text-sm font-bold text-charcoal">{trip.matchPercentage}%</span>
        </motion.div>

        {/* Highlight badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-charcoal/80">
            {trip.highlight}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <motion.h4
          layoutId={`trip-title-${trip.id}`}
          className="text-base font-bold text-charcoal mb-2 leading-tight"
        >
          {trip.title}
        </motion.h4>

        <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {trip.duration}
          </span>
          <span className="flex items-center gap-1 font-semibold text-charcoal">
            {trip.estimatedPrice}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {trip.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
