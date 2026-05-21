import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapPin, Plane, Camera, UtensilsCrossed, Ship, Wine, Sun, ChevronDown, Clock, MapPinned, Lightbulb, Car, Bed, Coffee, Compass, TreePalm } from 'lucide-react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'

const dayIcons = [
  { icon: MapPin, color: 'from-amber-400 to-orange-500' },
  { icon: Camera, color: 'from-rose-400 to-pink-500' },
  { icon: Ship, color: 'from-cyan-400 to-teal-500' },
  { icon: Wine, color: 'from-violet-400 to-purple-500' },
  { icon: Sun, color: 'from-yellow-400 to-amber-500' },
  { icon: UtensilsCrossed, color: 'from-emerald-400 to-green-500' },
  { icon: Camera, color: 'from-blue-400 to-indigo-500' },
  { icon: Plane, color: 'from-slate-400 to-gray-500' },
]

// Custom markers rendered via Leaflet divIcon
function WaypointMarkers({ waypoints, currentDay }) {
  const map = useMap()

  useEffect(() => {
    const markers = waypoints.map((wp, i) => {
      const isFirst = i === 0
      const isLast = i === waypoints.length - 1
      const isCurrent = currentDay != null && i + 1 === currentDay
      const dotColor = isCurrent ? '#0F766E' : isLast ? '#EA580C' : isFirst ? '#F59E0B' : '#D97706'
      const haloStyle = isCurrent
        ? 'box-shadow:0 0 0 6px rgba(15,118,110,0.3),0 0 16px rgba(15,118,110,0.25);animation:pulseHalo 2s ease-in-out infinite;'
        : ''

      const icon = L.divIcon({
        className: '',
        iconSize: [80, 70],
        iconAnchor: [40, 45],
        html: `
          <style>@keyframes pulseHalo{0%,100%{box-shadow:0 0 0 4px rgba(15,118,110,0.3),0 0 12px rgba(15,118,110,0.2)}50%{box-shadow:0 0 0 8px rgba(15,118,110,0.15),0 0 20px rgba(15,118,110,0.3)}}</style>
          <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;">
            <span style="font-size:24px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15));line-height:1;">${wp.emoji}</span>
            <div style="
              width:20px;height:20px;border-radius:50%;
              background:white;
              box-shadow:0 2px 8px rgba(0,0,0,0.18);
              display:flex;align-items:center;justify-content:center;
              margin-top:2px;
              ${haloStyle}
            ">
              <div style="width:12px;height:12px;border-radius:50%;background:${dotColor};"></div>
            </div>
            <div style="
              margin-top:4px;
              background:white;
              padding:2px 10px;
              border-radius:10px;
              box-shadow:0 2px 8px rgba(0,0,0,0.12);
              font-family:Inter,sans-serif;
              font-size:12px;
              font-weight:700;
              color:#1C1917;
              white-space:nowrap;
            ">${wp.label}</div>
          </div>
        `,
      })

      return L.marker([wp.lat, wp.lng], { icon, interactive: false }).addTo(map)
    })

    return () => {
      markers.forEach(m => map.removeLayer(m))
    }
  }, [map, waypoints, currentDay])

  return null
}

// Fit map bounds to show all waypoints
function FitBounds({ waypoints }) {
  const map = useMap()

  useEffect(() => {
    if (waypoints.length === 0) return
    const bounds = L.latLngBounds(waypoints.map(wp => [wp.lat, wp.lng]))
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 7 })
  }, [map, waypoints])

  return null
}

