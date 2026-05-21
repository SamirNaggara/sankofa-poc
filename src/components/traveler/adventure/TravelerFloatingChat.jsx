import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, X, Send, Megaphone, Users, User,
  ShieldAlert, Phone, Check,
} from 'lucide-react'
import {
  creatorProfile, voyageMessages, voyageInfosPratiques,
  groupChatMembers, groupChatMessages, groupChatAutoReplies, travelerProfiles,
  creatorDmMessages, creatorDmAutoReplies,
} from '../../../data/fakeData'
import { simulateTyping } from '../../../hooks/useSimulateTyping'

const creatorFirstName = creatorProfile.name.split(' ')[0]

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
      <span className="text-xs text-charcoal/40 italic">{name} écrit...</span>
    </div>
  )
}

const tabConfig = {
  annonces: {
    label: 'Annonce',
    icon: Megaphone,
    activeClass: 'bg-primary-500 text-white',
    inactiveClass: 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10',
  },
  groupe: {
    label: 'Groupe',
    icon: Users,
    activeClass: 'bg-accent text-white',
    inactiveClass: 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10',
  },
  creator: {
    label: creatorFirstName,
    icon: User,
    activeClass: 'bg-secondary-500 text-white',
    inactiveClass: 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10',
  },
  sos: {
    label: 'SOS',
    icon: null,
    activeClass: 'bg-red-500 text-white',
    inactiveClass: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  },
}

