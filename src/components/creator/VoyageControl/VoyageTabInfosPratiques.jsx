import { motion } from 'framer-motion'
import { MapPin, Ticket, Luggage, Phone, FileText, Pin, Send, Calendar, Clock } from 'lucide-react'
import { useState } from 'react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function MessageCard({ msg, epingle }) {
  const date = new Date(msg.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  })

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-2xl p-5 ${
        epingle
          ? 'bg-primary-400/10 border-2 border-primary-400/40'
          : 'bg-white border border-charcoal/5'
      }`}
    >
      <div className="flex items-start gap-3">
        {epingle && (
          <div className="mt-0.5">
            <Pin size={14} className="text-primary-500 fill-primary-500" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm text-charcoal leading-relaxed">{msg.message}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs text-charcoal/40 flex items-center gap-1">
              <Calendar size={11} /> {date}
            </span>
            <span className="text-xs text-charcoal/40 flex items-center gap-1">
              <Clock size={11} /> {msg.heure}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function VoyageTabInfosPratiques({ infos, messages }) {
  const [newMessage, setNewMessage] = useState('')

  if (!infos) return null

  const pinnedMessages = messages?.filter((m) => m.epingle) || []
  const otherMessages = messages?.filter((m) => !m.epingle) || []

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Bloc 1 : Messages du créateur */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-400/15 flex items-center justify-center">
            <Send size={15} className="text-primary-500" />
          </div>
          Messages aux voyageurs
        </h3>

        <div className="space-y-3 mb-4">
          {pinnedMessages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} epingle />
          ))}
          {otherMessages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} epingle={false} />
          ))}
        </div>

        {/* Champ nouveau message (visuel POC) */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-charcoal/5">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrire un message au groupe..."
            className="flex-1 text-sm px-4 py-2.5 rounded-xl bg-cream border border-charcoal/10 outline-none focus:border-primary-400 transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-primary-400 flex items-center justify-center cursor-pointer"
          >
            <Send size={15} className="text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Bloc 2 : Point de rendez-vous */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500/15 flex items-center justify-center">
            <MapPin size={15} className="text-rose-600" />
          </div>
          Point de rendez-vous
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-12">Date</span>
            <span className="text-sm text-charcoal font-medium">{infos.rendezVous.date}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-12">Heure</span>
            <span className="text-sm text-charcoal font-medium">{infos.rendezVous.heure}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-12">Lieu</span>
            <span className="text-sm text-charcoal font-medium">{infos.rendezVous.lieu}</span>
          </div>
          {infos.rendezVous.details && (
            <p className="text-xs text-charcoal/60 mt-2 pl-16 leading-relaxed italic">
              {infos.rendezVous.details}
            </p>
          )}
        </div>
      </motion.div>

      {/* Billets de transport */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center">
            <Ticket size={15} className="text-blue-600" />
          </div>
          Billets de transport
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-20">Type</span>
            <span className="text-sm text-charcoal font-medium">{infos.billets.type}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-20">Compagnie</span>
            <span className="text-sm text-charcoal font-medium">{infos.billets.compagnie}</span>
          </div>
          <p className="text-xs text-charcoal/60 mt-2 leading-relaxed">{infos.billets.info}</p>
        </div>
      </motion.div>

      {/* Programme jour par jour */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center">
            <Calendar size={15} className="text-purple-600" />
          </div>
          Programme jour par jour
        </h3>
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-[9px] top-1 bottom-1 w-px bg-charcoal/10" />

          <div className="space-y-4">
            {infos.programme.map((jour) => (
              <div key={jour.jour} className="relative flex gap-4">
                {/* Pastille */}
                <div className="absolute -left-6 w-[19px] h-[19px] rounded-full bg-primary-400 flex items-center justify-center z-10">
                  <span className="text-[9px] font-bold text-white">{jour.jour}</span>
                </div>
                <div className="flex-1 ml-2">
                  <p className="text-sm font-semibold text-charcoal">{jour.titre}</p>
                  <p className="text-xs text-charcoal/60 mt-0.5 leading-relaxed">{jour.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Dans vos bagages */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
            <Luggage size={15} className="text-accent" />
          </div>
          Dans vos bagages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {infos.bagages.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border border-charcoal/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-sm bg-accent/60" />
              </div>
              <span className="text-sm text-charcoal/70">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact sur place */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Phone size={15} className="text-emerald-600" />
          </div>
          Contact sur place
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-24">Nom</span>
            <span className="text-sm text-charcoal font-medium">{infos.contactSurPlace.nom}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-24">Rôle</span>
            <span className="text-sm text-charcoal/70">{infos.contactSurPlace.role}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-24">Téléphone</span>
            <span className="text-sm text-charcoal font-medium">{infos.contactSurPlace.telephone}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-charcoal/50 w-24">Disponibilité</span>
            <span className="text-sm text-charcoal/70">{infos.contactSurPlace.disponibilite}</span>
          </div>
        </div>
      </motion.div>

      {/* Documents nécessaires */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <FileText size={15} className="text-amber-600" />
          </div>
          Documents nécessaires
        </h3>
        <ul className="space-y-2">
          {infos.documentsNecessaires.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-charcoal/30 mt-0.5">•</span>
              <span className="text-sm text-charcoal/70">{doc}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
