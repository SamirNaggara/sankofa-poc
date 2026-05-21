import { motion } from 'framer-motion'
import { BarChart3, Plus, ChevronRight, Eye } from 'lucide-react'
import { surveys } from '../../data/fakeData'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function SurveyRow({ survey, navigate }) {
  const isCompleted = survey.status === 'completed'

  return (
    <motion.div
      variants={itemVariants}
      onClick={() => navigate('survey-detail', { surveyId: survey.id })}
      className="bg-white rounded-xl border border-charcoal/5 px-6 py-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-charcoal truncate">{survey.title}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isCompleted
                ? 'bg-green-100 text-green-700'
                : 'bg-primary-400/20 text-primary-500'
            }`}
          >
            {isCompleted ? 'Terminé' : 'Brouillon'}
          </span>
          <span className="text-xs text-charcoal/40">
            {new Date(survey.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          {isCompleted && (
            <span className="text-xs text-charcoal/50 flex items-center gap-1">
              <BarChart3 size={12} className="text-accent" />
              {survey.responses} réponses
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            navigate('survey-preview', { surveyId: survey.id })
          }}
          className="p-2 rounded-lg text-charcoal/40 hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Aperçu du sondage"
        >
          <Eye size={18} />
        </motion.button>
        <ChevronRight size={20} className="text-charcoal/30" />
      </div>
    </motion.div>
  )
}

export default function Dashboard({ navigate }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Mes Sondages</h1>
          <p className="text-charcoal/50 mt-1 text-sm">Gérez vos sondages et consultez les résultats</p>
        </div>
        <motion.button
          className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-primary-500/90 transition-colors cursor-pointer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Plus size={18} />
          Nouveau sondage
        </motion.button>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {surveys.map((survey) => (
          <SurveyRow key={survey.id} survey={survey} navigate={navigate} />
        ))}
      </motion.div>
    </div>
  )
}
