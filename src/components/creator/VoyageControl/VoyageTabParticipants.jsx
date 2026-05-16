import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, Mail, X, Phone, MapPin, Shield, ShieldOff, Camera } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const paiementConfig = {
  'payé': { label: 'Payé', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
  '3x': { label: 'Payé en 3x', bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle2 },
  'en attente': { label: 'En attente', bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
}

const sourceConfig = {
  'Camera': { color: 'text-pink-600', dot: 'bg-pink-500' },
  'TikTok': { color: 'text-charcoal', dot: 'bg-charcoal' },
  'Campagne été 2026': { color: 'text-violet-600', dot: 'bg-violet-500' },
  'Lien bio': { color: 'text-teal-600', dot: 'bg-teal-500' },
  'Bouche à oreille': { color: 'text-amber-600', dot: 'bg-amber-500' },
}

function ParticipantModal({ participant, onClose }) {
  if (!participant) return null

  const config = paiementConfig[participant.paiement] || paiementConfig['en attente']
  const dateObj = new Date(participant.date)
  const dateFormatted = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-charcoal/5 transition-colors"
        >
          <X size={18} className="text-charcoal/50" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 flex items-center gap-4">
          <img
            src={participant.avatar}
            alt={participant.name}
            className="w-16 h-16 rounded-full bg-cream"
          />
          <div>
            <h3 className="font-heading text-lg font-bold text-charcoal">
              {participant.name}, {participant.age} ans
            </h3>
            <p className="text-sm text-charcoal/50 flex items-center gap-1.5">
              <MapPin size={13} />
              {participant.ville}
              <span className="mx-1">·</span>
              <Camera size={13} />
              {participant.instagram}
            </p>
            <p className="text-xs text-charcoal/40 flex items-center gap-1 mt-1">
              <Phone size={11} />
              {participant.telephone}
            </p>
          </div>
        </div>

        {/* Section Infos voyage */}
        <div className="px-6 pb-4">
          <div className="border-t border-charcoal/8 pt-4">
            <h4 className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-3">Infos voyage</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Allergies</span>
                <span className="font-medium text-charcoal">{participant.allergies}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Régime alimentaire</span>
                <span className="font-medium text-charcoal">{participant.regime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Passeport</span>
                <span className={`font-medium flex items-center gap-1 ${participant.passeport ? 'text-emerald-600' : 'text-red-500'}`}>
                  {participant.passeport ? <Shield size={13} /> : <ShieldOff size={13} />}
                  {participant.passeport ? 'Valide' : 'Non valide'}
                </span>
              </div>
              {participant.noteCreateur && (
                <div className="pt-1">
                  <span className="text-charcoal/60 text-xs">Note du créateur</span>
                  <p className="mt-1 text-sm text-charcoal bg-cream/60 rounded-lg p-3 italic">
                    "{participant.noteCreateur}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Paiement */}
        <div className="px-6 pb-6">
          <div className="border-t border-charcoal/8 pt-4">
            <h4 className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-3">Paiement</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Statut</span>
                <span className={`px-2.5 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-semibold`}>
                  {config.label}
                  {participant.paiement === '3x' && ' (2/3 reçus)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Montant</span>
                <span className="font-semibold text-charcoal">{participant.montant.toLocaleString('fr-FR')}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Inscrit le</span>
                <span className="font-medium text-charcoal">{dateFormatted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal/60">Source</span>
                <span className={`font-medium flex items-center gap-1.5 ${sourceConfig[participant.source]?.color || 'text-charcoal'}`}>
                  <span className={`w-2 h-2 rounded-full ${sourceConfig[participant.source]?.dot || 'bg-charcoal'}`} />
                  {participant.source}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ParticipantRow({ participant, onClick }) {
  const config = paiementConfig[participant.paiement] || paiementConfig['en attente']
  const StatusIcon = config.icon
  const srcConfig = sourceConfig[participant.source] || { color: 'text-charcoal/60', dot: 'bg-charcoal/40' }

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl border border-charcoal/5 px-5 py-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.998 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <img
          src={participant.avatar}
          alt={participant.name}
          className="w-10 h-10 rounded-full bg-cream"
        />
        <div>
          <p className="text-sm font-semibold text-charcoal">{participant.name}</p>
          <p className="text-xs text-charcoal/40 flex items-center gap-1">
            <Mail size={11} />
            {participant.email}
          </p>
          {participant.source && (
            <p className={`text-xs mt-0.5 flex items-center gap-1 ${srcConfig.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${srcConfig.dot}`} />
              {participant.source}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-charcoal hidden sm:inline">
          {participant.montant.toLocaleString('fr-FR')}€
        </span>
        <span className={`px-3 py-1 rounded-full ${config.bg} ${config.text} text-xs font-semibold flex items-center gap-1.5`}>
          <StatusIcon size={12} />
          {config.label}
        </span>
      </div>
    </motion.div>
  )
}

export default function VoyageTabParticipants({ participants }) {
  const [selected, setSelected] = useState(null)

  const payes = participants.filter((p) => p.paiement === 'payé').length
  const en3x = participants.filter((p) => p.paiement === '3x').length
  const enAttente = participants.filter((p) => p.paiement === 'en attente').length

  // Source breakdown
  const sourceCounts = participants.reduce((acc, p) => {
    if (p.source) acc[p.source] = (acc[p.source] || 0) + 1
    return acc
  }, {})
  const sourceEntries = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5 mb-6"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-semibold text-charcoal">{participants.length} inscrits</span>
          <span className="text-charcoal/30">—</span>
          <span className="text-emerald-600 font-medium">{payes} payés</span>
          {en3x > 0 && (
            <>
              <span className="text-charcoal/30">·</span>
              <span className="text-blue-600 font-medium">{en3x} en 3x</span>
            </>
          )}
          {enAttente > 0 && (
            <>
              <span className="text-charcoal/30">·</span>
              <span className="text-amber-600 font-medium">{enAttente} en attente</span>
            </>
          )}
        </div>
        {sourceEntries.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal/50 mt-2">
            {sourceEntries.map(([source, count]) => (
              <span key={source} className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${sourceConfig[source]?.dot || 'bg-charcoal/40'}`} />
                {count} via {source}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* List */}
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {participants.map((p) => (
          <ParticipantRow key={p.id} participant={p} onClick={() => setSelected(p)} />
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ParticipantModal participant={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
