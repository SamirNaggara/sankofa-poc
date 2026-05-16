import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Share2, Heart, Check } from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import { creatorProfile, travelPreferences } from '../../data/fakeData'
import { simulateTyping, simulateSelection } from '../../hooks/useSimulateTyping'

const steps = [
  { label: 'Qui êtes-vous ?', icon: User },
  { label: 'Vos réseaux', icon: Share2 },
  { label: 'Préférences', icon: Heart },
]

function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              i <= currentStep
                ? 'bg-primary-500 text-white'
                : 'bg-charcoal/10 text-charcoal/40'
            }`}
            animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {i < currentStep ? <Check size={18} /> : i + 1}
          </motion.div>
          {i < steps.length - 1 && (
            <div className={`w-12 h-0.5 ${i < currentStep ? 'bg-primary-500' : 'bg-charcoal/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Onboarding({ navigate }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [youtube, setYoutube] = useState('')
  const [selectedPrefs, setSelectedPrefs] = useState([])
  const [fillingDone, setFillingDone] = useState(false)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    runAutoFill()
  }, [])

  async function runAutoFill() {
    // Step 1: Name + Bio
    await simulateTyping(setName, creatorProfile.name, 50)
    await new Promise((r) => setTimeout(r, 300))
    await simulateTyping(setBio, creatorProfile.bio, 20)
    setFillingDone(true)
    await new Promise((r) => setTimeout(r, 800))
    setFillingDone(false)
    setCurrentStep(1)

    // Step 2: Social handles
    await new Promise((r) => setTimeout(r, 400))
    await simulateTyping(setInstagram, creatorProfile.instagram, 50)
    await new Promise((r) => setTimeout(r, 200))
    await simulateTyping(setTiktok, creatorProfile.tiktok, 50)
    await new Promise((r) => setTimeout(r, 200))
    await simulateTyping(setYoutube, creatorProfile.youtube, 50)
    setFillingDone(true)
    await new Promise((r) => setTimeout(r, 800))
    setFillingDone(false)
    setCurrentStep(2)

    // Step 3: Preferences
    await new Promise((r) => setTimeout(r, 400))
    await simulateSelection(setSelectedPrefs, creatorProfile.preferences, 500)
    setFillingDone(true)
    await new Promise((r) => setTimeout(r, 1200))

    // Navigate to dashboard
    navigate('creator-dashboard')
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <h2 className="text-3xl font-bold text-center text-charcoal mb-2">
            Bienvenue sur Sankofa
          </h2>
          <p className="text-center text-charcoal/50 mb-6 text-sm">
            Configurons votre profil créateur
          </p>

          <Stepper currentStep={currentStep} />

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Nom</label>
                  <input
                    type="text"
                    value={name}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-cream/50 text-charcoal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Bio</label>
                  <textarea
                    value={bio}
                    readOnly
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-cream/50 text-charcoal focus:outline-none resize-none"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Instagram</label>
                  <input type="text" value={instagram} readOnly className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-cream/50 text-charcoal focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">TikTok</label>
                  <input type="text" value={tiktok} readOnly className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-cream/50 text-charcoal focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">YouTube</label>
                  <input type="text" value={youtube} readOnly className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-cream/50 text-charcoal focus:outline-none" />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="text-sm text-charcoal/60 mb-4">Sélectionnez vos centres d'intérêt :</p>
                <div className="grid grid-cols-2 gap-3">
                  {travelPreferences.map((pref) => {
                    const isSelected = selectedPrefs.includes(pref)
                    return (
                      <motion.div
                        key={pref}
                        className={`px-4 py-3 rounded-xl text-sm font-medium text-center cursor-pointer transition-all border-2 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                            : 'border-charcoal/10 text-charcoal/50'
                        }`}
                        animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {isSelected && <Check size={14} className="inline mr-1 -mt-0.5" />}
                        {pref}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Validate button */}
          <motion.button
            className={`w-full mt-8 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
              fillingDone
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-charcoal/10 text-charcoal/30'
            }`}
            animate={fillingDone ? { scale: [1, 1.04, 1], boxShadow: ['0 0 0 0 rgba(217,119,6,0)', '0 0 20px 4px rgba(217,119,6,0.3)', '0 0 0 0 rgba(217,119,6,0)'] } : {}}
            transition={{ duration: 0.8, repeat: fillingDone ? Infinity : 0 }}
          >
            {fillingDone ? 'Valider ✓' : 'En cours de remplissage...'}
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
