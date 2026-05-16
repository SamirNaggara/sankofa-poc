import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Pencil, Users, MessageCircle, Share2, Wallet, ArrowLeft, ChevronRight, Info } from 'lucide-react'
import PageTransition from '../../shared/PageTransition'
import VoyageHeader from './VoyageHeader'
import VoyageKPIs from './VoyageKPIs'
import VoyageTabEditer from './VoyageTabEditer'
import VoyageTabParticipants from './VoyageTabParticipants'
import VoyageTabStats from './VoyageTabStats'
import VoyageTabChat from './VoyageTabChat'
import VoyageTabPartager from './VoyageTabPartager'
import VoyageTabComptes from './VoyageTabComptes'
import VoyageTabInfosPratiques from './VoyageTabInfosPratiques'
import { suggestedTrips, voyageControlData, voyageChatMessages, voyageChatAutoReplies, voyagePageStats, voyageTrackingLinks, voyageInfosPratiques, voyageMessages } from '../../../data/fakeData'

const actionBlocks = [
  {
    id: 'editer',
    label: 'Ma page',
    icon: Pencil,
    color: 'bg-rose-500/15',
    iconColor: 'text-rose-600',
    getPreview: (data) => `Complétion: ${data.controlData?.editData?.completion || 80}% · ${data.controlData?.editData?.dates || ''}`,
    subtext: 'Modifier et visualiser votre page',
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
    id: 'partager',
    label: 'Partager',
    icon: Share2,
    color: 'bg-primary-400/15',
    iconColor: 'text-primary-500',
    getPreview: (data) => `${data.pageStats?.vues || 0} vues · ${data.pageStats?.tauxConversion || 0}% conversion`,
    subtext: 'Liens de tracking et partage',
  },
  {
    id: 'stats',
    label: 'Statistiques',
    icon: BarChart3,
    color: 'bg-purple-500/15',
    iconColor: 'text-purple-600',
    getPreview: (data) => `${data.pageStats?.vues || 0} vues cette semaine`,
    subtext: 'Analyser votre audience',
  },
  {
    id: 'infos-pratiques',
    label: 'Infos pratiques',
    icon: Info,
    color: 'bg-sky-500/15',
    iconColor: 'text-sky-600',
    getPreview: (data) => {
      const msgCount = data.messages?.length || 0
      const rdvDate = data.infos?.rendezVous?.date || ''
      return `${msgCount} message${msgCount > 1 ? 's' : ''} · RDV ${rdvDate}`
    },
    subtext: 'Logistique et messages aux voyageurs',
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageCircle,
    color: 'bg-blue-500/15',
    iconColor: 'text-blue-600',
    getPreview: (data) => {
      const unread = data.unreadCount || 0
      return unread > 0 ? `${unread} message${unread > 1 ? 's' : ''} non lu${unread > 1 ? 's' : ''}` : 'Aucun nouveau message'
    },
    subtext: 'Discuter avec l\'organisateur',
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

export default function VoyageControl({ navigate, voyageId, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || null)

  const trip = suggestedTrips.find((t) => t.id === voyageId) || suggestedTrips[0]
  const controlData = voyageControlData[trip.id] || voyageControlData[1]
  const chatData = voyageChatMessages[trip.id]
  const autoReplies = voyageChatAutoReplies?.[trip.id]
  const pageStats = voyagePageStats[trip.id]
  const trackingLinks = voyageTrackingLinks[trip.id]

  const infos = voyageInfosPratiques[trip.id]
  const messagesData = voyageMessages[trip.id]

  const unreadCount = chatData?.messages?.filter((m) => !m.read).length || 0

  const tripSlug = trip.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 30)

  const blockData = { controlData, pageStats, unreadCount, infos, messages: messagesData }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        <VoyageHeader trip={trip} controlData={controlData} navigate={navigate} />

        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* KPIs */}
          <div className="mb-8">
            <VoyageKPIs kpis={controlData.kpis} controlData={controlData} />
          </div>

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
                  {actionBlocks.map((block, i) => (
                    <ActionBlock
                      key={block.id}
                      block={block}
                      data={blockData}
                      onClick={() => setActiveTab(block.id)}
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

                {activeTab === 'stats' && (
                  <VoyageTabStats stats={pageStats} />
                )}
                {activeTab === 'partager' && (
                  <VoyageTabPartager links={trackingLinks} tripSlug={tripSlug} />
                )}
                {activeTab === 'participants' && (
                  <VoyageTabParticipants participants={controlData.participants} />
                )}
                {activeTab === 'chat' && (
                  <VoyageTabChat chatData={chatData} autoReplies={autoReplies} />
                )}
                {activeTab === 'editer' && (
                  <VoyageTabEditer editData={controlData.editData} trip={trip} />
                )}
                {activeTab === 'comptes' && (
                  <VoyageTabComptes comptes={controlData.comptes} />
                )}
                {activeTab === 'infos-pratiques' && (
                  <VoyageTabInfosPratiques infos={infos} messages={messagesData} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </PageTransition>
  )
}
