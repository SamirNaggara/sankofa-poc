import { useState, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Sparkles, MessageCircle, Phone, X, CheckCircle2, MapPin, Calendar, Filter, ChevronDown } from 'lucide-react'
import TripCard, { containerVariants } from './TripCard'
import ExpandedTripCard from './ExpandedTripCard'
import ExpertChat from './ExpertChat'
import { suggestedTrips, suggestedTripsBySurvey, surveys, surveyResults, additionalTrips } from '../../data/fakeData'

function DotsLoader() {
  return (
    <div className="flex items-center justify-center py-16 gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-primary-400"
          animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function getTripsForSelection(selectedIds) {
  if (selectedIds.length === 0) return suggestedTrips
  if (selectedIds.length === 1) return suggestedTripsBySurvey[selectedIds[0]] || suggestedTrips
  const all = selectedIds.flatMap((id) => suggestedTripsBySurvey[id] || [])
  const unique = [...new Map(all.map((t) => [t.id, t])).values()]
  unique.sort((a, b) => b.matchPercentage - a.matchPercentage)
  return unique
}

export default function OrganiserVoyage({ navigate }) {
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [modalStep, setModalStep] = useState(null)
  const [selectedSurveyIds, setSelectedSurveyIds] = useState([])
  const [isFilterLoading, setIsFilterLoading] = useState(false)
  const [displayedTrips, setDisplayedTrips] = useState(suggestedTrips)
  const [tripsKey, setTripsKey] = useState(0)
  const [expandedTrip, setExpandedTrip] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const chatRef = useRef(null)

  const handleFilterChange = (newIds) => {
    setSelectedSurveyIds(newIds)
    setIsFilterLoading(true)
    setTripsKey((k) => k + 1)
    setTimeout(() => {
      setDisplayedTrips(getTripsForSelection(newIds))
      setIsFilterLoading(false)
    }, 1200)
  }

  const toggleSurvey = (surveyId) => {
    if (selectedSurveyIds.includes(surveyId)) {
      handleFilterChange(selectedSurveyIds.filter((id) => id !== surveyId))
    } else {
      handleFilterChange([...selectedSurveyIds, surveyId])
    }
  }

  const selectAll = () => {
    handleFilterChange([])
  }

  function handleSelectTrip(trip) {
    setExpandedTrip(trip)
  }

  function handleReserveFromExpanded(trip) {
    setExpandedTrip(null)
    setTimeout(() => {
      setSelectedTrip(trip)
      setModalStep('confirm')
    }, 350)
  }

  function handleCloseExpanded() {
    setExpandedTrip(null)
  }

  function handleConfirm() {
    setModalStep('success')
  }

  function handleGoToMesVoyages() {
    setModalStep(null)
    setSelectedTrip(null)
    navigate('mes-voyages')
  }

  function handleCloseModal() {
    setModalStep(null)
    setSelectedTrip(null)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-3xl font-bold text-charcoal font-display">Catalogue Inspirations</h1>
        <p className="text-charcoal/50 mt-2 text-sm">
          Propositions basées sur les {surveyResults.totalResponses} réponses de votre communauté
        </p>
      </motion.div>

      {/* Survey filter */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex items-center gap-3 flex-wrap"
      >
        <span className="text-xs text-charcoal/50 font-medium flex items-center gap-1.5">
          <Filter size={13} />
          Basé sur :
        </span>
        <motion.button
          onClick={selectAll}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
            selectedSurveyIds.length === 0
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-charcoal/60 border-charcoal/10 hover:border-charcoal/20'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          Tous les sondages
        </motion.button>
        {surveys.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => toggleSurvey(s.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border max-w-[200px] truncate ${
              selectedSurveyIds.includes(s.id)
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-charcoal/60 border-charcoal/10 hover:border-charcoal/20'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {s.title}
          </motion.button>
        ))}
      </motion.div>

      {/* Trip cards grid */}
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {isFilterLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DotsLoader />
            </motion.div>
          ) : (
            <motion.div
              key={`trips-${tripsKey}`}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {displayedTrips.map((trip, index) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  index={index}
                  onSelect={handleSelectTrip}
                  isHidden={expandedTrip?.id === trip.id}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional trips (Voir plus) */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {additionalTrips.map((trip, index) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  index={index}
                  onSelect={handleSelectTrip}
                  isHidden={expandedTrip?.id === trip.id}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voir plus button */}
        <AnimatePresence>
          {!showMore && !isFilterLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-12"
            >
              <motion.button
                onClick={() => setShowMore(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal/10 rounded-xl text-sm font-medium text-charcoal/70 bg-white cursor-pointer hover:border-charcoal/20 hover:text-charcoal transition-colors"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <ChevronDown size={18} />
                Voir plus de voyages
              </motion.button>
            </motion.div>
          )}
          {showMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mb-12"
            >
              <p className="text-xs text-charcoal/40 italic">C'est tout pour le moment</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded trip overlay */}
        <AnimatePresence>
          {expandedTrip && (
            <ExpandedTripCard
              key={expandedTrip.id}
              trip={expandedTrip}
              onClose={handleCloseExpanded}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>

      {/* Custom experience + Expert chat — side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Custom experience section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-charcoal p-8 text-center flex flex-col justify-center"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent/10" />

          {/* Gold decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-primary-400 to-primary-600" />

          <div className="relative">
            <Sparkles size={28} className="text-primary-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">
              Envie d'une expérience sur-mesure ?
            </h4>
            <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
              Notre équipe peut créer un voyage entièrement personnalisé pour votre communauté, avec des activités exclusives et un accompagnement dédié.
            </p>
            <motion.button
              onClick={() => setShowPhone(!showPhone)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white font-semibold rounded-xl cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(217, 119, 6, 0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={18} />
              Contacter un Expert Sankofa
            </motion.button>
            <AnimatePresence>
              {showPhone && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 text-cream font-semibold text-lg tracking-wide"
                >
                  📞 +33 1 23 45 67 89
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Chat section */}
        <motion.div
          ref={chatRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-charcoal mb-4">Discuter avec un expert</h3>
          <ExpertChat />
        </motion.div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {modalStep && selectedTrip && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50"
              onClick={modalStep === 'confirm' ? handleCloseModal : undefined}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                {modalStep === 'confirm' && (
                  <div className="p-6">
                    {/* Close button */}
                    <div className="flex justify-end mb-2">
                      <motion.button
                        onClick={handleCloseModal}
                        className="p-1.5 rounded-lg hover:bg-charcoal/5 text-charcoal/40 cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={20} />
                      </motion.button>
                    </div>

                    {/* Trip image preview */}
                    <div className="relative h-36 rounded-xl overflow-hidden mb-5">
                      <img
                        src={selectedTrip.image}
                        alt={selectedTrip.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-bold text-sm leading-tight">{selectedTrip.title}</h4>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-5">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={15} className="text-primary-500" />
                        {selectedTrip.departureDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} className="text-accent" />
                        {selectedTrip.duration}
                      </span>
                    </div>

                    {/* Confirmation text */}
                    <p className="text-charcoal text-sm leading-relaxed mb-6">
                      Confirmez que ce voyage vous intéresse pour le <span className="font-semibold text-primary-500">{selectedTrip.departureDate}</span>, et nous reviendrons vers vous avec tous les détails.
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleCloseModal}
                        className="flex-1 px-4 py-3 border border-charcoal/10 rounded-xl text-sm font-medium text-charcoal/60 cursor-pointer"
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Annuler
                      </motion.button>
                      <motion.button
                        onClick={handleConfirm}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-xl text-sm font-semibold cursor-pointer"
                        whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Confirmer
                      </motion.button>
                    </div>
                  </div>
                )}

                {modalStep === 'success' && (
                  <div className="p-6 text-center">
                    {/* Success animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
                    >
                      <CheckCircle2 size={32} className="text-green-500" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl font-bold text-charcoal mb-3 font-display"
                    >
                      Félicitations !
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-charcoal/60 text-sm leading-relaxed mb-6"
                    >
                      Les processus sont en cours. Ce voyage a été ajouté à votre section <span className="font-semibold text-charcoal">« Mes voyages »</span>.
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={handleGoToMesVoyages}
                      className="w-full px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white font-semibold rounded-xl cursor-pointer"
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Voir mes voyages
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
