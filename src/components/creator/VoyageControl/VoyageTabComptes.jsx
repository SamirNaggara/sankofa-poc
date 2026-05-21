import { motion } from 'framer-motion'
import { Wallet, Clock, CheckCircle2, Calendar, TrendingUp, CreditCard, Users } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const statusConfig = {
  'payé': { label: 'Payé', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  '3x': { label: 'Paiement 3x', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'en attente': { label: 'En attente', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
}

export default function VoyageTabComptes({ comptes, participants = [] }) {
  if (!comptes) return null

  const prochainVersement = new Date(comptes.prochainVersement).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const objectif = comptes.revenuBrut + (comptes.paiementsEnAttente * (participants[0]?.montant || 1350))
  const progressPct = Math.min(100, Math.round((comptes.commissionCreateur / (objectif * 0.2)) * 100))

  const payes = participants.filter(p => p.paiement === 'payé').length
  const enAttente = participants.filter(p => p.paiement === 'en attente').length
  const en3x = participants.filter(p => p.paiement === '3x').length

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* 3 Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Revenu total */}
        <div className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary-400/15 flex items-center justify-center">
              <TrendingUp size={17} className="text-primary-500" />
            </div>
            <span className="text-xs text-charcoal/50">Revenu total</span>
          </div>
          <p className="text-2xl font-bold text-charcoal">
            {comptes.revenuBrut.toLocaleString('fr-FR')}€
          </p>
          <p className="text-xs text-charcoal/40 mt-1">
            {comptes.paiementsRecus + comptes.paiementsEnAttente} participants
          </p>
        </div>

        {/* Commission créateur */}
        <div className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <Wallet size={17} className="text-emerald-600" />
            </div>
            <span className="text-xs text-charcoal/50">Commission créateur (20%)</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {comptes.commissionCreateur.toLocaleString('fr-FR')}€
          </p>
          <div className="mt-2">
            <div className="h-2 bg-charcoal/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <p className="text-[11px] text-charcoal/40 mt-1">{progressPct}% de l'objectif</p>
          </div>
        </div>

        {/* Solde en attente */}
        <div className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Clock size={17} className="text-amber-600" />
            </div>
            <span className="text-xs text-charcoal/50">Solde en attente</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {(comptes.paiementsEnAttente * (participants[0]?.montant || 1350)).toLocaleString('fr-FR')}€
          </p>
          <p className="text-xs text-charcoal/40 mt-1">
            {comptes.paiementsEnAttente} paiement{comptes.paiementsEnAttente > 1 ? 's' : ''} en attente
          </p>
        </div>
      </motion.div>

      {/* Paiements summary + next versement */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <CreditCard size={15} className="text-charcoal/40" />
          Paiements
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span className="text-sm text-charcoal/70"><strong className="text-charcoal">{payes}</strong> reçus</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            <span className="text-sm text-charcoal/70"><strong className="text-charcoal">{enAttente}</strong> en attente</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-blue-500" />
            <span className="text-sm text-charcoal/70"><strong className="text-charcoal">{en3x}</strong> en 3x</span>
          </div>
        </div>

        <div className="pt-4 border-t border-charcoal/5">
          <div className="flex items-center gap-2 px-4 py-3 bg-primary-400/10 rounded-xl">
            <Calendar size={14} className="text-primary-500" />
            <span className="text-sm text-charcoal/70">
              Prochain versement : <span className="font-semibold text-charcoal">{prochainVersement}</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Participant list */}
      {participants.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
        >
          <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Users size={15} className="text-charcoal/40" />
            Détail par participant ({participants.length})
          </h3>
          <div className="space-y-3">
            {participants.map((p) => {
              const status = statusConfig[p.paiement] || statusConfig['en attente']
              const dateInscription = new Date(p.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
              })
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream/60 transition-colors"
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-9 h-9 rounded-full bg-cream shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">{p.name}</p>
                    <p className="text-xs text-charcoal/40">Inscrit le {dateInscription}</p>
                  </div>
                  <div className="text-right shrink-0 flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${status.bg} ${status.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                    <span className="text-sm font-semibold text-charcoal w-16 text-right">
                      {p.montant.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
