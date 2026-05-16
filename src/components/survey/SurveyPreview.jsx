import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import { simulateTyping, simulateSelection } from '../../hooks/useSimulateTyping'
import { surveys } from '../../data/fakeData'

export default function SurveyPreview({ navigate, surveyId }) {
  const survey = surveyId ? surveys.find((s) => s.id === surveyId) : (surveys.find((s) => s.status === 'draft') || surveys[0])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedWeek, setSelectedWeek] = useState('')
  const [selectedActivities, setSelectedActivities] = useState([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function autoFill() {
      await new Promise((r) => setTimeout(r, 800))
      if (cancelled) return

      await simulateTyping(setName, 'Lucas Martin', 80)
      if (cancelled) return

      await new Promise((r) => setTimeout(r, 600))
      await simulateTyping(setEmail, 'lucas.martin@email.com', 60)
      if (cancelled) return

      await new Promise((r) => setTimeout(r, 700))
      await simulateTyping(setPhone, '+33 6 12 34 56 78', 65)
      if (cancelled) return

      await new Promise((r) => setTimeout(r, 900))
      if (survey.destinations.length > 0) {
        setSelectedDestination(survey.destinations[0])
      }
      if (cancelled) return

      await new Promise((r) => setTimeout(r, 800))
      if (survey.budgetRanges.length > 0) {
        setSelectedBudget(survey.budgetRanges[1] || survey.budgetRanges[0])
      }
      if (cancelled) return

      await new Promise((r) => setTimeout(r, 800))
      if (survey.weeks.length > 0) {
        setSelectedWeek(survey.weeks[0].label)
      }
      if (cancelled) return

      await new Promise((r) => setTimeout(r, 700))
      const activitiesToSelect = survey.activities.slice(0, 3)
      await simulateSelection(setSelectedActivities, activitiesToSelect, 600)
    }

    autoFill()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.button
              onClick={() => surveyId ? navigate('survey-detail', { surveyId }) : navigate('creator-editor')}
              className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              Retour
            </motion.button>
            <h2 className="text-lg font-semibold text-charcoal">Aperçu du sondage</h2>
            <div className="w-20" />
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-10">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-lg border border-charcoal/5 p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-charcoal mb-2">Préférences envoyées !</h2>
              <p className="text-charcoal/50">Merci pour votre participation. Vous recevrez un email de confirmation.</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Survey title */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-2"
              >
                <h1 className="text-2xl font-bold text-charcoal">{survey.title}</h1>
                <p className="text-charcoal/50 text-sm mt-1">Partagez vos préférences de voyage</p>
              </motion.div>

              {/* Section: Infos personnelles */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6 space-y-4"
              >
                <h3 className="text-sm font-semibold text-charcoal">Vos informations</h3>
                <div>
                  <label className="block text-xs text-charcoal/50 mb-1">Nom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 bg-cream/30 text-sm text-charcoal focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/50 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 bg-cream/30 text-sm text-charcoal focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/50 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 bg-cream/30 text-sm text-charcoal focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="+33 6 XX XX XX XX"
                  />
                </div>
              </motion.section>

              {/* Section: Destination */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6"
              >
                <h3 className="text-sm font-semibold text-charcoal mb-3">Destination préférée</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {survey.destinations.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setSelectedDestination(dest)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all border-2 ${
                        selectedDestination === dest
                          ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                          : 'border-charcoal/10 text-charcoal/60 hover:border-charcoal/20'
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </motion.section>

              {/* Section: Budget */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6"
              >
                <h3 className="text-sm font-semibold text-charcoal mb-3">Votre budget</h3>
                <div className="flex flex-wrap gap-2">
                  {survey.budgetRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedBudget(range)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all border-2 ${
                        selectedBudget === range
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-charcoal/10 text-charcoal/60 hover:border-charcoal/20'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </motion.section>

              {/* Section: Semaine */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6"
              >
                <h3 className="text-sm font-semibold text-charcoal mb-3">Semaine préférée</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {survey.weeks.map((week) => (
                    <button
                      key={week.start}
                      onClick={() => setSelectedWeek(week.label)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all border-2 text-left ${
                        selectedWeek === week.label
                          ? 'border-secondary-500 bg-secondary-500/10 text-secondary-500'
                          : 'border-charcoal/10 text-charcoal/60 hover:border-charcoal/20'
                      }`}
                    >
                      {week.label}
                    </button>
                  ))}
                </div>
              </motion.section>

              {/* Section: Activités */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6"
              >
                <h3 className="text-sm font-semibold text-charcoal mb-3">Activités souhaitées</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {survey.activities.map((activity) => (
                    <button
                      key={activity}
                      onClick={() =>
                        setSelectedActivities((prev) =>
                          prev.includes(activity)
                            ? prev.filter((a) => a !== activity)
                            : [...prev, activity]
                        )
                      }
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all border-2 text-left ${
                        selectedActivities.includes(activity)
                          ? 'border-secondary-500 bg-secondary-500/10 text-secondary-500'
                          : 'border-charcoal/10 text-charcoal/50 hover:border-charcoal/20'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </motion.section>

              {/* Submit */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setSubmitted(true)}
                className="w-full py-4 rounded-xl bg-primary-500 text-white font-semibold text-sm cursor-pointer hover:bg-primary-500/90 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                Envoyer mes préférences
              </motion.button>
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  )
}
