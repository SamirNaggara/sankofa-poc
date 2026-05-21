import { motion } from 'framer-motion'
import { Sun, CloudSun, CloudRain } from 'lucide-react'

const iconMap = {
  sun: Sun,
  'cloud-sun': CloudSun,
  'cloud-rain': CloudRain,
}

export default function WeatherBadge({ weather }) {
  if (!weather) return null

  const Icon = iconMap[weather.icon] || Sun

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20"
    >
      <Icon size={15} className="text-primary-400" />
      <span className="text-xs font-semibold text-white">{weather.temp}°C</span>
      <span className="text-xs text-white/60">{weather.label}</span>
    </motion.div>
  )
}
