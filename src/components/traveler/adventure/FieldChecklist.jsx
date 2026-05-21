import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClipboardCheck, Check } from 'lucide-react'

export default function FieldChecklist({ items: initialItems }) {
  const [items, setItems] = useState(initialItems || [])

  const done = items.filter((i) => i.checked).length
  const total = items.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  function toggle(id) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    )
  }

  if (!initialItems || initialItems.length === 0) return null

  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden"
      >
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-400/10 flex items-center justify-center">
                <ClipboardCheck size={17} className="text-primary-600" />
              </div>
              <h3 className="text-base font-bold text-charcoal">Checklist du jour</h3>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              pct === 100
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-primary-400/10 text-primary-600'
            }`}>
              {done}/{total}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-charcoal/5 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-500"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          {/* Items */}
          <div className="space-y-2">
            {items.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => toggle(item.id)}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/3 transition-colors cursor-pointer text-left"
              >
                <motion.div
                  animate={item.checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                    item.checked
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-charcoal/15 bg-white'
                  }`}
                >
                  {item.checked && <Check size={14} className="text-white" strokeWidth={3} />}
                </motion.div>
                <span className={`text-sm transition-colors ${
                  item.checked ? 'text-charcoal/40 line-through' : 'text-charcoal font-medium'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
