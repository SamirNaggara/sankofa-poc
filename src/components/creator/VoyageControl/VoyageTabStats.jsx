import { motion } from 'framer-motion'
import { Eye, Users, TrendingUp, Clock, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const tiles = [
  { key: 'vues', label: 'Vues page', icon: Eye, color: 'text-primary-500', bg: 'bg-primary-400/15' },
  { key: 'visiteursUniques', label: 'Visiteurs uniques', icon: Users, color: 'text-accent', bg: 'bg-accent/15' },
  { key: 'tauxConversion', label: 'Taux conversion', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-500/15', suffix: '%' },
  { key: 'tempsMoyen', label: 'Temps moyen', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-500/15' },
  { key: 'tauxRebond', label: 'Taux rebond', icon: ArrowDownRight, color: 'text-red-500', bg: 'bg-red-500/15', suffix: '%' },
]

export default function VoyageTabStats({ stats }) {
  if (!stats) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 8 }}
    >
      {/* Mini tiles */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {tiles.map((tile) => {
          const Icon = tile.icon
          const value = stats[tile.key]
          return (
            <div
              key={tile.key}
              className="bg-white rounded-xl border border-charcoal/5 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg ${tile.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={14} className={tile.color} />
                </div>
                <span className="text-xs text-charcoal/50 leading-tight">{tile.label}</span>
              </div>
              <p className="text-xl font-bold text-charcoal">
                {value}{tile.suffix && !String(value).includes(tile.suffix) ? tile.suffix : ''}
              </p>
            </div>
          )
        })}
      </motion.div>

      {/* Area Chart */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-charcoal/5 p-6 mb-8"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-4">Visites par jour</h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.visiteursParJour} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="visitesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="jour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a3a3a3' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a3a3a3' }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="visites"
                stroke="#D97706"
                strokeWidth={2.5}
                fill="url(#visitesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Sources */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-charcoal/5 p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal mb-5">Sources des inscriptions</h3>
        <div className="space-y-4">
          {stats.sources.map((source) => {
            const maxVisites = Math.max(...stats.sources.map((s) => s.visites))
            const taux = source.visites > 0 ? ((source.inscriptions / source.visites) * 100).toFixed(1) : '0'
            return (
              <div key={source.nom}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.couleur }} />
                    <span className="text-sm font-medium text-charcoal">{source.nom}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-charcoal/50">
                    <span>{source.visites} clics</span>
                    <span>{source.inscriptions} inscriptions</span>
                    <span className="font-semibold text-charcoal">{taux}%</span>
                  </div>
                </div>
                <div className="h-2.5 bg-charcoal/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: source.couleur }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(source.visites / maxVisites) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
