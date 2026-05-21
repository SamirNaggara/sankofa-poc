import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Clock, Users, Calendar, MapPin, Check, Sparkles, Heart, Leaf, Globe, CheckCircle2 } from 'lucide-react'

const contentStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
}

const contentItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const itineraryItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
}

export default function ExpandedTripCard({ trip, onClose }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [configOpen, setConfigOpen] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [selectedDate, setSelectedDate] = useState('2026-06-15')
  const images = trip.images || [trip.image]

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Expanded panel */}
      <motion.div
        layoutId={`trip-card-${trip.id}`}
        className="fixed z-50 inset-4 md:inset-x-[8%] md:inset-y-[4%] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md cursor-pointer hover:bg-white transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} className="text-charcoal" />
        </motion.button>

        {/* Carousel section */}
        <div className="relative h-[35%] md:h-[40%] min-h-[200px] flex-shrink-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={trip.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

          {/* Match badge */}
          <motion.div
            layoutId={`trip-badge-${trip.id}`}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
          >
            <Sparkles size={16} className="text-primary-500" />
            <span className="text-sm font-bold text-charcoal">{trip.matchPercentage}% match</span>
          </motion.div>

          {/* Carousel arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md cursor-pointer hover:bg-white transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} className="text-charcoal" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md cursor-pointer hover:bg-white transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} className="text-charcoal" />
              </motion.button>
            </>
          )}

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentImage(i) }}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === currentImage ? 'bg-white w-5' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content section (scrollable) */}
        <motion.div
          className="flex-1 overflow-y-auto p-6 md:p-8 pb-24"
          variants={contentStagger}
          initial="hidden"
          animate="show"
        >
          {/* Title */}
          <motion.h2
            layoutId={`trip-title-${trip.id}`}
            className="text-2xl md:text-3xl font-bold text-charcoal font-display mb-4 leading-tight"
          >
            {trip.title}
          </motion.h2>

          {/* Quick stats */}
          <motion.div variants={contentItem} className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream">
              <Clock size={16} className="text-primary-500" />
              <span className="text-sm font-medium text-charcoal">{trip.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream">
              <MapPin size={16} className="text-accent" />
              <span className="text-sm font-semibold text-charcoal">{trip.estimatedPrice}</span>
            </div>
            {trip.groupSize && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream">
                <Users size={16} className="text-secondary" />
                <span className="text-sm font-medium text-charcoal">{trip.groupSize}</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50 border border-primary-200">
              <Calendar size={16} className="text-primary-500" />
              <span className="text-sm font-medium text-primary-600">Période recommandée : Mai à Octobre</span>
            </div>
          </motion.div>

          {/* Description */}
          {trip.description && (
            <motion.p variants={contentItem} className="text-charcoal/70 leading-relaxed mb-8">
              {trip.description}
            </motion.p>
          )}

          {/* Engagement responsable */}
          {trip.esgHighlights && trip.esgHighlights.length > 0 && (
            <motion.div variants={contentItem} className="mb-8">
              <h3 className="text-lg font-bold text-charcoal mb-4">Engagement responsable</h3>
              <div className="grid gap-3">
                {trip.esgHighlights.map((item, i) => {
                  const IconMap = { heart: Heart, leaf: Leaf, globe: Globe }
                  const Icon = IconMap[item.icon] || Globe
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                        <p className="text-xs text-charcoal/50">{item.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Itinerary */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <motion.div variants={contentItem} className="mb-8">
              <h3 className="text-lg font-bold text-charcoal mb-4">Programme</h3>
              <motion.div
                className="space-y-3"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } } }}
                initial="hidden"
                animate="show"
              >
                {trip.itinerary.map((item) => (
                  <motion.div
                    key={item.day}
                    variants={itineraryItem}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center">
                      J{item.day}
                    </span>
                    <span className="text-sm text-charcoal/80 pt-1.5">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Included */}
          {trip.included && trip.included.length > 0 && (
            <motion.div variants={contentItem} className="mb-6">
              <h3 className="text-lg font-bold text-charcoal mb-3">Inclus</h3>
              <div className="flex flex-wrap gap-2">
                {trip.included.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium"
                  >
                    <Check size={12} />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tags */}
          <motion.div variants={contentItem} className="flex flex-wrap gap-2">
            {trip.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Sticky bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-white/95 backdrop-blur-sm border-t border-charcoal/5"
        >
          <AnimatePresence mode="wait">
            {requestSent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200"
              >
                <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                <p className="text-sm text-green-700 font-medium">
                  Demande transmise à votre expert. Karim vous contactera pour valider ces dates.
                </p>
              </motion.div>
            ) : configOpen ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3"
              >
                <div className="flex-1">
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Date de départ souhaitée</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min="2026-06-01"
                    max="2027-12-31"
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-charcoal/10 text-sm text-charcoal focus:outline-none focus:border-primary-500/40 transition-colors cursor-pointer"
                  />
                </div>
                <motion.button
                  onClick={() => setRequestSent(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-400 to-primary-600 text-white font-semibold rounded-xl cursor-pointer text-sm whitespace-nowrap"
                  whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(217, 119, 6, 0.35)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Envoyer la demande à Sankofa
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-xs text-charcoal/50">À partir de</p>
                  <p className="text-xl font-bold text-charcoal">{trip.estimatedPrice}<span className="text-sm font-normal text-charcoal/50"> /pers.</span></p>
                </div>
                <motion.button
                  onClick={() => setConfigOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white font-semibold rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(217, 119, 6, 0.35)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Configurer ce séjour
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}
