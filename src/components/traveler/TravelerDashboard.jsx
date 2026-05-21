import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Edit3, Save, MapPin, ChevronRight } from 'lucide-react'
import PageTransition from '../shared/PageTransition'
import { travelerProfile, travelerTrips } from '../../data/fakeData'

export default function TravelerDashboard({ navigate }) {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({ ...travelerProfile })

  function handleChange(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-10 h-10 rounded-full bg-cream-warm"
              />
              <div>
                <p className="font-semibold text-charcoal text-sm">{profile.name}</p>
                <p className="text-xs text-charcoal/40">Voyageur</p>
              </div>
            </div>
            <motion.button
              onClick={() => navigate('login')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-charcoal/50 hover:text-charcoal hover:bg-charcoal/5 transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={16} />
              Déconnexion
            </motion.button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
          {/* Profile section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg border border-charcoal/5 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-charcoal">Mon Profil</h2>
              <motion.button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors border border-charcoal/10 hover:bg-charcoal/5 text-charcoal/60"
                whileTap={{ scale: 0.95 }}
              >
                {editing ? <><Save size={16} /> Sauvegarder</> : <><Edit3 size={16} /> Modifier</>}
              </motion.button>
            </div>

            <div className="flex items-center gap-5 mb-6">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl bg-cream-warm"
              />
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-charcoal/40 mb-1">Nom</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-charcoal/10 text-sm focus:outline-none focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-charcoal font-medium">{profile.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/40 mb-1">Email</label>
                  {editing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-charcoal/10 text-sm focus:outline-none focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-charcoal/70 text-sm">{profile.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-charcoal/40 mb-1">Bio</label>
              {editing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-charcoal/10 text-sm focus:outline-none focus:border-primary-500 resize-none"
                />
              ) : (
                <p className="text-charcoal/70 text-sm">{profile.bio}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-charcoal/40 mb-2">Centres d'intérêt</label>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mes Voyages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-charcoal mb-5">Mes Voyages</h2>
            <div className="space-y-4">
              {travelerTrips.map((trip) => (
                  <motion.button
                    key={trip.tripId}
                    onClick={() => navigate('traveler-dashboard', { travelerId: 'lucas' })}
                    className="w-full bg-white rounded-2xl shadow-lg border border-charcoal/5 overflow-hidden cursor-pointer text-left group"
                    whileHover={{ y: -2, boxShadow: '0 8px 30px -5px rgba(0,0,0,0.12)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        trip.status === 'en-cours'
                          ? 'bg-green-500 text-white'
                          : 'bg-primary-400 text-white'
                      }`}>
                        {trip.status === 'en-cours' ? 'En cours' : 'Confirmé'}
                      </span>
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{trip.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={trip.creator.avatar}
                          alt={trip.creator.name}
                          className="w-8 h-8 rounded-full bg-cream-warm"
                        />
                        <div>
                          <p className="text-xs text-charcoal/50">Organisé par</p>
                          <p className="text-sm font-semibold text-primary-500">{trip.creator.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal/40">
                        <MapPin size={14} />
                        <span className="text-xs">{trip.dates}</span>
                        <ChevronRight size={16} className="text-charcoal/20 group-hover:text-charcoal/50 transition-colors" />
                      </div>
                    </div>
                  </motion.button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  )
}
