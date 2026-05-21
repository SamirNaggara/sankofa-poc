import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, Plane, Luggage, LogOut, X, Menu } from 'lucide-react'
import { creatorProfile } from '../../data/fakeData'

const navItems = [
  { id: 'sondages', label: 'Sondages', icon: ClipboardList },
  { id: 'organiser-voyage', label: 'Catalogue Inspirations', icon: Plane },
  { id: 'mes-voyages', label: 'Voyages Actifs', icon: Luggage },
]

function SidebarContent({ activeSection, onNavigate, onLogout }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6">
        <h1 className="font-display text-xl font-bold text-primary-500">Sankofa</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary-500/10 text-primary-500 border-l-3 border-primary-500'
                  : 'text-charcoal/60 hover:bg-charcoal/5'
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={18} />
              {item.label}
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom: Avatar + logout */}
      <div className="px-4 py-4 border-t border-charcoal/5">
        <div className="flex items-center gap-3">
          <img
            src={creatorProfile.avatar}
            alt={creatorProfile.name}
            className="w-9 h-9 rounded-full bg-cream-warm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-charcoal truncate">{creatorProfile.name}</p>
            <p className="text-xs text-charcoal/40">Créateur</p>
          </div>
          <motion.button
            onClick={onLogout}
            className="p-2 rounded-lg text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 transition-colors cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <LogOut size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default function CreatorSidebar({ activeSection, onNavigate, onLogout, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-charcoal/5 h-screen sticky top-0 shrink-0">
        <SidebarContent activeSection={activeSection} onNavigate={onNavigate} onLogout={onLogout} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={onMobileClose}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[calc(100vw-3.5rem)] max-w-[280px] bg-white z-50 lg:hidden shadow-xl"
            >
              <div className="absolute top-4 right-4">
                <motion.button
                  onClick={onMobileClose}
                  className="p-2 rounded-lg hover:bg-charcoal/5 cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="text-charcoal/60" />
                </motion.button>
              </div>
              <SidebarContent activeSection={activeSection} onNavigate={(id) => { onNavigate(id); onMobileClose() }} onLogout={onLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function MobileTopBar({ onMenuClick }) {
  return (
    <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-charcoal/5 sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 py-3">
        <motion.button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-charcoal/5 cursor-pointer"
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={22} className="text-charcoal" />
        </motion.button>
        <h1 className="font-display text-lg font-bold text-primary-500">Sankofa</h1>
        <img
          src={creatorProfile.avatar}
          alt={creatorProfile.name}
          className="w-8 h-8 rounded-full bg-cream-warm"
        />
      </div>
    </header>
  )
}
