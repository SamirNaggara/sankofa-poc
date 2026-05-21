import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Ticket, Luggage, Phone, FileText, Calendar,
  Pencil, Plane, Clock, Users, Euro, BedDouble, Check, X,
  Shield, Globe,
} from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

/* Inline editable field with pencil icon */
function EditableField({ label, value, icon: Icon, iconColor = 'text-charcoal/40' }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="flex items-start gap-3 group py-2.5 px-3 -mx-3 rounded-xl transition-colors duration-200 hover:bg-charcoal/[0.025] cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {Icon && (
        <div className="mt-0.5 shrink-0">
          <Icon size={14} className={iconColor} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-charcoal/40 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm text-charcoal font-medium leading-snug">{value}</p>
      </div>
      <motion.div
        className="mt-1 shrink-0"
        animate={{ opacity: hover ? 1 : 0.15 }}
        transition={{ duration: 0.15 }}
      >
        <Pencil size={13} className="text-charcoal/40" />
      </motion.div>
    </div>
  )
}

/* Section card wrapper */
function Section({ children, title, icon: Icon, iconBg, iconColor, delay = 0 }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={15} className={iconColor} />
        </div>
        <h3 className="text-sm font-semibold text-charcoal">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}

/* Compact programme timeline */
function ProgrammeDay({ jour, titre, detail }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="flex items-start gap-3 py-2 px-3 -mx-3 rounded-xl transition-colors duration-200 hover:bg-charcoal/[0.025] cursor-pointer group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-7 h-7 rounded-lg bg-primary-400/15 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-primary-500">J{jour}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-charcoal">{titre}</p>
        <p className="text-xs text-charcoal/50 mt-0.5 leading-relaxed line-clamp-1">{detail}</p>
      </div>
      <motion.div
        className="mt-1 shrink-0"
        animate={{ opacity: hover ? 1 : 0.15 }}
        transition={{ duration: 0.15 }}
      >
        <Pencil size={12} className="text-charcoal/40" />
      </motion.div>
    </div>
  )
}

