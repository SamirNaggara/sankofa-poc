import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Users, ChevronRight } from 'lucide-react'
import { suggestedTrips } from '../../data/fakeData'

const creatorConversations = [
  // 1. Organisation Bali
  [
    { sender: 'user', text: 'Salut ! Je voudrais organiser mon prochain voyage à Bali avec ma communauté. Comment ça se passe concrètement ?' },
    { sender: 'team', text: 'Hello ! 🌴 Super projet ! Chez Sankofa on gère toute la logistique pour toi : vols, hôtels, activités, transfers. Toi tu te concentres sur le contenu et l\'expérience avec tes fans.' },
    { sender: 'user', text: 'Ok cool, et je dois m\'occuper de quoi exactement ?' },
    { sender: 'team', text: 'Juste de choisir les dates et le type d\'expérience que tu veux offrir. On s\'occupe du reste ! On peut planifier un call cette semaine pour construire ton programme ensemble ? 🗓️' },
  ],
  // 2. Question revenus
  [
    { sender: 'user', text: 'Hey, j\'aimerais comprendre comment fonctionne la rémunération sur Sankofa. Je touche quoi exactement ?' },
    { sender: 'team', text: 'Bonne question ! Tu touches 80% du prix du voyage payé par tes fans. On prend 20% de commission pour couvrir la logistique et le support 💰' },
    { sender: 'user', text: 'Ok pas mal ! Et le paiement c\'est quand ?' },
    { sender: 'team', text: 'Paiement mensuel, 30 jours après le voyage. Tu as un dashboard pour suivre tes revenus en temps réel, les inscriptions, tout. Transparence totale ! 📊' },
  ],
  // 3. Taille du groupe
  [
    { sender: 'user', text: 'Question : je peux prendre combien de voyageurs max avec moi ?' },
    { sender: 'team', text: 'Pour un premier voyage, on recommande entre 8 et 12 personnes. C\'est le sweet spot pour une expérience intimiste tout en étant rentable 👌' },
    { sender: 'user', text: 'Et si j\'ai plus de demandes que ça ?' },
    { sender: 'team', text: 'On gère les inscriptions et la liste d\'attente pour toi ! Si la demande est forte, on peut planifier un 2e départ. Tes fans seront prévenus automatiquement 🚀' },
  ],
]

