import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, Copy, Check, Plus, Camera, ExternalLink, MessageCircle } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function VoyageTabPartager({ links, tripSlug }) {
  const [newLinkName, setNewLinkName] = useState('')
  const [localLinks, setLocalLinks] = useState(links || [])
  const [copiedId, setCopiedId] = useState(null)

  function handleCreateLink() {
    if (!newLinkName.trim()) return
    const slug = newLinkName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const newLink = {
      id: Date.now(),
      nom: slug,
      url: `sankofa.travel/v/${tripSlug}?ref=${slug}`,
      clicks: 0,
      inscriptions: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setLocalLinks((prev) => [newLink, ...prev])
    setNewLinkName('')
  }

  function handleCopy(link) {
    navigator.clipboard.writeText(`https://${link.url}`)
    setCopiedId(link.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCreateLink()
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 8 }}
    >
      {/* Create link */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-charcoal/5 p-6 mb-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
          <Plus size={16} className="text-primary-500" />
          Créer un lien de tracking
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newLinkName}
            onChange={(e) => setNewLinkName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nom du lien (ex: story-mai, collab-julie)"
            className="flex-1 px-4 py-2.5 rounded-xl bg-cream text-sm text-charcoal placeholder:text-charcoal/30 border border-charcoal/5 focus:outline-none focus:border-primary-500/30 transition-colors"
          />
          <motion.button
            onClick={handleCreateLink}
            disabled={!newLinkName.trim()}
            className="px-5 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Créer
          </motion.button>
        </div>
        {newLinkName.trim() && (
          <p className="text-xs text-charcoal/40 mt-2">
            URL générée : sankofa.travel/v/{tripSlug}?ref={newLinkName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
          </p>
        )}
      </motion.div>

      {/* Share buttons */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-charcoal/5 p-6 mb-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4">Partage rapide</h3>
        <div className="flex flex-wrap gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Camera size={16} />
            Instagram
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-medium cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={16} />
            TikTok
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </motion.button>
          <motion.button
            onClick={() => {
              const firstLink = localLinks[0]
              if (firstLink) handleCopy(firstLink)
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-charcoal/10 text-charcoal text-sm font-medium cursor-pointer hover:border-primary-400 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Copy size={16} />
            Copier le lien
          </motion.button>
        </div>
      </motion.div>

      {/* Existing links */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
          <Link size={16} className="text-accent" />
          Liens actifs ({localLinks.length})
        </h3>
        <AnimatePresence>
          {localLinks.map((link) => {
            const taux = link.clicks > 0 ? ((link.inscriptions / link.clicks) * 100).toFixed(1) : '0'
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-charcoal/5 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-semibold">
                      {link.nom}
                    </span>
                    <span className="text-xs text-charcoal/30">créé le {link.createdAt}</span>
                  </div>
                  <motion.button
                    onClick={() => handleCopy(link)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-charcoal/10 text-xs text-charcoal/60 hover:border-primary-400 hover:text-primary-500 transition-colors cursor-pointer"
                    whileTap={{ scale: 0.95 }}
                  >
                    {copiedId === link.id ? (
                      <>
                        <Check size={12} className="text-emerald-500" />
                        Copié
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copier
                      </>
                    )}
                  </motion.button>
                </div>
                <p className="text-xs text-charcoal/40 mb-3 font-mono truncate">
                  https://{link.url}
                </p>
                <div className="flex items-center gap-5 text-xs">
                  <span className="text-charcoal/50">
                    <strong className="text-charcoal">{link.clicks}</strong> clics
                  </span>
                  <span className="text-charcoal/50">
                    <strong className="text-charcoal">{link.inscriptions}</strong> inscriptions
                  </span>
                  <span className="text-charcoal/50">
                    Taux : <strong className="text-accent">{taux}%</strong>
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
