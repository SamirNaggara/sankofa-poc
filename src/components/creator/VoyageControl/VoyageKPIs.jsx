import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Calendar } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function AnimatedCounter({ target, duration = 600, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return <>{count.toLocaleString('fr-FR')}{suffix}</>
}

function GaugeCard({ inscrits, maxPlaces, seuilValidation }) {
  const ratio = inscrits / maxPlaces
  const seuilRatio = seuilValidation / maxPlaces

  const cx = 80, cy = 80, r = 60
  const startAngle = -210, endAngle = 30
  const totalAngle = endAngle - startAngle

  function polarToCartesian(angle) {
    const rad = (angle * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function describeArc(startA, endA) {
    const s = polarToCartesian(startA)
    const e = polarToCartesian(endA)
    const largeArc = (endA - startA) > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`
  }

  const bgArc = describeArc(startAngle, endAngle)
  const filledAngle = startAngle + totalAngle * ratio
  const filledArc = describeArc(startAngle, filledAngle)
  const seuilAngle = startAngle + totalAngle * seuilRatio
  const seuilInner = polarToCartesian(seuilAngle)
  const rInner = r - 8
  const rOuter = r + 8
  const radSeuil = (seuilAngle * Math.PI) / 180
  const seuilP1 = { x: cx + rInner * Math.cos(radSeuil), y: cy + rInner * Math.sin(radSeuil) }
  const seuilP2 = { x: cx + rOuter * Math.cos(radSeuil), y: cy + rOuter * Math.sin(radSeuil) }

  const seuilAtteint = inscrits >= seuilValidation

  return (
    <motion.div variants={cardVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary-400/15 flex items-center justify-center">
          <Users size={16} className="text-primary-500" />
        </div>
        <h3 className="text-sm font-semibold text-charcoal">Inscriptions</h3>
      </div>

      <div className="flex justify-center">
        <svg width="160" height="130" viewBox="0 0 160 130">
          <path d={bgArc} fill="none" stroke="#e5e5e5" strokeWidth="10" strokeLinecap="round" />
          <motion.path
            d={filledArc}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          />
          <motion.line
            x1={seuilP1.x}
            y1={seuilP1.y}
            x2={seuilP2.x}
            y2={seuilP2.y}
            stroke={seuilAtteint ? '#10B981' : '#EF4444'}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
          <motion.circle
            cx={seuilInner.x}
            cy={seuilInner.y}
            r="3"
            fill={seuilAtteint ? '#10B981' : '#EF4444'}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
          />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="28" fontWeight="700" fill="#1C1917">
            {inscrits}
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fill="#a3a3a3">
            / {maxPlaces} places
          </text>
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        className="flex items-center justify-center gap-1.5 mt-2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className={`w-2 h-2 rounded-full ${seuilAtteint ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <span className={`text-xs font-medium ${seuilAtteint ? 'text-emerald-600' : 'text-red-500'}`}>
          Seuil min : {seuilValidation} inscrits {seuilAtteint ? '✓' : ''}
        </span>
      </motion.div>
    </motion.div>
  )
}

function CACard({ caActuel, caObjectif }) {
  const progress = caActuel / caObjectif

  return (
    <motion.div variants={cardVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
          <TrendingUp size={16} className="text-emerald-600" />
        </div>
        <h3 className="text-sm font-semibold text-charcoal">Chiffre d'affaires</h3>
      </div>

      <div className="text-center mb-4">
        <p className="text-3xl font-bold text-charcoal">
          <AnimatedCounter target={caActuel} suffix="€" />
        </p>
        <p className="text-xs text-charcoal/40 mt-1">
          Objectif : {caObjectif.toLocaleString('fr-FR')}€
        </p>
      </div>

      <div className="h-3 bg-charcoal/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        />
      </div>
      <p className="text-xs text-charcoal/40 mt-2 text-right">{Math.round(progress * 100)}% de l'objectif</p>
    </motion.div>
  )
}

function DepartCard({ controlData }) {
  const today = new Date()
  const departure = controlData?.departureDate ? new Date(controlData.departureDate) : null

  if (!departure) return null

  const isEnCours = controlData.status === 'en-cours'

  // Format date in French
  const dateFormatted = departure.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  let countdownLabel
  if (isEnCours) {
    const daysPassed = Math.floor((today - departure) / (1000 * 60 * 60 * 24)) + 1
    const totalDays = controlData.duration || 7
    countdownLabel = `Jour ${Math.min(daysPassed, totalDays)}/${totalDays}`
  } else {
    const daysUntil = Math.ceil((departure - today) / (1000 * 60 * 60 * 24))
    countdownLabel = `J-${Math.max(daysUntil, 0)}`
  }

  return (
    <motion.div variants={cardVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isEnCours ? 'bg-emerald-500/15' : 'bg-amber-500/15'}`}>
          <Calendar size={16} className={isEnCours ? 'text-emerald-600' : 'text-amber-600'} />
        </div>
        <h3 className="text-sm font-semibold text-charcoal">Départ</h3>
      </div>

      <motion.p
        className="text-xl font-bold text-charcoal text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
      >
        {dateFormatted}
      </motion.p>
      <motion.p
        className={`text-2xl font-bold mt-2 ${isEnCours ? 'text-emerald-600' : 'text-amber-600'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {countdownLabel}
      </motion.p>
    </motion.div>
  )
}

export default function VoyageKPIs({ kpis, controlData }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <GaugeCard
        inscrits={kpis.inscrits}
        maxPlaces={kpis.maxPlaces}
        seuilValidation={kpis.seuilValidation}
      />
      <CACard caActuel={kpis.caActuel} caObjectif={kpis.caObjectif} />
      <DepartCard controlData={controlData} />
    </motion.div>
  )
}
