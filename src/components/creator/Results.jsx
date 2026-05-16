import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Users, DollarSign, MapPin, User, Mail, Phone, Calendar, Activity, X, Sparkles } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts'
import PageTransition from '../shared/PageTransition'
import TripCard, { containerVariants as tripContainerVariants } from './TripCard'
import { surveyResults, surveys, individualResponses, suggestedTripsBySurvey } from '../../data/fakeData'

const COLORS = ['#D97706', '#EA580C', '#0F766E', '#F59E0B', '#C2410C']

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}


function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-charcoal">{value}</p>
        <p className="text-sm text-charcoal/50">{label}</p>
      </div>
    </motion.div>
  )
}

function RespondentCard({ respondent, onClick }) {
  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className="bg-white rounded-xl border border-charcoal/5 px-5 py-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-400/15 flex items-center justify-center">
          <User size={18} className="text-primary-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-charcoal">{respondent.name}</p>
          <p className="text-xs text-charcoal/40">{respondent.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-charcoal/50">
        <span className="px-2.5 py-1 rounded-full bg-primary-400/10 text-primary-500 font-medium">
          {respondent.destination}
        </span>
        <span>{respondent.budget}</span>
      </div>
    </motion.div>
  )
}

function RespondentDetail({ respondent, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-xl border border-charcoal/5 p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-charcoal">Fiche répondant</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-charcoal/5 cursor-pointer transition-colors"
          >
            <X size={18} className="text-charcoal/40" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User size={16} className="text-charcoal/40" />
            <div>
              <p className="text-xs text-charcoal/40">Nom</p>
              <p className="text-sm font-medium text-charcoal">{respondent.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={16} className="text-charcoal/40" />
            <div>
              <p className="text-xs text-charcoal/40">Email</p>
              <p className="text-sm font-medium text-charcoal">{respondent.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={16} className="text-charcoal/40" />
            <div>
              <p className="text-xs text-charcoal/40">Téléphone</p>
              <p className="text-sm font-medium text-charcoal">{respondent.phone}</p>
            </div>
          </div>

          <hr className="border-charcoal/5" />

          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-charcoal/40" />
            <div>
              <p className="text-xs text-charcoal/40">Destination</p>
              <p className="text-sm font-medium text-primary-500">{respondent.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign size={16} className="text-charcoal/40" />
            <div>
              <p className="text-xs text-charcoal/40">Budget</p>
              <p className="text-sm font-medium text-charcoal">{respondent.budget}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-charcoal/40" />
            <div>
              <p className="text-xs text-charcoal/40">Semaine préférée</p>
              <p className="text-sm font-medium text-charcoal">{respondent.week}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Activity size={16} className="text-charcoal/40 mt-0.5" />
            <div>
              <p className="text-xs text-charcoal/40 mb-1.5">Activités souhaitées</p>
              <div className="flex flex-wrap gap-1.5">
                {respondent.activities.map((act) => (
                  <span
                    key={act}
                    className="px-2.5 py-1 rounded-full bg-secondary-500/10 text-secondary-500 text-xs font-medium"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}



const analysisPhases = [
  'Analyse des préférences de votre communauté…',
  'Recherche des meilleures correspondances…',
  'Génération des suggestions personnalisées…',
]

function AnalysisLoader({ phase }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Orbital animation */}
      <div className="relative w-16 h-16 mb-6">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-400 to-accent"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <Sparkles size={16} className="text-white absolute inset-0 m-auto z-10" />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-sm text-charcoal/60 font-medium"
        >
          {analysisPhases[phase]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default function Results({ navigate, surveyId }) {
  const survey = surveyId ? surveys.find((s) => s.id === surveyId) : surveys.find((s) => s.status === 'completed')
  const [activeTab, setActiveTab] = useState('global')
  const [selectedRespondent, setSelectedRespondent] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisPhase, setAnalysisPhase] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsAnalyzing(true)
      setAnalysisPhase(0)
    }, 500)

    const phase1 = setTimeout(() => setAnalysisPhase(1), 2500)
    const phase2 = setTimeout(() => setAnalysisPhase(2), 4500)
    const done = setTimeout(() => {
      setIsAnalyzing(false)
      setShowSuggestions(true)
    }, 6500)

    return () => {
      clearTimeout(startDelay)
      clearTimeout(phase1)
      clearTimeout(phase2)
      clearTimeout(done)
    }
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.button
              onClick={() => surveyId ? navigate('survey-detail', { surveyId }) : navigate('creator-dashboard')}
              className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              Retour
            </motion.button>
            <h2 className="text-lg font-semibold text-charcoal">Résultats</h2>
            <div className="w-20" />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-10">
          {/* Survey title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-charcoal">{survey?.title}</h1>
            <p className="text-charcoal/50 mt-1 text-sm">
              Créé le {new Date(survey?.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 border border-charcoal/5 w-fit">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                activeTab === 'global'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-charcoal/50 hover:text-charcoal'
              }`}
            >
              Vue globale
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                activeTab === 'individual'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-charcoal/50 hover:text-charcoal'
              }`}
            >
              Réponses individuelles
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'global' ? (
              <motion.div
                key="global"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                {/* AI Suggestions Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-10 bg-white rounded-2xl shadow-md border border-charcoal/5 p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent flex items-center justify-center">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal">Voyages suggérés pour ce sondage</h3>
                      <p className="text-xs text-charcoal/50">Propositions générées par l'IA Sankofa</p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {isAnalyzing && (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AnalysisLoader phase={analysisPhase} />
                      </motion.div>
                    )}
                    {showSuggestions && (
                      <motion.div
                        key="suggestions"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        variants={tripContainerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {(suggestedTripsBySurvey[survey?.id] || suggestedTripsBySurvey[1]).map((trip, index) => (
                          <TripCard key={trip.id} trip={trip} index={index} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Stat cards */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <StatCard icon={Users} label="Réponses" value={surveyResults.totalResponses} color="bg-accent" />
                  <StatCard icon={DollarSign} label="Budget moyen" value={`${surveyResults.averageBudget}€`} color="bg-primary-500" />
                  <StatCard icon={MapPin} label="Destination #1" value={surveyResults.topDestination} color="bg-secondary-500" />
                </motion.div>

                {/* Charts */}
                <motion.div
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {/* Destinations bar chart */}
                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-6">Destinations préférées</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={surveyResults.destinations} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="name" tick={{ fontSize: 13 }} />
                        <YAxis tick={{ fontSize: 13 }} unit="%" />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          formatter={(value) => [`${value}%`, 'Intérêt']}
                        />
                        <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                          {surveyResults.destinations.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Budget pie chart */}
                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-6">Répartition des budgets</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={surveyResults.budgets}
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          dataKey="value"
                          nameKey="range"
                          label={({ range, value }) => `${range}: ${value}%`}
                          labelLine
                        >
                          {surveyResults.budgets.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Part']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Activities bar chart */}
                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-6">Activités populaires</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={surveyResults.activities} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis type="number" unit="%" tick={{ fontSize: 13 }} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 13 }} width={120} />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          formatter={(value) => [`${value}%`, 'Intérêt']}
                        />
                        <Bar dataKey="value" fill="#EA580C" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Weeks bar chart */}
                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-6">Semaines préférées</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={surveyResults.weeks} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 13 }} unit="%" />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          formatter={(value) => [`${value}%`, 'Préférence']}
                        />
                        <Bar dataKey="value" fill="#0F766E" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Age groups horizontal bar chart */}
                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-6">Tranches d'âge des participants</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={surveyResults.ageGroups} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis type="number" unit="%" tick={{ fontSize: 13 }} />
                        <YAxis type="category" dataKey="range" tick={{ fontSize: 13 }} width={60} />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          formatter={(value) => [`${value}%`, 'Proportion']}
                        />
                        <Bar dataKey="value" fill="#0F766E" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </motion.div>

              </motion.div>
            ) : (
              <motion.div
                key="individual"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <motion.div
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {individualResponses.map((respondent) => (
                    <RespondentCard
                      key={respondent.id}
                      respondent={respondent}
                      onClick={() => setSelectedRespondent(respondent)}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Respondent detail modal */}
        <AnimatePresence>
          {selectedRespondent && (
            <RespondentDetail
              respondent={selectedRespondent}
              onClose={() => setSelectedRespondent(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