/* Bagage item with checkbox feel */
function BagageItem({ item }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-2.5 -mx-2.5 rounded-lg transition-colors duration-200 hover:bg-charcoal/[0.025] cursor-pointer group">
      <div className="w-4 h-4 rounded border border-accent/30 bg-accent/10 flex items-center justify-center shrink-0">
        <Check size={10} className="text-accent" />
      </div>
      <span className="text-sm text-charcoal/70 flex-1">{item}</span>
      <Pencil size={11} className="text-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

/* Document item */
function DocItem({ doc }) {
  return (
    <div className="flex items-center gap-2.5 py-1.5 px-2.5 -mx-2.5 rounded-lg transition-colors duration-200 hover:bg-charcoal/[0.025] cursor-pointer group">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
      <span className="text-sm text-charcoal/70 flex-1">{doc}</span>
      <Pencil size={11} className="text-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

export default function VoyageTabInfosPratiques({ infos, trip }) {
  if (!infos) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      {/* Top summary strip */}
      {trip && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-charcoal">Fiche voyage</h3>
            <span className="text-[10px] font-medium text-charcoal/30 uppercase tracking-wider">Vue d'ensemble</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Calendar, label: 'Départ', value: trip.departureDate || infos.rendezVous.date, color: 'text-rose-500' },
              { icon: Clock, label: 'Durée', value: trip.duration, color: 'text-blue-500' },
              { icon: Euro, label: 'Prix / pers.', value: trip.estimatedPrice, color: 'text-emerald-500' },
              { icon: Users, label: 'Groupe', value: trip.groupSize || '10-15 pers.', color: 'text-purple-500' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-cream/60 rounded-xl p-3 flex items-center gap-3 cursor-pointer group hover:bg-cream transition-colors"
              >
                <item.icon size={16} className={item.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-charcoal/40 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-semibold text-charcoal truncate">{item.value}</p>
                </div>
                <Pencil size={11} className="text-charcoal/15 group-hover:text-charcoal/40 transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Point de rendez-vous */}
        <Section title="Point de rendez-vous" icon={MapPin} iconBg="bg-rose-500/15" iconColor="text-rose-600">
          <div className="space-y-0.5">
            <EditableField icon={Calendar} label="Date" value={`${infos.rendezVous.date} à ${infos.rendezVous.heure}`} iconColor="text-rose-400" />
            <EditableField icon={MapPin} label="Lieu" value={infos.rendezVous.lieu} iconColor="text-rose-400" />
            {infos.rendezVous.details && (
              <p className="text-xs text-charcoal/50 italic mt-2 ml-7 leading-relaxed">{infos.rendezVous.details}</p>
            )}
          </div>
        </Section>

        {/* Transport */}
        <Section title="Transport" icon={Plane} iconBg="bg-blue-500/15" iconColor="text-blue-600">
          <div className="space-y-0.5">
            <EditableField icon={Ticket} label="Type" value={infos.billets.type} iconColor="text-blue-400" />
            <EditableField icon={Plane} label="Compagnie" value={infos.billets.compagnie} iconColor="text-blue-400" />
            <p className="text-xs text-charcoal/50 mt-2 ml-7 leading-relaxed">{infos.billets.info}</p>
          </div>
        </Section>

        {/* Contact sur place */}
        <Section title="Contact sur place" icon={Phone} iconBg="bg-emerald-500/15" iconColor="text-emerald-600">
          <div className="space-y-0.5">
            <EditableField icon={Users} label="Responsable" value={`${infos.contactSurPlace.nom} — ${infos.contactSurPlace.role}`} iconColor="text-emerald-400" />
            <EditableField icon={Phone} label="Téléphone" value={infos.contactSurPlace.telephone} iconColor="text-emerald-400" />
            <EditableField icon={Clock} label="Disponibilité" value={infos.contactSurPlace.disponibilite} iconColor="text-emerald-400" />
          </div>
        </Section>

        {/* Urgences */}
        {infos.urgence && (
          <Section title="Numéros d'urgence" icon={Shield} iconBg="bg-red-500/10" iconColor="text-red-500">
            <div className="space-y-0.5">
              <EditableField icon={Phone} label={infos.urgence.labelNumeroLocal} value={infos.urgence.numeroLocal} iconColor="text-red-400" />
              <EditableField icon={Shield} label={infos.urgence.labelPolice} value={infos.urgence.police} iconColor="text-red-400" />
              <EditableField icon={Globe} label="Ambassade" value={`${infos.urgence.ambassade.nom} · ${infos.urgence.ambassade.telephone}`} iconColor="text-red-400" />
              <EditableField icon={Phone} label="Hotline Sankofa" value={infos.urgence.sankofaHotline} iconColor="text-primary-400" />
            </div>
          </Section>
        )}
      </div>

      {/* Programme */}
      <Section title="Programme jour par jour" icon={Calendar} iconBg="bg-purple-500/15" iconColor="text-purple-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
          {infos.programme.map((jour) => (
            <ProgrammeDay key={jour.jour} {...jour} />
          ))}
        </div>
      </Section>

      {/* Bottom row: bagages + documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bagages */}
        <Section title="Bagages recommandés" icon={Luggage} iconBg="bg-accent/15" iconColor="text-accent">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            {infos.bagages.map((item, i) => (
              <BagageItem key={i} item={item} />
            ))}
          </div>
        </Section>

        {/* Documents */}
        <Section title="Documents nécessaires" icon={FileText} iconBg="bg-amber-500/15" iconColor="text-amber-600">
          <div className="space-y-1">
            {infos.documentsNecessaires.map((doc, i) => (
              <DocItem key={i} doc={doc} />
            ))}
          </div>
        </Section>
      </div>
    </motion.div>
  )
}
