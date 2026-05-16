import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

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

export default function VoyageTabChat({ chatData, autoReplies }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [replyIndex, setReplyIndex] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!chatData) return
    const timers = chatData.messages.map((msg, i) =>
      setTimeout(() => {
        setMessages((prev) => [...prev, msg])
      }, i * 400)
    )
    return () => timers.forEach(clearTimeout)
  }, [chatData])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  if (!chatData) return null

  function handleSend() {
    if (!input.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const replies = autoReplies || []
      const reply = {
        id: Date.now() + 1,
        sender: 'organizer',
        text: replies[replyIndex % replies.length] || "Bien reçu ! Je m'en occupe.",
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        read: true,
      }
      setMessages((prev) => [...prev, reply])
      setReplyIndex((prev) => prev + 1)
    }, 2000)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-charcoal/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <span className="text-lg">🧑‍💼</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-charcoal">{chatData.organizer} — Organisateur terrain</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-charcoal/40">En ligne</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="px-5 py-4 space-y-4 max-h-[420px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.sender === 'user'
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className="relative">
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      isUser
                        ? 'bg-primary-500 text-white'
                        : 'bg-cream-warm text-charcoal'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1.5 ${isUser ? 'text-white/60' : 'text-charcoal/30'}`}>
                      {msg.time}
                    </p>
                  </div>
                  {!isUser && !msg.read && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-cream-warm rounded-2xl">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-5 py-3 border-t border-charcoal/5 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écrivez votre message..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-cream text-sm text-charcoal placeholder:text-charcoal/30 border border-charcoal/5 focus:outline-none focus:border-primary-500/30 transition-colors"
        />
        <motion.button
          onClick={handleSend}
          className="p-2.5 bg-primary-500 text-white rounded-xl cursor-pointer disabled:opacity-40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!input.trim()}
        >
          <Send size={18} />
        </motion.button>
      </div>
    </motion.div>
  )
}
