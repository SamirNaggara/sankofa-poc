import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import WeatherBadge from './WeatherBadge'

function getTargetDate() {
  const d = new Date()
  d.setDate(d.getDate() + 5)
  d.setHours(9, 0, 0, 0)
  return d
}

function computeTimeLeft(target) {
  const diff = target - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  }
}

const unitLabels = { days: 'Jours', hours: 'Heures', minutes: 'Minutes' }

function CountdownUnit({ value, label }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-4xl sm:text-5xl font-bold text-white tabular-nums drop-shadow-lg">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs sm:text-sm text-white/70 font-medium mt-1 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  )
}

function ProgressDots({ currentDay, totalDays }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-5 border border-white/15"
    >
      <div className="flex items-center gap-2.5">
        {Array.from({ length: totalDays }, (_, i) => {
          const dayNum = i + 1
          const isFilled = dayNum <= currentDay
          const isCurrent = dayNum === currentDay
          return (
            <motion.div
              key={dayNum}
              className={`rounded-full ${isCurrent ? 'w-4 h-4' : 'w-3 h-3'} ${
                isFilled
                  ? 'bg-primary-400 shadow-lg shadow-primary-400/40'
                  : 'bg-white/20 border border-white/30'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 300, damping: 15 }}
              {...(isCurrent && {
                animate: { scale: [1, 1.2, 1] },
                transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              })}
            />
          )
        })}
      </div>
      <span className="text-sm text-white/70 font-medium">
        Jour {currentDay} sur {totalDays}
      </span>
    </motion.div>
  )
}

export default function HeroCountdown({ trip, creatorName, weather }) {
  const isEnCours = trip.status === 'en-cours'
  const destination = trip.title.split(' ')[0].replace(':', '')

  const [target] = useState(getTargetDate)
  const [timeLeft, setTimeLeft] = useState(() => computeTimeLeft(target))

  useEffect(() => {
    if (isEnCours) return
    const id = setInterval(() => setTimeLeft(computeTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target, isEnCours])

  return (
    <div className="relative w-full h-[55vh] sm:h-[70vh] min-h-[320px] sm:min-h-[420px] overflow-hidden rounded-b-[2.5rem]">
      {/* Background image */}
      <motion.img
        src={trip.image}
        alt={trip.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 px-6">
        {/* Badge row */}
        <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20"
          >
            <MapPin size={13} className="text-primary-400" />
            <span className="text-xs font-medium text-white/90">
              {isEnCours ? `En cours — Jour ${trip.currentDay}/${trip.totalDays}` : trip.dates}
            </span>
          </motion.div>
          {isEnCours && weather && <WeatherBadge weather={weather} />}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl font-bold text-white text-center leading-tight mb-2 max-w-lg drop-shadow-xl"
        >
          {isEnCours
            ? `Jour ${trip.currentDay} à ${destination} avec ${creatorName} !`
            : `J-${timeLeft.days} avant l'aventure avec ${creatorName} !`
          }
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/60 text-sm mb-2 flex items-center gap-2"
        >
          <Calendar size={14} />
          {isEnCours ? trip.todayLabel : trip.title}
        </motion.p>

        {/* Next event (en-cours only) */}
        <div className="mb-6" />

        {/* Countdown or Progress */}
        {isEnCours ? (
          <ProgressDots currentDay={trip.currentDay} totalDays={trip.totalDays} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-6 sm:gap-10 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-5 border border-white/15"
          >
            {Object.entries(timeLeft).map(([key, val], i) => (
              <div key={key} className="flex items-center gap-6 sm:gap-10">
                <CountdownUnit value={val} label={unitLabels[key]} />
                {i < 2 && (
                  <motion.span
                    className="text-3xl text-white/30 font-light"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
