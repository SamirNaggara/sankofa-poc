import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function PaymentComplete({ totalPaid }) {
  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-emerald-800">
            Tout est en ordre. Votre séjour est 100% réglé.
          </p>
        </div>
        <span className="text-sm font-bold text-emerald-700 shrink-0">
          {totalPaid.toLocaleString('fr-FR')}€
        </span>
      </motion.div>
    </div>
  )
}
