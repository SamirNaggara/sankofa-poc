import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Send, Megaphone, Pin, Calendar, Clock,
  MapPin, Ticket, Luggage, Phone, FileText, AlertTriangle, Shield, X, Check, Bell,
  ChevronRight, Heart, Leaf, Globe, Users,
} from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import {
  suggestedTrips, creatorProfile, voyageMessages, voyageInfosPratiques,
  travelerTrips, groupChatMembers, groupChatMessages, groupChatAutoReplies, travelerProfiles,
} from '../../data/fakeData'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const viewTransition = { duration: 0.25 }

// ─── Typing Indicator ────────────────────────────────────────────────────

function TypingIndicator({ name }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="flex items-center gap-1 px-4 py-3 bg-cream-warm rounded-2xl">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-charcoal/30"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <span className="text-xs text-charcoal/40 italic">{name} est en train d'écrire...</span>
    </div>
  )
}

// ─── Subscribe Banner ────────────────────────────────────────────────────

function SubscribeBanner() {
  const [subscribed, setSubscribed] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)

  function handleToggle() {
    setSubscribed((prev) => !prev)
    if (!subscribed) {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-primary-400/10 border border-primary-400/20 px-5 py-3.5 flex items-center gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-primary-400/20 flex items-center justify-center shrink-0">
        <Bell size={15} className="text-primary-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-charcoal">Recevoir les annonces par email</p>
        <p className="text-xs text-charcoal/40">Soyez notifié à chaque nouvelle annonce</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <AnimatePresence>
          {showConfirm && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-accent font-medium"
            >
              Activé !
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          onClick={handleToggle}
          className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${
            subscribed ? 'bg-accent' : 'bg-charcoal/20'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
            animate={{ left: subscribed ? '22px' : '2px' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Report Modal ────────────────────────────────────────────────────────

const categories = ['Hébergement', 'Transport', 'Activité', 'Autre']

function ReportModal({ onClose }) {
  const [category, setCategory] = useState(null)
  const [description, setDescription] = useState('')
  const [step, setStep] = useState('form')

  function handleSubmit() {
    if (!category || !description.trim()) return
    setStep('sending')
    setTimeout(() => setStep('success'), 1200)
    setTimeout(() => onClose(), 3700)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-charcoal/5 cursor-pointer"
              >
                <X size={18} className="text-charcoal/40" />
              </button>
              <div className="flex items-center justify-center gap-2 mb-5">
                <img
                  src={creatorProfile.avatar}
                  alt={creatorProfile.name}
                  className="w-10 h-10 rounded-full bg-cream-warm ring-2 ring-primary-400/30"
                />
                <span className="text-charcoal/30 font-bold text-lg">+</span>
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center ring-2 ring-accent/30">
                  <Shield size={18} className="text-accent" />
                </div>
              </div>
              <p className="text-center text-xs text-charcoal/50 mb-6">
                Ce signalement sera envoyé à <span className="font-semibold text-primary-600">{creatorProfile.name}</span> et à <span className="font-semibold text-accent">l'équipe Sankofa</span>
              </p>
              <h3 className="text-lg font-bold text-charcoal mb-4">Signaler un problème</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                      category === cat
                        ? 'bg-red-500 text-white'
                        : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez le problème rencontré..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-charcoal/10 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-red-400 transition-colors resize-none mb-4"
              />
              <motion.button
                onClick={handleSubmit}
                disabled={!category || !description.trim()}
                className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer le signalement
              </motion.button>
            </motion.div>
          )}

          {step === 'sending' && (
            <motion.div
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 flex flex-col items-center justify-center"
            >
              <motion.div
                className="w-14 h-14 rounded-full border-3 border-charcoal/10 border-t-accent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ borderWidth: '3px' }}
              />
              <p className="text-sm text-charcoal/50 mt-4">Envoi en cours...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                >
                  <Check size={32} className="text-accent" strokeWidth={3} />
                </motion.div>
              </motion.div>
              <p className="text-sm font-semibold text-charcoal text-center mb-1">Signalement envoyé !</p>
              <p className="text-xs text-charcoal/50 text-center max-w-xs">
                Alerte reçue. Un expert Sankofa prend le relais instantanément.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Hero Announcement ───────────────────────────────────────────────────

function HeroAnnouncement({ messages, onViewAll }) {
  if (!messages || messages.length === 0) return null

  const latest = messages[0]
  const isPinned = latest.epingle
  const date = new Date(latest.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })

  return (
    <motion.button
      onClick={onViewAll}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 p-6 shadow-lg cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
          <Megaphone size={18} className="text-white" />
        </div>
        <div className="flex-1">
          {isPinned && (
            <div className="flex items-center gap-1.5 mb-2">
              <Pin size={12} className="text-white/70 fill-white/70" />
              <span className="text-xs font-medium text-white/70">Épinglée</span>
            </div>
          )}
          <p className="text-sm text-white leading-relaxed">{latest.message}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs text-white/60 flex items-center gap-1">
              <Calendar size={11} /> {date}
            </span>
            <span className="text-xs text-white/60 flex items-center gap-1">
              <Clock size={11} /> {latest.heure}
            </span>
          </div>
        </div>
        <ChevronRight size={18} className="text-white/50 shrink-0 mt-3" />
      </div>
    </motion.button>
  )
}

// ─── Avant de partir (compact sections) ──────────────────────────────────

function AvantDePartirContent({ infos }) {
  return (
    <div className="space-y-3">
      {/* RDV */}
      <div className="bg-white rounded-xl border border-charcoal/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-rose-500/15 flex items-center justify-center">
            <MapPin size={12} className="text-rose-600" />
          </div>
          <span className="text-xs font-semibold text-charcoal">Point de rendez-vous</span>
        </div>
        <div className="text-xs space-y-1 text-charcoal/70">
          <p>{infos.rendezVous.date} à {infos.rendezVous.heure}</p>
          <p className="font-medium text-charcoal">{infos.rendezVous.lieu}</p>
          {infos.rendezVous.details && <p className="italic text-charcoal/50">{infos.rendezVous.details}</p>}
        </div>
      </div>

      {/* Billets */}
      <div className="bg-white rounded-xl border border-charcoal/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center">
            <Ticket size={12} className="text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-charcoal">Billets de transport</span>
        </div>
        <div className="text-xs space-y-1 text-charcoal/70">
          <p>{infos.billets.compagnie}</p>
          <p className="text-charcoal/50">{infos.billets.info}</p>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl border border-charcoal/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/15 flex items-center justify-center">
            <FileText size={12} className="text-amber-600" />
          </div>
          <span className="text-xs font-semibold text-charcoal">Documents nécessaires</span>
        </div>
        <ul className="text-xs space-y-1 text-charcoal/70">
          {infos.documentsNecessaires.map((doc, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-charcoal/30 mt-px">•</span>
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bagages */}
      <div className="bg-white rounded-xl border border-charcoal/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center">
            <Luggage size={12} className="text-accent" />
          </div>
          <span className="text-xs font-semibold text-charcoal">Dans vos bagages</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {infos.bagages.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-charcoal/70">
              <div className="w-2.5 h-2.5 rounded border border-charcoal/20 flex items-center justify-center">
                <div className="w-1 h-1 rounded-sm bg-accent/60" />
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl border border-charcoal/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center">
            <Phone size={12} className="text-emerald-600" />
          </div>
          <span className="text-xs font-semibold text-charcoal">Contact sur place</span>
        </div>
        <div className="text-xs space-y-1 text-charcoal/70">
          <p><span className="font-medium text-charcoal">{infos.contactSurPlace.nom}</span> — {infos.contactSurPlace.role}</p>
          <p className="font-medium text-charcoal">{infos.contactSurPlace.telephone}</p>
          <p className="text-charcoal/50">{infos.contactSurPlace.disponibilite}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Programme Timeline ──────────────────────────────────────────────────

function ProgrammeTimeline({ infos }) {
  const [expandedItem, setExpandedItem] = useState(null)

  if (!infos) return null

  const toggleItem = (key) => {
    setExpandedItem(expandedItem === key ? null : key)
  }

  const items = [
    { key: 'avant', label: 'Avant de partir', type: 'preparation' },
    ...infos.programme.map((jour) => ({
      key: `jour-${jour.jour}`,
      jour: jour.jour,
      label: jour.titre,
      detail: jour.detail,
      type: 'day',
    })),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
        <Calendar size={18} className="text-primary-500" />
        Programme
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[18px] top-6 bottom-6 w-px bg-charcoal/10" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-1"
        >
          {items.map((item) => {
            const isExpanded = expandedItem === item.key
            const isAvant = item.type === 'preparation'

            return (
              <motion.div key={item.key} variants={itemVariants}>
                <motion.button
                  onClick={() => toggleItem(item.key)}
                  className="w-full flex items-center gap-4 px-1 py-3 rounded-xl hover:bg-white/60 transition-colors cursor-pointer text-left"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Pastille */}
                  <motion.div
                    className={`relative z-10 w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      isAvant
                        ? 'bg-accent text-white'
                        : 'bg-primary-400 text-white'
                    }`}
                    animate={isExpanded ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={isExpanded ? { duration: 1.5, repeat: Infinity, repeatDelay: 1.5 } : {}}
                  >
                    {isAvant ? (
                      <Luggage size={15} />
                    ) : (
                      <span className="text-xs font-bold">J{item.jour}</span>
                    )}
                  </motion.div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${isExpanded ? 'text-primary-600' : 'text-charcoal'}`}>
                      {item.label}
                    </p>
                    {!isExpanded && item.detail && (
                      <p className="text-xs text-charcoal/40 truncate mt-0.5">{item.detail}</p>
                    )}
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronRight size={16} className="text-charcoal/30" />
                  </motion.div>
                </motion.button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-[50px] mr-1 pb-3">
                        {isAvant ? (
                          <AvantDePartirContent infos={infos} />
                        ) : (
                          <div className="bg-white rounded-xl border border-charcoal/5 p-4">
                            <p className="text-sm text-charcoal/70 leading-relaxed">{item.detail}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Communication CTAs ──────────────────────────────────────────────────

function CommunicationCTAs({ members, onOpenGroupe, onReport }) {
  const shown = members.slice(0, 3)
  const remaining = members.length - 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-3"
    >
      <motion.button
        onClick={onOpenGroupe}
        className="w-full bg-white rounded-2xl shadow-sm border border-charcoal/5 p-5 flex items-center gap-4 cursor-pointer text-left"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center -space-x-2 shrink-0">
          {shown.map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              className="w-9 h-9 rounded-full bg-cream-warm ring-2 ring-white"
            />
          ))}
          {remaining > 0 && (
            <div className="w-9 h-9 rounded-full bg-accent/15 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-accent">
              +{remaining}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-charcoal">Conversation du groupe</p>
          <p className="text-xs text-charcoal/40">{members.length} membres actifs</p>
        </div>
        <ChevronRight size={18} className="text-charcoal/30 shrink-0" />
      </motion.button>

      <button
        onClick={onReport}
        className="flex items-center gap-1.5 ml-2 text-xs text-charcoal/30 hover:text-red-500 transition-colors cursor-pointer"
      >
        <AlertTriangle size={12} />
        Signaler un problème
      </button>
    </motion.div>
  )
}

// ─── Sub-view: All Announcements ─────────────────────────────────────────

function AnnoncesView({ messages, onBack }) {
  const pinnedMessages = messages?.filter((m) => m.epingle) || []
  const otherMessages = messages?.filter((m) => !m.epingle) || []

  return (
    <motion.div
      key="annonces-view"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={viewTransition}
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal mb-5 cursor-pointer"
        whileTap={{ scale: 0.97 }}
      >
        <ArrowLeft size={16} />
        Retour au voyage
      </motion.button>

      <h2 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
        <Megaphone size={18} className="text-primary-500" />
        Toutes les annonces
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        <SubscribeBanner />
        {pinnedMessages.map((msg) => {
          const date = new Date(msg.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
          return (
            <motion.div
              key={msg.id}
              variants={itemVariants}
              className="rounded-2xl p-5 bg-primary-400/10 border-2 border-primary-400/40"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Pin size={14} className="text-primary-500 fill-primary-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-charcoal leading-relaxed">{msg.message}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-charcoal/40 flex items-center gap-1">
                      <Calendar size={11} /> {date}
                    </span>
                    <span className="text-xs text-charcoal/40 flex items-center gap-1">
                      <Clock size={11} /> {msg.heure}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
        {otherMessages.map((msg) => {
          const date = new Date(msg.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
          return (
            <motion.div
              key={msg.id}
              variants={itemVariants}
              className="rounded-2xl p-5 bg-white border border-charcoal/5"
            >
              <div className="flex-1">
                <p className="text-sm text-charcoal leading-relaxed">{msg.message}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-charcoal/40 flex items-center gap-1">
                    <Calendar size={11} /> {date}
                  </span>
                  <span className="text-xs text-charcoal/40 flex items-center gap-1">
                    <Clock size={11} /> {msg.heure}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
        {(!messages || messages.length === 0) && (
          <div className="text-center py-12 text-charcoal/40 text-sm">Aucune annonce pour le moment</div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Sub-view: Groupe ─────────────────────────────────────────────────────

function GroupeView({ tripId, travelerId, onBack }) {
  const members = groupChatMembers[tripId] || []
  const seedMessages = groupChatMessages[tripId] || []
  const autoReplies = groupChatAutoReplies[tripId] || []

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingName, setTypingName] = useState('')
  const [replyIndex, setReplyIndex] = useState(0)
  const [showReport, setShowReport] = useState(false)
  const scrollRef = useRef(null)
  const typingTimerRef = useRef(null)

  function getMember(senderId) {
    const m = members.find((mb) => mb.id === senderId)
    if (m) return m
    const prof = travelerProfiles[senderId]
    if (prof) return { id: senderId, name: prof.name.split(' ')[0], avatar: prof.avatar }
    return { id: senderId, name: senderId, avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${senderId}` }
  }

  // Progressive seed
  useEffect(() => {
    const timers = seedMessages.map((msg, i) =>
      setTimeout(() => {
        setMessages((prev) => [...prev, msg])
      }, i * 400)
    )
    return () => timers.forEach(clearTimeout)
  }, [seedMessages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    }
  }, [])

  function handleSend() {
    if (!input.trim()) return
    const userMsg = {
      id: Date.now(),
      senderId: travelerId,
      text: input.trim(),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    const reply = autoReplies[replyIndex % autoReplies.length]
    if (reply) {
      const replier = getMember(reply.senderId)
      setTypingName(replier.name)
      setIsTyping(true)
      const delay = 1500 + Math.random() * 2000
      typingTimerRef.current = setTimeout(() => {
        setIsTyping(false)
        setTypingName('')
        setMessages((prev) => [...prev, {
          id: Date.now() + 1,
          senderId: reply.senderId,
          text: reply.text,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        }])
        setReplyIndex((prev) => prev + 1)
      }, delay)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const shown = members.slice(0, 3)
  const remaining = members.length - 3

  return (
    <motion.div
      key="groupe-view"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={viewTransition}
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-charcoal/5 flex items-center gap-3">
        <motion.button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-charcoal/5 cursor-pointer shrink-0"
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={18} className="text-charcoal/50" />
        </motion.button>
        <div className="flex items-center -space-x-2 shrink-0">
          {shown.map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              className="w-9 h-9 rounded-full bg-cream-warm ring-2 ring-white"
            />
          ))}
          {remaining > 0 && (
            <div className="w-9 h-9 rounded-full bg-accent/15 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-accent">
              +{remaining}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-charcoal">Groupe du voyage</p>
          <div className="flex items-center gap-1.5">
            <Users size={11} className="text-charcoal/40" />
            <span className="text-xs text-charcoal/40">{members.length} membres</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="px-5 py-4 space-y-3 max-h-[420px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isMe = msg.senderId === travelerId
            const isAmina = msg.senderId === 'amina'
            const member = getMember(msg.senderId)
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-7 h-7 rounded-full bg-cream-warm shrink-0 mt-1 mr-2"
                  />
                )}
                <div className="max-w-[75%]">
                  {!isMe && (
                    <p className={`text-[11px] font-semibold mb-0.5 ${isAmina ? 'text-primary-600' : 'text-charcoal/50'}`}>
                      {member.name}
                    </p>
                  )}
                  <div className={`px-4 py-3 rounded-2xl ${
                    isMe
                      ? 'bg-primary-500 text-white'
                      : isAmina
                        ? 'bg-primary-400/10 text-charcoal'
                        : 'bg-cream-warm text-charcoal'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1.5 ${isMe ? 'text-white/60' : 'text-charcoal/30'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {isTyping && <TypingIndicator name={typingName} />}
      </div>

      {/* Input + Report link */}
      <div className="px-5 py-3 border-t border-charcoal/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message au groupe..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-cream text-sm text-charcoal placeholder:text-charcoal/30 border border-charcoal/5 focus:outline-none focus:border-accent/30 transition-colors"
          />
          <motion.button
            onClick={handleSend}
            className="p-2.5 bg-accent text-white rounded-xl cursor-pointer disabled:opacity-40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim()}
          >
            <Send size={18} />
          </motion.button>
        </div>
        <button
          onClick={() => setShowReport(true)}
          className="flex items-center gap-1.5 mt-2 text-xs text-charcoal/40 hover:text-red-500 transition-colors cursor-pointer"
        >
          <AlertTriangle size={12} />
          Signaler un problème
        </button>
      </div>

      {/* Report modal */}
      <AnimatePresence>
        {showReport && <ReportModal onClose={() => setShowReport(false)} />}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────

export default function TravelerVoyageDetail({ navigate, voyageId, initialTab, travelerId }) {
  const [view, setView] = useState(
    initialTab === 'annonces' ? 'annonces' : initialTab === 'groupe' ? 'groupe' : 'main'
  )
  const [showReport, setShowReport] = useState(false)

  const trip = suggestedTrips.find((t) => t.id === voyageId) || suggestedTrips[1]
  const messages = voyageMessages[trip.id] || []
  const infos = voyageInfosPratiques[trip.id]
  const travelerTripList = travelerTrips[travelerId] || travelerTrips.lucas || []
  const travelerTrip = travelerTripList.find((t) => t.tripId === trip.id)
  const tripDates = travelerTrip?.dates || trip.departureDate

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Sticky header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-3">
            <motion.button
              onClick={() => navigate('traveler-dashboard', { travelerId })}
              className="p-2 rounded-xl hover:bg-charcoal/5 cursor-pointer"
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={20} className="text-charcoal/60" />
            </motion.button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold text-charcoal truncate">{trip.title}</h1>
              {tripDates && (
                <p className="text-xs text-charcoal/40">{tripDates}</p>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-6 pb-24">
          <AnimatePresence mode="wait">
            {/* ─── Main scrollable view ─── */}
            {view === 'main' && (
              <motion.div
                key="main-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -40 }}
                transition={viewTransition}
                className="space-y-8"
              >
                <HeroAnnouncement
                  messages={messages}
                  onViewAll={() => setView('annonces')}
                />

                <ProgrammeTimeline infos={infos} />

                {/* Impact de ce voyage */}
                {trip.esgHighlights && trip.esgHighlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <h2 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
                      <Heart size={18} className="text-emerald-600" />
                      Impact de ce voyage
                    </h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-5 space-y-4">
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

                <CommunicationCTAs
                  members={groupChatMembers[trip.id] || []}
                  onOpenGroupe={() => setView('groupe')}
                  onReport={() => setShowReport(true)}
                />
              </motion.div>
            )}

            {/* ─── All announcements sub-view ─── */}
            {view === 'annonces' && (
              <AnnoncesView
                messages={messages}
                onBack={() => setView('main')}
              />
            )}

            {/* ─── Groupe sub-view ─── */}
            {view === 'groupe' && (
              <GroupeView
                tripId={trip.id}
                travelerId={travelerId}
                onBack={() => setView('main')}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Report modal (from main CTA) */}
        <AnimatePresence>
          {showReport && <ReportModal onClose={() => setShowReport(false)} />}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
