import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Edit3, Save, Check, Loader2 } from 'lucide-react'

export default function ProfileSecurity({ security: initialSecurity }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState({ ...initialSecurity })

  function handleChange(field, value) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function handleUrgenceChange(field, value) {
    setData((prev) => ({
      ...prev,
      urgence: { ...prev.urgence, [field]: value },
    }))
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
    <div className="px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl shadow-lg border border-charcoal/5 overflow-hidden"
      >
        {/* Accent header band */}
        <div className="h-1.5 bg-gradient-to-r from-accent to-emerald-500" />

        <div className="p-6">
          {/* Title row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal">Sécurité & Médical</h2>
                <p className="text-xs text-charcoal/40">Dossier sécurisé & confidentiel</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {saving ? (
                <motion.div
                  key="saving"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-accent"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 size={16} />
                  </motion.div>
                  <span className="text-xs font-medium">Mise à jour du dossier sécurisé...</span>
                </motion.div>
              ) : saved ? (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-accent"
                >
                  <Check size={16} />
                  <span className="text-xs font-medium">Sauvegardé</span>
                </motion.div>
              ) : (
                <motion.button
                  key="btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={editing ? handleSave : () => setEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors border border-charcoal/10 hover:bg-charcoal/5 text-charcoal/60"
                  whileTap={{ scale: 0.95 }}
                >
                  {editing ? <><Save size={14} /> Sauvegarder</> : <><Edit3 size={14} /> Modifier</>}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Allergies"
              value={data.allergies}
              editing={editing}
              onChange={(v) => handleChange('allergies', v)}
            />
            <Field
              label="Régime alimentaire"
              value={data.regime}
              editing={editing}
              onChange={(v) => handleChange('regime', v)}
            />
            <Field
              label="Groupe sanguin"
              value={data.groupeSanguin}
              editing={editing}
              onChange={(v) => handleChange('groupeSanguin', v)}
            />
            <Field
              label="Passeport"
              value={data.passeport}
              editing={editing}
              onChange={(v) => handleChange('passeport', v)}
            />
          </div>

          {/* Urgence section */}
          <div className="mt-6 pt-5 border-t border-charcoal/5">
            <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Contact d'urgence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field
                label="Nom"
                value={data.urgence.nom}
                editing={editing}
                onChange={(v) => handleUrgenceChange('nom', v)}
              />
              <Field
                label="Lien"
                value={data.urgence.lien}
                editing={editing}
                onChange={(v) => handleUrgenceChange('lien', v)}
              />
              <Field
                label="Téléphone"
                value={data.urgence.telephone}
                editing={editing}
                onChange={(v) => handleUrgenceChange('telephone', v)}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
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