const travelerConversations = [
  // 1. Voyage Bali
  [
    { sender: 'user', text: 'Bonjour ! J\'ai vu que @LéaVoyage organise un trip à Bali bientôt, vous avez plus d\'infos sur les dates et le programme ?' },
    { sender: 'team', text: 'Hello ! 🌴 Oui absolument, Léa part à Bali du 15 au 25 mars avec un groupe de 12 fans max. Au programme : rizières, temples, spots secrets et sessions photo avec elle !' },
    { sender: 'user', text: 'Trop bien ! Il reste des places ?' },
    { sender: 'team', text: 'Il reste 3 places ! Le tarif est de 2 890€ tout inclus (vols, hébergement, activités). Je peux te réserver un spot si tu veux ? 🙌' },
  ],
  // 2. Question paiement
  [
    { sender: 'user', text: 'Salut, je suis inscrit au voyage au Maroc. C\'est possible de payer en plusieurs fois ?' },
    { sender: 'team', text: 'Salut ! Bien sûr, on propose le paiement en 3x sans frais 🙌 Ça te fait environ 430€/mois pour le Maroc.' },
    { sender: 'user', text: 'Parfait ! Et c\'est sécurisé le paiement ?' },
    { sender: 'team', text: 'Oui 100% ! On utilise Stripe, tout est chiffré et sécurisé. Je t\'envoie le lien de paiement par email tout de suite ? 🔒' },
  ],
  // 3. Question pendant le voyage
  [
    { sender: 'user', text: 'Hello ! On est au Japon là avec @MaxAventure, c\'est à quelle heure le rdv demain matin ? Et faut prévoir quelque chose de spécial ?' },
    { sender: 'team', text: 'Hey ! Demain rendez-vous à 7h30 dans le lobby de l\'hôtel 🏨 Vous partez pour le marché aux poissons de Tsukiji puis balade dans Asakusa.' },
    { sender: 'user', text: 'Ok top ! Il va faire quel temps ?' },
    { sender: 'team', text: 'Prévu nuageux avec averses possibles l\'après-midi ☁️ Prends un K-way au cas où ! Et des chaussures confortables, vous allez beaucoup marcher. Amusez-vous bien ! 🇯🇵' },
  ],
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-charcoal/30"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export default function FloatingChat({ userType = 'traveler', navigate, voyageId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)
  const timersRef = useRef([])
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  // Active voyages for the creator (first 2 trips as demo)
  const activeVoyages = userType === 'creator' ? suggestedTrips.slice(0, 2) : []

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Cleanup timers on unmount or close
  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  function handleOpen() {
    setIsOpen(true)
    setMessages([])
    setIsTyping(false)
    clearTimers()

    // Pick random conversation based on user type
    const conversations = userType === 'creator' ? creatorConversations : travelerConversations
    const convo = conversations[Math.floor(Math.random() * conversations.length)]
    let delay = 800

    convo.forEach((msg) => {
      if (msg.sender === 'team') {
        // Show typing indicator first
        const typingTimer = setTimeout(() => setIsTyping(true), delay)
        timersRef.current.push(typingTimer)
        delay += 1500

        // Then show message
        const msgTimer = setTimeout(() => {
          setIsTyping(false)
          setMessages((prev) => [...prev, { ...msg, id: Date.now() + Math.random() }])
        }, delay)
        timersRef.current.push(msgTimer)
        delay += 800
      } else {
        const msgTimer = setTimeout(() => {
          setMessages((prev) => [...prev, { ...msg, id: Date.now() + Math.random() }])
        }, delay)
        timersRef.current.push(msgTimer)
        delay += 1000
      }
    })
  }

  function handleClose() {
    setIsOpen(false)
    clearTimers()
    setMessages([])
    setIsTyping(false)
  }

  function handleGoToVoyageChat(tripId) {
    handleClose()
    if (navigate) {
      navigate('voyage-control', { voyageId: tripId, tab: 'communication', subTab: 'groupe' })
    }
  }

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e) {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    return () => clearTimers()
  }, [])

  return (
    <>
      {/* Floating button */}
      <motion.button
        ref={buttonRef}
        onClick={isOpen ? handleClose : handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(217, 119, 6, 0.4)',
            '0 0 0 12px rgba(217, 119, 6, 0)',
            '0 0 0 0 rgba(217, 119, 6, 0)',
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, repeatDelay: 1 },
        }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {/* Notification badge */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 left-4 z-50 h-[70vh] max-h-[480px] sm:left-auto sm:right-6 sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-charcoal/5 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-charcoal/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                <span className="text-lg">✈️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-charcoal">Équipe Sankofa</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-charcoal/40">En ligne</span>
                </div>
              </div>
              <motion.button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-charcoal/5 text-charcoal/40 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Voyage links for creators */}
            {userType === 'creator' && navigate && activeVoyages.length > 0 && (
              <div className="px-4 py-2.5 border-b border-charcoal/5 space-y-1.5">
                <p className="text-[10px] font-semibold text-charcoal/40 uppercase tracking-wider px-1">Conversations voyage</p>
                {activeVoyages.map((trip) => (
                  <motion.button
                    key={trip.id}
                    onClick={() => handleGoToVoyageChat(trip.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-primary-400/8 transition-colors cursor-pointer group text-left"
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Users size={13} className="text-accent" />
                    </div>
                    <span className="flex-1 text-xs font-medium text-charcoal truncate">{trip.title.split(':')[0].trim()}</span>
                    <ChevronRight size={14} className="text-charcoal/20 group-hover:text-charcoal/50 transition-colors shrink-0" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-cream-warm text-charcoal'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-cream-warm rounded-2xl">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-charcoal/5">
              <input
                type="text"
                disabled
                placeholder="Écrivez votre message..."
                className="w-full px-4 py-2.5 rounded-xl bg-cream text-sm text-charcoal placeholder:text-charcoal/30 border border-charcoal/5 opacity-60 cursor-not-allowed"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
