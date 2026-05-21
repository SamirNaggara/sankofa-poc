import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Megaphone, Users, MessageCircle, ArrowLeft, Sparkles,
} from 'lucide-react'
import { creatorProfile } from '../../../data/fakeData'

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
      <span className="text-xs text-charcoal/40 italic">{name} écrit...</span>
    </div>
  )
}

// ─── Tab Config ──────────────────────────────────────────────────────────

const tabConfig = {
  annonces: {
    label: 'Annonces',
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
  messages: {
    label: 'Messages',
    icon: MessageCircle,
    activeClass: 'bg-secondary-500 text-white',
    inactiveClass: 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10',
  },
  sankofa: {
    label: 'Sankofa',
    icon: Sparkles,
    activeClass: 'bg-primary-500 text-white',
    inactiveClass: 'bg-primary-400/10 text-primary-600 hover:bg-primary-400/20',
  },
}

const TAB_IDS = ['annonces', 'groupe', 'messages', 'sankofa']

// ─── Main Component ──────────────────────────────────────────────────────

export default function VoyageTabCommunication({
  messages: announcements = [],
  dms = [],
  dmAutoReplies,
  groupMembers = [],
  groupMessages: seedGroupMessages = [],
  groupAutoReplies = [],
  sankofaMessages: seedSankofaMessages = [],
  sankofaAutoReplies = [],
  initialSubTab,
}) {
  const [activeTab, setActiveTab] = useState(initialSubTab || 'annonces')
  const [selectedConversation, setSelectedConversation] = useState(null)

  // Annonces
  const [announcementInput, setAnnouncementInput] = useState('')
  const [localAnnouncements, setLocalAnnouncements] = useState([])

  // Group chat
  const [groupMessages, setGroupMessages] = useState([])
  const [groupInput, setGroupInput] = useState('')
  const [groupReplyIdx, setGroupReplyIdx] = useState(0)

  // DM
  const [dmMessages, setDmMessages] = useState([])
  const [dmInput, setDmInput] = useState('')
  const [dmReplyIdx, setDmReplyIdx] = useState(0)

  // Sankofa
  const [sankofaMessages, setSankofaMessages] = useState([])
  const [sankofaInput, setSankofaInput] = useState('')
  const [sankofaReplyIdx, setSankofaReplyIdx] = useState(0)

  // Shared
  const [isTyping, setIsTyping] = useState(false)
  const [typingName, setTypingName] = useState('')
  const scrollRef = useRef(null)
  const typingTimer = useRef(null)

  const totalUnread = dms.reduce((sum, c) => sum + c.unreadCount, 0)
  const allAnnouncements = [...(announcements || []), ...localAnnouncements]

  // ─── Init ────────────────────────────────────────────────────────────

  useEffect(() => {
    setGroupMessages(seedGroupMessages.map((m) => ({ ...m })))
  }, [])

  useEffect(() => {
    setSankofaMessages(seedSankofaMessages.map((m) => ({ ...m })))
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      setDmMessages(
        selectedConversation.messages.map((m) => ({
          id: m.id,
          senderId: m.sender === 'creator' ? 'amina' : selectedConversation.traveler.id,
          text: m.text,
          time: m.time,
          originalSender: m.sender,
        }))
      )
      setDmReplyIdx(0)
    }
  }, [selectedConversation])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [groupMessages, dmMessages, sankofaMessages, localAnnouncements, isTyping, activeTab])

  useEffect(() => () => { if (typingTimer.current) clearTimeout(typingTimer.current) }, [])

  // ─── Helpers ─────────────────────────────────────────────────────────

  function getMember(senderId) {
    const m = groupMembers.find((mb) => mb.id === senderId)
    if (m) return m
    return { id: senderId, name: senderId, avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${senderId}` }
  }

  function handleKeyDown(handler) {
    return (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handler()
      }
    }
  }

  function simulateReply(setMessages, setReplyIdx, replies, replyIdx, senderResolver) {
    const reply = replies[replyIdx % replies.length]
    if (!reply) return
    const sender = senderResolver(reply)
    setTypingName(sender.name)
    setIsTyping(true)
    const delay = 1500 + Math.random() * 2000
    typingTimer.current = setTimeout(() => {
      setIsTyping(false)
      setTypingName('')
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          senderId: sender.id,
          text: typeof reply === 'string' ? reply : reply.text,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          ...(sender.originalSender ? { originalSender: sender.originalSender } : {}),
        },
      ])
      setReplyIdx((prev) => prev + 1)
    }, delay)
  }

  // ─── Send Handlers ───────────────────────────────────────────────────

  function handleAnnouncementSend() {
    if (!announcementInput.trim()) return
    setLocalAnnouncements((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        message: announcementInput.trim(),
        epingle: false,
      },
    ])
    setAnnouncementInput('')
  }

  function handleGroupSend() {
    if (!groupInput.trim()) return
    setGroupMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        senderId: 'amina',
        text: groupInput.trim(),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setGroupInput('')
    simulateReply(setGroupMessages, setGroupReplyIdx, groupAutoReplies, groupReplyIdx, (reply) => {
      const m = getMember(reply.senderId)
      return { id: reply.senderId, name: m.name }
    })
  }

  function handleDmSend() {
    if (!dmInput.trim() || !selectedConversation) return
    setDmMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        senderId: 'amina',
        text: dmInput.trim(),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        originalSender: 'creator',
      },
    ])
    setDmInput('')
    const replies = dmAutoReplies?.traveler || []
    if (replies.length > 0) {
      const travelerName = selectedConversation.traveler.name.split(' ')[0]
      const travelerId = selectedConversation.traveler.id
      simulateReply(setDmMessages, setDmReplyIdx, replies, dmReplyIdx, () => ({
        id: travelerId,
        name: travelerName,
        originalSender: 'traveler',
      }))
    }
  }

  function handleSankofaSend() {
    if (!sankofaInput.trim()) return
    setSankofaMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        senderId: 'amina',
        text: sankofaInput.trim(),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setSankofaInput('')
    simulateReply(setSankofaMessages, setSankofaReplyIdx, sankofaAutoReplies, sankofaReplyIdx, () => ({
      id: 'sankofa',
      name: 'Sankofa',
    }))
  }

  // ─── Avatar Stack ────────────────────────────────────────────────────

  function AvatarStack({ max = 3 }) {
    const nonCreator = groupMembers.filter((m) => !m.isCreator)
    const shown = nonCreator.slice(0, max)
    const remaining = nonCreator.length - max
    return (
      <div className="flex items-center -space-x-2">
        {shown.map((m) => (
          <img key={m.id} src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full bg-cream-warm ring-2 ring-white" />
        ))}
        {remaining > 0 && (
          <div className="w-8 h-8 rounded-full bg-accent/15 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-accent">
            +{remaining}
          </div>
        )}
      </div>
    )
  }

  // ─── Chat Input Bar ──────────────────────────────────────────────────

  function ChatInput({ value, onChange, onSend, placeholder, color }) {
    const colorMap = {
      primary: {
        focus: 'focus:border-primary-500/30',
        btn: 'bg-primary-500',
      },
      accent: {
        focus: 'focus:border-accent/30',
        btn: 'bg-accent',
      },
      secondary: {
        focus: 'focus:border-secondary-500/30',
        btn: 'bg-secondary-500',
      },
    }
    const c = colorMap[color] || colorMap.primary

    return (
      <div className="px-6 py-3 border-t border-charcoal/5 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown(onSend)}
            placeholder={placeholder}
            className={`flex-1 px-4 py-2.5 rounded-xl bg-cream text-sm text-charcoal placeholder:text-charcoal/30 border border-charcoal/5 focus:outline-none ${c.focus} transition-colors`}
          />
          <motion.button
            onClick={onSend}
            className={`p-2.5 ${c.btn} text-white rounded-xl cursor-pointer disabled:opacity-40`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!value.trim()}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    )
  }

  // ─── Render ──────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-charcoal/5 overflow-hidden flex flex-col"
      style={{ height: 'calc(100vh - 260px)', minHeight: '600px' }}
    >
      {/* ─── Header ─── */}
      <div className="px-6 py-4 border-b border-charcoal/5 flex items-center gap-3 shrink-0">
        {activeTab === 'messages' && selectedConversation && (
          <motion.button
            onClick={() => setSelectedConversation(null)}
            className="p-1.5 rounded-lg hover:bg-charcoal/5 cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={18} className="text-charcoal/50" />
          </motion.button>
        )}

        <div className="relative shrink-0">
          {activeTab === 'annonces' ? (
            <img src={creatorProfile.avatar} alt={creatorProfile.name} className="w-10 h-10 rounded-full bg-cream-warm ring-2 ring-primary-400/30" />
          ) : activeTab === 'groupe' ? (
            <AvatarStack max={3} />
          ) : activeTab === 'messages' && selectedConversation ? (
            <img src={selectedConversation.traveler.avatar} alt={selectedConversation.traveler.name} className="w-10 h-10 rounded-full bg-cream-warm ring-2 ring-secondary-500/30" />
          ) : activeTab === 'messages' ? (
            <div className="w-10 h-10 rounded-full bg-secondary-500/10 flex items-center justify-center ring-2 ring-secondary-500/20">
              <MessageCircle size={18} className="text-secondary-500" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-400/15 flex items-center justify-center ring-2 ring-primary-400/20">
              <Sparkles size={18} className="text-primary-500" />
            </div>
          )}
          {activeTab !== 'groupe' && !(activeTab === 'messages' && !selectedConversation) && (
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${activeTab === 'sankofa' ? 'bg-primary-500' : 'bg-green-500'}`} />
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-charcoal">
            {activeTab === 'annonces'
              ? 'Annonces du voyage'
              : activeTab === 'groupe'
                ? 'Groupe du voyage'
                : activeTab === 'messages' && selectedConversation
                  ? selectedConversation.traveler.name
                  : activeTab === 'messages'
                    ? 'Messages privés'
                    : 'Sankofa'}
          </p>
          <div className="flex items-center gap-1.5">
            {activeTab === 'annonces' && (
              <>
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <span className="text-xs text-charcoal/40">Diffusion au groupe</span>
              </>
            )}
            {activeTab === 'groupe' && (
              <>
                <Users size={11} className="text-charcoal/40" />
                <span className="text-xs text-charcoal/40">{groupMembers.length} membres</span>
              </>
            )}
            {activeTab === 'messages' && selectedConversation && (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-charcoal/40">En ligne</span>
              </>
            )}
            {activeTab === 'messages' && !selectedConversation && (
              <>
                <MessageCircle size={11} className="text-charcoal/40" />
                <span className="text-xs text-charcoal/40">{dms.length} conversation{dms.length > 1 ? 's' : ''}</span>
              </>
            )}
            {activeTab === 'sankofa' && (
              <>
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <span className="text-xs text-charcoal/40">Support 24/7</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── Tab bar ─── */}
      <div className="px-5 py-2.5 border-b border-charcoal/5 flex gap-2 shrink-0">
        {TAB_IDS.map((tab) => {
          const conf = tabConfig[tab]
          const Icon = conf.icon
          const isActive = activeTab === tab
          const badge = tab === 'messages' && totalUnread > 0 ? totalUnread : null

          return (
            <motion.button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setSelectedConversation(null)
                setIsTyping(false)
                if (typingTimer.current) clearTimeout(typingTimer.current)
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${isActive ? conf.activeClass : conf.inactiveClass}`}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={12} />
              {conf.label}
              {badge !== null && (
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/25 text-white' : 'bg-red-500 text-white'}`}>
                  {badge}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* ─── Body ─── */}
      <AnimatePresence mode="wait">
        {/* ── Annonces ── */}
        {activeTab === 'annonces' && (
          <motion.div
            key="annonces"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div ref={scrollRef} className="flex-1 px-6 py-4 space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {allAnnouncements.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[80%]">
                      <div className={`px-4 py-3 rounded-2xl bg-primary-500 text-white ${msg.epingle ? 'ring-2 ring-primary-300' : ''}`}>
                        {msg.epingle && <p className="text-[10px] font-bold text-white/70 mb-1 uppercase tracking-wide flex items-center gap-1">📌 Épinglé</p>}
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                        <p className="text-xs text-white/60 mt-1.5">
                          {new Date(msg.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} · {msg.heure}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {allAnnouncements.length === 0 && (
                <p className="text-center text-charcoal/40 text-sm py-8">Aucune annonce pour le moment</p>
              )}
            </div>
            <ChatInput
              value={announcementInput}
              onChange={setAnnouncementInput}
              onSend={handleAnnouncementSend}
              placeholder="Nouvelle annonce au groupe..."
              color="primary"
            />
          </motion.div>
        )}

        {/* ── Groupe ── */}
        {activeTab === 'groupe' && (
          <motion.div
            key="groupe"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div ref={scrollRef} className="flex-1 px-6 py-4 space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {groupMessages.map((msg) => {
                  const isMe = msg.senderId === 'amina'
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
                        <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full bg-cream-warm shrink-0 mt-1 mr-2" />
                      )}
                      <div className="max-w-[75%]">
                        {!isMe && <p className="text-[11px] font-semibold text-charcoal/50 mb-0.5">{member.name}</p>}
                        <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-accent text-white' : 'bg-cream-warm text-charcoal'}`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <p className={`text-xs mt-1.5 ${isMe ? 'text-white/60' : 'text-charcoal/30'}`}>{msg.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              {isTyping && activeTab === 'groupe' && <TypingIndicator name={typingName} />}
            </div>
            <ChatInput
              value={groupInput}
              onChange={setGroupInput}
              onSend={handleGroupSend}
              placeholder="Message au groupe..."
              color="accent"
            />
          </motion.div>
        )}

        {/* ── Messages — conversation list ── */}
        {activeTab === 'messages' && !selectedConversation && (
          <motion.div
            key="msg-list"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-y-auto min-h-0"
          >
            {dms.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-charcoal/40">
                <div className="w-12 h-12 rounded-full bg-charcoal/5 flex items-center justify-center mb-3">
                  <MessageCircle size={20} className="text-charcoal/30" />
                </div>
                <p className="text-sm font-medium">Aucun message reçu</p>
                <p className="text-xs mt-1">Les messages de vos voyageurs apparaîtront ici</p>
              </div>
            ) : (
              <div className="py-2">
                {dms.map((conv) => {
                  const lastMsg = conv.messages[conv.messages.length - 1]
                  return (
                    <motion.button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className="w-full px-6 py-3.5 flex items-center gap-3.5 cursor-pointer text-left hover:bg-charcoal/[0.03] transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative shrink-0">
                        <img src={conv.traveler.avatar} alt={conv.traveler.name} className="w-11 h-11 rounded-full bg-cream-warm" />
                        {conv.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">{conv.unreadCount}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-charcoal">{conv.traveler.name}</p>
                        <p className="text-xs text-charcoal/50 truncate">{lastMsg?.text}</p>
                      </div>
                      <span className="text-xs text-charcoal/30 shrink-0">{lastMsg?.time}</span>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Messages — DM chat ── */}
        {activeTab === 'messages' && selectedConversation && (
          <motion.div
            key="dm-chat"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div ref={scrollRef} className="flex-1 px-6 py-4 space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {dmMessages.map((msg) => {
                  const isMe = msg.originalSender === 'creator'
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <img src={selectedConversation.traveler.avatar} alt={selectedConversation.traveler.name} className="w-7 h-7 rounded-full bg-cream-warm shrink-0 mt-1 mr-2" />
                      )}
                      <div className="max-w-[75%]">
                        {!isMe && (
                          <p className="text-[11px] font-semibold text-secondary-500 mb-0.5">
                            {selectedConversation.traveler.name.split(' ')[0]}
                          </p>
                        )}
                        <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-secondary-500 text-white' : 'bg-cream-warm text-charcoal'}`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <p className={`text-xs mt-1.5 ${isMe ? 'text-white/60' : 'text-charcoal/30'}`}>{msg.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              {isTyping && activeTab === 'messages' && <TypingIndicator name={typingName} />}
            </div>
            <ChatInput
              value={dmInput}
              onChange={setDmInput}
              onSend={handleDmSend}
              placeholder={`Message à ${selectedConversation.traveler.name.split(' ')[0]}...`}
              color="secondary"
            />
          </motion.div>
        )}

        {/* ── Sankofa ── */}
        {activeTab === 'sankofa' && (
          <motion.div
            key="sankofa"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div ref={scrollRef} className="flex-1 px-6 py-4 space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {sankofaMessages.map((msg) => {
                  const isMe = msg.senderId === 'amina'
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <div className="w-7 h-7 rounded-full bg-primary-400/15 flex items-center justify-center shrink-0 mt-1 mr-2">
                          <Sparkles size={13} className="text-primary-500" />
                        </div>
                      )}
                      <div className="max-w-[75%]">
                        {!isMe && <p className="text-[11px] font-semibold text-primary-600 mb-0.5">Sankofa</p>}
                        <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-primary-500 text-white' : 'bg-cream-warm text-charcoal'}`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <p className={`text-xs mt-1.5 ${isMe ? 'text-white/60' : 'text-charcoal/30'}`}>{msg.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              {isTyping && activeTab === 'sankofa' && <TypingIndicator name={typingName} />}
            </div>
            <ChatInput
              value={sankofaInput}
              onChange={setSankofaInput}
              onSend={handleSankofaSend}
              placeholder="Message à Sankofa..."
              color="primary"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
