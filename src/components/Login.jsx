import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Music, Play, Ghost, Bird, Users, ArrowLeft } from 'lucide-react'
import PageTransition from './shared/PageTransition'

function SankofaLogo() {
  return (
    <div className="flex flex-col items-center gap-4 mb-10">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="drop-shadow-lg">
        <circle cx="36" cy="36" r="34" stroke="#D97706" strokeWidth="3" fill="none" />
        <path
          d="M36 16C36 16 22 24 22 36C22 44 28 50 36 52C36 52 36 44 36 36C36 28 36 16 36 16Z"
          fill="#D97706"
        />
        <path
          d="M36 16C36 16 50 24 50 36C50 44 44 50 36 52"
          stroke="#D97706"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="36" cy="36" r="4" fill="#F59E0B" />
      </svg>
      <h1 className="text-5xl font-bold tracking-tight" style={{ color: '#D97706' }}>
        Sankofa
      </h1>
      <p className="text-lg text-charcoal/60 max-w-sm">
        Connectez vos fans à vos prochaines aventures
      </p>
    </div>
  )
}

const socialNetworks = [
  { name: 'Instagram', icon: Camera, bg: 'from-purple-500 via-pink-500 to-orange-400' },
  { name: 'TikTok', icon: Music, bg: 'from-gray-900 to-gray-700' },
  { name: 'YouTube', icon: Play, bg: 'from-red-600 to-red-500' },
  { name: 'Snapchat', icon: Ghost, bg: 'from-yellow-400 to-yellow-300', textDark: true },
  { name: 'Twitter / X', icon: Bird, bg: 'from-sky-500 to-sky-400' },
  { name: 'Facebook', icon: Users, bg: 'from-blue-600 to-blue-500' },
]

export default function Login({ navigate }) {
  const [step, setStep] = useState('role')
  const [selectedRole, setSelectedRole] = useState(null)

  function handleRoleSelect(role) {
    setSelectedRole(role)
    setStep('social')
  }

  function handleSocialClick(index) {
    if (selectedRole === 'creator') {
      if (index === 0) {
        navigate('creator-onboarding')
      } else {
        navigate('creator-dashboard')
      }
    } else {
      if (index === 0) {
        navigate('traveler-dashboard', { travelerId: 'lucas' })
      } else if (index === 1) {
        navigate('traveler-dashboard', { travelerId: 'sophie' })
      } else {
        navigate('traveler-dashboard', { travelerId: 'lucas' })
      }
    }
  }

  function handleBack() {
    setStep('role')
    setSelectedRole(null)
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FFF7ED 30%, #FDE68A 70%, #FBBF24 100%)',
        }}
      >
        {/* Subtle pattern overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1C1917 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <motion.div
          layout
          className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SankofaLogo />

          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={() => handleRoleSelect('creator')}
                    className="w-full py-3.5 rounded-xl border-2 border-primary-500 text-primary-500 font-semibold text-sm hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Entrer en tant que Créateur
                  </motion.button>
                  <motion.button
                    onClick={() => handleRoleSelect('traveler')}
                    className="w-full py-3.5 rounded-xl border-2 border-accent text-accent font-semibold text-sm hover:bg-accent hover:text-white transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Entrer en tant que Voyageur
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal mb-4 cursor-pointer"
                  whileHover={{ x: -3 }}
                >
                  <ArrowLeft size={16} />
                  Retour
                </motion.button>

                <div className="flex flex-col gap-3">
                  {socialNetworks.map((network, i) => (
                    <motion.button
                      key={network.name}
                      onClick={() => handleSocialClick(i)}
                      className={`flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-medium text-sm bg-gradient-to-r ${network.bg} ${network.textDark ? 'text-gray-900' : 'text-white'} transition-all cursor-pointer shadow-md`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <network.icon size={20} />
                      Continuer avec {network.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  )
}