// Route line between waypoints
function Route({ waypoints, currentDay }) {
  const positions = waypoints.map(wp => [wp.lat, wp.lng])

  if (currentDay != null && positions.length > 1) {
    const pastPositions = positions.slice(0, Math.min(currentDay, positions.length))
    const futurePositions = positions.slice(Math.max(currentDay - 1, 0))

    return (
      <>
        {/* Shadow line */}
        <Polyline
          positions={positions}
          pathOptions={{
            color: 'rgba(217,119,6,0.08)',
            weight: 8,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
        {/* Past segments — solid */}
        {pastPositions.length > 1 && (
          <Polyline
            positions={pastPositions}
            pathOptions={{
              color: '#0F766E',
              weight: 3,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        )}
        {/* Future segments — dashed */}
        {futurePositions.length > 1 && (
          <Polyline
            positions={futurePositions}
            pathOptions={{
              color: '#D97706',
              weight: 3,
              lineCap: 'round',
              lineJoin: 'round',
              dashArray: '8 6',
            }}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: 'rgba(217,119,6,0.15)',
          weight: 8,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#D97706',
          weight: 3,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </>
  )
}

export default function MapItinerary({ waypoints, itinerary, currentDay = null, expandTrigger = 0 }) {
  const mapRef = useRef(null)
  const timelineRef = useRef(null)
  const dayRefs = useRef({})
  const timelineInView = useInView(timelineRef, { once: true, margin: '-40px' })
  const [expandedDay, setExpandedDay] = useState(null)

  // Auto-expand current day when "Programme du jour" is clicked
  useEffect(() => {
    if (expandTrigger > 0 && currentDay != null) {
      const dayIndex = itinerary.findIndex(d => d.day === currentDay)
      if (dayIndex !== -1) {
        setExpandedDay(dayIndex)
        // Scroll to the specific day card after a short delay for DOM update
        setTimeout(() => {
          dayRefs.current[dayIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 150)
      }
    }
  }, [expandTrigger])

  const center = waypoints.length > 0
    ? [
        waypoints.reduce((s, w) => s + w.lat, 0) / waypoints.length,
        waypoints.reduce((s, w) => s + w.lng, 0) / waypoints.length,
      ]
    : [44, 12]

  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary-400/10 text-primary-600 text-xs font-semibold tracking-wide uppercase mb-3"
        >
          Votre parcours
        </motion.span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
          Itinéraire du voyage
        </h2>
        <p className="text-charcoal/50 mt-2 text-sm">
          {waypoints.length} escales · {itinerary.length} jours d'aventure
        </p>
      </motion.div>

      {/* ——— Leaflet Map ——— */}
      <motion.div
        ref={mapRef}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden mb-10 shadow-xl h-[260px] sm:h-[380px]"
      >
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          dragging={true}
          doubleClickZoom={false}
          touchZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <FitBounds waypoints={waypoints} />
          <Route waypoints={waypoints} currentDay={currentDay} />
          <WaypointMarkers waypoints={waypoints} currentDay={currentDay} />
        </MapContainer>

        {/* Legend overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-xs text-charcoal/50">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-400" />
            Départ
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            Escale
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-400" />
            Destination
          </span>
        </div>
      </motion.div>

      {/* ——— Day-by-day Timeline ——— */}
      <div ref={timelineRef} className="relative">
        {/* Vertical line */}
        <motion.div
          className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-400 via-primary-500 to-secondary-400 rounded-full origin-top"
          initial={{ scaleY: 0 }}
          animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        <div className="space-y-4">
          {itinerary.map((day, i) => {
            const { icon: DayIcon, color } = dayIcons[i % dayIcons.length]
            const isExpanded = expandedDay === i
            const isLastDay = i === itinerary.length - 1
            const isFirstDay = i === 0
            const isCurrentDay = currentDay != null && day.day === currentDay
            const isPast = currentDay != null && day.day < currentDay

            return (
              <motion.div
                key={day.day}
                ref={el => { dayRefs.current[i] = el }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-4 sm:gap-5"
              >
                {/* Timeline node */}
                <div className="relative z-10 shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${isCurrentDay ? 'from-accent to-emerald-500' : color} flex items-center justify-center shadow-lg cursor-pointer ${isPast ? 'opacity-50' : ''}`}
                    onClick={() => setExpandedDay(isExpanded ? null : i)}
                    style={{
                      boxShadow: isCurrentDay
                        ? '0 4px 14px -2px rgba(15,118,110,0.3), 0 0 0 3px rgba(255,255,255,0.9)'
                        : '0 4px 14px -2px rgba(0,0,0,0.12), 0 0 0 3px rgba(255,255,255,0.9)',
                    }}
                  >
                    <DayIcon size={18} className="text-white" strokeWidth={2.5} />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  layout
                  onClick={() => setExpandedDay(isExpanded ? null : i)}
                  className={`flex-1 min-w-0 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isCurrentDay
                      ? 'bg-accent/5 shadow-md border-accent/20 ring-1 ring-accent/10'
                      : isExpanded
                        ? 'bg-white shadow-lg border-primary-400/20 ring-1 ring-primary-400/10'
                        : isPast
                          ? 'bg-white/60 shadow-sm border-charcoal/5 opacity-60'
                          : 'bg-white/80 shadow-sm border-charcoal/5 hover:shadow-md hover:bg-white hover:border-primary-400/10'
                  }`}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-lg text-xs font-bold tracking-wider ${
                          isCurrentDay
                            ? 'bg-accent/15 text-accent'
                            : isFirstDay
                              ? 'bg-primary-400/10 text-primary-600'
                              : isLastDay
                                ? 'bg-secondary-400/10 text-secondary-500'
                                : 'bg-charcoal/5 text-charcoal/60'
                        }`}>
                          J{day.day}
                        </span>
                        {isCurrentDay && (
                          <span className="px-2 py-0.5 rounded-md bg-accent text-white text-[10px] font-bold uppercase tracking-wider">
                            Aujourd'hui
                          </span>
                        )}
                        <p className="text-sm sm:text-[15px] font-semibold text-charcoal leading-snug truncate">
                          {day.label.split(' — ')[0].split(' & ')[0]}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} className="text-charcoal/25 shrink-0" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-charcoal/5">
                            {/* Summary label */}
                            <p className="text-sm text-charcoal/60 leading-relaxed mb-3">
                              {day.label}
                            </p>

                            {/* Tags */}
                            <div className="flex items-center gap-2 mb-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-gradient-to-r ${color} text-white`}>
                                <DayIcon size={11} />
                                {isFirstDay ? 'Arrivée' : isLastDay ? 'Départ' : 'Exploration'}
                              </span>
                              {day.activities && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-charcoal/5 text-charcoal/50">
                                  <Clock size={11} />
                                  {day.activities.length} activités
                                </span>
                              )}
                              {day.label.includes('coucher de soleil') || day.label.includes('rooftop') ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-amber-50 text-amber-600">
                                  <Sun size={11} />
                                  Moment fort
                                </span>
                              ) : null}
                            </div>

                            {/* Detailed activities timeline */}
                            {day.activities && day.activities.length > 0 && (
                              <div className="space-y-0">
                                {day.activities.map((activity, ai) => {
                                  const typeConfig = {
                                    transport: { icon: Car, bg: 'bg-slate-100', text: 'text-slate-500', label: 'Transport' },
                                    visite: { icon: Compass, bg: 'bg-violet-50', text: 'text-violet-500', label: 'Visite' },
                                    repas: { icon: Coffee, bg: 'bg-orange-50', text: 'text-orange-500', label: 'Repas' },
                                    activite: { icon: TreePalm, bg: 'bg-teal-50', text: 'text-teal-600', label: 'Activité' },
                                    'temps-libre': { icon: Sun, bg: 'bg-amber-50', text: 'text-amber-500', label: 'Temps libre' },
                                    hebergement: { icon: Bed, bg: 'bg-indigo-50', text: 'text-indigo-500', label: 'Hébergement' },
                                  }
                                  const tc = typeConfig[activity.type] || typeConfig.activite
                                  const TypeIcon = tc.icon
                                  const isLast = ai === day.activities.length - 1

                                  return (
                                    <div key={ai} className="flex gap-3">
                                      {/* Time column + connector */}
                                      <div className="flex flex-col items-center shrink-0 w-12">
                                        <span className="text-[11px] font-bold text-charcoal/70 tabular-nums">{activity.time}</span>
                                        {!isLast && (
                                          <div className="w-[1.5px] flex-1 min-h-[20px] bg-charcoal/8 my-1" />
                                        )}
                                      </div>
                                      {/* Activity card */}
                                      <div className={`flex-1 min-w-0 mb-2.5 rounded-xl p-3 ${tc.bg} border border-charcoal/[0.03]`}>
                                        <div className="flex items-start gap-2">
                                          <div className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center ${tc.bg}`}>
                                            <TypeIcon size={13} className={tc.text} />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-semibold text-charcoal leading-snug">{activity.title}</p>
                                            <p className="text-[12px] text-charcoal/55 leading-relaxed mt-0.5">{activity.description}</p>
                                            {activity.location && (
                                              <p className="flex items-center gap-1 text-[11px] text-charcoal/40 mt-1.5">
                                                <MapPinned size={10} className="shrink-0" />
                                                <span className="truncate">{activity.location}</span>
                                              </p>
                                            )}
                                            {activity.tip && (
                                              <div className="flex items-start gap-1.5 mt-2 px-2 py-1.5 rounded-lg bg-amber-50 border border-amber-200/30">
                                                <Lightbulb size={11} className="text-amber-500 shrink-0 mt-0.5" />
                                                <p className="text-[11px] text-amber-700 leading-snug">{activity.tip}</p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: itinerary.length * 0.1 + 0.3, type: 'spring' }}
          className="flex items-center gap-4 mt-4"
        >
          <div className="relative z-10 shrink-0 w-12 sm:w-14 flex justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 ring-4 ring-white shadow-md" />
          </div>
          <p className="text-xs font-medium text-charcoal/30 tracking-wide uppercase">
            Fin du voyage · Retour avec des souvenirs plein la tête
          </p>
        </motion.div>
      </div>
    </div>
  )
}
