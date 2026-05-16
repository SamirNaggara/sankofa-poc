import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CreatorSidebar, { MobileTopBar } from './CreatorSidebar'
import Dashboard from './Dashboard'
import OrganiserVoyage from './OrganiserVoyage'
import MesVoyages from './MesVoyages'

export default function CreatorLayout({ navigate, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleNavigate(section) {
    if (section === 'sondages') {
      navigate('creator-dashboard')
    } else if (section === 'mes-voyages') {
      navigate('mes-voyages')
    } else {
      navigate('organiser-voyage')
    }
  }

  function handleLogout() {
    navigate('login')
  }

  function renderSection() {
    switch (activeSection) {
      case 'organiser-voyage':
        return (
          <motion.div
            key="organiser-voyage"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <OrganiserVoyage navigate={navigate} />
          </motion.div>
        )
      case 'mes-voyages':
        return (
          <motion.div
            key="mes-voyages"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <MesVoyages navigate={navigate} />
          </motion.div>
        )
      default:
        return (
          <motion.div
            key="sondages"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <Dashboard navigate={navigate} />
          </motion.div>
        )
    }
  }

  return (
    <motion.div
      key="creator-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen bg-cream"
    >
      <CreatorSidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-auto">
        <MobileTopBar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  )
}
