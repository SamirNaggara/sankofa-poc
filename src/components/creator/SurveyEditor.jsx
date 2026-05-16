import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, X, Save, Check, Eye } from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import { surveys, availableActivities, availableBudgetRanges } from '../../data/fakeData'

export default function SurveyEditor({ navigate, surveyId }) {
  const draft = surveyId ? surveys.find((s) => s.id === surveyId) : surveys.find((s) => s.status === 'draft')
  const [title, setTitle] = useState(draft?.title || '')
  const [tags, setTags] = useState(draft?.destinations || [])
  const [newTag, setNewTag] = useState('')
  const [selectedBudgets, setSelectedBudgets] = useState(draft?.budgetRanges || [])
  const [weeks, setWeeks] = useState(draft?.weeks || [])
  const [weekStart, setWeekStart] = useState('')
  const [selectedActivities, setSelectedActivities] = useState(draft?.activities || [])
  const [newActivity, setNewActivity] = useState('')
  const [saved, setSaved] = useState(false)

  function addTag() {
    const trimmed = newTag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setNewTag('')
    }
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag))
  }

  function toggleBudget(range) {
    setSelectedBudgets((prev) =>
      prev.includes(range) ? prev.filter((b) => b !== range) : [...prev, range]
    )
  }

  function addWeek() {
    if (!weekStart) return
    const start = new Date(weekStart)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    const label = `${start.getDate()} au ${end.getDate()} ${end.toLocaleDateString('fr-FR', { month: 'long' })}`
    const weekObj = { label, start: weekStart, end: end.toISOString().split('T')[0] }
    if (!weeks.find((w) => w.start === weekObj.start)) {
      setWeeks([...weeks, weekObj])
    }
    setWeekStart('')
  }

  function removeWeek(start) {
    setWeeks(weeks.filter((w) => w.start !== start))
  }

  function toggleActivity(activity) {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    )
  }

  function addCustomActivity() {
    const trimmed = newActivity.trim()
    if (trimmed && !selectedActivities.includes(trimmed)) {
      setSelectedActivities([...selectedActivities, trimmed])
      setNewActivity('')
    }
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.button
              onClick={() => surveyId ? navigate('survey-detail', { surveyId }) : navigate('creator-dashboard')}
              className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              Retour
            </motion.button>
            <h2 className="text-lg font-semibold text-charcoal">Éditeur de sondage</h2>
            <div className="w-20" />
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">
          {/* Section: Titre */}
          <section className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Titre du sondage
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-cream/30 text-charcoal focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="Ex: Où partir cet été ?"
            />
          </section>

          {/* Section: Destinations */}
          <section className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Destinations proposées
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-charcoal/10 bg-cream/30 text-sm text-charcoal focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Ajouter une destination..."
              />
              <motion.button
                onClick={addTag}
                className="px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium cursor-pointer hover:bg-primary-500/90 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Plus size={18} />
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-400/15 text-primary-500 text-sm font-medium"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-primary-500/20 rounded-full p-0.5 cursor-pointer transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Section: Fourchettes de prix */}
          <section className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Fourchettes de prix proposées
            </label>
            <p className="text-xs text-charcoal/40 mb-3">Sélectionnez les options que les participants pourront choisir</p>
            <div className="flex flex-wrap gap-2">
              {availableBudgetRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => toggleBudget(range)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all border-2 ${
                    selectedBudgets.includes(range)
                      ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                      : 'border-charcoal/10 text-charcoal/50 hover:border-charcoal/20'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </section>

          {/* Section: Semaines */}
          <section className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Semaines de voyage
            </label>
            <p className="text-xs text-charcoal/40 mb-3">Sélectionnez un lundi pour ajouter une semaine</p>
            <div className="flex gap-2 mb-3">
              <input
                type="date"
                value={weekStart}
                onChange={(e) => setWeekStart(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-charcoal/10 bg-cream/30 text-sm text-charcoal focus:outline-none focus:border-primary-500 transition-colors"
              />
              <motion.button
                onClick={addWeek}
                className="px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium cursor-pointer hover:bg-primary-500/90 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Plus size={18} />
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {weeks.map((week) => (
                  <motion.span
                    key={week.start}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-medium"
                  >
                    {week.label}
                    <button
                      onClick={() => removeWeek(week.start)}
                      className="hover:bg-accent/20 rounded-full p-0.5 cursor-pointer transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Section: Activités */}
          <section className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Activités proposées
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {availableActivities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => toggleActivity(activity)}
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
            <div className="flex gap-2">
              <input
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomActivity()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-charcoal/10 bg-cream/30 text-sm text-charcoal focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Ajouter une activité personnalisée..."
              />
              <motion.button
                onClick={addCustomActivity}
                className="px-4 py-2.5 rounded-xl bg-secondary-500 text-white text-sm font-medium cursor-pointer hover:bg-secondary-500/90 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Plus size={18} />
              </motion.button>
            </div>
          </section>

          {/* Action buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={handleSave}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-primary-500 text-white hover:bg-primary-500/90'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {saved ? (
                <>
                  <Check size={18} /> Sauvegardé !
                </>
              ) : (
                <>
                  <Save size={18} /> Sauvegarder
                </>
              )}
            </motion.button>

            <motion.button
              onClick={() => navigate('survey-preview', { surveyId })}
              className="w-full py-3.5 rounded-xl font-semibold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 border-2 border-accent text-accent hover:bg-accent/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={18} /> Prévisualiser le sondage
            </motion.button>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}