export default function TravelerFloatingChat({ tripId, isOpen, onToggle, travelerId, initialTab }) {
  const announcements = voyageMessages[tripId] || []
  const members = groupChatMembers[tripId] || []
  const autoReplies = groupChatAutoReplies[tripId] || []
  const dmAutoReplies = creatorDmAutoReplies[tripId] || []
  const infos = voyageInfosPratiques[tripId] || {}
  const urgence = infos.urgence

  const [activeTab, setActiveTab] = useState(initialTab || 'annonces')
  const [sosMessage, setSosMessage] = useState('')
  const [sosStep, setSosStep] = useState('form')
  const [groupMessages, setGroupMessages] = useState([])
  const [dmMessages, setDmMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingName, setTypingName] = useState('')
  const [groupReplyIndex, setGroupReplyIndex] = useState(0)
  const [dmReplyIndex, setDmReplyIndex] = useState(0)
  const [hasLoaded, setHasLoaded] = useState(false)
  const scrollRef = useRef(null)
  const typingTimerRef = useRef(null)

  // Sync initialTab prop
  useEffect(() => {
    if (initialTab && isOpen) {
      setActiveTab(initialTab)
    }
  }, [initialTab, isOpen])

  // Load initial messages when first opened
  useEffect(() => {
    if (isOpen && !hasLoaded) {
      const seed = groupChatMessages[tripId] || []
      setGroupMessages(seed.map((m) => ({ ...m })))
      const dmSeed = creatorDmMessages[tripId] || []
      setDmMessages(dmSeed.map((m) => ({ ...m })))
      setHasLoaded(true)
    }
  }, [isOpen, hasLoaded, tripId])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [groupMessages, dmMessages, isTyping, activeTab, announcements])

  // Auto-fill SOS message when switching to sos tab
  const sosFilledRef = useRef(false)
  useEffect(() => {
    if (activeTab === 'sos' && !sosFilledRef.current && !sosMessage) {
      sosFilledRef.current = true
      simulateTyping(setSosMessage, 'Je me suis tordu la cheville pendant la randonnée, j\'ai du mal à marcher. Je suis près de la cascade.', 30)
    }
  }, [activeTab])

  // Cleanup typing timer
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    }
  }, [])

  function getMember(senderId) {
    const m = members.find((mb) => mb.id === senderId)
    if (m) return m
    const prof = travelerProfiles[senderId]
    if (prof) return { id: senderId, name: prof.name.split(' ')[0], avatar: prof.avatar }
    return { id: senderId, name: senderId, avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${senderId}` }
  }

  function handleSend() {
    if (!input.trim()) return
    if (activeTab !== 'groupe' && activeTab !== 'creator') return

    const userMsg = {
      id: Date.now(),
      senderId: travelerId,
      text: input.trim(),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    }

    if (activeTab === 'groupe') {
      setGroupMessages((prev) => [...prev, userMsg])
      setInput('')

      // Auto-reply from a random group member
      const reply = autoReplies[groupReplyIndex % autoReplies.length]
      if (reply) {
        const replier = getMember(reply.senderId)
        setTypingName(replier.name)
        setIsTyping(true)
        const delay = 1500 + Math.random() * 2000
        typingTimerRef.current = setTimeout(() => {
          setIsTyping(false)
          setTypingName('')
          setGroupMessages((prev) => [...prev, {
            id: Date.now() + 1,
            senderId: reply.senderId,
            text: reply.text,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          }])
          setGroupReplyIndex((prev) => prev + 1)
        }, delay)
      }
    } else if (activeTab === 'creator') {
      setDmMessages((prev) => [...prev, userMsg])
      setInput('')

      // Auto-reply from creator
      const reply = dmAutoReplies[dmReplyIndex % dmAutoReplies.length]
      if (reply) {
        setTypingName(creatorFirstName)
        setIsTyping(true)
        const delay = 1500 + Math.random() * 2000
        typingTimerRef.current = setTimeout(() => {
          setIsTyping(false)
          setTypingName('')
          setDmMessages((prev) => [...prev, {
            id: Date.now() + 1,
            senderId: 'amina',
            text: reply.text,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          }])
          setDmReplyIndex((prev) => prev + 1)
        }, delay)
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }


  const unreadCount = announcements.length > 0 ? 1 : 0

  // Avatar stack for group header
  function AvatarStack({ max = 3 }) {
    const shown = members.slice(0, max)
    const remaining = members.length - max
    return (
      <div className="flex items-center -space-x-2">
        {shown.map((m) => (
          <img
            key={m.id}
            src={m.avatar}
            alt={m.name}
            className="w-8 h-8 rounded-full bg-cream-warm ring-2 ring-white"
          />
        ))}
        {remaining > 0 && (
          <div className="w-8 h-8 rounded-full bg-accent/15 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-accent">
            +{remaining}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg flex items-center justify-center cursor-pointer"
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
        {isOpen ? (
          <X size={22} />
        ) : (
          <div className="relative">
            <MessageCircle size={22} />
            <img
              src={creatorProfile.avatar}
              alt=""
              className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-primary-500 bg-cream-warm"
            />
          </div>
        )}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-charcoal/5 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-charcoal/5 flex items-center gap-3">
              <div className="relative shrink-0">
                {activeTab === 'sos' ? (
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center ring-2 ring-red-400/20">
                    <ShieldAlert size={18} className="text-red-500" />
                  </div>
                ) : activeTab === 'annonces' || activeTab === 'creator' ? (
                  <img
                    src={creatorProfile.avatar}
                    alt={creatorProfile.name}
                    className="w-10 h-10 rounded-full bg-cream-warm ring-2 ring-primary-400/30"
                  />
                ) : (
                  <AvatarStack max={3} />
                )}
                {activeTab !== 'groupe' && (
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    activeTab === 'sos' ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-charcoal">
                  {activeTab === 'annonces' ? `Annonces d'${creatorFirstName}` : activeTab === 'groupe' ? 'Groupe du voyage' : activeTab === 'sos' ? 'Urgence SOS' : creatorProfile.name}
                </p>
                <div className="flex items-center gap-1.5">
                  {activeTab === 'annonces' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      <span className="text-xs text-charcoal/40">Diffusion</span>
                    </>
                  ) : activeTab === 'groupe' ? (
                    <>
                      <Users size={11} className="text-charcoal/40" />
                      <span className="text-xs text-charcoal/40">{members.length} membres</span>
                    </>
                  ) : activeTab === 'sos' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-xs text-charcoal/40">Assistance 24/7</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-charcoal/40">En ligne</span>
                    </>
                  )}
                </div>
              </div>
              <motion.button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:bg-charcoal/5 text-charcoal/40 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Tab bar */}
            <div className="px-4 py-2.5 border-b border-charcoal/5 flex gap-2">
              {['annonces', 'groupe', 'creator', 'sos'].map((tab) => {
                const conf = tabConfig[tab]
                const Icon = conf.icon
                const isActive = activeTab === tab
                return (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      isActive ? conf.activeClass : conf.inactiveClass
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon && <Icon size={12} />}
                    {conf.label}
                  </motion.button>
                )
              })}
            </div>

            {/* Body */}
            <AnimatePresence mode="wait">
              {/* ─── Annonces (read-only) ─── */}
              {activeTab === 'annonces' && (
                <motion.div
                  key="annonces"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div ref={scrollRef} className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
                    <AnimatePresence initial={false}>
                      {announcements.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-start gap-2 max-w-[90%]">
                            <img
                              src={creatorProfile.avatar}
                              alt="Amina"
                              className="w-7 h-7 rounded-full bg-cream-warm shrink-0 mt-1"
                            />
                            <div>
                              <p className="text-[11px] font-semibold text-primary-600 mb-0.5">Amina</p>
                              <div className={`px-4 py-3 rounded-2xl ${msg.epingle ? 'bg-primary-400/15 border border-primary-400/30' : 'bg-cream-warm'}`}>
                                <p className="text-sm leading-relaxed text-charcoal">{msg.message}</p>
                                <p className="text-xs text-charcoal/30 mt-1.5">{msg.date} · {msg.heure}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {announcements.length === 0 && (
                      <p className="text-center text-charcoal/40 text-sm py-8">Aucune annonce pour le moment</p>
                    )}
                  </div>
                  <div className="px-5 py-3 border-t border-charcoal/5">
                    <p className="text-xs text-charcoal/40 italic text-center">Seule Amina peut publier des annonces</p>
                  </div>
                </motion.div>
              )}

              {/* ─── Groupe (interactive chat) ─── */}
              {activeTab === 'groupe' && (
                <motion.div
                  key="groupe"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div ref={scrollRef} className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
                    <AnimatePresence initial={false}>
                      {groupMessages.map((msg) => {
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
                            <div className={`max-w-[75%]`}>
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

                  {/* Input */}
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
                  </div>
                </motion.div>
              )}

              {/* ─── Creator DM (private chat with creator) ─── */}
              {activeTab === 'creator' && (
                <motion.div
                  key="creator"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div ref={scrollRef} className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
                    <AnimatePresence initial={false}>
                      {dmMessages.map((msg) => {
                        const isMe = msg.senderId === travelerId
                        const isCreator = msg.senderId === 'amina'
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
                                src={creatorProfile.avatar}
                                alt={creatorFirstName}
                                className="w-7 h-7 rounded-full bg-cream-warm shrink-0 mt-1 mr-2"
                              />
                            )}
                            <div className="max-w-[75%]">
                              {isCreator && (
                                <p className="text-[11px] font-semibold text-secondary-500 mb-0.5">{creatorFirstName}</p>
                              )}
                              <div className={`px-4 py-3 rounded-2xl ${
                                isMe
                                  ? 'bg-secondary-500 text-white'
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

                  {/* Input */}
                  <div className="px-5 py-3 border-t border-charcoal/5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Message à ${creatorFirstName}...`}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-cream text-sm text-charcoal placeholder:text-charcoal/30 border border-charcoal/5 focus:outline-none focus:border-secondary-500/30 transition-colors"
                      />
                      <motion.button
                        onClick={handleSend}
                        className="p-2.5 bg-secondary-500 text-white rounded-xl cursor-pointer disabled:opacity-40"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!input.trim()}
                      >
                        <Send size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── SOS (urgence simplifiée) ─── */}
              {activeTab === 'sos' && (
                <motion.div
                  key="sos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 overflow-y-auto"
                >
                  <AnimatePresence mode="wait">
                    {sosStep === 'form' && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 space-y-4"
                      >
                        {/* Message */}
                        <textarea
                          value={sosMessage}
                          onChange={(e) => setSosMessage(e.target.value)}
                          placeholder="Décrivez votre situation..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-cream border border-charcoal/10 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-red-400 transition-colors resize-none"
                        />

                        {/* Submit */}
                        <motion.button
                          onClick={() => {
                            if (!sosMessage.trim()) return
                            setSosStep('sending')
                            setTimeout(() => setSosStep('success'), 1200)
                            setTimeout(() => {
                              setSosStep('form')
                              setSosMessage('')
                              setActiveTab('annonces')
                            }, 3700)
                          }}
                          disabled={!sosMessage.trim()}
                          className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Envoyer l'alerte
                        </motion.button>

                        {/* Emergency contacts */}
                        <div className="rounded-xl bg-charcoal/[0.03] border border-charcoal/5 p-4 space-y-2">
                          <p className="text-xs font-semibold text-charcoal/60 mb-2">Numéros d'urgence</p>

                          {urgence && (
                            <>
                              <a href={`tel:${urgence.numeroLocal}`} className="flex items-center gap-3 p-2.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                                  <Phone size={14} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-red-700">{urgence.labelNumeroLocal}</p>
                                  <p className="text-[11px] text-red-500/70">{urgence.numeroLocal}</p>
                                </div>
                              </a>
                              <a href={`tel:${urgence.police}`} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-charcoal/5 transition-colors">
                                <span className="text-xs text-charcoal/70">{urgence.labelPolice}</span>
                                <span className="text-xs font-semibold text-charcoal">{urgence.police}</span>
                              </a>
                              <a href={`tel:${urgence.ambulance}`} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-charcoal/5 transition-colors">
                                <span className="text-xs text-charcoal/70">{urgence.labelAmbulance}</span>
                                <span className="text-xs font-semibold text-charcoal">{urgence.ambulance}</span>
                              </a>
                            </>
                          )}

                          {infos.contactSurPlace && (
                            <a href={`tel:${infos.contactSurPlace.telephone}`} className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                                <Phone size={14} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-charcoal">{infos.contactSurPlace.nom}</p>
                                <p className="text-[11px] text-charcoal/50">{infos.contactSurPlace.role} — {infos.contactSurPlace.telephone}</p>
                              </div>
                            </a>
                          )}

                          <a href="tel:+33 6 12 34 56 78" className="flex items-center gap-3 p-2.5 rounded-lg bg-primary-400/5 hover:bg-primary-400/10 transition-colors">
                            <img src={creatorProfile.avatar} alt={creatorFirstName} className="w-8 h-8 rounded-full bg-cream-warm shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-charcoal">{creatorProfile.name}</p>
                              <p className="text-[11px] text-charcoal/50">Créatrice du voyage — +33 6 12 34 56 78</p>
                            </div>
                          </a>

                          {urgence && (
                            <a href={`tel:${urgence.sankofaHotline}`} className="flex items-center gap-3 p-2.5 rounded-lg bg-primary-400/5 hover:bg-primary-400/10 transition-colors border-t border-charcoal/5 mt-1 pt-3">
                              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                                <Phone size={14} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-primary-600">Hotline Sankofa</p>
                                <p className="text-[11px] text-charcoal/50">{urgence.sankofaHotline}</p>
                              </div>
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {sosStep === 'sending' && (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center py-16"
                      >
                        <motion.div
                          className="w-14 h-14 rounded-full border-charcoal/10 border-t-red-500"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ borderWidth: '3px' }}
                        />
                        <p className="text-sm text-charcoal/50 mt-4">Envoi de l'alerte...</p>
                      </motion.div>
                    )}

                    {sosStep === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center py-16"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                          className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                          >
                            <Check size={32} className="text-red-500" strokeWidth={3} />
                          </motion.div>
                        </motion.div>
                        <p className="text-sm font-semibold text-charcoal text-center mb-1">Alerte envoyée !</p>
                        <p className="text-xs text-charcoal/50 text-center max-w-xs px-4">
                          L'équipe Sankofa et {creatorProfile.name} ont été prévenus.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
