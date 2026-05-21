import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Users, MessageCircle, Wallet, ArrowLeft, ChevronRight, Info, ExternalLink } from 'lucide-react'
import PageTransition from '../../shared/PageTransition'
import VoyageHeader from './VoyageHeader'
import VoyageKPIs from './VoyageKPIs'
import VoyageTabParticipants from './VoyageTabParticipants'
import VoyageTabCommunication from './VoyageTabCommunication'
import VoyageTabComptes from './VoyageTabComptes'
import VoyageTabInfosPratiques from './VoyageTabInfosPratiques'
import { suggestedTrips, voyageControlData, voyageInfosPratiques, voyageMessages, travelerDMs, travelerDMAutoReplies, groupChatMembers, groupChatMessages, groupChatAutoReplies, sankofaChatMessages, sankofaChatAutoReplies } from '../../../data/fakeData'

const actionBlocks = [
  {
    id: 'page-de-vente',
    label: 'Page de vente',
    icon: ExternalLink,
    color: 'bg-rose-500/15',
    iconColor: 'text-rose-600',
    getPreview: (data) => `Complétion: ${data.controlData?.editData?.completion || 80}% · ${data.controlData?.editData?.dates || ''}`,
    subtext: 'Voir et modifier votre page de vente',
  },
  {
    id: 'participants',
    label: 'Participants',
    icon: Users,
    color: 'bg-accent/15',
    iconColor: 'text-accent',
    getPreview: (data) => {
      const participants = data.controlData?.participants || []
      const payes = participants.filter(p => p.paiement === 'payé').length
      const enAttente = participants.filter(p => p.paiement === 'en attente').length
      return `${participants.length} inscrits · ${payes} payés${enAttente > 0 ? ` · ${enAttente} en attente` : ''}`
    },
    subtext: 'Gérer les inscriptions',
  },
  {
    id: 'comptes',
    label: 'Comptes',
    icon: Wallet,
    color: 'bg-emerald-500/15',
    iconColor: 'text-emerald-600',
    getPreview: (data) => {
      const comptes = data.controlData?.comptes
      if (!comptes) return 'Données financières'
      const pct = Math.round((comptes.revenuBrut / data.controlData.kpis.caObjectif) * 100)
      return `${comptes.revenuBrut.toLocaleString('fr-FR')}€ encaissés · ${pct}% objectif`
    },
    subtext: 'Détail des revenus',
  },
  {
    id: 'infos-pratiques',
    label: 'Fiche voyage',
    icon: Info,
    color: 'bg-sky-500/15',
    iconColor: 'text-sky-600',
    getPreview: (data) => {
      const rdvDate = data.infos?.rendezVous?.date || ''
      return `Départ ${rdvDate} · Programme & logistique`
    },
    subtext: 'Toutes les infos du voyage',
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageCircle,
    color: 'bg-blue-500/15',
    iconColor: 'text-blue-600',
    getPreview: (data) => {
      const unread = data.dmUnread || 0
      if (unread > 0) return `${unread} message${unread > 1 ? 's' : ''} non lu${unread > 1 ? 's' : ''}`
      return 'Aucun nouveau message'
    },
    subtext: 'Annonces, groupe, messages & support Sankofa',
  },
]

function ActionBlock({ block, data, onClick }) {
  const Icon = block.icon
  const preview = block.getPreview(data)

  return (
    <motion.button
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5 text-left cursor-pointer w-full group"
      whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${block.color} flex items-center justify-center`}>
            <Icon size={17} className={block.iconColor} />
          </div>
          <h3 className="text-sm font-semibold text-charcoal">{block.label}</h3>
        </div>
        <ChevronRight size={16} className="text-charcoal/20 group-hover:text-charcoal/50 transition-colors mt-1" />
      </div>
      <p className="text-sm font-medium text-charcoal/80 mb-1">{preview}</p>
      <p className="text-xs text-charcoal/40">{block.subtext}</p>
    </motion.button>
  )
}

export default function VoyageControl({ navigate, voyageId, initialTab, initialSubTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || null)

  // Sync activeTab when navigating from floating chat
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab)
  }, [initialTab])

  const trip = suggestedTrips.find((t) => t.id === voyageId) || suggestedTrips[0]
  const controlData = voyageControlData[trip.id] || voyageControlData[1]

  const infos = voyageInfosPratiques[trip.id]
  const messagesData = voyageMessages[trip.id]

  const dmsData = travelerDMs[trip.id] || []
  const dmAutoRepliesData = travelerDMAutoReplies[trip.id]
  const groupMembersData = groupChatMembers[trip.id] || []
  const groupMessagesData = groupChatMessages[trip.id] || []
  const groupAutoRepliesData = groupChatAutoReplies[trip.id] || []
  const sankofaMessagesData = sankofaChatMessages[trip.id] || []
  const sankofaAutoRepliesData = sankofaChatAutoReplies[trip.id] || []

  const dmUnread = dmsData.reduce((sum, c) => sum + c.unreadCount, 0)

  const blockData = { controlData, dmUnread, infos, messages: messagesData }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        <VoyageHeader trip={trip} controlData={controlData} navigate={navigate} />

        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* KPIs — hidden when a tab is open */}
          {activeTab === null && (
            <div className="mb-8">
              <VoyageKPIs kpis={controlData.kpis} controlData={controlData} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {activeTab === null ? (
              /* Overview — Action Blocks */
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {actionBlocks.map((block) => (
                    <ActionBlock
                      key={block.id}
                      block={block}
                      data={blockData}
                      onClick={() => {
                        if (block.id === 'page-de-vente') {
                          navigate('voyage-sales', { voyageId: trip.id, isAdmin: true })
                        } else {
                          setActiveTab(block.id)
                        }
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Tab content */
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <motion.button
                  onClick={() => setActiveTab(null)}
                  className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal mb-6 cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={16} />
                  Vue d'ensemble
                </motion.button>

                {activeTab === 'participants' && (
                  <VoyageTabParticipants participants={controlData.participants} />
                )}
                {activeTab === 'communication' && (
                  <VoyageTabCommunication
                    messages={messagesData}
                    dms={dmsData}
                    dmAutoReplies={dmAutoRepliesData}
                    groupMembers={groupMembersData}
                    groupMessages={groupMessagesData}
                    groupAutoReplies={groupAutoRepliesData}
                    sankofaMessages={sankofaMessagesData}
                    sankofaAutoReplies={sankofaAutoRepliesData}
                    initialSubTab={initialSubTab}
                  />
                )}
                {activeTab === 'comptes' && (
                  <VoyageTabComptes comptes={controlData.comptes} participants={controlData.participants} />
                )}
                {activeTab === 'infos-pratiques' && (
                  <VoyageTabInfosPratiques infos={infos} trip={trip} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </PageTransition>
  )
}
