import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, ChevronDown, Check, Clock } from 'lucide-react'

const PaymentProgress = forwardRef(function PaymentProgress({ payments }, ref) {
  const [isOpen, setIsOpen] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)

  const percentage = Math.round((payments.totalPaid / payments.totalPrice) * 100)

  return (
    <div ref={ref} className="px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl shadow-lg border border-charcoal/5 overflow-hidden"
      >
        {/* Clickable header — always visible */}
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full p-6 flex items-center gap-3 cursor-pointer text-left"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-xl bg-primary-400/10 flex items-center justify-center shrink-0">
            <CreditCard size={20} className="text-primary-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold text-charcoal">Mes Paiements</h2>
            <p className="text-xs text-charcoal/40">
              {payments.totalPaid}€ / {payments.totalPrice}€ — {percentage}% payé
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} className="text-charcoal/30" />
          </motion.div>
        </motion.button>

        {/* Collapsible body */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-5">
                {/* Progress display */}
                <div className="flex items-end justify-between">
                  <div>
                    <motion.span
                      className="text-3xl font-bold text-charcoal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {percentage}%
                    </motion.span>
                    <span className="text-sm text-charcoal/40 ml-2">du voyage payé</span>
                  </div>
                  <p className="text-sm text-charcoal/60">
                    <span className="font-semibold text-charcoal">{payments.totalPaid}€</span>
                    {' / '}
                    {payments.totalPrice}€
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 rounded-full bg-charcoal/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>

                {/* Toggle schedule */}
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setShowSchedule((v) => !v) }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-cream hover:bg-cream-warm transition-colors cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium text-charcoal">Voir l'échéancier</span>
                  <motion.div
                    animate={{ rotate: showSchedule ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} className="text-charcoal/40" />
                  </motion.div>
                </motion.button>

                {/* Schedule list */}
                <AnimatePresence>
                  {showSchedule && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3">
                        {payments.echeances.map((ech, i) => {
                          const isPaid = ech.status === 'payé'
                          return (
                            <motion.div
                              key={ech.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className={`flex items-center justify-between p-4 rounded-xl border ${
                                isPaid
                                  ? 'bg-emerald-50/50 border-emerald-200/50'
                                  : 'bg-amber-50/50 border-amber-200/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                  isPaid ? 'bg-emerald-500' : 'bg-amber-400'
                                }`}>
                                  {isPaid
                                    ? <Check size={14} className="text-white" strokeWidth={3} />
                                    : <Clock size={14} className="text-white" />
                                  }
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-charcoal">{ech.label}</p>
                                  <p className="text-xs text-charcoal/40">{ech.date}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-charcoal">{ech.montant}€</p>
                                <p className={`text-xs font-medium ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                                  {isPaid ? 'Payé' : 'En attente'}
                                </p>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
})

export default PaymentProgress
