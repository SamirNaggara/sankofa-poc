import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Eye, Share2, BarChart3, Check, MapPin, DollarSign, Calendar, Activity } from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import { surveys } from '../../data/fakeData'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function SurveyDetail({ navigate, surveyId }) {
  const survey = surveys.find((s) => s.id === surveyId)
  const [copied, setCopied] = useState(false)

  if (!survey) return null

  const isCompleted = survey.status === 'completed'

  function handleShare() {
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#/s/${survey.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.button
              onClick={() => navigate('creator-dashboard')}
              className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              Retour
            </motion.button>
            <h2 className="text-lg font-semibold text-charcoal">Détail du sondage</h2>
            <div className="w-20" />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Title & status */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold text-charcoal mb-3">{survey.title}</h1>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isCompleted
                      ? 'bg-green-100 text-green-700'
                      : 'bg-primary-400/20 text-primary-500'
                  }`}
                >
                  {isCompleted ? 'Terminé' : 'Brouillon'}
                </span>
                <span className="text-sm text-charcoal/50">
                  Créé le {new Date(survey.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                {isCompleted && (
                  <span className="text-sm text-charcoal/50 flex items-center gap-1.5">
                    <BarChart3 size={14} className="text-accent" />
                    {survey.responses} réponses
                  </span>
                )}
              </div>
            </motion.div>

            {/* Configuration summary */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6 space-y-5"
            >
              <h3 className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide">Configuration</h3>

              {/* Destinations */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 mt-0.5" />
                <div>
                  <p className="text-xs text-charcoal/50 mb-1.5">Destinations</p>
                  <div className="flex flex-wrap gap-1.5">
                    {survey.destinations.map((dest) => (
                      <span key={dest} className="px-2.5 py-1 rounded-full bg-primary-400/10 text-primary-500 text-xs font-medium">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-start gap-3">
                <DollarSign size={18} className="text-accent mt-0.5" />
                <div>
                  <p className="text-xs text-charcoal/50 mb-1.5">Fourchettes de budget</p>
                  <div className="flex flex-wrap gap-1.5">
                    {survey.budgetRanges.map((range) => (
                      <span key={range} className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {range}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weeks */}
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-secondary-500 mt-0.5" />
                <div>
                  <p className="text-xs text-charcoal/50 mb-1.5">Semaines proposées</p>
                  <div className="flex flex-wrap gap-1.5">
                    {survey.weeks.map((week) => (
                      <span key={week.start} className="px-2.5 py-1 rounded-full bg-secondary-500/10 text-secondary-500 text-xs font-medium">
                        {week.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="flex items-start gap-3">
                <Activity size={18} className="text-charcoal/50 mt-0.5" />
                <div>
                  <p className="text-xs text-charcoal/50 mb-1.5">Activités</p>
                  <div className="flex flex-wrap gap-1.5">
                    {survey.activities.map((act) => (
                      <span key={act} className="px-2.5 py-1 rounded-full bg-charcoal/5 text-charcoal/70 text-xs font-medium">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Edit */}
              <motion.button
                onClick={() => navigate('creator-editor', { surveyId: survey.id })}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6 text-left cursor-pointer hover:shadow-md transition-shadow group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <Edit size={22} className="text-primary-500" />
                </div>
                <h4 className="text-base font-semibold text-charcoal mb-1">Éditer le sondage</h4>
                <p className="text-xs text-charcoal/50">Modifier les destinations, budgets, semaines et activités</p>
              </motion.button>

              {/* Preview */}
              <motion.button
                onClick={() => navigate('survey-preview', { surveyId: survey.id })}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6 text-left cursor-pointer hover:shadow-md transition-shadow group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Eye size={22} className="text-accent" />
                </div>
                <h4 className="text-base font-semibold text-charcoal mb-1">Prévisualiser</h4>
                <p className="text-xs text-charcoal/50">Voir le sondage tel que vos fans le verront</p>
              </motion.button>

              {/* Share */}
              <motion.button
                onClick={handleShare}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6 text-left cursor-pointer hover:shadow-md transition-shadow group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  copied ? 'bg-green-100' : 'bg-secondary-500/10 group-hover:bg-secondary-500/20'
                }`}>
                  {copied ? <Check size={22} className="text-green-600" /> : <Share2 size={22} className="text-secondary-500" />}
                </div>
                <h4 className="text-base font-semibold text-charcoal mb-1">
                  {copied ? 'Lien copié !' : 'Copier le lien'}
                </h4>
                <p className="text-xs text-charcoal/50">Partager le sondage avec votre communauté</p>
              </motion.button>

              {/* Results */}
              {isCompleted && (
                <motion.button
                  onClick={() => navigate('creator-results', { surveyId: survey.id })}
                  className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6 text-left cursor-pointer hover:shadow-md transition-shadow group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <BarChart3 size={22} className="text-green-600" />
                  </div>
                  <h4 className="text-base font-semibold text-charcoal mb-1">Voir les résultats</h4>
                  <p className="text-xs text-charcoal/50">{survey.responses} réponses collectées</p>
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  )
}
