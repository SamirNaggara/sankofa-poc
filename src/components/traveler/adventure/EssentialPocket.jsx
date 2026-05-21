import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Info, ChevronDown, Building2, Wifi, Phone, Copy, Check,
  ClipboardCheck, Shield, Headphones, Edit3, Save, Loader2,
} from 'lucide-react'

const expandTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] }

const tabs = [
  { id: 'hotel', label: 'Hébergement', icon: Building2 },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'checklist', label: 'Checklist', icon: ClipboardCheck },
  { id: 'urgence', label: 'Urgence', icon: Shield },
]

/* ─── Helpers ──────────────────────────────────── */

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-colors bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/50"
    >
      {copied ? (
        <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-accent">
          <Check size={11} /> Copié !
        </motion.span>
      ) : (
        <><Copy size={11} /> Copier</>
      )}
    </motion.button>
  )
}

function Field({ label, value, editing, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-charcoal/40 mb-1.5">{label}</label>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-charcoal/10 text-sm text-charcoal focus:outline-none focus:border-accent/40 transition-colors"
        />
      ) : (
        <p className="text-sm font-medium text-charcoal">{value}</p>
      )}
    </div>
  )
}

/* ─── Tab contents ─────────────────────────────── */

function HotelTab({ hotel }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-charcoal">{hotel.nom}</p>
      <div className="flex items-center gap-2">
        <p className="text-xs text-charcoal/50 flex-1">{hotel.adresse}</p>
        <CopyButton text={hotel.adresse} />
      </div>
      <p className="text-xs text-charcoal/40">
        Check-in {hotel.checkIn} · Check-out {hotel.checkOut}
      </p>
    </div>
  )
}

function WifiTab({ wifi }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-charcoal">{wifi.ssid}</p>
      <div className="flex items-center gap-2">
        <code className="text-xs bg-charcoal/5 px-2 py-1 rounded-lg text-charcoal/70 font-mono">
          {wifi.password}
        </code>
        <CopyButton text={wifi.password} />
      </div>
    </div>
  )
}

function ContactTab({ contact }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-charcoal">{contact.nom}</p>
      <p className="text-xs text-charcoal/50">{contact.role}</p>
      <a
        href={`tel:${contact.telephone.replace(/\s/g, '')}`}
        className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-xl bg-secondary-400/10 text-secondary-500 text-xs font-semibold hover:bg-secondary-400/20 transition-colors"
      >
        <Phone size={12} /> Appeler
      </a>
    </div>
  )
}

