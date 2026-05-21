import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, HeartHandshake, Megaphone, Info, CalendarCheck } from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import HeroCountdown from './adventure/HeroCountdown'
import ActionCenter from './adventure/ActionCenter'
import MapItinerary from './adventure/MapItinerary'
import PaymentProgress from './adventure/PaymentProgress'
import TravelerFloatingChat from './adventure/TravelerFloatingChat'
import AnnouncementBanner from './adventure/AnnouncementBanner'
import EssentialPocket from './adventure/EssentialPocket'
import EmergencyDeck from './adventure/EmergencyDeck'
import {
  travelerProfiles,
  travelerTrips,
  travelerSecurity,
  travelerPayments,
  travelerChecklist,
  tripMapWaypoints,
  suggestedTrips,
  voyageMessages,
  travelerEssentialPocket,
  travelerWeather,
  travelerFieldChecklist,
} from '../../data/fakeData'

export default function TravelerAdventureHub({ navigate, travelerId }) {
  const paymentRef = useRef(null)
  const mapRef = useRef(null)
  const pocketRef = useRef(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatTab, setChatTab] = useState('annonces')
  const [pocketOpen, setPocketOpen] = useState(false)
  const [programmeTrigger, setProgrammeTrigger] = useState(0)

  const profile = travelerProfiles[travelerId] || travelerProfiles.lucas
  const trip = (travelerTrips[travelerId] || travelerTrips.lucas)[0]
  const tripDetail = suggestedTrips.find((t) => t.id === trip.tripId) || suggestedTrips[1]
  const security = travelerSecurity[trip.tripId]
  const payments = travelerPayments[trip.tripId]
  const checklist = travelerChecklist[trip.tripId]
  const waypoints = tripMapWaypoints[trip.tripId]
  const messages = voyageMessages[trip.tripId] || []
  const pocket = travelerEssentialPocket[trip.tripId]
  const urgences = pocket?.urgences

  const isEnCours = trip.status === 'en-cours'
  // Weather & field checklist for en-cours trips
  const weatherData = travelerWeather[trip.tripId]
  const weather = isEnCours && trip.currentDay ? weatherData?.[trip.currentDay] : null
  const fieldItems = isEnCours && trip.currentDay
    ? travelerFieldChecklist[trip.tripId]?.[trip.currentDay]
    : null

  function scrollToPayments() {
    paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Floating header */}
        <header className="fixed top-0 left-0 right-0 z-30 bg-white/60 backdrop-blur-lg border-b border-charcoal/5">
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-9 h-9 rounded-full bg-cream-warm ring-2 ring-white"
              />
              <div>
                <p className="font-semibold text-charcoal text-sm">{profile.name}</p>
                <p className="text-[10px] text-charcoal/40">Adventure Hub</p>
              </div>
            </div>
            <motion.button
              onClick={() => navigate('login')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-charcoal/50 hover:text-charcoal hover:bg-charcoal/5 transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Déconnexion</span>
            </motion.button>
          </div>
        </header>

        {/* Hero + Countdown */}
        <HeroCountdown
          trip={trip}
          creatorName="Amina"
          weather={weather}
          nextEvent={isEnCours ? trip.nextEvent : null}
        />

        {/* ═══════════════════════════════════════════════
            Layout "à-venir" : excitation + countdown
            ═══════════════════════════════════════════════ */}
        {!isEnCours && (
          <>
            {/* Action Center (checklist pré-départ) */}
            <ActionCenter
              checklist={checklist}
              onScrollToPayments={scrollToPayments}
              navigate={navigate}
              voyageId={trip.tripId}
              onContactCreator={() => setChatOpen(true)}
            />

            {/* Announcement Banner */}
            <div className="mt-8">
              <AnnouncementBanner messages={messages} onClick={() => { setChatTab('annonces'); setChatOpen(true) }} />
            </div>

            {/* Sections */}
            <div className="space-y-12 py-12">
              <MapItinerary waypoints={waypoints} itinerary={tripDetail.itinerary} />
              <PaymentProgress ref={paymentRef} payments={payments} />
              <ImpactSection />
              <EmergencyDeck security={security} />
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════
            Layout "en-cours" : mode utilitaire/temps réel
            ═══════════════════════════════════════════════ */}
        {isEnCours && (
          <>
            {/* Action Center en-cours */}
            <ActionCenter
              buttons={[
                { id: 'annonces', label: 'Annonces', icon: Megaphone, gradient: 'from-primary-500 to-primary-600' },
                { id: 'infos', label: 'Info utile', icon: Info, gradient: 'from-accent to-emerald-600' },
                { id: 'programme', label: 'Programme du jour', icon: CalendarCheck, gradient: 'from-secondary-400 to-secondary-500' },
              ]}
              onAction={(id) => {
                if (id === 'annonces') { setChatTab('annonces'); setChatOpen(true) }
                else if (id === 'infos') { setPocketOpen(true); setTimeout(() => pocketRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100) }
                else if (id === 'programme') { setProgrammeTrigger(c => c + 1); mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
              }}
            />

            {/* Announcement Banner */}
            <div className="mt-8">
              <AnnouncementBanner messages={messages} onClick={() => { setChatTab('annonces'); setChatOpen(true) }} />
            </div>

            <div className="space-y-10 py-10">
              {/* Infos utiles (tout-en-un) */}
              <div ref={pocketRef}>
                <EssentialPocket pocket={pocket} fieldItems={fieldItems} security={security} expanded={pocketOpen} onToggle={() => setPocketOpen((p) => !p)} />
              </div>

              {/* Map with current day highlight */}
              <div ref={mapRef}>
                <MapItinerary
                  waypoints={waypoints}
                  itinerary={tripDetail.itinerary}
                  currentDay={trip.currentDay}
                  expandTrigger={programmeTrigger}
                />
              </div>

              {/* Payment progress */}
              <PaymentProgress ref={paymentRef} payments={payments} />

              {/* Impact */}
              <ImpactSection />
            </div>
          </>
        )}

        {/* Footer spacer */}
        <div className="h-12" />

        {/* Floating widgets */}
        <TravelerFloatingChat tripId={trip.tripId} isOpen={chatOpen} onToggle={() => setChatOpen((p) => !p)} travelerId={travelerId} initialTab={chatTab} />
      </div>
    </PageTransition>
  )
}

function ImpactSection() {
  return (
    <div className="px-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-charcoal/5 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-accent to-emerald-500" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
              <HeartHandshake size={20} className="text-accent" />
            </div>
            <h3 className="text-xl font-bold text-charcoal font-display">Impact de votre voyage</h3>
          </div>
          <div className="mb-5">
            <div className="flex items-end gap-2 mb-3">
              <span className="text-4xl font-bold text-charcoal">85%</span>
              <span className="text-sm text-charcoal/50 pb-1">reversé aux acteurs locaux</span>
            </div>
            <div className="h-3 bg-charcoal/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent via-emerald-500 to-primary-400"
                initial={{ width: 0 }}
                whileInView={{ width: '85%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
          <div className="bg-accent/5 rounded-xl p-4">
            <p className="text-sm text-charcoal/70 leading-relaxed">
              <strong className="text-charcoal">85% de ce montant</strong> va directement aux acteurs locaux : guides, hébergeurs, restaurateurs et artisans.{' '}
              <strong className="text-accent">0% aux grandes chaînes hôtelières.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
