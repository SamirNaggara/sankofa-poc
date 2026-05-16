import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react'
import { simulateTyping } from '../../../hooks/useSimulateTyping'

const analysisPhases = [
  'Analyse de votre audience…',
  'Génération des contenus…',
  'Adaptation au ton de votre marque…',
]

function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.51"/>
    </svg>
  )
}

function TikTokIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.8.1V9.01a6.27 6.27 0 0 0-.8-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.4a8.16 8.16 0 0 0 3.76.92V6.86a4.84 4.84 0 0 1-.01-.17Z" fill="currentColor"/>
    </svg>
  )
}

const platformIcons = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
}

function AILoader({ phase }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
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

function PostCard({ post, index, shouldTypewrite }) {
  const [displayedContent, setDisplayedContent] = useState(shouldTypewrite ? '' : post.content)
  const [copied, setCopied] = useState(false)
  const hasTyped = useRef(false)

  useEffect(() => {
    if (shouldTypewrite && !hasTyped.current) {
      hasTyped.current = true
      simulateTyping(setDisplayedContent, post.content, 15)
    }
  }, [shouldTypewrite, post.content])

  const PlatformIcon = platformIcons[post.platform] || InstagramIcon

  function handleCopy() {
    navigator.clipboard.writeText(post.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.5, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400/20 to-accent/20 flex items-center justify-center">
            <PlatformIcon size={16} className="text-charcoal/70" />
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal">{post.platform}</p>
            <p className="text-xs text-charcoal/40">{post.type}</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
          {post.engagement}
        </span>
      </div>

      {/* Content */}
      <div className="bg-cream/60 rounded-xl p-4 mb-4 min-h-[120px]">
        <p className="text-sm text-charcoal whitespace-pre-line leading-relaxed">{displayedContent}</p>
        {shouldTypewrite && displayedContent.length < post.content.length && (
          <motion.span
            className="inline-block w-0.5 h-4 bg-primary-500 ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.hashtags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-full bg-primary-400/10 text-primary-500 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Copy button */}
      <motion.button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-charcoal/10 text-xs font-medium text-charcoal/60 hover:border-primary-400 hover:text-primary-500 transition-colors cursor-pointer"
        whileTap={{ scale: 0.95 }}
      >
        {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
        {copied ? 'Copié !' : 'Copier le texte'}
      </motion.button>
    </motion.div>
  )
}

function PromotionContent({ posts }) {
  const [phase, setPhase] = useState(0)
  const [stage, setStage] = useState('loading') // 'loading' | 'done'

  useEffect(() => {
    const phase1 = setTimeout(() => setPhase(1), 1500)
    const phase2 = setTimeout(() => setPhase(2), 3000)
    const done = setTimeout(() => setStage('done'), 4000)

    return () => {
      clearTimeout(phase1)
      clearTimeout(phase2)
      clearTimeout(done)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {stage === 'loading' && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AILoader phase={phase} />
        </motion.div>
      )}
      {stage === 'done' && (
        <motion.div
          key="posts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              shouldTypewrite={index === 0}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function VoyageTabPromotion({ posts }) {
  const [key, setKey] = useState(0)

  function handleRegenerate() {
    setKey((k) => k + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md border border-charcoal/5 p-5 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-charcoal">Contenus promotionnels IA</h3>
              <p className="text-xs text-charcoal/50">Générés automatiquement pour votre audience</p>
            </div>
          </div>
          <motion.button
            onClick={handleRegenerate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-charcoal/10 text-xs font-medium text-charcoal/60 hover:border-primary-400 hover:text-primary-500 transition-colors cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={13} />
            Régénérer
          </motion.button>
        </div>
      </motion.div>

      {/* Loader then Posts — keyed to reset on regenerate */}
      <PromotionContent key={key} posts={posts} />
    </motion.div>
  )
}
