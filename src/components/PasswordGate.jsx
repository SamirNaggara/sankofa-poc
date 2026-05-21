import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function PasswordGate({ onSuccess }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (code === import.meta.env.VITE_ACCESS_CODE) {
      document.cookie = `sankofa_access=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-cream flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 mb-6"
          >
            <Lock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-charcoal mb-2">Sankofa</h1>
          <p className="text-stone-500 text-sm">Accès réservé — Entrez le code d'accès</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code d'accès"
              autoFocus
              className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-200 bg-white text-charcoal placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-400 text-white font-semibold shadow-lg shadow-primary-400/25 hover:shadow-xl hover:shadow-primary-400/30 transition-shadow cursor-pointer"
          >
            Accéder à la démo
          </motion.button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm text-center mt-4"
            >
              Code incorrect. Réessayez.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
