import { motion } from 'framer-motion'
import { Wallet, Clock, CheckCircle2, Calendar } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function VoyageTabComptes({ comptes }) {
  if (!comptes) return null

  const ventilation = [
    { label: 'Revenu brut', montant: comptes.revenuBrut, color: 'bg-charcoal' },
    { label: 'Commission Sankofa (10%)', montant: -comptes.commissionSankofa, color: 'bg-amber-500' },
    { label: 'Frais organisation', montant: -comptes.fraisOrga, color: 'bg-red-400' },
    { label: 'Net créateur', montant: comptes.netCreateur, color: 'bg-emerald-500' },
  ]

  const prochainVersement = new Date(comptes.prochainVersement).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Net créateur en gros */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-8 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Wallet size={20} className="text-emerald-600" />
          </div>
        </div>
        <p className="text-sm text-charcoal/50 mb-1">Net créateur</p>
        <p className="text-4xl font-bold text-emerald-600">
          {comptes.netCreateur.toLocaleString('fr-FR')}€
        </p>
        <p className="text-xs text-charcoal/40 mt-2">
          Sur un revenu brut de {comptes.revenuBrut.toLocaleString('fr-FR')}€
        </p>
      </motion.div>

      {/* Ventilation */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4">Ventilation</h3>
        <div className="space-y-3">
          {ventilation.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-charcoal/70 flex-1">{item.label}</span>
              <span className={`text-sm font-semibold ${item.montant >= 0 ? 'text-charcoal' : 'text-red-500'}`}>
                {item.montant >= 0 ? '' : '−'}{Math.abs(item.montant).toLocaleString('fr-FR')}€
              </span>
            </div>
          ))}
        </div>

        {/* Visual bar */}
        <div className="mt-5 h-4 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full"
            style={{ width: `${(comptes.netCreateur / comptes.revenuBrut) * 100}%` }}
          />
          <div
            className="bg-amber-500 h-full"
            style={{ width: `${(comptes.commissionSankofa / comptes.revenuBrut) * 100}%` }}
          />
          <div
            className="bg-red-400 h-full"
            style={{ width: `${(comptes.fraisOrga / comptes.revenuBrut) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-charcoal/40">
          <span>Net ({Math.round((comptes.netCreateur / comptes.revenuBrut) * 100)}%)</span>
          <span>Commission ({Math.round((comptes.commissionSankofa / comptes.revenuBrut) * 100)}%)</span>
          <span>Frais ({Math.round((comptes.fraisOrga / comptes.revenuBrut) * 100)}%)</span>
        </div>
      </motion.div>

      {/* Paiements */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4">Paiements</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span className="text-sm text-charcoal/70">{comptes.paiementsRecus} reçus</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            <span className="text-sm text-charcoal/70">{comptes.paiementsEnAttente} en attente</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-charcoal/5">
          <div className="flex items-center gap-2 px-4 py-3 bg-primary-400/10 rounded-xl">
            <Calendar size={14} className="text-primary-500" />
            <span className="text-sm text-charcoal/70">
              Prochain versement : <span className="font-semibold text-charcoal">{prochainVersement}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
