import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ChevronLeft, ChevronRight, Clock, Users, Calendar, MapPin,
  Check, Heart, Leaf, Globe, Play, AtSign, X, Eye, CreditCard, Shield, Lock, Sparkles,
} from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import MapItinerary from '../traveler/adventure/MapItinerary'
import AdminToolbar from './AdminToolbar'
import AdminDrawer from '../shared/AdminDrawer'
import VoyageTabEditer from '../creator/VoyageControl/VoyageTabEditer'
import VoyageTabStats from '../creator/VoyageControl/VoyageTabStats'
import VoyageTabPartagerDrawer from './VoyageTabPartagerDrawer'
import { simulateTyping } from '../../hooks/useSimulateTyping'
import {
  suggestedTrips, creatorProfile, voyageControlData, tripMapWaypoints,
  voyagePromoVideos, voyagePageStats, voyageTrackingLinks, voyageClicksOverTime,
} from '../../data/fakeData'

// ─── Payment CTA Banner ─────────────────────────────────────────────────

function PaymentCTA({ trip, variant = 'top', onOpen, placesRestantes }) {
  const isTop = variant === 'top'
  const priceNum = parseInt(trip.estimatedPrice.replace(/\s/g, '')) || 1350
  const prix3x = Math.ceil(priceNum / 3)

  return (
    <Section className={isTop ? 'pt-8 pb-4' : 'py-8'} delay={isTop ? 0.05 : 0.1}>
      <motion.div
        className={`relative overflow-hidden rounded-2xl shadow-lg ${
          isTop
            ? 'bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400'
            : 'bg-gradient-to-r from-accent via-emerald-600 to-teal-500'
        }`}
      >
        {/* Decorative */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={16} className="text-white/80" />
              <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
                {isTop ? `Plus que ${placesRestantes} places` : 'Paiement en 3x sans frais'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug font-display">
              {isTop
                ? 'Réservez votre place dès maintenant'
                : "N'attendez plus, l'aventure vous attend"}
            </h3>
            <p className="text-white/70 text-sm mt-1">
              {isTop
                ? `À partir de ${trip.estimatedPrice} par personne — ou ${prix3x}€ en 3x`
                : `${trip.estimatedPrice} tout compris — vol, hébergement, activités`}
            </p>
          </div>

          <motion.button
            onClick={onOpen}
            className="shrink-0 flex items-center gap-2 bg-white text-charcoal px-6 py-3 rounded-xl text-sm font-bold shadow-md cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.96 }}
          >
            <CreditCard size={16} />
            {isTop ? 'Réserver ma place' : 'Payer maintenant'}
          </motion.button>
        </div>
      </motion.div>
    </Section>
  )
}

// ─── Payment Modal (with auto-fill for demo) ────────────────────────────

function PaymentModal({ trip, onClose, autoFill = false }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [step, setStep] = useState('form')

  useEffect(() => {
    if (!autoFill) return

    const timeout = setTimeout(async () => {
      await simulateTyping(setFullName, 'Lucas Martin', 45)
      await new Promise(r => setTimeout(r, 250))
      await simulateTyping(setEmail, 'lucas.martin@email.com', 30)
      await new Promise(r => setTimeout(r, 300))
      await simulateTyping(setCardNumber, '4242 4242 4242 4242', 35)
      await new Promise(r => setTimeout(r, 200))
      await simulateTyping(setExpiry, '09/28', 60)
      await new Promise(r => setTimeout(r, 200))
      await simulateTyping(setCvc, '123', 80)
      await new Promise(r => setTimeout(r, 700))

      setStep('processing')
      await new Promise(r => setTimeout(r, 2000))
      setStep('success')
    }, 800)

    return () => clearTimeout(timeout)
  }, [autoFill])

  function handleSubmit(e) {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) return
    setStep('processing')
    setTimeout(() => setStep('success'), 1500)
  }

  function handleClose() {
    onClose()
  }

  const priceNum = parseInt(trip.estimatedPrice.replace(/\s/g, '')) || 1350
  const prix3x = Math.ceil(priceNum / 3)
  const allFilled = fullName && email && cardNumber.length >= 16 && expiry && cvc

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">Réservation</p>
              <h3 className="text-white font-display font-bold text-lg mt-0.5 leading-snug">{trip.title}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-white">{trip.estimatedPrice}</span>
                <span className="text-white/60 text-xs">ou {prix3x}€ × 3</span>
              </div>
            </div>
            <motion.button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 'form' && (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-charcoal/60 block mb-1.5">Nom complet</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    readOnly={autoFill}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-cream/60 border border-charcoal/10 rounded-xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary-400/30"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-charcoal/60 block mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={autoFill}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 bg-cream/60 border border-charcoal/10 rounded-xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary-400/30"
                  />
                </div>

                {/* Card number */}
                <div>
                  <label className="text-xs font-semibold text-charcoal/60 block mb-1.5">Numéro de carte</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      readOnly={autoFill}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 bg-cream/60 border border-charcoal/10 rounded-xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary-400/30 pr-12"
                    />
                    <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                  </div>
                </div>

                {/* Expiry + CVC */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-charcoal/60 block mb-1.5">Expiration</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      readOnly={autoFill}
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 bg-cream/60 border border-charcoal/10 rounded-xl text-sm text-charcoal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/60 block mb-1.5">CVC</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        readOnly={autoFill}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-cream/60 border border-charcoal/10 rounded-xl text-sm text-charcoal focus:outline-none pr-10"
                      />
                      <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    </div>
                  </div>
                </div>

                {/* Security note */}
                <div className="flex items-center gap-2 pt-1">
                  <Shield size={13} className="text-emerald-500 shrink-0" />
                  <p className="text-[11px] text-charcoal/40">Paiement sécurisé par Stripe. Vos données sont chiffrées.</p>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={autoFill ? !allFilled : (!fullName.trim() || !email.trim())}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  animate={autoFill && allFilled ? { opacity: 1 } : {}}
                >
                  Confirmer le paiement — {trip.estimatedPrice}
                </motion.button>
              </motion.form>
            )}

            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="py-12 flex flex-col items-center gap-4"
              >
                <motion.div
                  className="w-14 h-14 rounded-full border-4 border-primary-400/30 border-t-primary-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="text-sm text-charcoal/60 font-medium">Paiement en cours...</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 flex flex-col items-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
                >
                  <Check size={28} className="text-emerald-600" />
                </motion.div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-charcoal font-display">Réservation confirmée !</h3>
                  <p className="text-sm text-charcoal/50 mt-1">
                    Un email de confirmation a été envoyé. Bienvenue dans l'aventure !
                  </p>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="mt-2 px-6 py-2.5 bg-charcoal text-white text-sm font-semibold rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  C'est parti !
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section wrapper with scroll reveal ─────────────────────────────────

function Section({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────

export default function VoyageSalesPage({ navigate, voyageId, isAdmin }) {
  const trip = suggestedTrips.find((t) => t.id === voyageId) || suggestedTrips[0]
  const control = voyageControlData[trip.id]
  const waypoints = tripMapWaypoints[trip.id]
  const videos = voyagePromoVideos[trip.id] || []
  const images = trip.images || [trip.image]

  const pageStats = isAdmin ? voyagePageStats[trip.id] : null
  const trackingLinks = isAdmin ? voyageTrackingLinks[trip.id] : null
  const clicksData = isAdmin ? (voyageClicksOverTime[trip.id] || []) : null
  const tripSlug = trip.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 30)

  const [currentImage, setCurrentImage] = useState(0)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentKey, setPaymentKey] = useState(0)
  const [videoToast, setVideoToast] = useState(false)
  const [activeDrawer, setActiveDrawer] = useState(null)

  function openPayment() {
    setPaymentKey(k => k + 1)
    setShowPayment(true)
  }


  // Auto-advance carousel
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  // Social proof data
  const placesRestantes = control ? control.kpis.maxPlaces - control.kpis.inscrits : 5
  const maxPlaces = control?.kpis.maxPlaces || 25
  const inscrits = control?.kpis.inscrits || 20
  const vuesPage = control?.kpis.vuesPage || 342
  const participants = control?.participants?.slice(0, 5) || []
  const progressPercent = ((maxPlaces - placesRestantes) / maxPlaces) * 100

  function handleVideoClick() {
    setVideoToast(true)
    setTimeout(() => setVideoToast(false), 2500)
  }

  function handleAdminAction(id) {
    if (id === 'back') {
      navigate('voyage-control', { voyageId: trip.id })
    } else {
      setActiveDrawer(activeDrawer === id ? null : id)
    }
  }

  const platformColors = {
    YouTube: 'bg-red-500/10 text-red-600',
    TikTok: 'bg-charcoal/10 text-charcoal',
    Instagram: 'bg-pink-500/10 text-pink-600',
  }

  return (
    <PageTransition>
      <div className={`min-h-screen bg-cream ${isAdmin ? 'pb-12' : 'pb-28'}`}>
        {/* ─── Sticky Header ─── */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <motion.button
              onClick={() => navigate('voyage-control', { voyageId: trip.id })}
              className="p-2 rounded-xl hover:bg-charcoal/5 cursor-pointer shrink-0"
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={20} className="text-charcoal/60" />
            </motion.button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold text-charcoal truncate">{trip.title}</h1>
            </div>
            {isAdmin && (
              <span className="px-2.5 py-1 rounded-full bg-charcoal text-white text-[11px] font-semibold shrink-0">
                Admin
              </span>
            )}
            <span className="text-sm font-bold text-primary-600 shrink-0">{trip.estimatedPrice}</span>
          </div>
        </header>

        {/* ─── A. Hero Carousel ─── */}
        <div className="relative h-[50vh] sm:h-[65vh] min-h-[300px] sm:min-h-[400px] max-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={trip.title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

          {/* Carousel arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md cursor-pointer hover:bg-white transition-colors z-10"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} className="text-charcoal" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md cursor-pointer hover:bg-white transition-colors z-10"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} className="text-charcoal" />
              </motion.button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === currentImage ? 'bg-white w-5' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hero text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                {trip.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                  <Clock size={13} /> {trip.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                  <MapPin size={13} /> {trip.estimatedPrice}
                </span>
                {trip.groupSize && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    <Users size={13} /> {trip.groupSize}
                  </span>
                )}
                {trip.departureDate && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    <Calendar size={13} /> {trip.departureDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Content ─── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* ─── Top Payment CTA ─── */}
          <PaymentCTA trip={trip} variant="top" onOpen={openPayment} placesRestantes={placesRestantes} />

          {/* ─── B. Creator Section ─── */}
          <Section className="py-10 border-b border-charcoal/5" delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={creatorProfile.avatar}
                alt={creatorProfile.name}
                className="w-16 h-16 rounded-full bg-cream-warm ring-3 ring-primary-400/30"
              />
              <div>
                <h3 className="font-display text-xl font-bold text-charcoal">
                  Voyagez avec {creatorProfile.name}
                </h3>
                <p className="text-sm text-charcoal/60 mt-1">{creatorProfile.bio}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-600 text-xs font-medium">
                {creatorProfile.instagram}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/10 text-charcoal text-xs font-medium">
                {creatorProfile.tiktok}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 text-red-600 text-xs font-medium">
                <Play size={13} /> {creatorProfile.youtube}
              </span>
            </div>
          </Section>

          {/* ─── C. Description ─── */}
          <Section className="py-10 border-b border-charcoal/5" delay={0.1}>
            <h3 className="font-display text-2xl font-bold text-charcoal mb-4">À propos du voyage</h3>
            <p className="text-charcoal/70 leading-relaxed text-[15px] mb-5">{trip.description}</p>
            <div className="flex flex-wrap gap-2">
              {trip.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Section>

          {/* ─── D. Itinerary + Map ─── */}
          {waypoints && waypoints.length > 0 && trip.itinerary && (
            <Section className="py-10 border-b border-charcoal/5" delay={0.1}>
              <MapItinerary waypoints={waypoints} itinerary={trip.itinerary} />
            </Section>
          )}

          {/* ─── E. Included ─── */}
          {trip.included && trip.included.length > 0 && (
            <Section className="py-10 border-b border-charcoal/5" delay={0.1}>
              <h3 className="font-display text-2xl font-bold text-charcoal mb-5">Ce qui est inclus</h3>
              <div className="flex flex-wrap gap-2">
                {trip.included.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium"
                  >
                    <Check size={14} />
                    {item}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* ─── F. Promo Videos ─── */}
          {videos.length > 0 && (
            <Section className="py-10 border-b border-charcoal/5" delay={0.1}>
              <h3 className="font-display text-2xl font-bold text-charcoal mb-5">{creatorProfile.name} en parle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    onClick={handleVideoClick}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play size={20} className="text-charcoal ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    {/* Title + Platform */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-semibold leading-snug mb-1.5">{video.title}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${platformColors[video.platform] || 'bg-white/20 text-white'}`}>
                        {video.platform}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          )}

          {/* ─── G. ESG Impact ─── */}
          {trip.esgHighlights && trip.esgHighlights.length > 0 && (
            <Section className="py-10 border-b border-charcoal/5" delay={0.1}>
              <h3 className="font-display text-2xl font-bold text-charcoal mb-5 flex items-center gap-2">
                <Heart size={22} className="text-emerald-600" />
                Impact de ce voyage
              </h3>
              <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-5 space-y-4">
                {trip.esgHighlights.map((item, i) => {
                  const IconMap = { heart: Heart, leaf: Leaf, globe: Globe }
                  const Icon = IconMap[item.icon] || Globe
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                        <p className="text-xs text-charcoal/50">{item.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>
          )}

          {/* ─── H. Social Proof / Urgency ─── */}
          <Section className="py-10" delay={0.1}>
            <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-charcoal">
                  {placesRestantes} place{placesRestantes > 1 ? 's' : ''} restante{placesRestantes > 1 ? 's' : ''} sur {maxPlaces}
                </h3>
                <span className="text-xs text-charcoal/40 flex items-center gap-1">
                  <Eye size={13} /> {vuesPage} vues
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-charcoal/5 rounded-full overflow-hidden mb-5">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>

              {/* Stacked avatars */}
              {participants.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {participants.map((p) => (
                      <img
                        key={p.id}
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full border-2 border-white bg-cream"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-charcoal/50">
                    {inscrits} personnes ont déjà réservé
                  </p>
                </div>
              )}
            </div>
          </Section>

          {/* ─── Bottom Payment CTA ─── */}
          <PaymentCTA trip={trip} variant="bottom" onOpen={openPayment} placesRestantes={placesRestantes} />
        </div>

        {/* ─── I. Sticky Footer (hidden in admin mode) ─── */}
        {!isAdmin && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-charcoal/5 shadow-lg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-charcoal/50">À partir de</p>
                <p className="text-xl font-bold text-charcoal">
                  {trip.estimatedPrice}
                  <span className="text-sm font-normal text-charcoal/50"> /pers.</span>
                </p>
                <p className="text-[11px] text-charcoal/40">ou 3x sans frais</p>
              </div>
              <motion.button
                onClick={openPayment}
                className="px-6 py-3.5 bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold rounded-xl cursor-pointer shadow-lg"
                whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(217, 119, 6, 0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                Réserver ma place
              </motion.button>
            </div>
          </div>
        )}

        {/* ─── Admin Toolbar + Drawers ─── */}
        {isAdmin && (
          <>
            <AdminToolbar activeDrawer={activeDrawer} onAction={handleAdminAction} />

            <AdminDrawer
              open={activeDrawer === 'edit'}
              onClose={() => setActiveDrawer(null)}
              title="Modifier la page"
            >
              <VoyageTabEditer editData={control?.editData} trip={trip} navigate={navigate} hidePageLink />
            </AdminDrawer>

            <AdminDrawer
              open={activeDrawer === 'stats'}
              onClose={() => setActiveDrawer(null)}
              title="Statistiques"
            >
              <VoyageTabStats stats={pageStats} />
            </AdminDrawer>

            <AdminDrawer
              open={activeDrawer === 'share'}
              onClose={() => setActiveDrawer(null)}
              title="Partager"
            >
              <VoyageTabPartagerDrawer links={trackingLinks} tripSlug={tripSlug} clicksData={clicksData} />
            </AdminDrawer>
          </>
        )}

        {/* ─── Payment Modal ─── */}
        <AnimatePresence>
          {showPayment && <PaymentModal key={paymentKey} trip={trip} onClose={() => setShowPayment(false)} autoFill />}
        </AnimatePresence>

        {/* ─── Video Toast ─── */}
        <AnimatePresence>
          {videoToast && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-5 py-3 bg-charcoal text-white text-sm font-medium rounded-xl shadow-xl"
            >
              Vidéo bientôt disponible
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