function ChecklistTab({ items, onToggle }) {
  const done = items.filter((i) => i.checked).length
  const total = items.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div>
      {/* Progress bar */}
      <div className="h-2 bg-charcoal/5 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onToggle(item.id)}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/3 transition-colors cursor-pointer text-left"
          >
            <motion.div
              animate={item.checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                item.checked ? 'bg-primary-500 border-primary-500' : 'border-charcoal/15 bg-white'
              }`}
            >
              {item.checked && <Check size={14} className="text-white" strokeWidth={3} />}
            </motion.div>
            <span className={`text-sm transition-colors ${
              item.checked ? 'text-charcoal/40 line-through' : 'text-charcoal font-medium'
            }`}>
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function UrgenceTab({ urgences, security: initialSecurity }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState({ ...initialSecurity })

  const numbers = [
    { label: urgences.labelNumeroLocal, number: urgences.numeroLocal, icon: Phone, color: 'bg-red-500' },
    { label: urgences.labelPolice, number: urgences.police, icon: Shield, color: 'bg-blue-500' },
    { label: urgences.labelAmbulance, number: urgences.ambulance, icon: Phone, color: 'bg-emerald-500' },
    { label: urgences.ambassade.nom, number: urgences.ambassade.telephone, icon: Building2, color: 'bg-violet-500' },
    { label: 'Hotline Sankofa 24/7', number: urgences.sankofaHotline, icon: Headphones, color: 'bg-primary-500' },
  ]

  function handleChange(field, value) {
    setData((prev) => ({ ...prev, [field]: value }))
  }
  function handleUrgenceChange(field, value) {
    setData((prev) => ({ ...prev, urgence: { ...prev.urgence, [field]: value } }))
  }
  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 2000)
    }, 2000)
  }

  return (
    <div className="space-y-5">
      {/* Emergency numbers */}
      <div>
        <p className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-3">
          Numéros d'urgence
        </p>
        <div className="space-y-2">
          {numbers.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={`tel:${item.number.replace(/\s/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/3 transition-colors group"
              >
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                  <Icon size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">{item.label}</p>
                  <p className="text-xs text-charcoal/40">{item.number}</p>
                </div>
                <Phone size={14} className="text-charcoal/20 group-hover:text-accent transition-colors shrink-0" />
              </a>
            )
          })}
        </div>
      </div>

      {/* Personal info */}
      <div className="border-t border-charcoal/5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-medium text-charcoal/40 uppercase tracking-wider">
            Infos personnelles
          </h4>
          <AnimatePresence mode="wait">
            {saving ? (
              <motion.div
                key="saving"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-accent"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Loader2 size={14} />
                </motion.div>
                <span className="text-[11px] font-medium">Sauvegarde...</span>
              </motion.div>
            ) : saved ? (
              <motion.div
                key="saved"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-accent"
              >
                <Check size={14} />
                <span className="text-[11px] font-medium">Sauvegardé</span>
              </motion.div>
            ) : (
              <motion.button
                key="btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={editing ? handleSave : () => setEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors border border-charcoal/10 hover:bg-charcoal/5 text-charcoal/60"
                whileTap={{ scale: 0.95 }}
              >
                {editing ? <><Save size={12} /> Sauvegarder</> : <><Edit3 size={12} /> Modifier</>}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Allergies" value={data.allergies} editing={editing} onChange={(v) => handleChange('allergies', v)} />
          <Field label="Régime alimentaire" value={data.regime} editing={editing} onChange={(v) => handleChange('regime', v)} />
          <Field label="Groupe sanguin" value={data.groupeSanguin} editing={editing} onChange={(v) => handleChange('groupeSanguin', v)} />
          <Field label="Passeport" value={data.passeport} editing={editing} onChange={(v) => handleChange('passeport', v)} />
        </div>

        <div className="mt-4 pt-4 border-t border-charcoal/5">
          <h5 className="text-sm font-semibold text-charcoal mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Contact d'urgence
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Nom" value={data.urgence.nom} editing={editing} onChange={(v) => handleUrgenceChange('nom', v)} />
            <Field label="Lien" value={data.urgence.lien} editing={editing} onChange={(v) => handleUrgenceChange('lien', v)} />
            <Field label="Téléphone" value={data.urgence.telephone} editing={editing} onChange={(v) => handleUrgenceChange('telephone', v)} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ───────────────────────────── */

export default function EssentialPocket({ pocket, fieldItems, security, expanded: expandedProp, onToggle }) {
  const [expandedInternal, setExpandedInternal] = useState(false)
  const isControlled = expandedProp !== undefined
  const expanded = isControlled ? expandedProp : expandedInternal
  const toggleExpanded = isControlled ? onToggle : () => setExpandedInternal((p) => !p)
  const [activeTab, setActiveTab] = useState('hotel')
  const [items, setItems] = useState(fieldItems || [])

  if (!pocket) return null

  const urgences = pocket.urgences
  const done = items.filter((i) => i.checked).length
  const total = items.length

  function toggleItem(id) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
  }

  const tabContent = {
    hotel: <HotelTab hotel={pocket.hotel} />,
    wifi: <WifiTab wifi={pocket.wifi} />,
    contact: <ContactTab contact={pocket.contact} />,
    checklist: items.length > 0
      ? <ChecklistTab items={items} onToggle={toggleItem} />
      : <p className="text-sm text-charcoal/40">Aucune checklist pour aujourd'hui</p>,
    urgence: urgences && security
      ? <UrgenceTab urgences={urgences} security={security} />
      : <p className="text-sm text-charcoal/40">Aucune donnée disponible</p>,
  }

  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Collapsed pill */}
      <motion.button
        onClick={toggleExpanded}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white border border-charcoal/5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-400/10 flex items-center justify-center">
            <Info size={17} className="text-primary-600" />
          </div>
          <span className="text-sm font-semibold text-charcoal">Infos utiles</span>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-charcoal/30" />
        </motion.div>
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={expandTransition}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary-400 to-accent" />

              {/* Tab bar */}
              <div className="flex overflow-x-auto gap-1 px-3 pt-3 pb-1 scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                        isActive
                          ? 'bg-primary-400/10 text-primary-600'
                          : 'text-charcoal/40 hover:text-charcoal/60 hover:bg-charcoal/5'
                      }`}
                    >
                      <Icon size={14} />
                      <span>{tab.label}</span>
                      {tab.id === 'checklist' && total > 0 && (
                        <span className={`ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                          done === total
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-charcoal/5 text-charcoal/50'
                        }`}>
                          {done}/{total}
                        </span>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Tab content */}
              <div className="p-5 min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tabContent[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
