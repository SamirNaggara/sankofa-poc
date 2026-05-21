import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckSquare, CreditCard, MessageCircle, Check, X, Plus } from 'lucide-react'

const glowKeyframes = {
  boxShadow: [
    '0 0 15px rgba(217,119,6,0.3)',
    '0 0 30px rgba(217,119,6,0.5)',
    '0 0 15px rgba(217,119,6,0.3)',
  ],
}

const defaultButtons = [
  {
    id: 'checklist',
    label: 'Avant le départ',
    icon: CheckSquare,
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    id: 'paiements',
    label: 'Mes Paiements',
    icon: CreditCard,
    gradient: 'from-accent to-emerald-600',
  },
  {
    id: 'contacter',
    label: 'Contacter Amina',
    icon: MessageCircle,
    gradient: 'from-secondary-400 to-secondary-500',
  },
]

export default function ActionCenter({ checklist: initialChecklist, onScrollToPayments, navigate, voyageId, onContactCreator, buttons: buttonsProp, onAction: onActionProp }) {
  const [showChecklist, setShowChecklist] = useState(false)
  const [items, setItems] = useState(initialChecklist || [])
  const [newItemText, setNewItemText] = useState('')
  const [showAddInput, setShowAddInput] = useState(false)

  const activeButtons = buttonsProp || defaultButtons
  const hasChecklist = activeButtons.some((b) => b.id === 'checklist')

  function handleAction(id) {
    if (onActionProp) {
      onActionProp(id)
      return
    }
    if (id === 'checklist') setShowChecklist((v) => !v)
    else if (id === 'paiements') onScrollToPayments()
    else if (id === 'contacter') onContactCreator()
  }

  function toggleItem(itemId) {
    setItems((prev) => prev.map((it) => it.id === itemId ? { ...it, checked: !it.checked } : it))
  }

  function addItem() {
    const text = newItemText.trim()
    if (!text) return
    setItems((prev) => [...prev, { id: `custom-${Date.now()}`, label: text, checked: false }])
    setNewItemText('')
    setShowAddInput(false)
  }

  const done = items.filter((i) => i.checked).length

  return (
    <div className="px-6 max-w-3xl mx-auto -mt-8 relative z-20">
      {/* Buttons row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {activeButtons.map((btn, i) => {
          const Icon = btn.icon
          return (
            <motion.button
              key={btn.id}
              onClick={() => handleAction(btn.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, ...glowKeyframes }}
              transition={{
                opacity: { delay: 0.2 + i * 0.1 },
                y: { delay: 0.2 + i * 0.1 },
                boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`bg-gradient-to-br ${btn.gradient} text-white rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-2 cursor-pointer shadow-lg`}
            >
              <Icon size={22} />
              <span className="text-xs sm:text-sm font-semibold">{btn.label}</span>
              {btn.id === 'checklist' && hasChecklist && items.length > 0 && (
                <span className="text-[10px] text-white/70">{done}/{items.length}</span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Inline checklist panel */}
      <AnimatePresence>
        {hasChecklist && showChecklist && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-white rounded-2xl shadow-lg border border-charcoal/5 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-charcoal">Avant le départ</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-charcoal/50">{done}/{items.length} prêts</span>
                  <motion.button
                    onClick={() => setShowChecklist(false)}
                    className="p-1 rounded-lg hover:bg-charcoal/5 cursor-pointer"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} className="text-charcoal/40" />
                  </motion.button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-charcoal/5 mb-5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(done / items.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>

              <div className="space-y-2">
                {items.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors cursor-pointer text-left"
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                        item.checked
                          ? 'bg-accent border-accent'
                          : 'border-charcoal/20'
                      }`}
                      animate={item.checked ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {item.checked && <Check size={12} className="text-white" strokeWidth={3} />}
                    </motion.div>
                    <span className={`text-sm ${item.checked ? 'text-charcoal/40 line-through' : 'text-charcoal'}`}>
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Add custom item */}
              <AnimatePresence>
                {showAddInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <form
                      onSubmit={(e) => { e.preventDefault(); addItem() }}
                      className="flex items-center gap-2 mt-3 px-1"
                    >
                      <input
                        autoFocus
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="Ex : Acheter un adaptateur…"
                        className="flex-1 text-sm px-3 py-2 rounded-xl border border-charcoal/10 bg-cream/50 focus:outline-none focus:border-primary-400 transition-colors"
                      />
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-xl bg-primary-500 text-white cursor-pointer"
                      >
                        <Check size={16} />
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => { setShowAddInput(false); setNewItemText('') }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-xl hover:bg-charcoal/5 cursor-pointer"
                      >
                        <X size={16} className="text-charcoal/40" />
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showAddInput && (
                <motion.button
                  onClick={() => setShowAddInput(true)}
                  className="mt-3 flex items-center gap-2 text-sm text-charcoal/40 hover:text-charcoal/60 transition-colors cursor-pointer px-3 py-2"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Plus size={16} />
                  <span>Ajouter un élément</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
