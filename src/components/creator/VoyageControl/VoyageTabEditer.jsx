import { motion } from 'framer-motion'
import { Image, Tag, Eye, Circle } from 'lucide-react'

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function PageLinkCard({ editData, trip, navigate }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-4 mb-6"
    >
      <div className="flex items-center gap-4">
        {/* Miniature */}
        <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden">
          <img src={trip.image} alt={editData.titre} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-charcoal truncate">{editData.titre}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-xs font-medium text-accent">
              <Circle size={7} fill="currentColor" />
              En ligne
            </span>
            <span className="text-xs text-charcoal/40">·</span>
            <span className="text-xs font-medium text-charcoal/50">{editData.completion}% complète</span>
          </div>
          <motion.button
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-500 text-xs font-semibold cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('voyage-sales', { voyageId: trip.id })}
          >
            Voir ma page
            <Eye size={12} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function VoyageTabEditer({ editData, trip, navigate, hidePageLink }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {/* Page link card */}
      {!hidePageLink && <PageLinkCard editData={editData} trip={trip} navigate={navigate} />}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6 space-y-5"
      >
        <div>
          <h3 className="text-sm font-semibold text-charcoal">Modifier les informations</h3>
          <p className="text-xs text-charcoal/50 mt-0.5">Modifiez les informations ci-dessous</p>
        </div>

        {/* Cover image */}
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-2">Image de couverture</label>
          <div className="relative h-40 rounded-xl overflow-hidden">
            <img src={trip.image} alt={editData.titre} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            <div className="absolute bottom-3 right-3">
              <motion.button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-xs font-medium text-charcoal cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                <Image size={13} />
                Modifier
              </motion.button>
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5">Titre</label>
          <input
            type="text"
            defaultValue={editData.titre}
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 text-sm text-charcoal bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400"
          />
        </div>

        {/* Dates + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5">Dates</label>
            <input
              type="text"
              defaultValue={editData.dates}
              className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 text-sm text-charcoal bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5">Prix par personne</label>
            <input
              type="text"
              defaultValue={editData.prix}
              className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 text-sm text-charcoal bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5">Description</label>
          <textarea
            defaultValue={editData.description}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 text-sm text-charcoal bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 resize-none"
          />
        </div>

        {/* Inclus tags */}
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-2">Inclus dans le voyage</label>
          <div className="flex flex-wrap gap-2">
            {editData.inclus.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium"
              >
                <Tag size={11} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="pt-2">
          <motion.button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold text-sm shadow-md cursor-pointer"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            Enregistrer les modifications
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
