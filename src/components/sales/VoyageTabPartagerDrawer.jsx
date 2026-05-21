import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { MousePointerClick } from 'lucide-react'
import VoyageTabPartager from '../creator/VoyageControl/VoyageTabPartager'

export default function VoyageTabPartagerDrawer({ links, tripSlug, clicksData }) {
  return (
    <div className="space-y-6">
      {/* Clicks chart */}
      {clicksData && clicksData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-charcoal/5 p-6"
        >
          <h3 className="text-sm font-semibold text-charcoal mb-1 flex items-center gap-2">
            <MousePointerClick size={15} className="text-accent" />
            Clics par jour
          </h3>
          <p className="text-xs text-charcoal/40 mb-4">Performance de vos liens de tracking</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clicksData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="clicsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="jour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#a3a3a3' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#a3a3a3' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 13 }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="clics"
                  stroke="#0F766E"
                  strokeWidth={2.5}
                  fill="url(#clicsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Existing partager content */}
      <VoyageTabPartager links={links} tripSlug={tripSlug} />
    </div>
  )
}
