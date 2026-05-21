import { motion } from 'framer-motion'
import { Calendar, Users, TrendingUp } from 'lucide-react'
import { suggestedTrips, voyageControlData } from '../../data/fakeData'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const statusConfig = {
  selling: {
    label: 'En vente',
    bg: 'bg-amber-100',
    text: 'text-amber-700',
  },
  'en-cours': {
    label: 'En cours',
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
  },
}

function getCountdownLabel(controlData) {
  if (!controlData?.departureDate) return null
  const today = new Date()
  const departure = new Date(controlData.departureDate)

  if (controlData.status === 'en-cours') {
    const daysPassed = Math.floor((today - departure) / (1000 * 60 * 60 * 24)) + 1
    const totalDays = controlData.duration || 7
    return { label: `Jour ${Math.min(daysPassed, totalDays)}/${totalDays}`, pulsing: false }
  }

  const daysUntil = Math.ceil((departure - today) / (1000 * 60 * 60 * 24))
  if (daysUntil < 0) return null
  return { label: `J-${daysUntil}`, pulsing: true }
}

function TripCard({ trip, controlData, navigate }) {
  const status = controlData?.status || 'selling'
  const config = statusConfig[status] || statusConfig.selling
  const kpis = controlData?.kpis
  const countdown = getCountdownLabel(controlData)
  const isEnCours = status === 'en-cours'

  return (
    <motion.div
      variants={itemVariants}
      onClick={() => navigate('voyage-control', { voyageId: trip.id })}
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 overflow-hidden cursor-pointer group"
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hero image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full ${config.bg} ${config.text} text-xs font-bold uppercase tracking-wide`}>
            {config.label}
          </span>
        </div>

        {/* Countdown badge */}
        {countdown && (
          <motion.div
            className="absolute top-4 right-4"
            animate={countdown.pulsing ? { scale: [1, 1.05, 1] } : {}}
            transition={countdown.pulsing ? { duration: 2, repeat: Infinity } : {}}
          >
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
              isEnCours ? 'bg-emerald-500 text-white' : 'bg-white/95 text-amber-700'
            }`}>
              {countdown.label}
            </span>
          </motion.div>
        )}

        {/* Title on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md">
            {trip.title}
          </h3>
        </div>

      </div>

      {/* Metrics row */}
      {kpis && (
        <div className="px-5 py-3.5 flex items-center gap-5 text-sm">
          <span className="flex items-center gap-1.5 text-charcoal/70">
            <Users size={14} className="text-primary-500" />
            <strong className="text-charcoal">{kpis.inscrits}</strong>/{kpis.maxPlaces}
          </span>
          <span className="flex items-center gap-1.5 text-charcoal/70">
            <TrendingUp size={14} className="text-emerald-600" />
            <strong className="text-charcoal">{kpis.caActuel.toLocaleString('fr-FR')}€</strong>
          </span>
          <span className="flex items-center gap-1.5 text-charcoal/70">
            <Calendar size={14} className="text-accent" />
            {trip.departureDate}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function MesVoyages({ navigate }) {
  const trips = suggestedTrips.filter((t) => voyageControlData[t.id])

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal font-display">Mes voyages</h1>
        <p className="text-charcoal/50 mt-2 text-sm">
          Sélectionnez un voyage pour accéder à son tableau de bord
        </p>
      </motion.div>

      {/* Trips grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            controlData={voyageControlData[trip.id]}
            navigate={navigate}
          />
        ))}
      </motion.div>

    </div>
  )
}
