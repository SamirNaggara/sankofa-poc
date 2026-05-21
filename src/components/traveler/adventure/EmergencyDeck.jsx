import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronDown } from 'lucide-react'

export default function EmergencyDeck({ security }) {
  const [expanded, setExpanded] = useState(false)

  if (!security) return null

  const fields = [
    { label: 'Allergies', value: security.allergies },
    { label: 'Régime alimentaire', value: security.regime },
    { label: 'Groupe sanguin', value: security.groupeSanguin },
    { label: 'Passeport', value: security.passeport },
  ]

  return (
    <div className="px-6 max-w-3xl mx-auto">
      {/* Collapsed pill */}
      <motion.button
        onClick={() => setExpanded((p) => !p)}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white border border-charcoal/5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <Shield size={17} className="text-accent" />
          </div>
          <span className="text-sm font-semibold text-charcoal">Urgence & Sécurité</span>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-charcoal/30" />
        </motion.div>
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-accent to-emerald-500" />
              <div className="p-5">
                <p className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-4">
                  Infos personnelles
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {fields.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-charcoal/40 mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-charcoal">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Contact d'urgence */}
                {security.urgence && (
                  <div className="mt-5 pt-4 border-t border-charcoal/5">
                    <p className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Contact d'urgence
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-charcoal/40 mb-0.5">Nom</p>
                        <p className="text-sm font-medium text-charcoal">{security.urgence.nom}</p>
                      </div>
                      <div>
                        <p className="text-xs text-charcoal/40 mb-0.5">Lien</p>
                        <p className="text-sm font-medium text-charcoal">{security.urgence.lien}</p>
                      </div>
                      <div>
                        <p className="text-xs text-charcoal/40 mb-0.5">Téléphone</p>
                        <p className="text-sm font-medium text-charcoal">{security.urgence.telephone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
